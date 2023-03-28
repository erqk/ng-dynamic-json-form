import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JsonInputComponent } from './components/json-input/json-input.component';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from './components/form-control/form-control.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    JsonInputComponent,
    FormWrapperComponent,
    FormControlComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
