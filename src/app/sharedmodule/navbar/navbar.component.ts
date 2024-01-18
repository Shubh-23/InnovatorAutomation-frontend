import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',

  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService:NgbDropdownModule,private router:Router) { }
adminDetails:any={}
  ngOnInit(): void {
    let data:any =  localStorage.getItem('Admin')
    this.adminDetails  = JSON.parse(data)
    console.log(this.adminDetails)
  }
  logout(){
    localStorage.clear()
    this.router.navigateByUrl('')
  }
}
