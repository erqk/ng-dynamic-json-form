import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JsonInputComponent } from './components/json-input/json-input.component';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    JsonInputComponent,
    FormWrapperComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
