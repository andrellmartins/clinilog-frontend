import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit, AfterContentChecked, ViewChild } from '@angular/core';
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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit, AfterContentChecked {
  //DTOS && Forms
  clienteDTO!:Person;
  clienteDTOForm!:FormGroup;
  
  //Data From URL
  nrUsr!: number;
  tpAcao!: string;

  //Input View
  @ViewChild("swalService") swalService!:SwalComponent;

  //Attributes
  positionsList!:Position[];

  //semaforos
  formFullyLoaded:boolean = false;

  constructor(
    private userService:UserService,
    private personService:PersonService,
    private positionService:PositionService,
    private route: ActivatedRoute,
  ) { 
    this.iniciarVariaveis();
    this.iniciarFormValidator();
  }

  ngOnInit(): void {
      this.consultarCargos()
  }

  ngAfterContentChecked():void {
    if(this.formFullyLoaded === false){
      this.consultarUsuario();
      this.formFullyLoaded = true;
    }
  }

  fazerCadastro(){
    this.personService.cadastrarUsuario(this.clienteDTO)
    .subscribe({
      next:(person:Person) => {
        this.swalService.titleText = "Sucesso";
        this.swalService.icon = "success";
        if(this.isExternalRequest()){
          this.swalService.text = "Bem vindo ao CliniLog " + person.nome + " !";
          this.swalServiceClose = () => {
            window.location.href = '';
          }
        }else{
          this.swalService.text = this.tpAcao + " Bem sucedida";
          this.swalServiceClose = () => {
            window.location.href = '/inicio/pessoas';
          }
        }
        this.swalService.fire();
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        this.swalService.titleText = "Erro Ao Consultar Pessoa"
        this.swalService.text = `${err.error.error} : ${err.error.message} \n `
        this.swalService.icon = "error"
        this.swalService.fire();
      }
    });
  }
  
  editarCadastro(){
    this.personService.editarUsuario(this.clienteDTO)
    .subscribe({
      next:(person:Person) => {
        this.swalService.titleText = "Sucesso ao Editar";
        this.swalService.text = "Pessoa " + person.nome + " Editada com Sucesso";
        this.swalService.icon = "success";
        this.swalServiceClose = () => {}
        this.swalService.fire();
      }
    });
  }
  
  consultarUsuario(){
    this.route.paramMap.subscribe({
      next:(params) => {
        console.log(params)
        const nrUsrParam = params.get('nrUsr');
        const tpAcaoParam = params.get('acao');
        if(  nrUsrParam != null && typeof nrUsrParam !== 'undefined'
          && tpAcaoParam != null && typeof tpAcaoParam !== 'undefined'
        ){
          this.nrUsr  = Number.parseInt(nrUsrParam)
          this.tpAcao = tpAcaoParam;
          
          this.personService.consultaPessoa(this.nrUsr).subscribe({
            next: (e:Person) => {
              console.log(JSON.stringify(e));
              
              this.carregarPessoaInForm(e);
              this.validarAcaoForm();

              this.swalService.titleText = "Pessoa Carregada com Sucesso!";
              this.swalService.text = "";
              this.swalService.icon = "success";
              this.swalService.fire();
            },
            error: (err:HttpErrorResponse) => {
              this.swalService.titleText = "Erro Ao Consultar Pessoa"
              this.swalService.text = `${err.error.error} : ${err.error.message} \n `
              this.swalService.icon = "error"
              this.swalService.fire();
            }
          });
        }
      }
    });
    
  }

  consultarCargos(){
    return this.positionService.consultarCargos()
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
        if(currentClienteDTOForm?.tipo_usuario == 'funcionario'){
          this.clienteDTO.paciente = undefined;
          if(this.clienteDTO.employee === undefined){
            this.clienteDTO.employee = new Employee;
          }
          this.clienteDTO.employee.salario =  currentClienteDTOForm?.employee_salario;
          this.clienteDTO.employee.pis     =  currentClienteDTOForm?.employee_pis;
          this.clienteDTO.employee.cargo   =  currentClienteDTOForm?.employee_cargo;
          
          if(this.isMedic()){
            if(this.clienteDTO.employee.medico === undefined){
              this.clienteDTO.employee.medico = new Doctor;
            }
            this.clienteDTO.employee.medico = new Doctor;
            this.clienteDTO.employee.medico.crm    =  currentClienteDTOForm?.medic_crm;
            this.clienteDTO.employee.medico.crm_uf =  currentClienteDTOForm?.medic_crm_uf;
          }else{
            this.clienteDTO.employee.medico = undefined;
          }
  
          if(this.isPharma()){
            if(this.clienteDTO.employee.farma === undefined){
              this.clienteDTO.employee.farma = new Pharma;
            }
            this.clienteDTO.employee.farma.crf     =  currentClienteDTOForm?.pharma_crf;
            this.clienteDTO.employee.farma.crf_uf  =  currentClienteDTOForm?.pharma_crf_uf;
          }else{
            this.clienteDTO.employee.farma = undefined;
          }
        }else{
          this.clienteDTO.employee = undefined;
        }
    });
  }

  isExternalRequest():boolean{
    try{
      return UserService.getCurrentUser() == null
    }catch(e){
      console.log(e)
    }
    return true
  }
  
  isEditing():boolean{
    return this.nrUsr != null;
  }

  isMedic():boolean{
    return typeof this.clienteDTO.employee != 'undefined' && this.clienteDTO.employee.cargo.id == PositionConstants.MEDIC_ID;
  }
  
  isPharma():boolean{
    return typeof this.clienteDTO.employee != 'undefined' && this.clienteDTO.employee.cargo.id == PositionConstants.PHARMA_ID;
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

  carregarPessoaInForm(clienteDTOLoad:Person) {

    this.clienteDTO.id = clienteDTOLoad.id;
    this.clienteDTOForm.get("person_nome")?.setValue(clienteDTOLoad.nome);
    this.clienteDTOForm.get("person_cpf")?.setValue(clienteDTOLoad.cpf);
    this.clienteDTOForm.get("person_ender")?.setValue(clienteDTOLoad.ender);
    this.clienteDTOForm.get("person_cep")?.setValue(clienteDTOLoad.cep);
    this.clienteDTOForm.get("person_data_nasc")?.setValue(clienteDTOLoad.data_nasc);
    this.clienteDTOForm.get("person_sexo")?.setValue(clienteDTOLoad.sexo);

    if(clienteDTOLoad.usuario != null){
      this.clienteDTO.usuario.id = clienteDTOLoad.usuario.id;
      this.clienteDTOForm.get("user_login")?.setValue(clienteDTOLoad.usuario.login);
      this.clienteDTOForm.get("user_password")?.setValue("");
      this.clienteDTOForm.get("user_password_confirmation")?.setValue("");
      this.clienteDTOForm.get("tipo_usuario")?.setValue(typeof clienteDTOLoad.employee !== 'undefined' ? 'funcionario' : 'paciente' );
    }

    if(typeof clienteDTOLoad.employee !== 'undefined'){
      this.clienteDTO.employee = new Employee;
      this.clienteDTO.employee.id = clienteDTOLoad.employee.id;
      this.clienteDTOForm.get("employee_salario")?.setValue(clienteDTOLoad.employee.salario);
      this.clienteDTOForm.get("employee_pis")?.setValue(clienteDTOLoad.employee.pis);
      this.clienteDTOForm.get("employee_cargo")?.setValue(
        this.positionsList.filter(e=>typeof clienteDTOLoad.employee !== 'undefined' && e.id==clienteDTOLoad.employee.cargo.id)[0]
      );
  
      if(clienteDTOLoad.employee.cargo.id === PositionConstants.MEDIC_ID && typeof clienteDTOLoad.employee.medico !== 'undefined'){
        this.clienteDTO.employee.medico = new Doctor;
        this.clienteDTO.employee.medico.id = clienteDTOLoad.employee.medico.id;
        this.clienteDTOForm.get("medic_crm")?.setValue(clienteDTOLoad.employee.medico.crm);
        this.clienteDTOForm.get("medic_crm_uf")?.setValue(clienteDTOLoad.employee.medico.crm_uf);
      }
  
      if(clienteDTOLoad.employee.cargo.id === PositionConstants.PHARMA_ID && typeof clienteDTOLoad.employee.farma !== 'undefined'){
        this.clienteDTO.employee.farma = new Pharma;
        this.clienteDTO.employee.farma.id = clienteDTOLoad.employee.farma.id;
        this.clienteDTOForm.get("pharma_crf")?.setValue(clienteDTOLoad.employee.farma.crf);
        this.clienteDTOForm.get("pharma_crf_uf")?.setValue(clienteDTOLoad.employee.farma.crf_uf);
      }
    }

  }

  isVisualizar(){
    return this.tpAcao == 'visualizar';
  }

  validarAcaoForm = () => {
    if(this.isVisualizar()){
      this.clienteDTOForm.disable()
    }
  }

  swalServiceClose = () => {};

}
