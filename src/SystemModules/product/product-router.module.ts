import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductGridComponent } from './component/product-grid/product-grid.component';


const routes: Routes = [
  {
    path:'product',
    component:ProductGridComponent,
    canActivateChild:[],
    children:[
      {
        path:'',
        component:ProductGridComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class ProductRouterModule{ 
  
}
