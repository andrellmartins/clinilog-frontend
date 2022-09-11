import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PositionConstants } from 'src/config/constants/position.constants';
import { FormValidator } from 'src/config/formvalidator/form-validator';
import { User } from 'src/SystemModules/general/model/user';
import { ClienteDTO } from 'src/SystemModules/person/dto/clienteDTO';
import { Doctor } from 'src/SystemModules/person/model/doctor';
import { Employee } from 'src/SystemModules/person/model/employee';
import { Patient } from 'src/SystemModules/person/model/patient';
import { Person } from 'src/SystemModules/person/model/person';
import { Pharma } from 'src/SystemModules/person/model/pharma';
import { Position } from 'src/SystemModules/person/model/position';
import { PersonService } from 'src/SystemModules/person/service/person.service';
import { PositionService } from 'src/SystemModules/person/service/position.service';
import { UserService } from '../../../general/service/user.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {
  //DTOS && Forms
  clienteDTO!:Person;
  clienteDTOForm!:FormGroup;
  
  //Input Data
  @Input() nrUsr?: number;

  //Input View
  @ViewChild("swalService") swalService!:SwalComponent;

  //Attributes
  positionsList!:Position[];

  constructor(
    private userService:UserService,
    private personService:PersonService,
    private positionService:PositionService,
  ) { 
    this.iniciarVariaveis();
    this.iniciarFormValidator();
  }

  ngOnInit(): void {
    this.consultarCargos();
  }

  fazerCadastro(){
    this.personService.cadastrarUsuario(this.clienteDTO)
    .subscribe({
      next:(person:Person) => {
        this.swalService.titleText = "Sucesso ao Cadastrar";
        this.swalService.text = "Bem vindo ao CliniLog " + person.nome + " !";
        this.swalService.icon = "success";
        this.swalServiceClose = () => {
          window.location.href = '';
        }
        this.swalService.fire();

      }
    });
  }
  
  consultarUsuario(){
    if(this.nrUsr != null)
      this.userService.consultarUsuario(this.nrUsr).subscribe(
        (e:Person) => {
          this.clienteDTO = e;
        }
      );
  }

  consultarCargos(){
    this.positionService.consultarCargos()
    .subscribe({
      next: (positionsList:Position[]) => {
        this.positionsList = positionsList;
      },
      error: (err:HttpErrorResponse) => {
        this.positionsList = [];
        this.swalService.titleText = "Erro Ao Consultar Cargos"
        this.swalService.text = `${err.error.error} : ${err.error.message} \n `
        this.swalService.icon = "error"
        this.swalService.fire();
      }
    })
  }

  iniciarVariaveis(){
    this.clienteDTO = new Person();
    this.clienteDTO.usuario = new User();
    this.clienteDTO.employee = new Employee;
    this.clienteDTO.employee.medico = new Doctor;
    this.clienteDTO.employee.farma  = new Pharma;
    this.clienteDTO.employee.cargo = new Position;
    this.clienteDTO.employee.cargo.cargo = '';
    this.clienteDTO.employee.cargo.id = 0;  
    this.clienteDTO.paciente = new Patient;
    this.clienteDTO.cpf = '';
  }
  iniciarFormValidator(){
    this.clienteDTOForm = new FormGroup({
      person_nome :       new FormControl('',[FormValidator.required,]),
      person_cpf :        new FormControl('',
        [ FormValidator.required,
          FormValidator.cpf, ]),
      person_ender :      new FormControl('',[FormValidator.required,]),
      person_cep :        new FormControl('',[FormValidator.required,]),
      person_data_nasc :  new FormControl('',[FormValidator.required,]),
      person_sexo :       new FormControl('',[FormValidator.required,]),
      
      user_login :                  new FormControl('',[FormValidator.required,]),
      user_password :               new FormControl('',[FormValidator.required,]),
      user_password_confirmation :  new FormControl('',[FormValidator.required,]),
      
      tipo_usuario:       new FormControl('',[FormValidator.required,]),
      employee_salario :  new FormControl('',[FormValidator.required,]),
      employee_pis :      new FormControl('',[FormValidator.required,]),
      employee_cargo :    new FormControl('',[FormValidator.required,]),
      medic_crm :         new FormControl('',[FormValidator.required,]),
      medic_crm_uf :      new FormControl('',[FormValidator.required,]),
      pharma_crf :         new FormControl('',[FormValidator.required,]),
      pharma_crf_uf :      new FormControl('',[FormValidator.required,]),
    });

    this.clienteDTOForm.valueChanges
    .subscribe((currentClienteDTOForm:any) => {
        this.clienteDTO.nome             =  currentClienteDTOForm?.person_nome;
        this.clienteDTO.cpf              =  currentClienteDTOForm?.person_cpf;
        this.clienteDTO.ender            =  currentClienteDTOForm?.person_ender;
        this.clienteDTO.cep              =  currentClienteDTOForm?.person_cep;
        this.clienteDTO.data_nasc        =  currentClienteDTOForm?.person_data_nasc;
        this.clienteDTO.sexo             =  currentClienteDTOForm?.person_sexo;
        
        this.clienteDTO.usuario.login    =  currentClienteDTOForm?.user_login;
        this.clienteDTO.usuario.password =  currentClienteDTOForm?.user_password;
        
        this.clienteDTO.employee.salario =  currentClienteDTOForm?.employee_salario;
        this.clienteDTO.employee.pis     =  currentClienteDTOForm?.employee_pis;
        this.clienteDTO.employee.cargo   =  currentClienteDTOForm?.employee_cargo;
        if(this.isMedic()){
          this.clienteDTO.employee.medico.crm    =  currentClienteDTOForm?.medic_crm;
          this.clienteDTO.employee.medico.crm_uf =  currentClienteDTOForm?.medic_crm_uf;
        }
        if(this.isPharma()){
          this.clienteDTO.employee.farma.crf     =  currentClienteDTOForm?.pharma_crf;
          this.clienteDTO.employee.farma.crf_uf  =  currentClienteDTOForm?.pharma_crf_uf;
        }
    });
  }

  isExternalRequest():boolean{
    try{
      return UserService.getCurrentUser().id == null
    }catch(e){
      console.log(e)
    }
    return true
  }
  
  isEditing():boolean{
    return this.nrUsr != null;
  }

  isMedic():boolean{
    return this.clienteDTO.employee.cargo.id == PositionConstants.MEDIC_ID;
  }
  
  isPharma():boolean{
    return this.clienteDTO.employee.cargo.id == PositionConstants.PHARMA_ID;
  }

  isSenhaSenhaDiferente = ():boolean => {
    if(this.clienteDTOForm == null){
      return false
    }
    const senhasDiferentes = this.clienteDTOForm.get('user_password')?.value !== '' 
      && this.clienteDTOForm.get('user_password_confirmation')?.value !== '' 
      && this.clienteDTOForm.get('user_password')?.value !== this.clienteDTOForm.get('user_password_confirmation')?.value

    this.clienteDTOForm.get('user_password_confirmation')?.setErrors(
      !senhasDiferentes ? null : {senhasDiferentes:true}
    )
    
    return senhasDiferentes;

  }

  swalServiceClose = () => {};

}
