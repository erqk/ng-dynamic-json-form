import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { FormArrayConfig } from '../../models';
import {
  LayoutComponents,
  LayoutTemplates,
} from '../../ng-dynamic-json-form.config';
import { FormGeneratorService } from '../../services';

@Component({
  selector: 'form-array-item-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-array-item-header.component.html',
  styleUrls: ['./form-array-item-header.component.scss'],
})
export class FormArrayItemHeaderComponent {
  private readonly _el = inject(ElementRef);
  private readonly _formGeneratorService = inject(FormGeneratorService);
  private _disabled = false;

  @Input() index = 0;
  @Input() config?: FormArrayConfig;
  @Input() formArray?: UntypedFormArray;
  @Input() layoutComponents?: LayoutComponents;
  @Input() layoutTemplates?: LayoutTemplates;

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor?: ViewContainerRef;

  @HostBinding('class.form-array-item-header') hostClass = true;

  templateForm?: UntypedFormGroup;
  buttonEvent = {
    add: () => this._addItem(),
    remove: () => this._removeItem(),
  };

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { index } = simpleChanges;

    if (index) {
      this.componentAnchor?.clear();
      this._injectComponent();
    }
  }

  ngOnInit(): void {
    const host = this._el.nativeElement as HTMLElement;
    this.formArray?.statusChanges
      .pipe(
        tap(() => {
          this._disabled = this.formArray?.disabled ?? false;
          this._disabled
            ? host.classList.add('disabled')
            : host.classList.remove('disabled');
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this._injectComponent();
    this._generateTemplateForm();
  }

  private _injectComponent(): void {
    if (!this.layoutComponents?.formArrayItemHeader || !this.componentAnchor) {
      return;
    }

    const componentRef = this.componentAnchor.createComponent(
      this.layoutComponents.formArrayItemHeader
    );

    componentRef.instance.index = this.index ?? 0;
    componentRef.instance.config = this.config;
    componentRef.instance.formArray = this.formArray;
    componentRef.instance.templateForm = this.templateForm;
    componentRef.instance.buttonEvent = this.buttonEvent;
  }

  private _addItem(): void {
    if (this._disabled) return;

    const template = this.config?.template;
    const formArray = this.formArray;

    if (!formArray || !template) return;

    const formGroup = this._formGeneratorService.generateFormGroup(template);

    // Prevent NG0100
    window.setTimeout(() => {
      if (!this.index && this.index !== 0) formArray!.push(formGroup);
      else formArray!.insert(this.index + 1, formGroup);
    });
  }

  private _removeItem(): void {
    if (!this.formArray || !this.formArray.length || this._disabled) {
      return;
    }

    this.formArray.removeAt(this.index ?? this.formArray.length - 1);
  }

  private _generateTemplateForm(): void {
    const template = this.config?.template;
    if (!template) return;

    this.templateForm = this._formGeneratorService.generateFormGroup(template);
  }
}
