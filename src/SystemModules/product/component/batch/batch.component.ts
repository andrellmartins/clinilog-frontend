import { Component, Input, OnInit } from '@angular/core';
import { Batch } from '../../model/batch';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  
  @Input()
  public batch!:Batch;

  constructor() { 
    this.batch = new Batch
  }

  ngOnInit(): void {
  }

  isNovo():boolean{
    return this.batch == null 
        || this.batch == undefined 
        || this.batch.id == null
        || this.batch.id == undefined
  }

}