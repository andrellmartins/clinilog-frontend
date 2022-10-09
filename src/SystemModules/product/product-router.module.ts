import { NgModule } from '@angular/core';
import { GeneralRouterModule } from '../general/general-router.module';
import { SharedModule } from 'src/config/sharedmodules/shared.module';
import { Routes } from '@angular/router';
import { ProductGridComponent } from './component/product-grid/product-grid.component';
import { CadastroProdutosComponent } from './component/cadastro-produtos/cadastro-produtos.component';
import { CommonModule } from '@angular/common';
import { ProductMovementReportComponent } from './component/product-movement-report/product-movement-report.component';

export const productRoutes:Routes = [
  {
    path:'',
    component:ProductGridComponent,
  },
  {
    path:'cadastro',
    component:CadastroProdutosComponent,
  },
  {
    path:'cadastro/:tpAcao/:idProduto',
    component:CadastroProdutosComponent,
  }
]

@NgModule({
  imports: [
    GeneralRouterModule,
    SharedModule,
    CommonModule
  ],
  exports: [
  ],
  declarations: []
})
export class ProductRouterModule{ 
  
}
