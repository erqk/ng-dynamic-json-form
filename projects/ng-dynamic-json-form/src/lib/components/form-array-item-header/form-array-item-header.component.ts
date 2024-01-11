import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { FormArrayConfig } from '../../models';
import {
  LayoutComponents,
  LayoutTemplates,
} from '../../ng-dynamic-json-form.config';
import { FormArrayHeaderEventPipe, GenerateFormPipe } from '../../pipes';
import { FormGeneratorService } from '../../services';

@Component({
  selector: 'form-array-item-header',
  standalone: true,
  imports: [CommonModule, GenerateFormPipe, FormArrayHeaderEventPipe],
  templateUrl: './form-array-item-header.component.html',
  styleUrls: ['./form-array-item-header.component.scss'],
})
export class FormArrayItemHeaderComponent {
  private _formGeneratorService = inject(FormGeneratorService);

  @Input() index = 0;
  @Input() config?: FormArrayConfig;
  @Input() formArray?: UntypedFormArray;
  @Input() layoutComponents?: LayoutComponents;
  @Input() layoutTemplates?: LayoutTemplates;

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor?: ViewContainerRef;

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
    requestAnimationFrame(() => {
      this._injectComponent();
      this._generateTemplateForm();
    });
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
    const template = this.config?.template;

    if (!this.formArray || !template) return;

    const formGroup = this._formGeneratorService.generateFormGroup(template);

    if (!this.index && this.index !== 0) this.formArray.push(formGroup);
    else this.formArray.insert(this.index + 1, formGroup);
  }

  private _removeItem(): void {
    if (!this.formArray || !this.formArray.length) return;
    this.formArray.removeAt(this.index ?? this.formArray.length - 1);
  }

  private _generateTemplateForm(): void {
    const template = this.config?.template;
    if (!template) return;

    this.templateForm = this._formGeneratorService.generateFormGroup(template);
  }
}
