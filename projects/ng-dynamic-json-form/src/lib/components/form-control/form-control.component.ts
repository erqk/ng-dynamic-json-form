import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  Observable,
  debounceTime,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { NgDynamicJsonFormConfig } from '../../models/form-control-config.model';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormControlComponent {
  @Input() data: NgDynamicJsonFormConfig | null = null;
  @Input() control: UntypedFormControl | null = null;

  errors$?: Observable<string[]>;

  ngOnInit(): void {
    this.errors$ = this.control?.valueChanges.pipe(
      startWith(this.control.value),
      debounceTime(0),
      switchMap((x) => this.getErrors$())
    );
  }

  private getErrors$(): Observable<string[]> {
    return of(this.control?.errors).pipe(
      map((errors) => {
        if (!errors) return [];

        return Object.keys(errors!).reduce((acc, key) => {
          const customErrorMessage = this.data?.validators?.find(
            (x) => x.name.toLocaleLowerCase() === key.toLocaleLowerCase()
          )?.message;

          acc.push(
            customErrorMessage ?? JSON.stringify({ [key]: errors![key] })
          );
          return acc;
        }, [] as string[]);
      })
    );
  }

  onCheckboxChange(e: Event): void {
    const input = e.target as HTMLInputElement;

    if (!input.checked || this.control?.value.includes(input.value)) {
      this.control?.setValue(
        this.control.value.filter((x: any) => x !== input.value)
      );
    } else {
      this.control?.setValue([...this.control.value, input.value]);
    }
  }
}
