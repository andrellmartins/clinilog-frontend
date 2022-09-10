//modules
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModulesRouterModule } from 'src/SystemModules/modules-router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppComponent } from './app.component';

//imports material
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralInterceptor } from 'src/config/interceptor/general.interceptor';
import { FormsModule } from '@angular/forms';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/config/sharedmodules/shared.module';
import { MainComponentComponent } from './src/SystemModules/person/component/main.component/main.component.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
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
