import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from 'src/config/formvalidator/form-validator';
import { Batch } from '../../model/batch';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  
  @Input()
  public batch!:Batch;
  public batchForm!:FormGroup;

  constructor() { 
    this.batch = new Batch
  }

  ngOnInit(): void {
    this.batchForm = new FormGroup({
      lote           : new FormControl('',[FormValidator.required,]),
      validade       : new FormControl('',[FormValidator.required,]),
      qtd_inicial    : new FormControl('',[FormValidator.required,]),
      qtd_disponivel : new FormControl('',[FormValidator.required,]),
    });
    
    this.batchForm.get('lote'           )?.setValue(this.batch.lote           );
    this.batchForm.get('validade'       )?.setValue(this.batch.validade       );
    this.batchForm.get('qtd_inicial'    )?.setValue(this.batch.qtd_inicial    );
    this.batchForm.get('qtd_disponivel' )?.setValue(this.batch.qtd_disponivel );

    this.batchForm.valueChanges.subscribe(
      (formValues) => {
        if(this.batch == null || this.batch == undefined){
          this.batch = new Batch;
        }
        this.batch.lote = formValues.lote;
        this.batch.validade = formValues.validade;
        this.batch.qtd_inicial = formValues.qtd_inicial;
        this.batch.qtd_disponivel = formValues.qtd_disponivel;
      }
    )
  }

  isNovo():boolean{
    return this.batch == null 
        || this.batch == undefined 
        || this.batch.id == null
        || this.batch.id == undefined
  }

}
