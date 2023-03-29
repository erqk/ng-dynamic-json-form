import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JsonInputComponent } from './components/json-input/json-input.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from './components/form-control/form-control.component';
import { DynamicFormGeneratorComponent } from './components/dynamic-form-generator/dynamic-form-generator.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    JsonInputComponent,
    FormGroupComponent,
    FormControlComponent,
    DynamicFormGeneratorComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
