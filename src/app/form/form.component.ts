import { Component, HostListener, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  questionsForm!: FormGroup
  allAnswersValid = false;
  savedData: any;
  questions!: any;
  nextbutton: boolean = true;
  formprogrss: any

  answer: any

  formGroup!: FormGroup;

  currentPage: number = 1;

  constructor(private service: ProjectService, private fb: FormBuilder, private router: Router,private tostr:ToastrService) { }

  ngOnInit(): void {
 

    let id = localStorage.getItem('id')
    console.log(id);

    const currentPageString = localStorage.getItem('currentPage');
    if (currentPageString && Number.isInteger(Number(currentPageString))) {
      this.currentPage = parseInt(currentPageString);
    }

    this.questionsForm = this.fb.group({});

    this.questions = this.service.getQuestions();

    this.formprogrss = localStorage.getItem('formProgress')


    this.formGroup = JSON.parse(this.formprogrss)
    console.log(this.formprogrss.currentPage);

   

    localStorage.setItem('currentPage', JSON.stringify(this.currentPage));
    this.questions.forEach((question: any, index: number) => {

      this.questionsForm.addControl(`question${question.id}`, this.fb.control('', Validators.required));



    });
  }







  clearProgress(): void {
    localStorage.removeItem('formProgress');
  }
  onPreviousPage() {
    let formProgress = {
      currentPage: this.currentPage - 1,
      answers: this.questionsForm.value,
      id: localStorage.getItem('id')
    }

    localStorage.setItem('formProgress', JSON.stringify(formProgress));
    console.log(formProgress);

    localStorage.setItem('currentPage', JSON.stringify(this.currentPage - 1))
    this.currentPage--;
  }



  onNextPage() {
    let formProgress = {
      currentPage: this.currentPage + 1,
      answers: this.questionsForm.value,
      id: localStorage.getItem('id')
    }
    localStorage.setItem('formProgress', JSON.stringify(formProgress));

    console.log(formProgress);

    localStorage.setItem('currentPage', JSON.stringify(this.currentPage + 1));

    this.currentPage++;

  }


  onFinish(): void {
    localStorage.removeItem('currentPage')
    console.log(this.questionsForm.value);

    let points = localStorage.getItem('surveyid')
    // points = JSON.parse(points)
    let id = localStorage.getItem('id')
    console.log(id);

    let data =
    {
      points,
      id
    }

    this.service.updatePoints(data).subscribe(data => {
      console.log(data)
    })

    this.tostr.success('Survey Completed ',undefined,{    
      // positionClass:'toast-top-center',
      timeOut:2000,
      closeButton:true,
      progressBar:true
      })


    this.router.navigateByUrl('/dashboard');
  }


      
	 isvalid(pageNumber: number): boolean {
      const controls = this.questions.slice((pageNumber - 1) * 2, pageNumber * 2)
        .map((question: { id: string; }) => this.questionsForm.get('question' + question.id));
    
      return controls.every((control: { value: string | null; }) => control.value !== null && control.value !== '');
    }
    
  
  }






