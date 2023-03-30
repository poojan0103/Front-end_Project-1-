import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent  implements OnInit {
  survey:any
  userdetails:any
  constructor(private router:Router , private service:ProjectService){}
  ngOnInit(): void {
    // this.service.getProfile().subscribe(data=>{
    //     this.userdetails= data['user']
    //   }
    //   )
    this.getprofiile()
      
    this.listSurvey()
 }
listSurvey(){
  this.service.listSurvey().subscribe(data=>{
    this.survey = data.result;
    
    console.log(this.survey);
  })
}
navigate(surveyid:any){
  localStorage.setItem('surveyid',surveyid);
 
  
  
  this.router.navigate(['/form'])
}
getprofiile(){
  this.service.getProfile().subscribe(data=>{
    this.userdetails= data['user']
    console.log(this.userdetails.name)
    localStorage.setItem('id',this.userdetails._id)
    })
}
detail(){
  this.router.navigateByUrl('/profile');
}
}


