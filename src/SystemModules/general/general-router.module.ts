import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './service/user.service';
import { CadastroComponent } from './component/cadastro/cadastro.component';
import { LoginComponent } from './component/login/login.component';
import { LoginContainerComponent } from './component/login-container/login-container.component';
import { SharedModule } from 'src/config/sharedmodules/shared.module';
import { InicioComponent } from './component/inicio/inicio.component';
import { ProductGridComponent } from '../product/component/product-grid/product-grid.component';
import { NavbarComponent } from 'src/SystemModules/general/component/navbar/navbar.component';



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
        component:CadastroComponent
      },
    ]
  },
  {
    path:'inicio',
    component:InicioComponent, 
    //canActivate:['funcionario']
  },
  {
    path:'produtos',
    component:ProductGridComponent
  }
];

@NgModule({
  providers:[
    UserService,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    
    
  ],
  exports: [
    RouterModule,
    
  ],
  declarations: [
    CadastroComponent,
    LoginComponent,
    LoginContainerComponent,
    InicioComponent,
    ProductGridComponent,
    NavbarComponent,
  ]
})
export class GeneralRouterModule { }
