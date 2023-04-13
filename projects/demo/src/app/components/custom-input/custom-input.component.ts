import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { debounceTime, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CustomInputComponent extends NgDynamicJsonFormCustomComponent {
  formGroup = new FormGroup({
    control1: new FormControl(''),
    control2: new FormControl(''),
    control3: new FormControl(''),
  });

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(
        debounceTime(0),
        tap((x) => this.control?.setValue(x))
      )
      .subscribe();

      // Sync FormGroup status with FormControl
      this.control?.valueChanges.pipe(
        startWith(this.control.value),
        debounceTime(0),
        tap(x => {
          // Set emitEvent to false to prevent event trigger for formGroup.valueChanges
          if (this.control?.disabled) this.formGroup.disable({emitEvent: false});
          if (this.control?.enabled) this.formGroup.enable({emitEvent: false});
        })
      ).subscribe();
  }
}
