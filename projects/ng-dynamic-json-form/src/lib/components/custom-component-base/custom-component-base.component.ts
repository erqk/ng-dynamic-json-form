import { Component, Input, inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormControlConfig } from '../../models';
import { ErrorMessageService } from '../../services';

@Component({
  selector: 'ng-dynamic-component-base',
  template: ``,
  standalone: true,
})
export class NgDynamicJsonFormCustomComponent {
  private errorMessageService = inject(ErrorMessageService);

  @Input() control: UntypedFormControl | null = null;
  @Input() data: FormControlConfig | null = null;

  public errors$?: Observable<string[]>;
  protected readonly errorsRaw: string[] = [];

  ngOnInit(): void {
    if (!this.control) return;
    this.errors$ = this.errorMessageService.getErrors$(
      this.control,
      this.data?.validators || []
    );
  }
}
