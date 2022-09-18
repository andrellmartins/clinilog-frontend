import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteDTO } from 'src/SystemModules/person/dto/clienteDTO';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from '../../../person/model/person';
import { PositionConstants } from 'src/config/constants/position.constants';
import { Pharma } from '../../../person/model/pharma';
import { Employee } from '../../../person/model/employee';
import { Doctor } from '../../../person/model/doctor';
import { HttpErrorResponse } from '@angular/common/http';
import { Position } from '../../../person/model/position';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../../../person/service/position.service';
import { UserService } from 'src/SystemModules/general/service/user.service';
import { PersonService } from '../../../person/service/person.service';
import { User } from 'src/SystemModules/general/model/user';
import { Patient } from '../../../person/model/patient';
import { FormValidator } from 'src/config/formvalidator/form-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public nrUsr!:number;
  public tpAcao!:string;

  ngOnInit(): void {
    let user:Person|null = UserService.getCurrentUser();
    if(user != null){
      this.nrUsr = user.id;
      this.tpAcao = 'visualizar';
    }
  }

  toggleFormAction(){
    if(this.tpAcao == 'visualizar'){
      this.tpAcao = 'editar'
    }else{
      this.tpAcao = 'visualizar'
    }
  }
  
  buttonFormActionText(){
    if(this.tpAcao == 'visualizar'){
      return 'Clique Para Editar';
    }else{
      return 'Clique Para Visualizar';
    }
  }

  
}
