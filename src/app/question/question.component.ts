import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{

  questions:any;
  questionForm!: FormGroup;
  currentPage: number = 1;
  constructor(private sevice: ProjectService, private fb: FormBuilder) { }

  
  ngOnInit(): void {
    
    this.questionForm = this.fb.group({});
    //question show in form 
    
    this.questions = this.sevice.questions().subscribe(data => {
      this.questions = data.result
      console.log(this.questions)
    
      this.questions.forEach(
        (question: { id: any; answer:any; }) => {
          this.questionForm.addControl(`question${question.id}`
            , this.fb.control('', [Validators.required]))
            console.log(this.questionForm)
        }
      )
    })
    // })
    }
    onpreviousPage(){
      this.currentPage--;
    }
    onnextPage(){
      this.currentPage++;
    }
    onFinish(){
      console.log(this.questionForm.value)
    }
}
    
