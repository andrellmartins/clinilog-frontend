import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from './service/person.service';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { GeneralRouterModule } from '../general/general-router.module';
import { PersonGridComponent } from './component/person-grid/person-grid.component';
import { Routes } from '@angular/router';
import { CadastroPessoasComponent } from './component/cadastro-pessoas/cadastro-pessoas.component';


export const personRoutes: Routes = [
  {
    path:'',
    component:PersonGridComponent,
  },
  {
    path:'cadastrar',
    component:CadastroPessoasComponent
  }
];

@NgModule({
  providers:[
    PersonService,
    HttpClientService,
  ],
  declarations: [],
  imports: [
    CommonModule,
    GeneralRouterModule
  ]
})
export class PersonRouterModule { }
