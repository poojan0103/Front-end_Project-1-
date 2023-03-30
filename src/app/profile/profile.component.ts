import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userdetails: any;
  ngOnInit(): void {
   this.getprofiile()
  //  this.back()
  }
constructor(private router:Router , private service:ProjectService){}
getprofiile(){
  this.service.getProfile().subscribe(data=>{
    this.userdetails= data['user']
    console.log(this.userdetails.name)
    
    })
}
back(){
  this.router.navigate(['/dashboard'])
}
onLogout(){
  this.service.deleteToken();

  this.router.navigate(['/login'])
}

}

