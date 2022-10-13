import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from './service/person.service';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { GeneralRouterModule } from '../general/general-router.module';
import { PersonGridComponent } from './component/person-grid/person-grid.component';
import { Routes } from '@angular/router';
import { CadastroPessoasComponent } from './component/cadastro-pessoas/cadastro-pessoas.component';
import { SharedModule } from 'src/config/sharedmodules/shared.module';
import { CadastroPermissoesComponent } from './component/cadastro-permissoes/cadastro-permissoes.component';


export const personRoutes: Routes = [
  {
    path:'',
    component:PersonGridComponent,
  },
  {
    path:'cadastrar',
    component:CadastroPessoasComponent
  },
  {
    path:'permissoes',
    component:CadastroPermissoesComponent
  },
  {
    path:'cadastrar/:acao/:nrUsr',
    component:CadastroPessoasComponent
  }
  
];

@NgModule({
  providers:[
    PersonService,
    HttpClientService,
  ],
  declarations: [
    CadastroPermissoesComponent
  ],
  imports: [
    CommonModule,
    GeneralRouterModule,
    SharedModule
  ]
})
export class PersonRouterModule { }
