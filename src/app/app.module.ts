//modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModulesRouterModule } from 'src/SystemModules/modules-router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppComponent } from './app.component';



//imports material
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralInterceptor } from 'src/config/interceptor/general.interceptor';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { SharedModule } from 'src/config/sharedmodules/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    ModulesRouterModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
