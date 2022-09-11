import { HttpErrorResponse, HttpEventType, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("swalService")
  swalService!:SwalComponent;
  usuario!:User;

  constructor(
    private userService:UserService
  ) { 
    this.usuario = new User;
  }

  ngOnInit(): void {
  }

  fazerLogin(){
    this.userService.login(this.usuario)
    .subscribe({
      next:(user:any) => {
        this.swalService.titleText = 'Login feito com sucesso';
        this.swalService.text = user.firstName;
        this.swalService.icon = "success";
        
        this.onCloseModal = () => {
          window.location.href = '/inicio';
        }

        this.swalService.fire();
      },
      error:(err:HttpErrorResponse)=>{
        this.swalService.titleText = 'Erro ao Fazer Login'
        let mensagem = err.message;

        if(err.status === HttpStatusCode.Forbidden) {
          mensagem = "Não foi possível fazer Login, usuário ou senha incorretos";
        }

        this.swalService.text = `${err.status}: ${mensagem}`
        this.swalService.icon = "error"
        this.swalService.fire();

        this.onCloseModal = () => {
        }
      }
    });
  }

  onCloseModal = () => {
  }

} 
