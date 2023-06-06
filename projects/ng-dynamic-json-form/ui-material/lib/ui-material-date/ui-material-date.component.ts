import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { merge } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'ui-material-date',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './ui-material-date.component.html',
  styles: [],
})
export class UiMaterialDateComponent extends NgDynamicJsonFormCustomComponent {
  private locale = inject(LOCALE_ID);

  dateControl = new FormControl('');

  override ngOnInit(): void {
    super.ngOnInit();
    this.bindControl();
  }

  private bindControl(): void {
    if (!this.control) return;

    const statusChanges$ = this.control.statusChanges.pipe(
      startWith(this.control.status),
      tap((x) => {
        if (x === 'DISABLED') this.dateControl.disable({ emitEvent: false });
        else this.dateControl.enable({ emitEvent: false });
      })
    );

    const writeValue$ = this.dateControl.valueChanges.pipe(
      startWith(this.dateControl.value),
      tap((x) => {
        if (!x) return;

        const outputFormat = this.data?.extra?.date?.outputFormat;
        const date = outputFormat
          ? formatDate(x, outputFormat, this.locale)
          : x;
        this.control?.setValue(date);
      })
    );

    merge(statusChanges$, writeValue$).subscribe();
  }
}
