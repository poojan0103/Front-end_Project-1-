import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{

  questions:any;
  questionForm!: FormGroup;
  currentPage: number = 1;
  survey:any;
  questionsPerPage: number = 2;
  update = false;
  constructor(private sevice: ProjectService, private fb: FormBuilder,private router: Router,private tostr:ToastrService) { }

  
  ngOnInit(): void {
    
    this.questionForm = this.fb.group({});
    localStorage.getItem('formProgress')
     
    // this.questions = this.sevice.questions(localStorage.getItem('survey')).
    // subscribe(data => {
    //   this.questions = data.result
    //   console.log
    //   console.log(this.questions)
    // })
  



  

    

  //  this.questions = this.sevice.questions(localStorage.getItem('survey')).
  //   subscribe(data => {
  //     this.questions = data.result
     
  //     console.log(this.questions);
  //   })

  // }
  //  match question  tabel survey id and locastoroage id  and show only that questions


  this.survey = localStorage.getItem('survey')
 const currentPageString = localStorage.getItem('currentPage');
    if (currentPageString && Number.isInteger(Number(currentPageString))) {
      this.currentPage = parseInt(currentPageString);
    }

  this.questionForm = this.fb.group({});

localStorage.setItem('currentPage', JSON.stringify(this.currentPage))
  this.questions = this.sevice.questions(this.survey).subscribe(data => {
    this.questions = data.result
    console.log(this.questions);
    
    
    
      
    

    
    
    // this.questions = this.sevice.questions().subscribe(data => {
    //   this.questions = data.result
    //   console.log(this.questions)
    
      this.questions.forEach(
        (question: { id: any; answer:any; }) => {
          this.questionForm.addControl(`${question.id}`
            , this.fb.control('', [Validators.required]))
            // console.log(this.questionForm)
            // console.log(question.answer)
        }
      )
       
    // })
    })
    }
    onpreviousPage(){
      
      // this.update = true
      let formProgress = {
       
        answers: this.questionForm.value,
       
      }
      
      localStorage.setItem('currentPage', JSON.stringify(this.currentPage - 1))
      this.currentPage--;
     localStorage.setItem('formProgress', JSON.stringify(formProgress));
      
      
    }
    onnextPage(){
      const user = localStorage.getItem('id');
      const survey = localStorage.getItem('survey');
    
      const startIndex = (this.currentPage - 1) * this.questionsPerPage;
      const endIndex = startIndex + this.questionsPerPage;
      const pageQuestions = this.questions.slice(startIndex, endIndex);
      const pageAnswers: any = {};
      pageQuestions.forEach((question: { id: any; }) => {
      pageAnswers[`${question.id}`] = this.questionForm.get(`${question.id}`)?.value;
        console.log(`${question.id}`);
        // console.log(b);
        console.log(this.questionForm.get(`${question.id}`)?.value)
        
        
      });
      
      // console.log("oage",pageAnswers);
      
      
     
      
              
      // this.sevice.storeAnswer({ answer: pageAnswers, user, survey }).subscribe((data) => {
      //   console.log(data);
      //   localStorage.setItem('ansid',data._id)
      // }
      
      // )
      
      // if(localStorage.getItem('ansid')===null){
        // console.log("indide if...",this.currentPage)
        // this
        


    
      // if(!localStorage.getItem("ansid")){
      //   // console.log("indide if...",this.currentPage)
      //   this.sevice.storeAnswer({ answer: pageAnswers, user, survey }).subscribe((data) => {
      //     console.log(data);
      //     localStorage.setItem('ansid', data._id)
      //     // sessionStorage.setItem('ansid',data._id)
      //   });
      // }
      // else{
      //   console.log("indide else...",this.currentPage) 
      //   this.sevice.updateAnswers({ answer: pageAnswers, user, survey },
      //     localStorage.getItem('ansid')
          
      //   ).subscribe(data=>{
      //     console.log(data);
         
          
      //   })
          
  
      // }
      let formProgress = {
       
        answers: this.questionForm.value
      }
      
      localStorage.setItem('currentPage', JSON.stringify(this.currentPage + 1))
      const form = localStorage.setItem('formProgress', JSON.stringify(formProgress));
      this.currentPage++;
      console.log(formProgress);
      
     // let ab = localStorage.getItem('formProgress')
      // console.log(ab)
      let get:any
       get = localStorage.getItem('formProgress') ? localStorage.getItem('formProgress'): ""
  
      get = get?JSON.parse(get):""
    //  if(this.questions.id == ''||null){
    //   this.sevice.storeAnswer({ answer: pageAnswers, user, survey }).
    //     subscribe((data) => {
    //       console.log(data);
    //       localStorage.setItem('ansid', data._id)
          
    //     });
    //  }
    //  else{
    //   this.sevice.updateAnswers
    //     ({ answer: pageAnswers, user, survey },
    //       localStorage.getItem('ansid')

    //     ).subscribe(data=>{
    //       console.log(data)
    //     })
    //  }

    let ans =  get["answers"][2]
    //from above ans i want all value []
    // console.log(ans)
    
    // console.log(ans.question.id)

    console.log(ans,"-----------");
      
    if(ans !== pageAnswers){
      console.log("indide if")
      // this.sevice.updateAnswers
      //   ({ answer: pageAnswers, user, survey },
      //     localStorage.getItem('ansid')

      //   ).subscribe(data=>{
      //     console.log(data)
      //   })
    }
    
    


    
      
 
    
    // console.log(get(`question${this.questions.id}`)?.value)
    
      // if(get["answers"].question.id?.value == ''){
      //   console.log("indide if")

        // this.sevice.storeAnswer({ answer: pageAnswers, user, survey }).
        // subscribe((data) => {
        //   console.log(data);
        //   localStorage.setItem('ansid', data._id)
          // sessionStorage.setItem('
          // ansid',data._id)
        // });
      
      // else{
      //   console.log("indide else")
      //   this.sevice.updateAnswers
      //   ({ answer: pageAnswers, user, survey },
      //     localStorage.getItem('ansid')

      //   ).subscribe(data=>{
      //     console.log(data)
      //   })
      // }
      // if(get){
      //   // let ans = get["answers"]
      //   // console.log(ans)
      //   // let ansid = localStorage.getItem('ans
      // }
      
//     if(localStorage.getItem('formProgress'))
//  let get = localStorage.getItem('formProgress') ? localStorage.getItem('formProgress'): ""
// get = get?JSON.parse(get):""

    }
  
    onFinish(){
      let formProgress = {
       
      answers: this.questionForm.value,
     
    }
       localStorage.setItem('formProgress', JSON.stringify(formProgress));
    let get = localStorage.getItem('formProgress') ? localStorage.getItem('formProgress'): ""
    get = get?JSON.parse(get):""
    console.log(get)
    // console.log(typeof(get));
    
      // const answer = this.questionForm.value
      const answer = get
      console.log(answer)
     // console.log(typeof(answer));
     const points = localStorage.getItem('surveyid')
    
     const id = localStorage.getItem('id')
     console.log(id);
     const data =
    {
      points,
      id
    }
    this.sevice.updatePoints(data).subscribe(data =>{
      console.log(data)
    })
    this.tostr.success('Survey Completed ',undefined,{    
    
      timeOut:2000,
      closeButton:true,
      progressBar:true
      })


    this.router.navigateByUrl('/dashboard');
    
    
    
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
      const endIndex = startIndex + this.questionsPerPage;
      const pageQuestions = this.questions.slice(startIndex, endIndex);
      const pageAnswers: any = {};
      pageQuestions.forEach((question: { id: any; }) => {
        pageAnswers[`${question.id}`] = this.questionForm.get(`${question.id}`)?.value;
      });
      const user = localStorage.getItem('id');
      const survey = localStorage.getItem('survey');
      this.sevice.storeAnswer({ answer: pageAnswers, user, survey }).subscribe((data) => {
        console.log(data);
        // localStorage.setItem('ansid',data._id)
      })
      localStorage.removeItem('currentPage')
    
    
    }
    // isvalid(pageNumber: number): boolean {
    //   const controls = this.questions.slice((pageNumber - 1) * 2, pageNumber * 2)
    //     .map((question: { id: string; }) => this.questionForm.get( question.id));
    
    //   return controls.every((control: { value: string | null; }) => control.value !== null && control.value !== '');
    // }
}
  
    
