import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from './service/person.service';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { GeneralRouterModule } from '../general/general-router.module';



@NgModule({
  providers:[
    PersonService,
    HttpClientService
  ],
  declarations: [],
  imports: [
    CommonModule,
    GeneralRouterModule
  ]
})
export class PersonRouterModule { }
