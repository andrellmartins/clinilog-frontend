import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Position } from '../../model/position';
import { PositionService } from '../../service/position.service';

@Component({
  selector: 'app-cadastro-permissoes',
  templateUrl: './cadastro-permissoes.component.html',
  styleUrls: ['./cadastro-permissoes.component.css']
})
export class CadastroPermissoesComponent implements OnInit {

  public cargos!:Position[];

  public cargoColumns = [
    'cargo',
    'acesso_modulo_pessoas',
    'acesso_modulo_estoque',
  ];

  constructor(
    private positionService:PositionService,
  ) { 
    
  }

  ngOnInit(): void {
    this.positionService.consultarCargos().subscribe({next:(cargos => {
      this.cargos = cargos;
    })})
  }

  mudarAcessoCargo(idCargo:number, campo:string, newValue:boolean){
    this.positionService.atualizarPermissaoCargos(
      idCargo, campo, newValue
    ).subscribe({
      next:() => {
        console.log('funcionou')
      },
      error:() => {
        console.log("Nope")
      },
      complete:() => {
        console.log("terminou :D")
      }
    })
  }

}
