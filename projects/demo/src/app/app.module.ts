import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgDynamicJsonFormModule } from 'ng-dynamic-json-form';
import { JsonInputComponent } from './components/json-input/json-input.component';
import { NgDynamicJsonFormPrimeNgModule } from 'ng-dynamic-json-form/ui-primeng';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    JsonInputComponent,
    NgDynamicJsonFormModule,
    NgDynamicJsonFormPrimeNgModule,
    CheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
