import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgDynamicJsonFormModule } from 'ng-dynamic-json-form';
import { JsonInputComponent } from './components/json-input/json-input.component';
import { NgDynamicJsonFormPrimeNgModule } from 'ng-dynamic-json-form/ui-primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsonInputComponent,
    NgDynamicJsonFormModule,
    NgDynamicJsonFormPrimeNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
