import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRouterModule, productRoutes } from './product/product-router.module';
import { PersonRouterModule, personRoutes } from './person/person-router.module';
import { GeneralRouterModule } from './general/general-router.module';
import { LoginContainerComponent } from './general/component/login-container/login-container.component';
import { LoginComponent } from './general/component/login/login.component';
import { CadastroPessoasComponent } from './person/component/cadastro-pessoas/cadastro-pessoas.component';
import { InicioComponent } from './general/component/inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './general/component/home/home.component';
import { ProfileComponent } from './general/component/profile/profile.component';
import { RecuperacaoSenhaComponent } from './general/component/recuperacao-senha/recuperacao-senha.component';
import { FormRecuperaSenhaComponent } from './general/component/form-recupera-senha/form-recupera-senha.component';
import { ProductMovementReportComponent } from './product/component/product-movement-report/product-movement-report.component';
import { SharedModule } from 'src/config/sharedmodules/shared.module';

const routes: Routes = [
  {
    path:'',
    component:LoginContainerComponent,
    children:[
      {
        path:'',
        component:LoginComponent
      },
      {
        path:'cadastro',
        component:CadastroPessoasComponent
      },
      {
        path:'solicitar-recuperacao-senha',
        component:FormRecuperaSenhaComponent
      },
      {
        path:'recuperacao-senha/:nrUsr',
        component:RecuperacaoSenhaComponent
      }
    ]
  },
  {
    path:'inicio',
    component:InicioComponent,
    children:[
      {
        path:'',
        component:ProductMovementReportComponent,
      },
      {
        path:'produtos',
        children:productRoutes
      },
      {
        path:"pessoas",
        children:personRoutes
      },
      {
        path:'profile',
        component:ProfileComponent
      }
    ]
  }

];

@NgModule({
  exports:[
    CommonModule,
  ],
  declarations: [
    ProductMovementReportComponent
  ],
  imports:[
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
    GeneralRouterModule,
    ProductRouterModule,
    PersonRouterModule,
  ]

})
export class ModulesRouterModule { 
  
}
