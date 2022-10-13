import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  public authorities!:string[]; 

  ngOnInit(): void {

    let person = UserService.getCurrentUser();
    this.authorities = person?.authorities.map(e => e.authority) ?? []; 
  }

  logout(){
    localStorage.clear();
    window.location.href = '';
  }

  hasAuthority(authority:string):boolean{
    for(let currentAuthority of this.authorities){
      if(currentAuthority === authority){
        return true;
      }
    }
    return false;
  }

}
