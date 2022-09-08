import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input('ngModel')
  usuario!:string;
  @Input('ngModel')
  password!:string;

  constructor(
    private userService:UserService
  ) { 
  }

  ngOnInit(): void {
  }

  fazerLogin(){
    console.log("Login Using",this.usuario,this.password);
    let user:User = new User();
    user.login = this.usuario;
    user.password = this.password;
    this.userService.login(user);
  }

}
