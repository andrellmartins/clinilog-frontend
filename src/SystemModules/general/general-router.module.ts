import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './service/user.service';
import { CadastroPessoasComponent } from '../person/component/cadastro-pessoas/cadastro-pessoas.component';
import { LoginComponent } from './component/login/login.component';
import { LoginContainerComponent } from './component/login-container/login-container.component';
import { SharedModule } from 'src/config/sharedmodules/shared.module';
import { InicioComponent } from './component/inicio/inicio.component';
import { ProductGridComponent } from '../product/component/product-grid/product-grid.component';
import { PersonGridComponent } from '../person/component/person-grid/person-grid.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CadastroProdutosComponent } from '../product/component/cadastro-produtos/cadastro-produtos.component';
import { PersonService } from '../person/service/person.service';
import { HomeComponent } from './component/home/home.component';
import { BatchComponent } from '../product/component/batch/batch.component';

@NgModule({
  providers:[
    UserService,
    PersonService
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    RouterModule,
    
  ],
  declarations: [
    CadastroPessoasComponent,
    LoginComponent,
    LoginContainerComponent,
    InicioComponent,
    ProductGridComponent,
    PersonGridComponent,
    NavbarComponent,
    CadastroProdutosComponent,
    HomeComponent,
    BatchComponent
  ]
})
export class GeneralRouterModule { }
