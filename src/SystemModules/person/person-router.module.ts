import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from './service/person.service';
import { HttpClientService } from 'src/config/httpclient/http.client.service';



@NgModule({
  providers:[
    PersonService,
    HttpClientService
  ],
  declarations: [],
  imports: [
    CommonModule,
  ],

})
export class PersonRouterModule { }
