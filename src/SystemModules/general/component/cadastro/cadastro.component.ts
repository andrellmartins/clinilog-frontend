import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from 'src/config/formvalidator/form-validator';
import { ClienteDTO } from 'src/SystemModules/person/dto/clienteDTO';
import { Employee } from 'src/SystemModules/person/model/employee';
import { Patient } from 'src/SystemModules/person/model/patient';
import { Person } from 'src/SystemModules/person/model/person';
import { Position } from 'src/SystemModules/person/model/position';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  clienteDTO!:ClienteDTO;
  clienteDTOForm!:FormGroup;

  @Input() nrUsr?: number;

  constructor(
    private userService:UserService
  ) { 
    this.iniciarVariaveis();
    this.iniciarFormValidator();
  }

  ngOnInit(): void {
  }

  fazerCadastro(){

  }
  
  consultarUsuario(){
    if(this.nrUsr != null)
      this.userService.consultarUsuario(this.nrUsr).subscribe(
        (e:ClienteDTO) => {
          this.clienteDTO = e;
        }
      );
  }

  iniciarVariaveis(){
    this.clienteDTO = new ClienteDTO();
    this.clienteDTO.employee = new Employee;
    this.clienteDTO.employee.cargo = new Position;
    this.clienteDTO.employee.cargo.cargo = '';
    this.clienteDTO.employee.cargo.id = 0;  
    this.clienteDTO.patient = new Patient;
    this.clienteDTO.person = new Person;
    this.clienteDTO.person.cpf = '';
  }
  iniciarFormValidator(){
    this.clienteDTOForm = new FormGroup({
      person_nome : new FormControl(
        this.clienteDTO.person.nome,
          [
            FormValidator.required,
          ]
        ),
      person_cpf : new FormControl(
        this.clienteDTO.person.cpf,
          [
            FormValidator.required,
            FormValidator.cpf,
          ]
        ),
      person_ender : new FormControl(
        this.clienteDTO.person.ender,
          [
            FormValidator.required,
          ]
        ),
      person_cep : new FormControl(
        this.clienteDTO.person.cep,
          [
            FormValidator.required,
          ]
        ),
      person_data_nasc : new FormControl(
        this.clienteDTO.person.data_nasc,
          [
            FormValidator.required,
          ]
        ),
      person_sexo : new FormControl(
        this.clienteDTO.person.sexo,
          [
            FormValidator.required,
          ]
        ),
      employee_salario : new FormControl(
        this.clienteDTO.employee.salario,
          [
            FormValidator.required,
          ]
        ),
      employee_pis : new FormControl(
        this.clienteDTO.employee.pis,
          [
            FormValidator.required,
          ]
        ),
      employee_cargo_cargo : new FormControl(
        this.clienteDTO.employee.cargo.cargo,
          [
            FormValidator.required,
          ]
        ),
    });
  }

  isExternalRequest():boolean{
    try{
      return UserService.getCurrentUser().id == null
    }catch(e){
      console.log( e )
    }
    return true
  }
  
  isEditing():boolean{
    return this.nrUsr != null;
  }


}
