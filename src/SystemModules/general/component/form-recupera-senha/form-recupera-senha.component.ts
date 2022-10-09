import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-form-recupera-senha',
  templateUrl: './form-recupera-senha.component.html',
  styleUrls: ['./form-recupera-senha.component.css']
})
export class FormRecuperaSenhaComponent implements OnInit {
  
  @ViewChild("swalService")
  swalService!:SwalComponent;
  email!:string;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
  }

  enviarEmail(){
    this.userService.emailRecuperaSenha(this.email)
    .subscribe({
      next:() =>{
        this.swalService.titleText = "Email enviado com sucesso";
        this.swalService.text = "Email enviado para "+ this.email + ".\n Acesse para recuperar a senha.";
        this.swalService.icon = "success";
        this.onCloseModal = () => {}
        this.swalService.fire()
      },
      error:(err:Error) => {
        this.swalService.titleText = "Erro ao Solicitar Senha";
        this.swalService.text = "Erro: "+ err.message;
        this.swalService.icon = "error";
        this.onCloseModal = () => {}
        this.swalService.fire()
      }
    });
  }

  onCloseModal = () => {
  }

}
