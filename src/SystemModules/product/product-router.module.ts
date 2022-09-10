import { NgModule } from '@angular/core';
import { GeneralRouterModule } from '../general/general-router.module';
import { SharedModule } from 'src/config/sharedmodules/shared.module';
import { Routes } from '@angular/router';
import { ProductGridComponent } from './component/product-grid/product-grid.component';
import { CadastroProdutosComponent } from './component/cadastro-produtos/cadastro-produtos.component';

export const productRoutes:Routes = [
  {
    path:'',
    component:ProductGridComponent,
  },
  {
    path:'cadastro',
    component:CadastroProdutosComponent,
  }
]

@NgModule({
  imports: [
    GeneralRouterModule,
    SharedModule
  ],
  exports: [
  ],
  declarations: [
  ]
})
export class ProductRouterModule{ 
  
}
