import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormValidator } from 'src/config/formvalidator/form-validator';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-recuperacao-senha',
  templateUrl: './recuperacao-senha.component.html',
  styleUrls: ['./recuperacao-senha.component.css']
})
export class RecuperacaoSenhaComponent implements OnInit {

  @ViewChild("swalService")
  swalService!:SwalComponent;
  recuperaSenhaForm!:FormGroup;
  user!:User;

  nrUsr!:number;

  constructor(
    private userService:UserService,
    private route          :  ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.recuperaSenhaForm = new FormGroup({
      password:new FormControl('', [FormValidator.required]),
      confirm_password: new FormControl('', [FormValidator.required])
    });

    this.route.paramMap.subscribe({
      next:(params:ParamMap) => {
        console.log(params);
        const nrUsrParam:string|null = params.get('nrUsr');
        if(nrUsrParam == null ){
          return;
        }
        const nrUsrParamNumber:number = Number.parseInt(nrUsrParam);
        if(isNaN(nrUsrParamNumber)){
          return;
        }
        this.nrUsr = nrUsrParamNumber;
      },
    })
  }

  validaSenhaIgual = ():boolean => {
    if(this.recuperaSenhaForm == null){
      return true;
    }
    const senha            : string|null  = this.recuperaSenhaForm.get('password')?.value,
          confirmSenha     : string|null  = this.recuperaSenhaForm.get('confirm_password')?.value,
          isSenhaDiferente : boolean      = senha != null || confirmSenha != null || senha != confirmSenha;
    this.recuperaSenhaForm.get('confirmSenha')?.setErrors(
      !isSenhaDiferente ? null : {senhasDiferentes:true}
    )
    return isSenhaDiferente;
  }

  recuperarSenha(){
    this.userService.alterarSenha(
      this.nrUsr, 
      this.recuperaSenhaForm.get('password')?.value
    ).subscribe({
      next:(senhaAlterada:boolean) => {
        if(senhaAlterada){
          this.swalService.titleText = "Senha Alterada com Sucesso"
          this.swalService.text = "Ao fechar a mensagem, você será redirecionado para o login."
          this.swalService.icon = 'success'
          this.onCloseModal = () => {
            window.location.href = '/';
          }
          this.swalService.fire();
        }else{
          throw new Error("Não foi possível Alterar a Senha.")
        }
      },
      error:(error:Error) => {
        this.swalService.titleText = "Não foi possível alterar a senha."
          this.swalService.text = "O sistema não conseguiu altera a sua senha. Erro:"+error.message
          this.swalService.icon = 'error'
          this.onCloseModal = () => {}
          this.swalService.fire();
      }
    })
  }

  consultarIdUsuario(){
    this.route.paramMap.subscribe({
      next:(params) => {
        const nrUsrParam = params.get('nrUsr');
        if(  nrUsrParam != null && typeof nrUsrParam !== 'undefined'
        ){
          this.nrUsr = Number.parseInt(nrUsrParam);
        }
      }
    });
  }

  onCloseModal:Function = () => {};

}
