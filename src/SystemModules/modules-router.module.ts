import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRouterModule } from './product/product-router.module';
import { PersonRouterModule } from './person/person-router.module';
import { GeneralRouterModule } from './general/general-router.module';


@NgModule({
  exports:[
    CommonModule,
  ],
  imports:[
    GeneralRouterModule,
    ProductRouterModule,
    PersonRouterModule,
  ]

})
export class ModulesRouterModule { 
  
}
