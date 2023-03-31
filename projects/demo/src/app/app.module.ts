import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgDynamicJsonFormModule } from 'ng-dynamic-json-form';
import { JsonInputComponent } from './components/json-input/json-input.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsonInputComponent,
    NgDynamicJsonFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
