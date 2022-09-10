import { NgModule } from '@angular/core';
import { GeneralRouterModule } from '../general/general-router.module';
import { SharedModule } from 'src/config/sharedmodules/shared.module';



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
