import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { debounceTime, tap, startWith } from 'rxjs';

@Component({
  selector: 'app-custom-input-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-input-group.component.html',
  styleUrls: ['./custom-input-group.component.scss'],
})
export class CustomInputGroupComponent extends NgDynamicJsonFormCustomComponent {
  formGroup = new FormGroup({
    control1: new FormControl(''),
    control2: new FormControl(''),
    control3: new FormControl(''),
  });

  override ngOnInit(): void {
    super.ngOnInit();
    this.formGroup.valueChanges
      .pipe(
        debounceTime(0),
        tap((x) => this.control?.setValue(x))
      )
      .subscribe();

    // Sync FormGroup status with FormControl
    this.control?.valueChanges
      .pipe(
        startWith(this.control.value),
        debounceTime(0),
        tap((x) => {
          // Set emitEvent to false to prevent event trigger for formGroup.valueChanges
          if (this.control?.disabled)
            this.formGroup.disable({ emitEvent: false });
          if (this.control?.enabled)
            this.formGroup.enable({ emitEvent: false });
        })
      )
      .subscribe();
  }
}
