import * as i0 from '@angular/core';
import { InjectionToken, inject, Injector, ChangeDetectorRef, ElementRef, SimpleChange, Directive, Input, HostListener, Injectable, isDevMode, Pipe, DestroyRef, ViewContainerRef, Component, ViewChild, HostBinding, LOCALE_ID, forwardRef, ViewChildren, EventEmitter, Output } from '@angular/core';
import { IMaskDirective } from 'angular-imask';
import IMask from 'imask/esm/index';
import { BehaviorSubject, EMPTY, startWith, map, of, distinctUntilChanged, from, mergeMap, tap, filter, Observable, Subject, finalize, catchError, takeUntil, switchMap, combineLatest, debounceTime, fromEvent, take, merge } from 'rxjs';
import * as i2 from '@angular/forms';
import { Validators, UntypedFormGroup, FormControl, isFormControl, isFormGroup, FormArray, ReactiveFormsModule, FormGroup, UntypedFormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as i1 from '@angular/common';
import { CommonModule, formatDate } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const PROPS_BINDING_INJECTORS = new InjectionToken('property-binding-injector');
function providePropsBinding(value) {
    return {
        provide: PROPS_BINDING_INJECTORS,
        useValue: value,
    };
}

class PropsBindingDirective {
    constructor() {
        this._injectionTokens = inject(PROPS_BINDING_INJECTORS, {
            optional: true,
        });
        this._injector = inject(Injector);
        this._cd = inject(ChangeDetectorRef);
        this._el = inject(ElementRef);
        /**
         * Must ensure the view is initialized before applying any properties binding
         */
        this._isViewInitialized = false;
    }
    ngOnChanges() {
        if (!this._isViewInitialized)
            return;
        this._bindProperties();
    }
    ngAfterViewInit() {
        this._isViewInitialized = true;
        this._bindProperties();
    }
    _bindProperties() {
        const propsBinding = (this.propsBinding ?? []).filter((x) => {
            return (Boolean(x) &&
                typeof x.props === 'object' &&
                Object.keys(x.props).length > 0);
        });
        if (!propsBinding.length) {
            return;
        }
        const host = this._el.nativeElement;
        for (const item of propsBinding) {
            const { props, key, omit = [] } = item;
            const providerToken = this._injectionTokens?.find((x) => x.key === key)?.token;
            const target = !providerToken ? null : this._injector.get(providerToken);
            for (const key in props) {
                const value = props[key];
                if (value === undefined || omit.includes(key)) {
                    continue;
                }
                if (target) {
                    this.updateComponentProperty({ component: target, key, value });
                    continue;
                }
                if (host) {
                    // Only set CSS custom properties (starting with --) or valid HTML attributes
                    if (key.startsWith('--')) {
                        host.style.setProperty(key, value);
                    }
                    else if (this.isValidHtmlAttribute(key)) {
                        host.setAttribute(key, value);
                    }
                }
            }
        }
        this._cd.markForCheck();
        this._cd.detectChanges();
    }
    updateComponentProperty(data) {
        const { component, key, value } = data;
        const hasProperty = this.hasProperty(component, key);
        if (!hasProperty) {
            return;
        }
        const property = component[key];
        if (typeof property?.set === 'function') {
            property.set(value);
        }
        else {
            component[key] = value;
        }
        // For compatibility
        if (component['ngOnChanges']) {
            const simpleChange = new SimpleChange(undefined, value, true);
            component.ngOnChanges({ [key]: simpleChange });
        }
    }
    hasProperty(obj, key) {
        return Object.hasOwn(obj, key) || key in obj;
    }
    isValidHtmlAttribute(attributeName) {
        // Common HTML attributes - this is not exhaustive but covers most use cases
        const validAttributes = new Set([
            'id',
            'class',
            'style',
            'title',
            'lang',
            'dir',
            'hidden',
            'tabindex',
            'accesskey',
            'contenteditable',
            'draggable',
            'spellcheck',
            'translate',
            'role',
            'aria-label',
            'aria-labelledby',
            'aria-describedby',
            'aria-hidden',
            'aria-expanded',
            'aria-selected',
            'aria-checked',
            'aria-disabled',
            'data-testid',
            'disabled',
            'readonly',
            'required',
            'placeholder',
            'value',
            'checked',
            'selected',
            'multiple',
            'size',
            'rows',
            'cols',
            'min',
            'max',
            'step',
            'pattern',
            'minlength',
            'maxlength',
            'src',
            'alt',
            'href',
            'target',
            'rel',
            'type',
            'name',
            'for',
        ]);
        // Allow data-* and aria-* attributes
        return (validAttributes.has(attributeName.toLowerCase()) ||
            attributeName.startsWith('data-') ||
            attributeName.startsWith('aria-'));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PropsBindingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: PropsBindingDirective, isStandalone: true, selector: "[propsBinding]", inputs: { propsBinding: "propsBinding" }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PropsBindingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[propsBinding]',
                    standalone: true,
                }]
        }], propDecorators: { propsBinding: [{
                type: Input
            }] } });

class TextareaAutHeightDirective {
    constructor() {
        this._el = inject(ElementRef);
        this.autoResize = true;
    }
    // Call in this lifecycle hook to wait for PropsBindingDirective to bind the attributes,
    // then we can get the correct scrollHeight
    ngAfterViewInit() {
        if (typeof window === 'undefined')
            return;
        this._hostEl = this._el.nativeElement;
        if (!this._hostEl)
            return;
        this._hostEl.style.setProperty('resize', 'none');
        this._setHeight();
    }
    onInput() {
        this._setHeight();
    }
    _setHeight() {
        if (!this._hostEl || !this.autoResize)
            return;
        const borderWidth = Math.ceil(parseFloat(window.getComputedStyle(this._hostEl).borderWidth));
        this._hostEl.style.removeProperty('height');
        this._hostEl.style.setProperty('height', `${this._hostEl.scrollHeight + borderWidth * 2}px`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TextareaAutHeightDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TextareaAutHeightDirective, isStandalone: true, selector: "[textareaAutoHeight]", inputs: { autoResize: "autoResize" }, host: { listeners: { "input": "onInput($event)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TextareaAutHeightDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[textareaAutoHeight]',
                    standalone: true,
                }]
        }], propDecorators: { autoResize: [{
                type: Input
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });

class ImaskValuePatchDirective {
    constructor() {
        this._imask = inject(IMaskDirective);
        this._isNumber = false;
        const iMask = this._imask;
        iMask.writeValue = (value) => {
            // ----- Modified area -----
            if (!this._isNumber) {
                this._isNumber = typeof value === 'number';
            }
            value = value == null && iMask.unmask !== 'typed' ? '' : `${value}`;
            // ----- Modified area -----
            if (iMask.maskRef) {
                iMask.beginWrite(value);
                iMask.maskValue = value;
                iMask.endWrite();
            }
            else {
                iMask['_renderer'].setProperty(iMask.element, 'value', value);
                iMask['_initialValue'] = value;
            }
        };
        iMask['_onAccept'] = () => {
            // ----- Modified area -----
            const valueParsed = this._isNumber
                ? parseFloat(iMask.maskValue)
                : iMask.maskValue;
            const value = isNaN(valueParsed) ? null : valueParsed;
            // ----- Modified area -----
            // if value was not changed during writing don't fire events
            // for details see https://github.com/uNmAnNeR/imaskjs/issues/136
            if (iMask['_writing'] && value === iMask.endWrite())
                return;
            iMask.onChange(value);
            iMask.accept.emit(value);
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ImaskValuePatchDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: ImaskValuePatchDirective, isStandalone: true, selector: "[imaskValuePatch]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ImaskValuePatchDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[imaskValuePatch]',
                    standalone: true,
                }]
        }], ctorParameters: function () { return []; } });

var ValidatorsEnum;
(function (ValidatorsEnum) {
    ValidatorsEnum["required"] = "required";
    ValidatorsEnum["requiredTrue"] = "requiredTrue";
    ValidatorsEnum["min"] = "min";
    ValidatorsEnum["max"] = "max";
    ValidatorsEnum["minLength"] = "minLength";
    ValidatorsEnum["maxLength"] = "maxLength";
    ValidatorsEnum["email"] = "email";
    ValidatorsEnum["pattern"] = "pattern";
})(ValidatorsEnum || (ValidatorsEnum = {}));

var ConditionsActionEnum;
(function (ConditionsActionEnum) {
    ConditionsActionEnum["control.hidden"] = "control.hidden";
    ConditionsActionEnum["control.disabled"] = "control.disabled";
    ConditionsActionEnum["validator.required"] = "validator.required";
    ConditionsActionEnum["validator.requiredTrue"] = "validator.requiredTrue";
    ConditionsActionEnum["validator.min"] = "validator.min";
    ConditionsActionEnum["validator.max"] = "validator.max";
    ConditionsActionEnum["validator.minLength"] = "validator.minLength";
    ConditionsActionEnum["validator.maxLength"] = "validator.maxLength";
    ConditionsActionEnum["validator.email"] = "validator.email";
    ConditionsActionEnum["validator.pattern"] = "validator.pattern";
})(ConditionsActionEnum || (ConditionsActionEnum = {}));

class ConfigMappingService {
    getCorrectedConfig(input) {
        const config = structuredClone(input);
        const { formControlName, props, inputMask, children = [] } = config;
        config.formControlName = this._getFormControlName(formControlName);
        config.value = config.value ?? this._getFallbackValue(config);
        if (props) {
            config.props = Object.keys(props).reduce((acc, key) => {
                if (typeof acc[key] === 'string') {
                    acc[key] = this._parseStringValue(acc[key]);
                }
                return acc;
            }, props);
        }
        if (inputMask) {
            this._mapInputMask(inputMask);
        }
        if (children.length > 0) {
            config.children = children.map((x) => this.getCorrectedConfig(x));
        }
        return config;
    }
    _getFallbackValue(item) {
        switch (item.type) {
            case 'checkbox': {
                const isBinary = !item.options?.src && item.options?.data?.length === 1;
                return isBinary ? false : [];
            }
            case 'switch':
                return false;
            default:
                return item.value;
        }
    }
    _getFormControlName(name) {
        const replaceSpaces = (str) => str.replaceAll(/\s/g, '_');
        const removeSpecialCharacters = (str) => str.replaceAll(/[.,]/g, '');
        const result = [replaceSpaces, removeSpecialCharacters].reduce((acc, fn) => fn(acc), name);
        return result;
    }
    _mapInputMask(val) {
        const mask = val;
        // Number, RangeMask, Regex or pattern
        if (typeof mask.mask === 'string') {
            const _mask = mask.mask.trim();
            if (_mask === 'Number')
                mask.mask = Number;
            if (_mask === 'Imask.MaskedRange')
                mask.mask = IMask.MaskedRange;
            if (new RegExp(/^\/.*\/\w*?$/).test(_mask)) {
                const array = _mask.split('/');
                const flags = array.concat().pop();
                mask.mask = new RegExp(array[1], flags);
            }
        }
        // Dynamic mask
        if (Array.isArray(mask.mask)) {
            mask.mask.forEach((x) => this._mapInputMask(x));
        }
    }
    _parseStringValue(input) {
        const _input = input.trim();
        // Get Date from "Date(xxx)"
        if (_input.startsWith('Date(') && _input.endsWith(')')) {
            const dateString = _input.replace('Date(', '').replace(')', '').trim();
            try {
                return new Date(dateString);
            }
            catch {
                return input;
            }
        }
        // Get Date from ISO 8601 string
        if (this._isIsoDate(_input)) {
            return new Date(_input);
        }
        return _input;
    }
    /**https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format */
    _isIsoDate(str) {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str))
            return false;
        const d = new Date(str);
        return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfigMappingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfigMappingService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfigMappingService, decorators: [{
            type: Injectable
        }] });

function evaluateBooleanOperation([left, operator, right]) {
    switch (operator) {
        case '===':
            return left === right;
        case '!==':
            return left !== right;
        case '>=':
            return left >= right;
        case '>':
            return left > right;
        case '<=':
            return left <= right;
        case '<':
            return left < right;
        case 'includes':
            return Array.isArray(left) ? left.includes(right) : false;
        case 'notIncludes':
            return Array.isArray(left) ? !left.includes(right) : false;
    }
}

/**
 * Get the value in an object located in a specific key.
 *
 * @param obj The object we want to get the value.
 * @param path The path to the target value, with period delimiter
 *
 * @description
 * If one of the path's value is array and the index needs to evaluate at runtime,
 * use the syntax same with `ConditionsIfTupple`.
 *
 * @example
 * ```
 * level1: {
 *  level2: {
 *    list: [
 *      {
 *        value: 0,
 *      },
 *      {
 *        value: 1,
 *      },
 *      ...
 *    ],
 *  },
 *}
 * ```
 * Orignal path: `level1.level2.list.["value", "===", 1].value`
 *
 * Resulting path: `level1.level2.list.1.value`
 *
 * If the array contains only primitive value, leave the first parameter of ConditionsIfTupple empty.
 * For example, change `["value", "===", 1]` to `[,"===", 1].
 */
function getValueInObject(obj, path) {
    if (!path || !obj || typeof obj !== 'object') {
        return obj;
    }
    // Store the array value, so that we can get the
    // target index in the next loop.
    let tempArray = [];
    try {
        return path
            .split('.')
            .map((x) => x.trim())
            .reduce((acc, key) => {
            if (acc === null || acc === undefined) {
                return acc;
            }
            const value = acc[key];
            const getKeyByIndex = key.startsWith('[') &&
                key.endsWith(']') &&
                key.split(',').length === 3;
            if (Array.isArray(value)) {
                tempArray = value;
            }
            return getKeyByIndex ? acc[getItemIndex(tempArray, key)] : value;
        }, obj);
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
function getItemIndex(array, path) {
    const validSyntax = path.startsWith('[') && path.endsWith(']') && path.split(',').length === 3;
    if (!validSyntax || !Array.isArray(array)) {
        return path;
    }
    const removeQuotes = (str) => str.replaceAll('"', '').replaceAll("'", '');
    const [key, operator, value] = path
        .replace('[', '')
        .replace(']', '')
        .split(',')
        .map((x) => x.trim());
    const _key = removeQuotes(key);
    const _operator = removeQuotes(operator);
    // The `path` is already a string, so we have to parse what is the type of the `value`.
    // If the `value` is wrapped with quotes then we take it as a string after removing the quotes.
    // Otherwise use JSON.parse() to get the value with correct type. (ex: number)
    const valueParsed = () => {
        if (typeof value !== 'string')
            return value;
        const isString = new RegExp(/^('|").*('|")$/).test(value);
        return isString ? removeQuotes(value) : JSON.parse(value);
    };
    const index = array.findIndex((item) => {
        const left = !_key ? item : getValueInObject(item, _key);
        const right = valueParsed();
        return evaluateBooleanOperation([left, _operator, right]);
    });
    return index < 0 ? '0' : index.toString();
}

"use strict";
const ConfigConditionsSchema = validate10;
const schema11 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigConditionsSchema", "type": "object", "patternProperties": { "^.+$": { "$ref": "#/definitions/conditionGroupConfig" } }, "additionalProperties": false, "definitions": { "conditionIfConfig": { "type": "array", "minItems": 3, "maxItems": 3, "items": [{}, { "enum": ["===", "!==", ">=", ">", "<=", "<", "includes", "notIncludes"] }, {}] }, "conditionGroupItem": { "type": "array", "items": { "anyOf": [{ "$ref": "#/definitions/conditionIfConfig" }, { "$ref": "#/definitions/conditionGroupConfig" }] } }, "conditionGroupConfig": { "type": "object", "properties": { "&&": { "$ref": "#/definitions/conditionGroupItem" }, "||": { "$ref": "#/definitions/conditionGroupItem" } }, "additionalProperties": false }, "conditionConfig": { "type": "object", "patternProperties": { "^.+$": { "$ref": "#/definitions/conditionGroupConfig" } }, "additionalProperties": false } } };
const pattern0 = new RegExp("^.+$", "u");
const schema12 = { "type": "object", "properties": { "&&": { "$ref": "#/definitions/conditionGroupItem" }, "||": { "$ref": "#/definitions/conditionGroupItem" } }, "additionalProperties": false };
const schema13 = { "type": "array", "items": { "anyOf": [{ "$ref": "#/definitions/conditionIfConfig" }, { "$ref": "#/definitions/conditionGroupConfig" }] } };
const schema14 = { "type": "array", "minItems": 3, "maxItems": 3, "items": [{}, { "enum": ["===", "!==", ">=", ">", "<=", "<", "includes", "notIncludes"] }, {}] };
const wrapper0 = { validate: validate11 };
function validate12(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (errors === 0) {
    if (Array.isArray(data)) {
        var valid0 = true;
        const len0 = data.length;
        for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            const _errs2 = errors;
            let valid1 = false;
            const _errs3 = errors;
            const _errs4 = errors;
            if (errors === _errs4) {
                if (Array.isArray(data0)) {
                    if (data0.length > 3) {
                        const err0 = { instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/conditionIfConfig/maxItems", keyword: "maxItems", params: { limit: 3 }, message: "must NOT have more than 3 items" };
                        if (vErrors === null) {
                            vErrors = [err0];
                        }
                        else {
                            vErrors.push(err0);
                        }
                        errors++;
                    }
                    else {
                        if (data0.length < 3) {
                            const err1 = { instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/conditionIfConfig/minItems", keyword: "minItems", params: { limit: 3 }, message: "must NOT have fewer than 3 items" };
                            if (vErrors === null) {
                                vErrors = [err1];
                            }
                            else {
                                vErrors.push(err1);
                            }
                            errors++;
                        }
                        else {
                            const len1 = data0.length;
                            if (len1 > 1) {
                                let data1 = data0[1];
                                if (!((((((((data1 === "===") || (data1 === "!==")) || (data1 === ">=")) || (data1 === ">")) || (data1 === "<=")) || (data1 === "<")) || (data1 === "includes")) || (data1 === "notIncludes"))) {
                                    const err2 = { instancePath: instancePath + "/" + i0 + "/1", schemaPath: "#/definitions/conditionIfConfig/items/1/enum", keyword: "enum", params: { allowedValues: schema14.items[1].enum }, message: "must be equal to one of the allowed values" };
                                    if (vErrors === null) {
                                        vErrors = [err2];
                                    }
                                    else {
                                        vErrors.push(err2);
                                    }
                                    errors++;
                                }
                            }
                        }
                    }
                }
                else {
                    const err3 = { instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/conditionIfConfig/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                    if (vErrors === null) {
                        vErrors = [err3];
                    }
                    else {
                        vErrors.push(err3);
                    }
                    errors++;
                }
            }
            var _valid0 = _errs3 === errors;
            valid1 = valid1 || _valid0;
            if (!valid1) {
                const _errs7 = errors;
                if (!(wrapper0.validate(data0, { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData }))) {
                    vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
                    errors = vErrors.length;
                }
                var _valid0 = _errs7 === errors;
                valid1 = valid1 || _valid0;
            }
            if (!valid1) {
                const err4 = { instancePath: instancePath + "/" + i0, schemaPath: "#/items/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                    vErrors = [err4];
                }
                else {
                    vErrors.push(err4);
                }
                errors++;
                validate12.errors = vErrors;
                return false;
            }
            else {
                errors = _errs2;
                if (vErrors !== null) {
                    if (_errs2) {
                        vErrors.length = _errs2;
                    }
                    else {
                        vErrors = null;
                    }
                }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
                break;
            }
        }
    }
    else {
        validate12.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
    }
} validate12.errors = vErrors; return errors === 0; }
function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        const _errs1 = errors;
        for (const key0 in data) {
            if (!((key0 === "&&") || (key0 === "||"))) {
                validate11.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
                return false;
                break;
            }
        }
        if (_errs1 === errors) {
            if (data["&&"] !== undefined) {
                const _errs2 = errors;
                if (!(validate12(data["&&"], { instancePath: instancePath + "/&&", parentData: data, parentDataProperty: "&&", rootData }))) {
                    vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                    errors = vErrors.length;
                }
                var valid0 = _errs2 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data["||"] !== undefined) {
                    const _errs3 = errors;
                    if (!(validate12(data["||"], { instancePath: instancePath + "/||", parentData: data, parentDataProperty: "||", rootData }))) {
                        vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                        errors = vErrors.length;
                    }
                    var valid0 = _errs3 === errors;
                }
                else {
                    var valid0 = true;
                }
            }
        }
    }
    else {
        validate11.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate11.errors = vErrors; return errors === 0; }
function validate10(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigConditionsSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        const _errs1 = errors;
        for (const key0 in data) {
            if (!(pattern0.test(key0))) {
                validate10.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
                return false;
                break;
            }
        }
        if (_errs1 === errors) {
            var valid0 = true;
            for (const key1 in data) {
                if (pattern0.test(key1)) {
                    const _errs2 = errors;
                    if (!(validate11(data[key1], { instancePath: instancePath + "/" + key1.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data, parentDataProperty: key1, rootData }))) {
                        vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);
                        errors = vErrors.length;
                    }
                    var valid0 = _errs2 === errors;
                    if (!valid0) {
                        break;
                    }
                }
            }
        }
    }
    else {
        validate10.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate10.errors = vErrors; return errors === 0; }
const ConfigLayoutSchema = validate16;
const schema15 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigLayoutSchema", "type": "object", "properties": { "hostClass": { "type": "string" }, "hostStyles": { "type": "string" }, "labelClass": { "type": "string" }, "labelStyles": { "type": "string" }, "contentClass": { "type": "string" }, "contentStyles": { "type": "string" }, "formGroupClass": { "type": "string" }, "formGroupStyles": { "type": "string" }, "descriptionClass": { "type": "string" }, "descriptionStyles": { "type": "string" }, "inputAreaClass": { "type": "string" }, "inputAreaStyles": { "type": "string" }, "errorClass": { "type": "string" }, "errorStyles": { "type": "string" }, "descriptionPosition": { "enum": ["after", "before"] }, "hideLabel": { "type": "boolean" }, "contentCollapsible": { "enum": ["collapse", "expand"], "description": "Enable expand/collapse of content. The default state will be determined by value provided" }, "autoAddRequiredClass": { "type": "boolean", "description": "Add `required` class automatically to control if there's validator named `required`. Default is true." } } };
function validate16(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigLayoutSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.hostClass !== undefined) {
            const _errs1 = errors;
            if (typeof data.hostClass !== "string") {
                validate16.errors = [{ instancePath: instancePath + "/hostClass", schemaPath: "#/properties/hostClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
            }
            var valid0 = _errs1 === errors;
        }
        else {
            var valid0 = true;
        }
        if (valid0) {
            if (data.hostStyles !== undefined) {
                const _errs3 = errors;
                if (typeof data.hostStyles !== "string") {
                    validate16.errors = [{ instancePath: instancePath + "/hostStyles", schemaPath: "#/properties/hostStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                }
                var valid0 = _errs3 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data.labelClass !== undefined) {
                    const _errs5 = errors;
                    if (typeof data.labelClass !== "string") {
                        validate16.errors = [{ instancePath: instancePath + "/labelClass", schemaPath: "#/properties/labelClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                    }
                    var valid0 = _errs5 === errors;
                }
                else {
                    var valid0 = true;
                }
                if (valid0) {
                    if (data.labelStyles !== undefined) {
                        const _errs7 = errors;
                        if (typeof data.labelStyles !== "string") {
                            validate16.errors = [{ instancePath: instancePath + "/labelStyles", schemaPath: "#/properties/labelStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                        }
                        var valid0 = _errs7 === errors;
                    }
                    else {
                        var valid0 = true;
                    }
                    if (valid0) {
                        if (data.contentClass !== undefined) {
                            const _errs9 = errors;
                            if (typeof data.contentClass !== "string") {
                                validate16.errors = [{ instancePath: instancePath + "/contentClass", schemaPath: "#/properties/contentClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                            }
                            var valid0 = _errs9 === errors;
                        }
                        else {
                            var valid0 = true;
                        }
                        if (valid0) {
                            if (data.contentStyles !== undefined) {
                                const _errs11 = errors;
                                if (typeof data.contentStyles !== "string") {
                                    validate16.errors = [{ instancePath: instancePath + "/contentStyles", schemaPath: "#/properties/contentStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                }
                                var valid0 = _errs11 === errors;
                            }
                            else {
                                var valid0 = true;
                            }
                            if (valid0) {
                                if (data.formGroupClass !== undefined) {
                                    const _errs13 = errors;
                                    if (typeof data.formGroupClass !== "string") {
                                        validate16.errors = [{ instancePath: instancePath + "/formGroupClass", schemaPath: "#/properties/formGroupClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                    }
                                    var valid0 = _errs13 === errors;
                                }
                                else {
                                    var valid0 = true;
                                }
                                if (valid0) {
                                    if (data.formGroupStyles !== undefined) {
                                        const _errs15 = errors;
                                        if (typeof data.formGroupStyles !== "string") {
                                            validate16.errors = [{ instancePath: instancePath + "/formGroupStyles", schemaPath: "#/properties/formGroupStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                        }
                                        var valid0 = _errs15 === errors;
                                    }
                                    else {
                                        var valid0 = true;
                                    }
                                    if (valid0) {
                                        if (data.descriptionClass !== undefined) {
                                            const _errs17 = errors;
                                            if (typeof data.descriptionClass !== "string") {
                                                validate16.errors = [{ instancePath: instancePath + "/descriptionClass", schemaPath: "#/properties/descriptionClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                            }
                                            var valid0 = _errs17 === errors;
                                        }
                                        else {
                                            var valid0 = true;
                                        }
                                        if (valid0) {
                                            if (data.descriptionStyles !== undefined) {
                                                const _errs19 = errors;
                                                if (typeof data.descriptionStyles !== "string") {
                                                    validate16.errors = [{ instancePath: instancePath + "/descriptionStyles", schemaPath: "#/properties/descriptionStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                }
                                                var valid0 = _errs19 === errors;
                                            }
                                            else {
                                                var valid0 = true;
                                            }
                                            if (valid0) {
                                                if (data.inputAreaClass !== undefined) {
                                                    const _errs21 = errors;
                                                    if (typeof data.inputAreaClass !== "string") {
                                                        validate16.errors = [{ instancePath: instancePath + "/inputAreaClass", schemaPath: "#/properties/inputAreaClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                        return false;
                                                    }
                                                    var valid0 = _errs21 === errors;
                                                }
                                                else {
                                                    var valid0 = true;
                                                }
                                                if (valid0) {
                                                    if (data.inputAreaStyles !== undefined) {
                                                        const _errs23 = errors;
                                                        if (typeof data.inputAreaStyles !== "string") {
                                                            validate16.errors = [{ instancePath: instancePath + "/inputAreaStyles", schemaPath: "#/properties/inputAreaStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                        }
                                                        var valid0 = _errs23 === errors;
                                                    }
                                                    else {
                                                        var valid0 = true;
                                                    }
                                                    if (valid0) {
                                                        if (data.errorClass !== undefined) {
                                                            const _errs25 = errors;
                                                            if (typeof data.errorClass !== "string") {
                                                                validate16.errors = [{ instancePath: instancePath + "/errorClass", schemaPath: "#/properties/errorClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                            }
                                                            var valid0 = _errs25 === errors;
                                                        }
                                                        else {
                                                            var valid0 = true;
                                                        }
                                                        if (valid0) {
                                                            if (data.errorStyles !== undefined) {
                                                                const _errs27 = errors;
                                                                if (typeof data.errorStyles !== "string") {
                                                                    validate16.errors = [{ instancePath: instancePath + "/errorStyles", schemaPath: "#/properties/errorStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                    return false;
                                                                }
                                                                var valid0 = _errs27 === errors;
                                                            }
                                                            else {
                                                                var valid0 = true;
                                                            }
                                                            if (valid0) {
                                                                if (data.descriptionPosition !== undefined) {
                                                                    let data14 = data.descriptionPosition;
                                                                    const _errs29 = errors;
                                                                    if (!((data14 === "after") || (data14 === "before"))) {
                                                                        validate16.errors = [{ instancePath: instancePath + "/descriptionPosition", schemaPath: "#/properties/descriptionPosition/enum", keyword: "enum", params: { allowedValues: schema15.properties.descriptionPosition.enum }, message: "must be equal to one of the allowed values" }];
                                                                        return false;
                                                                    }
                                                                    var valid0 = _errs29 === errors;
                                                                }
                                                                else {
                                                                    var valid0 = true;
                                                                }
                                                                if (valid0) {
                                                                    if (data.hideLabel !== undefined) {
                                                                        const _errs30 = errors;
                                                                        if (typeof data.hideLabel !== "boolean") {
                                                                            validate16.errors = [{ instancePath: instancePath + "/hideLabel", schemaPath: "#/properties/hideLabel/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                            return false;
                                                                        }
                                                                        var valid0 = _errs30 === errors;
                                                                    }
                                                                    else {
                                                                        var valid0 = true;
                                                                    }
                                                                    if (valid0) {
                                                                        if (data.contentCollapsible !== undefined) {
                                                                            let data16 = data.contentCollapsible;
                                                                            const _errs32 = errors;
                                                                            if (!((data16 === "collapse") || (data16 === "expand"))) {
                                                                                validate16.errors = [{ instancePath: instancePath + "/contentCollapsible", schemaPath: "#/properties/contentCollapsible/enum", keyword: "enum", params: { allowedValues: schema15.properties.contentCollapsible.enum }, message: "must be equal to one of the allowed values" }];
                                                                                return false;
                                                                            }
                                                                            var valid0 = _errs32 === errors;
                                                                        }
                                                                        else {
                                                                            var valid0 = true;
                                                                        }
                                                                        if (valid0) {
                                                                            if (data.autoAddRequiredClass !== undefined) {
                                                                                const _errs33 = errors;
                                                                                if (typeof data.autoAddRequiredClass !== "boolean") {
                                                                                    validate16.errors = [{ instancePath: instancePath + "/autoAddRequiredClass", schemaPath: "#/properties/autoAddRequiredClass/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                    return false;
                                                                                }
                                                                                var valid0 = _errs33 === errors;
                                                                            }
                                                                            else {
                                                                                var valid0 = true;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        validate16.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate16.errors = vErrors; return errors === 0; }
const ConfigOptionsSchema = validate17;
const schema16 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigOptionsSchema", "type": "object", "properties": { "data": { "type": "array", "items": { "type": "object", "properties": { "label": { "type": "string" }, "value": {} } } }, "src": { "oneOf": [{ "type": "string" }, { "$ref": "#/definitions/optionSourceConfig" }] }, "srcAppendPosition": { "type": "string", "enum": ["after", "before"] }, "autoSelectFirst": { "type": "boolean" }, "layout": { "type": "string", "enum": ["row", "column"] }, "labelPosition": { "type": "string", "enum": ["after", "before"] }, "containerClass": { "type": "string" }, "containerStyles": { "type": "string" } }, "definitions": { "optionSourceConfig": { "type": "object", "properties": { "url": { "type": "string" }, "method": { "type": "string", "enum": ["GET", "POST"] }, "headers": {}, "body": {}, "mapData": { "type": "object", "properties": { "labelKey": { "type": "string" }, "valueKeys": { "type": "array", "items": { "type": "string" } }, "contentPath": { "type": "string" }, "slice": { "type": "array", "items": [{ "type": "number" }, { "type": "number" }], "minItems": 2, "maxItems": 2 }, "appendPosition": { "type": "string", "enum": ["after", "before"] } } }, "trigger": { "type": "object", "properties": { "by": { "type": "string" }, "body": {}, "debounceTime": { "type": "number" } } }, "filter": { "type": "object", "properties": { "by": { "type": "string" }, "conditions": { "$ref": "ConfigConditionsSchema#/definitions/conditionGroupConfig" }, "debounceTime": { "type": "number" } } } } } } };
const schema17 = { "type": "object", "properties": { "url": { "type": "string" }, "method": { "type": "string", "enum": ["GET", "POST"] }, "headers": {}, "body": {}, "mapData": { "type": "object", "properties": { "labelKey": { "type": "string" }, "valueKeys": { "type": "array", "items": { "type": "string" } }, "contentPath": { "type": "string" }, "slice": { "type": "array", "items": [{ "type": "number" }, { "type": "number" }], "minItems": 2, "maxItems": 2 }, "appendPosition": { "type": "string", "enum": ["after", "before"] } } }, "trigger": { "type": "object", "properties": { "by": { "type": "string" }, "body": {}, "debounceTime": { "type": "number" } } }, "filter": { "type": "object", "properties": { "by": { "type": "string" }, "conditions": { "$ref": "ConfigConditionsSchema#/definitions/conditionGroupConfig" }, "debounceTime": { "type": "number" } } } } };
function validate19(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        const _errs1 = errors;
        for (const key0 in data) {
            if (!((key0 === "&&") || (key0 === "||"))) {
                validate19.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
                return false;
                break;
            }
        }
        if (_errs1 === errors) {
            if (data["&&"] !== undefined) {
                const _errs2 = errors;
                if (!(validate12(data["&&"], { instancePath: instancePath + "/&&", parentData: data, parentDataProperty: "&&", rootData }))) {
                    vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                    errors = vErrors.length;
                }
                var valid0 = _errs2 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data["||"] !== undefined) {
                    const _errs3 = errors;
                    if (!(validate12(data["||"], { instancePath: instancePath + "/||", parentData: data, parentDataProperty: "||", rootData }))) {
                        vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                        errors = vErrors.length;
                    }
                    var valid0 = _errs3 === errors;
                }
                else {
                    var valid0 = true;
                }
            }
        }
    }
    else {
        validate19.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate19.errors = vErrors; return errors === 0; }
function validate18(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.url !== undefined) {
            const _errs1 = errors;
            if (typeof data.url !== "string") {
                validate18.errors = [{ instancePath: instancePath + "/url", schemaPath: "#/properties/url/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
            }
            var valid0 = _errs1 === errors;
        }
        else {
            var valid0 = true;
        }
        if (valid0) {
            if (data.method !== undefined) {
                let data1 = data.method;
                const _errs3 = errors;
                if (typeof data1 !== "string") {
                    validate18.errors = [{ instancePath: instancePath + "/method", schemaPath: "#/properties/method/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                }
                if (!((data1 === "GET") || (data1 === "POST"))) {
                    validate18.errors = [{ instancePath: instancePath + "/method", schemaPath: "#/properties/method/enum", keyword: "enum", params: { allowedValues: schema17.properties.method.enum }, message: "must be equal to one of the allowed values" }];
                    return false;
                }
                var valid0 = _errs3 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data.mapData !== undefined) {
                    let data2 = data.mapData;
                    const _errs5 = errors;
                    if (errors === _errs5) {
                        if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                            if (data2.labelKey !== undefined) {
                                const _errs7 = errors;
                                if (typeof data2.labelKey !== "string") {
                                    validate18.errors = [{ instancePath: instancePath + "/mapData/labelKey", schemaPath: "#/properties/mapData/properties/labelKey/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                }
                                var valid1 = _errs7 === errors;
                            }
                            else {
                                var valid1 = true;
                            }
                            if (valid1) {
                                if (data2.valueKeys !== undefined) {
                                    let data4 = data2.valueKeys;
                                    const _errs9 = errors;
                                    if (errors === _errs9) {
                                        if (Array.isArray(data4)) {
                                            var valid2 = true;
                                            const len0 = data4.length;
                                            for (let i0 = 0; i0 < len0; i0++) {
                                                const _errs11 = errors;
                                                if (typeof data4[i0] !== "string") {
                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/valueKeys/" + i0, schemaPath: "#/properties/mapData/properties/valueKeys/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                }
                                                var valid2 = _errs11 === errors;
                                                if (!valid2) {
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            validate18.errors = [{ instancePath: instancePath + "/mapData/valueKeys", schemaPath: "#/properties/mapData/properties/valueKeys/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                            return false;
                                        }
                                    }
                                    var valid1 = _errs9 === errors;
                                }
                                else {
                                    var valid1 = true;
                                }
                                if (valid1) {
                                    if (data2.contentPath !== undefined) {
                                        const _errs13 = errors;
                                        if (typeof data2.contentPath !== "string") {
                                            validate18.errors = [{ instancePath: instancePath + "/mapData/contentPath", schemaPath: "#/properties/mapData/properties/contentPath/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                        }
                                        var valid1 = _errs13 === errors;
                                    }
                                    else {
                                        var valid1 = true;
                                    }
                                    if (valid1) {
                                        if (data2.slice !== undefined) {
                                            let data7 = data2.slice;
                                            const _errs15 = errors;
                                            if (errors === _errs15) {
                                                if (Array.isArray(data7)) {
                                                    if (data7.length > 2) {
                                                        validate18.errors = [{ instancePath: instancePath + "/mapData/slice", schemaPath: "#/properties/mapData/properties/slice/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                                                        return false;
                                                    }
                                                    else {
                                                        if (data7.length < 2) {
                                                            validate18.errors = [{ instancePath: instancePath + "/mapData/slice", schemaPath: "#/properties/mapData/properties/slice/minItems", keyword: "minItems", params: { limit: 2 }, message: "must NOT have fewer than 2 items" }];
                                                            return false;
                                                        }
                                                        else {
                                                            const len1 = data7.length;
                                                            if (len1 > 0) {
                                                                let data8 = data7[0];
                                                                const _errs17 = errors;
                                                                if (!((typeof data8 == "number") && (isFinite(data8)))) {
                                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/slice/0", schemaPath: "#/properties/mapData/properties/slice/items/0/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                                                    return false;
                                                                }
                                                                var valid3 = _errs17 === errors;
                                                            }
                                                            if (valid3) {
                                                                if (len1 > 1) {
                                                                    let data9 = data7[1];
                                                                    const _errs19 = errors;
                                                                    if (!((typeof data9 == "number") && (isFinite(data9)))) {
                                                                        validate18.errors = [{ instancePath: instancePath + "/mapData/slice/1", schemaPath: "#/properties/mapData/properties/slice/items/1/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                                                        return false;
                                                                    }
                                                                    var valid3 = _errs19 === errors;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/slice", schemaPath: "#/properties/mapData/properties/slice/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                    return false;
                                                }
                                            }
                                            var valid1 = _errs15 === errors;
                                        }
                                        else {
                                            var valid1 = true;
                                        }
                                        if (valid1) {
                                            if (data2.appendPosition !== undefined) {
                                                let data10 = data2.appendPosition;
                                                const _errs21 = errors;
                                                if (typeof data10 !== "string") {
                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/appendPosition", schemaPath: "#/properties/mapData/properties/appendPosition/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                }
                                                if (!((data10 === "after") || (data10 === "before"))) {
                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/appendPosition", schemaPath: "#/properties/mapData/properties/appendPosition/enum", keyword: "enum", params: { allowedValues: schema17.properties.mapData.properties.appendPosition.enum }, message: "must be equal to one of the allowed values" }];
                                                    return false;
                                                }
                                                var valid1 = _errs21 === errors;
                                            }
                                            else {
                                                var valid1 = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            validate18.errors = [{ instancePath: instancePath + "/mapData", schemaPath: "#/properties/mapData/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                            return false;
                        }
                    }
                    var valid0 = _errs5 === errors;
                }
                else {
                    var valid0 = true;
                }
                if (valid0) {
                    if (data.trigger !== undefined) {
                        let data11 = data.trigger;
                        const _errs23 = errors;
                        if (errors === _errs23) {
                            if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                                if (data11.by !== undefined) {
                                    const _errs25 = errors;
                                    if (typeof data11.by !== "string") {
                                        validate18.errors = [{ instancePath: instancePath + "/trigger/by", schemaPath: "#/properties/trigger/properties/by/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                    }
                                    var valid4 = _errs25 === errors;
                                }
                                else {
                                    var valid4 = true;
                                }
                                if (valid4) {
                                    if (data11.debounceTime !== undefined) {
                                        let data13 = data11.debounceTime;
                                        const _errs27 = errors;
                                        if (!((typeof data13 == "number") && (isFinite(data13)))) {
                                            validate18.errors = [{ instancePath: instancePath + "/trigger/debounceTime", schemaPath: "#/properties/trigger/properties/debounceTime/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                            return false;
                                        }
                                        var valid4 = _errs27 === errors;
                                    }
                                    else {
                                        var valid4 = true;
                                    }
                                }
                            }
                            else {
                                validate18.errors = [{ instancePath: instancePath + "/trigger", schemaPath: "#/properties/trigger/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                            }
                        }
                        var valid0 = _errs23 === errors;
                    }
                    else {
                        var valid0 = true;
                    }
                    if (valid0) {
                        if (data.filter !== undefined) {
                            let data14 = data.filter;
                            const _errs29 = errors;
                            if (errors === _errs29) {
                                if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                                    if (data14.by !== undefined) {
                                        const _errs31 = errors;
                                        if (typeof data14.by !== "string") {
                                            validate18.errors = [{ instancePath: instancePath + "/filter/by", schemaPath: "#/properties/filter/properties/by/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                        }
                                        var valid5 = _errs31 === errors;
                                    }
                                    else {
                                        var valid5 = true;
                                    }
                                    if (valid5) {
                                        if (data14.conditions !== undefined) {
                                            const _errs33 = errors;
                                            if (!(validate19(data14.conditions, { instancePath: instancePath + "/filter/conditions", parentData: data14, parentDataProperty: "conditions", rootData }))) {
                                                vErrors = vErrors === null ? validate19.errors : vErrors.concat(validate19.errors);
                                                errors = vErrors.length;
                                            }
                                            var valid5 = _errs33 === errors;
                                        }
                                        else {
                                            var valid5 = true;
                                        }
                                        if (valid5) {
                                            if (data14.debounceTime !== undefined) {
                                                let data17 = data14.debounceTime;
                                                const _errs34 = errors;
                                                if (!((typeof data17 == "number") && (isFinite(data17)))) {
                                                    validate18.errors = [{ instancePath: instancePath + "/filter/debounceTime", schemaPath: "#/properties/filter/properties/debounceTime/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                                    return false;
                                                }
                                                var valid5 = _errs34 === errors;
                                            }
                                            else {
                                                var valid5 = true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    validate18.errors = [{ instancePath: instancePath + "/filter", schemaPath: "#/properties/filter/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                    return false;
                                }
                            }
                            var valid0 = _errs29 === errors;
                        }
                        else {
                            var valid0 = true;
                        }
                    }
                }
            }
        }
    }
    else {
        validate18.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate18.errors = vErrors; return errors === 0; }
function validate17(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigOptionsSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.data !== undefined) {
            let data0 = data.data;
            const _errs1 = errors;
            if (errors === _errs1) {
                if (Array.isArray(data0)) {
                    var valid1 = true;
                    const len0 = data0.length;
                    for (let i0 = 0; i0 < len0; i0++) {
                        let data1 = data0[i0];
                        const _errs3 = errors;
                        if (errors === _errs3) {
                            if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
                                if (data1.label !== undefined) {
                                    if (typeof data1.label !== "string") {
                                        validate17.errors = [{ instancePath: instancePath + "/data/" + i0 + "/label", schemaPath: "#/properties/data/items/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                    }
                                }
                            }
                            else {
                                validate17.errors = [{ instancePath: instancePath + "/data/" + i0, schemaPath: "#/properties/data/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                            }
                        }
                        var valid1 = _errs3 === errors;
                        if (!valid1) {
                            break;
                        }
                    }
                }
                else {
                    validate17.errors = [{ instancePath: instancePath + "/data", schemaPath: "#/properties/data/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                }
            }
            var valid0 = _errs1 === errors;
        }
        else {
            var valid0 = true;
        }
        if (valid0) {
            if (data.src !== undefined) {
                let data3 = data.src;
                const _errs7 = errors;
                const _errs8 = errors;
                let valid3 = false;
                let passing0 = null;
                const _errs9 = errors;
                if (typeof data3 !== "string") {
                    const err0 = { instancePath: instancePath + "/src", schemaPath: "#/properties/src/oneOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                        vErrors = [err0];
                    }
                    else {
                        vErrors.push(err0);
                    }
                    errors++;
                }
                var _valid0 = _errs9 === errors;
                if (_valid0) {
                    valid3 = true;
                    passing0 = 0;
                }
                const _errs11 = errors;
                if (!(validate18(data3, { instancePath: instancePath + "/src", parentData: data, parentDataProperty: "src", rootData }))) {
                    vErrors = vErrors === null ? validate18.errors : vErrors.concat(validate18.errors);
                    errors = vErrors.length;
                }
                var _valid0 = _errs11 === errors;
                if (_valid0 && valid3) {
                    valid3 = false;
                    passing0 = [passing0, 1];
                }
                else {
                    if (_valid0) {
                        valid3 = true;
                        passing0 = 1;
                    }
                }
                if (!valid3) {
                    const err1 = { instancePath: instancePath + "/src", schemaPath: "#/properties/src/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                    if (vErrors === null) {
                        vErrors = [err1];
                    }
                    else {
                        vErrors.push(err1);
                    }
                    errors++;
                    validate17.errors = vErrors;
                    return false;
                }
                else {
                    errors = _errs8;
                    if (vErrors !== null) {
                        if (_errs8) {
                            vErrors.length = _errs8;
                        }
                        else {
                            vErrors = null;
                        }
                    }
                }
                var valid0 = _errs7 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data.srcAppendPosition !== undefined) {
                    let data4 = data.srcAppendPosition;
                    const _errs12 = errors;
                    if (typeof data4 !== "string") {
                        validate17.errors = [{ instancePath: instancePath + "/srcAppendPosition", schemaPath: "#/properties/srcAppendPosition/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                    }
                    if (!((data4 === "after") || (data4 === "before"))) {
                        validate17.errors = [{ instancePath: instancePath + "/srcAppendPosition", schemaPath: "#/properties/srcAppendPosition/enum", keyword: "enum", params: { allowedValues: schema16.properties.srcAppendPosition.enum }, message: "must be equal to one of the allowed values" }];
                        return false;
                    }
                    var valid0 = _errs12 === errors;
                }
                else {
                    var valid0 = true;
                }
                if (valid0) {
                    if (data.autoSelectFirst !== undefined) {
                        const _errs14 = errors;
                        if (typeof data.autoSelectFirst !== "boolean") {
                            validate17.errors = [{ instancePath: instancePath + "/autoSelectFirst", schemaPath: "#/properties/autoSelectFirst/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                            return false;
                        }
                        var valid0 = _errs14 === errors;
                    }
                    else {
                        var valid0 = true;
                    }
                    if (valid0) {
                        if (data.layout !== undefined) {
                            let data6 = data.layout;
                            const _errs16 = errors;
                            if (typeof data6 !== "string") {
                                validate17.errors = [{ instancePath: instancePath + "/layout", schemaPath: "#/properties/layout/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                            }
                            if (!((data6 === "row") || (data6 === "column"))) {
                                validate17.errors = [{ instancePath: instancePath + "/layout", schemaPath: "#/properties/layout/enum", keyword: "enum", params: { allowedValues: schema16.properties.layout.enum }, message: "must be equal to one of the allowed values" }];
                                return false;
                            }
                            var valid0 = _errs16 === errors;
                        }
                        else {
                            var valid0 = true;
                        }
                        if (valid0) {
                            if (data.labelPosition !== undefined) {
                                let data7 = data.labelPosition;
                                const _errs18 = errors;
                                if (typeof data7 !== "string") {
                                    validate17.errors = [{ instancePath: instancePath + "/labelPosition", schemaPath: "#/properties/labelPosition/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                }
                                if (!((data7 === "after") || (data7 === "before"))) {
                                    validate17.errors = [{ instancePath: instancePath + "/labelPosition", schemaPath: "#/properties/labelPosition/enum", keyword: "enum", params: { allowedValues: schema16.properties.labelPosition.enum }, message: "must be equal to one of the allowed values" }];
                                    return false;
                                }
                                var valid0 = _errs18 === errors;
                            }
                            else {
                                var valid0 = true;
                            }
                            if (valid0) {
                                if (data.containerClass !== undefined) {
                                    const _errs20 = errors;
                                    if (typeof data.containerClass !== "string") {
                                        validate17.errors = [{ instancePath: instancePath + "/containerClass", schemaPath: "#/properties/containerClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                    }
                                    var valid0 = _errs20 === errors;
                                }
                                else {
                                    var valid0 = true;
                                }
                                if (valid0) {
                                    if (data.containerStyles !== undefined) {
                                        const _errs22 = errors;
                                        if (typeof data.containerStyles !== "string") {
                                            validate17.errors = [{ instancePath: instancePath + "/containerStyles", schemaPath: "#/properties/containerStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                        }
                                        var valid0 = _errs22 === errors;
                                    }
                                    else {
                                        var valid0 = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        validate17.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate17.errors = vErrors; return errors === 0; }
const ConfigValidatorsSchema = validate24;
const schema19 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigValidatorsSchema", "type": "array", "items": { "type": "object", "properties": { "name": { "type": "string" }, "message": { "type": "string" }, "flags": { "type": "string" }, "value": {} } } };
function validate24(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigValidatorsSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (Array.isArray(data)) {
        var valid0 = true;
        const len0 = data.length;
        for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            if (errors === _errs1) {
                if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
                    if (data0.name !== undefined) {
                        const _errs3 = errors;
                        if (typeof data0.name !== "string") {
                            validate24.errors = [{ instancePath: instancePath + "/" + i0 + "/name", schemaPath: "#/items/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                        }
                        var valid1 = _errs3 === errors;
                    }
                    else {
                        var valid1 = true;
                    }
                    if (valid1) {
                        if (data0.message !== undefined) {
                            const _errs5 = errors;
                            if (typeof data0.message !== "string") {
                                validate24.errors = [{ instancePath: instancePath + "/" + i0 + "/message", schemaPath: "#/items/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                            }
                            var valid1 = _errs5 === errors;
                        }
                        else {
                            var valid1 = true;
                        }
                        if (valid1) {
                            if (data0.flags !== undefined) {
                                const _errs7 = errors;
                                if (typeof data0.flags !== "string") {
                                    validate24.errors = [{ instancePath: instancePath + "/" + i0 + "/flags", schemaPath: "#/items/properties/flags/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                }
                                var valid1 = _errs7 === errors;
                            }
                            else {
                                var valid1 = true;
                            }
                        }
                    }
                }
                else {
                    validate24.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                    return false;
                }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
                break;
            }
        }
    }
    else {
        validate24.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
    }
} validate24.errors = vErrors; return errors === 0; }
const ConfigMainSchema = validate25;
const schema20 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigMainSchema", "type": "array", "items": { "type": "object", "properties": { "formControlName": { "type": "string" }, "asyncValidators": { "$ref": "ConfigValidatorsSchema" }, "conditions": { "$ref": "ConfigConditionsSchema" }, "children": { "$ref": "#" }, "description": { "type": "string" }, "props": {}, "hidden": { "type": "boolean" }, "label": { "type": "string" }, "layout": { "$ref": "ConfigLayoutSchema" }, "inputMask": {}, "options": { "$ref": "ConfigOptionsSchema" }, "readonly": { "type": "boolean" }, "type": { "type": "string" }, "value": {}, "validators": { "$ref": "ConfigValidatorsSchema" } }, "required": ["formControlName"] } };
function validate25(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigMainSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (Array.isArray(data)) {
        var valid0 = true;
        const len0 = data.length;
        for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            if (errors === _errs1) {
                if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
                    let missing0;
                    if ((data0.formControlName === undefined) && (missing0 = "formControlName")) {
                        validate25.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/items/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
                        return false;
                    }
                    else {
                        if (data0.formControlName !== undefined) {
                            const _errs3 = errors;
                            if (typeof data0.formControlName !== "string") {
                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/formControlName", schemaPath: "#/items/properties/formControlName/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                            }
                            var valid1 = _errs3 === errors;
                        }
                        else {
                            var valid1 = true;
                        }
                        if (valid1) {
                            if (data0.asyncValidators !== undefined) {
                                let data2 = data0.asyncValidators;
                                const _errs5 = errors;
                                const _errs6 = errors;
                                if (errors === _errs6) {
                                    if (Array.isArray(data2)) {
                                        var valid3 = true;
                                        const len1 = data2.length;
                                        for (let i1 = 0; i1 < len1; i1++) {
                                            let data3 = data2[i1];
                                            const _errs8 = errors;
                                            if (errors === _errs8) {
                                                if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                                                    if (data3.name !== undefined) {
                                                        const _errs10 = errors;
                                                        if (typeof data3.name !== "string") {
                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators/" + i1 + "/name", schemaPath: "ConfigValidatorsSchema/items/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                        }
                                                        var valid4 = _errs10 === errors;
                                                    }
                                                    else {
                                                        var valid4 = true;
                                                    }
                                                    if (valid4) {
                                                        if (data3.message !== undefined) {
                                                            const _errs12 = errors;
                                                            if (typeof data3.message !== "string") {
                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators/" + i1 + "/message", schemaPath: "ConfigValidatorsSchema/items/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                            }
                                                            var valid4 = _errs12 === errors;
                                                        }
                                                        else {
                                                            var valid4 = true;
                                                        }
                                                        if (valid4) {
                                                            if (data3.flags !== undefined) {
                                                                const _errs14 = errors;
                                                                if (typeof data3.flags !== "string") {
                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators/" + i1 + "/flags", schemaPath: "ConfigValidatorsSchema/items/properties/flags/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                    return false;
                                                                }
                                                                var valid4 = _errs14 === errors;
                                                            }
                                                            else {
                                                                var valid4 = true;
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators/" + i1, schemaPath: "ConfigValidatorsSchema/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                    return false;
                                                }
                                            }
                                            var valid3 = _errs8 === errors;
                                            if (!valid3) {
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators", schemaPath: "ConfigValidatorsSchema/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                    }
                                }
                                var valid1 = _errs5 === errors;
                            }
                            else {
                                var valid1 = true;
                            }
                            if (valid1) {
                                if (data0.conditions !== undefined) {
                                    const _errs16 = errors;
                                    if (!(validate10(data0.conditions, { instancePath: instancePath + "/" + i0 + "/conditions", parentData: data0, parentDataProperty: "conditions", rootData }))) {
                                        vErrors = vErrors === null ? validate10.errors : vErrors.concat(validate10.errors);
                                        errors = vErrors.length;
                                    }
                                    var valid1 = _errs16 === errors;
                                }
                                else {
                                    var valid1 = true;
                                }
                                if (valid1) {
                                    if (data0.children !== undefined) {
                                        const _errs17 = errors;
                                        if (!(validate25(data0.children, { instancePath: instancePath + "/" + i0 + "/children", parentData: data0, parentDataProperty: "children", rootData }))) {
                                            vErrors = vErrors === null ? validate25.errors : vErrors.concat(validate25.errors);
                                            errors = vErrors.length;
                                        }
                                        var valid1 = _errs17 === errors;
                                    }
                                    else {
                                        var valid1 = true;
                                    }
                                    if (valid1) {
                                        if (data0.description !== undefined) {
                                            const _errs18 = errors;
                                            if (typeof data0.description !== "string") {
                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/description", schemaPath: "#/items/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                            }
                                            var valid1 = _errs18 === errors;
                                        }
                                        else {
                                            var valid1 = true;
                                        }
                                        if (valid1) {
                                            if (data0.hidden !== undefined) {
                                                const _errs20 = errors;
                                                if (typeof data0.hidden !== "boolean") {
                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/hidden", schemaPath: "#/items/properties/hidden/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                    return false;
                                                }
                                                var valid1 = _errs20 === errors;
                                            }
                                            else {
                                                var valid1 = true;
                                            }
                                            if (valid1) {
                                                if (data0.label !== undefined) {
                                                    const _errs22 = errors;
                                                    if (typeof data0.label !== "string") {
                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/label", schemaPath: "#/items/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                        return false;
                                                    }
                                                    var valid1 = _errs22 === errors;
                                                }
                                                else {
                                                    var valid1 = true;
                                                }
                                                if (valid1) {
                                                    if (data0.layout !== undefined) {
                                                        let data12 = data0.layout;
                                                        const _errs24 = errors;
                                                        const _errs25 = errors;
                                                        if (errors === _errs25) {
                                                            if (data12 && typeof data12 == "object" && !Array.isArray(data12)) {
                                                                if (data12.hostClass !== undefined) {
                                                                    const _errs27 = errors;
                                                                    if (typeof data12.hostClass !== "string") {
                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/hostClass", schemaPath: "ConfigLayoutSchema/properties/hostClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                        return false;
                                                                    }
                                                                    var valid6 = _errs27 === errors;
                                                                }
                                                                else {
                                                                    var valid6 = true;
                                                                }
                                                                if (valid6) {
                                                                    if (data12.hostStyles !== undefined) {
                                                                        const _errs29 = errors;
                                                                        if (typeof data12.hostStyles !== "string") {
                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/hostStyles", schemaPath: "ConfigLayoutSchema/properties/hostStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                            return false;
                                                                        }
                                                                        var valid6 = _errs29 === errors;
                                                                    }
                                                                    else {
                                                                        var valid6 = true;
                                                                    }
                                                                    if (valid6) {
                                                                        if (data12.labelClass !== undefined) {
                                                                            const _errs31 = errors;
                                                                            if (typeof data12.labelClass !== "string") {
                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/labelClass", schemaPath: "ConfigLayoutSchema/properties/labelClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                return false;
                                                                            }
                                                                            var valid6 = _errs31 === errors;
                                                                        }
                                                                        else {
                                                                            var valid6 = true;
                                                                        }
                                                                        if (valid6) {
                                                                            if (data12.labelStyles !== undefined) {
                                                                                const _errs33 = errors;
                                                                                if (typeof data12.labelStyles !== "string") {
                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/labelStyles", schemaPath: "ConfigLayoutSchema/properties/labelStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                    return false;
                                                                                }
                                                                                var valid6 = _errs33 === errors;
                                                                            }
                                                                            else {
                                                                                var valid6 = true;
                                                                            }
                                                                            if (valid6) {
                                                                                if (data12.contentClass !== undefined) {
                                                                                    const _errs35 = errors;
                                                                                    if (typeof data12.contentClass !== "string") {
                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/contentClass", schemaPath: "ConfigLayoutSchema/properties/contentClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                        return false;
                                                                                    }
                                                                                    var valid6 = _errs35 === errors;
                                                                                }
                                                                                else {
                                                                                    var valid6 = true;
                                                                                }
                                                                                if (valid6) {
                                                                                    if (data12.contentStyles !== undefined) {
                                                                                        const _errs37 = errors;
                                                                                        if (typeof data12.contentStyles !== "string") {
                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/contentStyles", schemaPath: "ConfigLayoutSchema/properties/contentStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                            return false;
                                                                                        }
                                                                                        var valid6 = _errs37 === errors;
                                                                                    }
                                                                                    else {
                                                                                        var valid6 = true;
                                                                                    }
                                                                                    if (valid6) {
                                                                                        if (data12.formGroupClass !== undefined) {
                                                                                            const _errs39 = errors;
                                                                                            if (typeof data12.formGroupClass !== "string") {
                                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/formGroupClass", schemaPath: "ConfigLayoutSchema/properties/formGroupClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                return false;
                                                                                            }
                                                                                            var valid6 = _errs39 === errors;
                                                                                        }
                                                                                        else {
                                                                                            var valid6 = true;
                                                                                        }
                                                                                        if (valid6) {
                                                                                            if (data12.formGroupStyles !== undefined) {
                                                                                                const _errs41 = errors;
                                                                                                if (typeof data12.formGroupStyles !== "string") {
                                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/formGroupStyles", schemaPath: "ConfigLayoutSchema/properties/formGroupStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                    return false;
                                                                                                }
                                                                                                var valid6 = _errs41 === errors;
                                                                                            }
                                                                                            else {
                                                                                                var valid6 = true;
                                                                                            }
                                                                                            if (valid6) {
                                                                                                if (data12.descriptionClass !== undefined) {
                                                                                                    const _errs43 = errors;
                                                                                                    if (typeof data12.descriptionClass !== "string") {
                                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/descriptionClass", schemaPath: "ConfigLayoutSchema/properties/descriptionClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                        return false;
                                                                                                    }
                                                                                                    var valid6 = _errs43 === errors;
                                                                                                }
                                                                                                else {
                                                                                                    var valid6 = true;
                                                                                                }
                                                                                                if (valid6) {
                                                                                                    if (data12.descriptionStyles !== undefined) {
                                                                                                        const _errs45 = errors;
                                                                                                        if (typeof data12.descriptionStyles !== "string") {
                                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/descriptionStyles", schemaPath: "ConfigLayoutSchema/properties/descriptionStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                            return false;
                                                                                                        }
                                                                                                        var valid6 = _errs45 === errors;
                                                                                                    }
                                                                                                    else {
                                                                                                        var valid6 = true;
                                                                                                    }
                                                                                                    if (valid6) {
                                                                                                        if (data12.inputAreaClass !== undefined) {
                                                                                                            const _errs47 = errors;
                                                                                                            if (typeof data12.inputAreaClass !== "string") {
                                                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/inputAreaClass", schemaPath: "ConfigLayoutSchema/properties/inputAreaClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                                return false;
                                                                                                            }
                                                                                                            var valid6 = _errs47 === errors;
                                                                                                        }
                                                                                                        else {
                                                                                                            var valid6 = true;
                                                                                                        }
                                                                                                        if (valid6) {
                                                                                                            if (data12.inputAreaStyles !== undefined) {
                                                                                                                const _errs49 = errors;
                                                                                                                if (typeof data12.inputAreaStyles !== "string") {
                                                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/inputAreaStyles", schemaPath: "ConfigLayoutSchema/properties/inputAreaStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                                    return false;
                                                                                                                }
                                                                                                                var valid6 = _errs49 === errors;
                                                                                                            }
                                                                                                            else {
                                                                                                                var valid6 = true;
                                                                                                            }
                                                                                                            if (valid6) {
                                                                                                                if (data12.errorClass !== undefined) {
                                                                                                                    const _errs51 = errors;
                                                                                                                    if (typeof data12.errorClass !== "string") {
                                                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/errorClass", schemaPath: "ConfigLayoutSchema/properties/errorClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                                        return false;
                                                                                                                    }
                                                                                                                    var valid6 = _errs51 === errors;
                                                                                                                }
                                                                                                                else {
                                                                                                                    var valid6 = true;
                                                                                                                }
                                                                                                                if (valid6) {
                                                                                                                    if (data12.errorStyles !== undefined) {
                                                                                                                        const _errs53 = errors;
                                                                                                                        if (typeof data12.errorStyles !== "string") {
                                                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/errorStyles", schemaPath: "ConfigLayoutSchema/properties/errorStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                                            return false;
                                                                                                                        }
                                                                                                                        var valid6 = _errs53 === errors;
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        var valid6 = true;
                                                                                                                    }
                                                                                                                    if (valid6) {
                                                                                                                        if (data12.descriptionPosition !== undefined) {
                                                                                                                            let data27 = data12.descriptionPosition;
                                                                                                                            const _errs55 = errors;
                                                                                                                            if (!((data27 === "after") || (data27 === "before"))) {
                                                                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/descriptionPosition", schemaPath: "ConfigLayoutSchema/properties/descriptionPosition/enum", keyword: "enum", params: { allowedValues: schema15.properties.descriptionPosition.enum }, message: "must be equal to one of the allowed values" }];
                                                                                                                                return false;
                                                                                                                            }
                                                                                                                            var valid6 = _errs55 === errors;
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            var valid6 = true;
                                                                                                                        }
                                                                                                                        if (valid6) {
                                                                                                                            if (data12.hideLabel !== undefined) {
                                                                                                                                const _errs56 = errors;
                                                                                                                                if (typeof data12.hideLabel !== "boolean") {
                                                                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/hideLabel", schemaPath: "ConfigLayoutSchema/properties/hideLabel/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                                                                    return false;
                                                                                                                                }
                                                                                                                                var valid6 = _errs56 === errors;
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                var valid6 = true;
                                                                                                                            }
                                                                                                                            if (valid6) {
                                                                                                                                if (data12.contentCollapsible !== undefined) {
                                                                                                                                    let data29 = data12.contentCollapsible;
                                                                                                                                    const _errs58 = errors;
                                                                                                                                    if (!((data29 === "collapse") || (data29 === "expand"))) {
                                                                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/contentCollapsible", schemaPath: "ConfigLayoutSchema/properties/contentCollapsible/enum", keyword: "enum", params: { allowedValues: schema15.properties.contentCollapsible.enum }, message: "must be equal to one of the allowed values" }];
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    var valid6 = _errs58 === errors;
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    var valid6 = true;
                                                                                                                                }
                                                                                                                                if (valid6) {
                                                                                                                                    if (data12.autoAddRequiredClass !== undefined) {
                                                                                                                                        const _errs59 = errors;
                                                                                                                                        if (typeof data12.autoAddRequiredClass !== "boolean") {
                                                                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/autoAddRequiredClass", schemaPath: "ConfigLayoutSchema/properties/autoAddRequiredClass/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                                                                            return false;
                                                                                                                                        }
                                                                                                                                        var valid6 = _errs59 === errors;
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        var valid6 = true;
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout", schemaPath: "ConfigLayoutSchema/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                                return false;
                                                            }
                                                        }
                                                        var valid1 = _errs24 === errors;
                                                    }
                                                    else {
                                                        var valid1 = true;
                                                    }
                                                    if (valid1) {
                                                        if (data0.options !== undefined) {
                                                            const _errs61 = errors;
                                                            if (!(validate17(data0.options, { instancePath: instancePath + "/" + i0 + "/options", parentData: data0, parentDataProperty: "options", rootData }))) {
                                                                vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
                                                                errors = vErrors.length;
                                                            }
                                                            var valid1 = _errs61 === errors;
                                                        }
                                                        else {
                                                            var valid1 = true;
                                                        }
                                                        if (valid1) {
                                                            if (data0.readonly !== undefined) {
                                                                const _errs62 = errors;
                                                                if (typeof data0.readonly !== "boolean") {
                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/readonly", schemaPath: "#/items/properties/readonly/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                    return false;
                                                                }
                                                                var valid1 = _errs62 === errors;
                                                            }
                                                            else {
                                                                var valid1 = true;
                                                            }
                                                            if (valid1) {
                                                                if (data0.type !== undefined) {
                                                                    const _errs64 = errors;
                                                                    if (typeof data0.type !== "string") {
                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/type", schemaPath: "#/items/properties/type/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                        return false;
                                                                    }
                                                                    var valid1 = _errs64 === errors;
                                                                }
                                                                else {
                                                                    var valid1 = true;
                                                                }
                                                                if (valid1) {
                                                                    if (data0.validators !== undefined) {
                                                                        let data34 = data0.validators;
                                                                        const _errs66 = errors;
                                                                        const _errs67 = errors;
                                                                        if (errors === _errs67) {
                                                                            if (Array.isArray(data34)) {
                                                                                var valid8 = true;
                                                                                const len2 = data34.length;
                                                                                for (let i2 = 0; i2 < len2; i2++) {
                                                                                    let data35 = data34[i2];
                                                                                    const _errs69 = errors;
                                                                                    if (errors === _errs69) {
                                                                                        if (data35 && typeof data35 == "object" && !Array.isArray(data35)) {
                                                                                            if (data35.name !== undefined) {
                                                                                                const _errs71 = errors;
                                                                                                if (typeof data35.name !== "string") {
                                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators/" + i2 + "/name", schemaPath: "ConfigValidatorsSchema/items/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                    return false;
                                                                                                }
                                                                                                var valid9 = _errs71 === errors;
                                                                                            }
                                                                                            else {
                                                                                                var valid9 = true;
                                                                                            }
                                                                                            if (valid9) {
                                                                                                if (data35.message !== undefined) {
                                                                                                    const _errs73 = errors;
                                                                                                    if (typeof data35.message !== "string") {
                                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators/" + i2 + "/message", schemaPath: "ConfigValidatorsSchema/items/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                        return false;
                                                                                                    }
                                                                                                    var valid9 = _errs73 === errors;
                                                                                                }
                                                                                                else {
                                                                                                    var valid9 = true;
                                                                                                }
                                                                                                if (valid9) {
                                                                                                    if (data35.flags !== undefined) {
                                                                                                        const _errs75 = errors;
                                                                                                        if (typeof data35.flags !== "string") {
                                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators/" + i2 + "/flags", schemaPath: "ConfigValidatorsSchema/items/properties/flags/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                            return false;
                                                                                                        }
                                                                                                        var valid9 = _errs75 === errors;
                                                                                                    }
                                                                                                    else {
                                                                                                        var valid9 = true;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators/" + i2, schemaPath: "ConfigValidatorsSchema/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                                                            return false;
                                                                                        }
                                                                                    }
                                                                                    var valid8 = _errs69 === errors;
                                                                                    if (!valid8) {
                                                                                        break;
                                                                                    }
                                                                                }
                                                                            }
                                                                            else {
                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators", schemaPath: "ConfigValidatorsSchema/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                                                return false;
                                                                            }
                                                                        }
                                                                        var valid1 = _errs66 === errors;
                                                                    }
                                                                    else {
                                                                        var valid1 = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    validate25.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                    return false;
                }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
                break;
            }
        }
    }
    else {
        validate25.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
    }
} validate25.errors = vErrors; return errors === 0; }

const validate = ConfigMainSchema;
class ConfigValidationService {
    constructor() {
        this._configMappingService = inject(ConfigMappingService);
    }
    validateAndGetConfig(input) {
        const failedResult = {
            configs: null,
            errors: [{ errors: 'No configs found' }],
        };
        if (Array.isArray(input)) {
            if (!validate(input)) {
                failedResult.errors = (validate.errors || []).map((x) => this._getBeautifyErrors(x, input));
                return failedResult;
            }
            const configsGet = input
                .filter(Boolean)
                .map((x) => this._configMappingService.getCorrectedConfig(x));
            return { configs: configsGet };
        }
        if (typeof input === 'string') {
            try {
                const data = JSON.parse(input);
                return this.validateAndGetConfig(data);
            }
            catch (err) {
                failedResult.errors = [
                    {
                        // https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
                        errors: JSON.stringify(err, Object.getOwnPropertyNames(err), 4),
                    },
                ];
                return failedResult;
            }
        }
        return failedResult;
    }
    _getBeautifyErrors(err, configs) {
        const paths = err.instancePath.substring(1).split('/');
        const lastSegment = paths[paths.length - 1];
        const isObject = new RegExp(/^\d+$/).test(lastSegment);
        const configPath = isObject ? paths.join('.') : paths[paths.length - 2];
        const config = getValueInObject(configs, configPath);
        const errorMessage = isObject
            ? err.message ?? ''
            : `"${lastSegment}" ${err.message}`;
        return {
            errors: errorMessage,
            config,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfigValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfigValidationService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfigValidationService, decorators: [{
            type: Injectable
        }] });

function evaluateConditionsStatements(conditionsGroup, mapTuppleFn) {
    if (!conditionsGroup['&&'] && !conditionsGroup['||']) {
        return undefined;
    }
    const groupOperator = conditionsGroup['&&'] ? '&&' : '||';
    const conditionsGroupItems = conditionsGroup[groupOperator];
    const childrenStatementsResult = conditionsGroupItems
        .filter((x) => !Array.isArray(x))
        .map((x) => x)
        .map((x) => evaluateConditionsStatements(x, mapTuppleFn));
    const statementsResult = conditionsGroupItems
        .filter((x) => Array.isArray(x))
        .map((x) => x)
        .map((x) => {
        const [left, operator, right] = mapTuppleFn(x);
        const result = evaluateBooleanOperation([left, operator, right]);
        return result;
    });
    const bools = childrenStatementsResult
        .concat(statementsResult)
        .filter((x) => x !== undefined);
    return groupOperator === '&&' ? bools.every(Boolean) : bools.some(Boolean);
}

/**Parse the given path, return the correct control path and the value path if present.
 *
 * @example
 * "controlA"
 * return { controlPath: "controlA" }
 *
 * "controlA,obj.prop1"
 * return { controlPath: "controlA", valuePath: "obj.prop1" }
 *
 * "controlA,obj.[,===,A].prop2"
 * return { controlPath: "controlA", valuePath: "obj.[,===,A].prop2" }
 */
function getControlAndValuePath(path) {
    const paths = path
        .trim()
        .split(/(,(?![^\[]*\]))/)
        .filter((x) => x !== ',');
    return {
        controlPath: paths[0].trim(),
        ...(paths.length > 1 && {
            valuePath: paths[1],
        }),
    };
}

class GlobalVariableService {
    constructor() {
        this.hideErrorMessage$ = new BehaviorSubject(undefined);
        this.rootConfigs = [];
        this.showErrorsOnTouched = true;
    }
    // ======================================================================
    setup(variables) {
        for (const key in variables) {
            this[key] = variables[key];
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GlobalVariableService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GlobalVariableService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GlobalVariableService, decorators: [{
            type: Injectable
        }] });

function emailValidator(control) {
    const emailValid = RegExp(/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/).test(control.value);
    if (!control.value) {
        return null;
    }
    return emailValid ? null : { email: 'Invalid email format' };
}
const builtInValidators = (value) => ({
    [ValidatorsEnum.required]: Validators.required,
    [ValidatorsEnum.requiredTrue]: Validators.requiredTrue,
    [ValidatorsEnum.email]: emailValidator,
    [ValidatorsEnum.pattern]: Validators.pattern(value),
    [ValidatorsEnum.min]: Validators.min(value),
    [ValidatorsEnum.max]: Validators.max(value),
    [ValidatorsEnum.minLength]: Validators.minLength(value),
    [ValidatorsEnum.maxLength]: Validators.maxLength(value),
});
class FormValidationService {
    constructor() {
        this._globalVariableService = inject(GlobalVariableService);
    }
    getErrorMessages$(control, validators) {
        if (!control || !validators?.length) {
            return EMPTY;
        }
        return control.statusChanges.pipe(startWith(control.status), map(() => this._getErrorMessages(control.errors, control.value, validators)));
    }
    getValidators(input) {
        if (!input || !input.length) {
            return [];
        }
        // Remove duplicates
        const filteredConfigs = [
            ...new Map(input.map((v) => [v.name, v])).values(),
        ];
        const customValidators = this._globalVariableService.customValidators;
        const validatorFns = filteredConfigs.map((item) => {
            const { name } = item;
            const value = this._getValidatorValue(item);
            const builtInValidator = builtInValidators(value)[name];
            const customValidator = this._getValidatorFn(item, customValidators?.[name]);
            const result = customValidator ?? builtInValidator;
            return result;
        });
        return validatorFns.filter(Boolean);
    }
    getAsyncValidators(input) {
        if (!input || !input.length) {
            return [];
        }
        // Remove duplicates
        const filteredConfigs = [
            ...new Map(input.map((v) => [v.name, v])).values(),
        ];
        const customAsyncValidators = this._globalVariableService.customAsyncValidators;
        const validatorFns = filteredConfigs.map((item) => {
            const validatorFn = customAsyncValidators?.[item.name];
            return this._getValidatorFn(item, validatorFn);
        });
        return validatorFns.filter(Boolean);
    }
    /**Get the error messages of the control
     *
     * @description
     * Try to get the custom error message specified in the config first,
     * else use the error message in the `ValidationErrors`.
     *
     * When using custom validator, the custom message most likely will not working,
     * it's because we are using the key in the errors to find the config message.
     * Since user can define the error object, it becomes very difficult to match the config name
     * with the keys in the error object.
     */
    _getErrorMessages(controlErrors, controlValue, validatorConfigs) {
        if (!controlErrors) {
            return [];
        }
        const errorMessage = (error) => {
            return typeof error === 'string' ? error : JSON.stringify(error);
        };
        return Object.keys(controlErrors).reduce((acc, key) => {
            const error = controlErrors[key];
            const config = this._getConfigFromErrorKey({ [key]: error }, validatorConfigs);
            const configMessage = config?.message;
            const defaultMessage = this._globalVariableService.validationMessages?.[config?.name ?? ''];
            const customMessage = (configMessage || defaultMessage)
                ?.replace(/{{value}}/g, controlValue || '')
                .replace(/{{validatorValue}}/g, config?.value);
            acc.push(customMessage || errorMessage(error));
            return acc;
        }, []);
    }
    _getConfigFromErrorKey(error, configs) {
        // The key mapping of the `ValidationErrors` with the `ValidatorConfig`,
        // to let us get the correct message by using `name` of `ValidatorConfig`.
        const valueKeyMapping = {
            pattern: 'requiredPattern',
            min: 'min',
            max: 'max',
            minLength: 'requiredLength',
            maxLength: 'requiredLength',
        };
        const getValidatorValue = (v) => {
            return typeof v !== 'number' && !isNaN(v) ? parseFloat(v) : v;
        };
        const [errorKey, errorValue] = Object.entries(error)[0];
        const result = configs.find((item) => {
            const { name, value } = item;
            if (errorKey !== name.toLowerCase()) {
                return false;
            }
            if (value === undefined || value === null || value === '') {
                return true;
            }
            const targetKey = valueKeyMapping[name] ?? '';
            const requiredValue = errorValue[targetKey];
            const validatorValue = getValidatorValue(value);
            return requiredValue && name === 'pattern'
                ? requiredValue.includes(validatorValue)
                : requiredValue === validatorValue;
        });
        return result;
    }
    _getValidatorValue(validatorConfig) {
        const { name, value, flags } = validatorConfig;
        switch (name) {
            case ValidatorsEnum.pattern:
                return value instanceof RegExp ? value : new RegExp(value, flags);
            case ValidatorsEnum.min:
            case ValidatorsEnum.max:
            case ValidatorsEnum.minLength:
            case ValidatorsEnum.maxLength:
                try {
                    return typeof value !== 'number' ? parseFloat(value) : value;
                }
                catch {
                    break;
                }
            default:
                return value;
        }
    }
    /**
     * Get validatorFn from either validatorFn or factory function that return a validatorFn.
     * If it's a factory function, return the validatorFn instead.
     *
     * @param validatorConfig
     * @param validatorFn
     */
    _getValidatorFn(validatorConfig, validatorFn) {
        const { value } = validatorConfig;
        if (!validatorFn) {
            return null;
        }
        const result = typeof validatorFn({}) !== 'function'
            ? validatorFn
            : validatorFn(value);
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValidationService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValidationService, decorators: [{
            type: Injectable
        }] });

class FormConditionsService {
    constructor() {
        this._globalVariableService = inject(GlobalVariableService);
        this._formValidationService = inject(FormValidationService);
    }
    /**Listen to the controls that specified in `conditions` to trigger the `targetControl` status and validators
     * @param form The root form
     * @param configs The JSON data
     */
    listenConditions$() {
        const configs = this._globalVariableService.rootConfigs;
        const form = this._globalVariableService.rootForm;
        if (!configs.length || !form || typeof window === 'undefined') {
            return of(null);
        }
        const controls = this._getPathsOfControlsToListen(configs)
            .map((x) => form.get(x))
            .filter(Boolean);
        const configsWithConditions = this._configsWithConditions(configs);
        const valueChanges$ = (c) => c.valueChanges.pipe(startWith(c.value), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
        // Should avoid using debounceTime() here, as it will cause flickers when toggle the visibility
        );
        return from(controls).pipe(mergeMap((x) => valueChanges$(x)), tap(() => this._handleValueChanges(configsWithConditions)));
    }
    _handleValueChanges(data) {
        const form = this._globalVariableService.rootForm;
        if (!form)
            return;
        for (const key in data) {
            const control = form.get(key);
            if (!control)
                continue;
            const config = data[key];
            const conditions = config.conditions;
            this._executeCustomActions(conditions, control);
            this._toggleValidators(config, control);
            this._toggleControlStates(conditions, control, key);
        }
    }
    _toggleControlStates(conditions, control, controlPath) {
        const actionDisabled = ConditionsActionEnum['control.disabled'];
        const actionHidden = ConditionsActionEnum['control.hidden'];
        const actions = Object.keys(conditions).filter((x) => x === actionDisabled || x === actionHidden);
        if (!actions.length) {
            return;
        }
        for (const action of actions) {
            const bool = this._evaluateConditionsStatement(conditions[action]);
            if (bool === undefined) {
                continue;
            }
            if (action === actionDisabled) {
                this._disableControl(control, bool);
            }
            if (action === actionHidden) {
                // Must toggle visibility before disable, to prevent incorrect behavior of child element
                // e.g. Primeng Textarea `autoResize` will fail
                this._hideControl$(controlPath, bool)
                    .pipe(tap(() => this._disableControl(control, bool)))
                    .subscribe();
            }
        }
    }
    _disableControl(control, disable) {
        disable ? control.disable() : control.enable();
        this._globalVariableService.rootForm?.updateValueAndValidity();
    }
    _hideControl$(controlPath, hide) {
        const setStyle = (el, name, value) => {
            if (hide) {
                el.style.setProperty(name, value);
            }
            else {
                el.style.removeProperty(name);
            }
        };
        return this._getTargetEl$(controlPath).pipe(filter(Boolean), tap((x) => {
            setStyle(x, 'display', 'none');
        }));
    }
    _toggleValidators(config, control) {
        const { conditions = {}, validators = [] } = config;
        const actionPrefix = {
            asyncValidator: 'asyncValidator',
            validator: 'validator',
        };
        if (!validators.length) {
            return;
        }
        const getActions = (async) => {
            return Object.keys(conditions).filter((x) => {
                const prefix = async
                    ? actionPrefix.asyncValidator
                    : actionPrefix.validator;
                // Get the actions that starts with "validator.xxx" or "asyncValidator.xxx" only
                const regExp = new RegExp(`^${prefix}\.[a-zA-z]{1,}$`);
                return regExp.test(x);
            });
        };
        const getConditionValidatorConfigs = (async) => {
            const actions = getActions(async);
            const result = validators.filter((x) => {
                const prefix = async
                    ? actionPrefix.asyncValidator
                    : actionPrefix.validator;
                const actionName = `${prefix}.${x.name ?? ''}`;
                const target = actions.includes(actionName);
                if (target) {
                    return this._evaluateConditionsStatement(conditions[actionName]);
                }
                return true;
            });
            return result;
        };
        const toggleValidators = () => {
            const validatorConfigs = getConditionValidatorConfigs(false);
            const validatorFns = this._formValidationService.getValidators(validatorConfigs);
            control.setValidators(validatorFns);
        };
        const toggleAsyncValidators = () => {
            const validatorConfigs = getConditionValidatorConfigs(true);
            const validatorFns = this._formValidationService.getAsyncValidators(validatorConfigs);
            control.setAsyncValidators(validatorFns);
        };
        toggleValidators();
        toggleAsyncValidators();
        control.updateValueAndValidity();
        this._globalVariableService.rootForm?.updateValueAndValidity();
    }
    _executeCustomActions(conditions, control) {
        const definedActions = Object.values(ConditionsActionEnum);
        const customActions = Object.keys(conditions).filter((x) => !definedActions.includes(x));
        if (!customActions.length) {
            return;
        }
        for (const action of customActions) {
            const bool = this._evaluateConditionsStatement(conditions[action]);
            if (!bool)
                continue;
            const functions = this._globalVariableService.conditionsActionFunctions;
            if (!functions)
                continue;
            if (!functions[action])
                continue;
            if (typeof functions[action] !== 'function')
                continue;
            functions[action](control);
        }
    }
    /**Get the target element by using `id`(full control path) on each `div` inside current NgDynamicJsonForm instance */
    _getTargetEl$(controlPath) {
        if (typeof window === 'undefined') {
            return of(null);
        }
        return new Observable((subscriber) => {
            window.requestAnimationFrame(() => {
                // Use `CSS.escape()` to escape all the invalid characters.
                const element = this._globalVariableService.hostElement?.querySelector(`#${CSS.escape(controlPath)}`);
                subscriber.next(!element ? null : element);
                subscriber.complete();
                subscriber.unsubscribe();
            });
        });
    }
    _getPathsOfControlsToListen(configs) {
        const extractPaths = (group) => {
            const value = group['&&'] || group['||'];
            if (!value)
                return [];
            return value.flatMap((x) => Array.isArray(x)
                ? [
                    this._getControlPathFromStatement(x[0]) ?? '',
                    this._getControlPathFromStatement(x[2]) ?? '',
                ]
                : extractPaths(x));
        };
        const result = configs.reduce((acc, curr) => {
            const { conditions, children } = curr;
            const paths = !conditions
                ? []
                : Object.values(conditions)
                    .filter((x) => Boolean(x) && Object.keys(x).length > 0)
                    .flatMap((x) => extractPaths(x))
                    .filter(Boolean);
            const childrenPaths = !children?.length
                ? []
                : this._getPathsOfControlsToListen(children);
            acc.push(...paths.concat(childrenPaths));
            return acc;
        }, []);
        const removeDuplicates = [...new Set(result)];
        return removeDuplicates;
    }
    /**
     * Get all the configs which has `conditions` set.
     *
     * @description
     * The `fullControlPath` is the path to the control where the conditions will have effect on it.
     */
    _configsWithConditions(configs, parentControlPath) {
        const result = configs.reduce((acc, curr) => {
            const { conditions, children } = curr;
            const fullControlPath = parentControlPath
                ? `${parentControlPath}.${curr.formControlName}`
                : curr.formControlName;
            if (conditions)
                acc[fullControlPath] = curr;
            if (children && children.length) {
                acc = {
                    ...acc,
                    ...this._configsWithConditions(children, fullControlPath),
                };
            }
            return acc;
        }, {});
        return result;
    }
    _evaluateConditionsStatement(conditionsGroup) {
        const form = this._globalVariableService.rootForm;
        if (!form || (!conditionsGroup['&&'] && !conditionsGroup['||'])) {
            return undefined;
        }
        const mapTupleFn = (tuple) => {
            const [left, operator, right] = tuple;
            const result = [
                this._getValueFromStatement(left),
                operator,
                this._getValueFromStatement(right),
            ];
            return result;
        };
        return evaluateConditionsStatements(conditionsGroup, mapTupleFn);
    }
    /**
     * Get control path using the string in the conditions statement tuple.
     *
     * ```js
     * form = new FormGroup{
     *  controlA: new FormControl(),
     *  controlB: new FormControl(),
     * }
     * ```
     *
     * - "controlA" => Should get "controlA"
     * - "controlB" => Should get "controlB"
     * - "controlA,prop1" => Should get "controlA"
     * - "controlC" => undefined
     */
    _getControlPathFromStatement(input) {
        const form = this._globalVariableService.rootForm;
        if (!form)
            return undefined;
        if (typeof input !== 'string')
            return undefined;
        const paths = getControlAndValuePath(input);
        const targetControl = form.get(paths.controlPath);
        if (!targetControl)
            return undefined;
        return paths.controlPath;
    }
    /**Get the value from the statement, either it's literally a value or comes from a control
     *
     * ```js
     * formValue = {
     *   controlA: 'textValue',
     *   controlB: false
     * }
     * ```
     *
     * - "controlA" => "textValue"
     * - "controlB" => false
     */
    _getValueFromStatement(input) {
        const form = this._globalVariableService.rootForm;
        if (!form)
            return input;
        if (typeof input !== 'string')
            return input;
        const paths = getControlAndValuePath(input);
        const targetControl = form.get(paths.controlPath);
        // If it is string but not found in the FormGroup,
        // then we consider it as literal string value,
        // not control path.
        if (!targetControl)
            return input;
        const result = !paths.valuePath
            ? targetControl.value
            : getValueInObject(targetControl.value, paths.valuePath);
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormConditionsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormConditionsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormConditionsService, decorators: [{
            type: Injectable
        }] });

class FormGeneratorService {
    constructor() {
        this._formValidationService = inject(FormValidationService);
    }
    generateFormGroup(data) {
        const formGroup = new UntypedFormGroup({});
        for (const item of data) {
            const control = !item.children?.length
                ? new FormControl(item.value)
                : this.generateFormGroup(item.children);
            const validators = this._formValidationService.getValidators(item.validators);
            const asyncValidators = this._formValidationService.getAsyncValidators(item.asyncValidators);
            control.setValidators(validators);
            control.setAsyncValidators(asyncValidators);
            formGroup.addControl(item.formControlName, control);
            // Runs the validation manually after async validators are initialized,
            // to prevent the initial status stuck at "PENDING".
            if (asyncValidators.length > 0) {
                queueMicrotask(() => control.updateValueAndValidity());
            }
        }
        return formGroup;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormGeneratorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormGeneratorService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormGeneratorService, decorators: [{
            type: Injectable
        }] });

class FormReadyStateService {
    constructor() {
        this.optionsReady$ = new BehaviorSubject(false);
        this._optionsLoadingCount = 0;
    }
    optionsLoading(add) {
        if (add) {
            this._optionsLoadingCount++;
        }
        else {
            this._optionsLoadingCount--;
            if (this._optionsLoadingCount <= 0) {
                this._optionsLoadingCount = 0;
                if (this.optionsReady$.value !== true) {
                    this.optionsReady$.next(true);
                }
            }
        }
    }
    resetState() {
        this.optionsReady$.next(false);
    }
    haveOptionsToWait(configs) {
        if (!configs.length)
            return false;
        const result = configs.some((x) => !x.children?.length
            ? Boolean(x.options) && Boolean(x.options.src)
            : this.haveOptionsToWait(x.children));
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormReadyStateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormReadyStateService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormReadyStateService, decorators: [{
            type: Injectable
        }] });

class FormValueService {
    patchForm(form, value) {
        if (!form)
            return;
        for (const key in value) {
            const _value = value[key];
            const control = form.get(key);
            if (!control)
                continue;
            if (isFormControl(control)) {
                control.patchValue(_value);
            }
            if (isFormGroup(control)) {
                this.patchForm(control, _value);
            }
        }
    }
    getFormDisplayValue(value, configs) {
        const keyPreserved = this._getKeyPreservedDisplayValue(value, configs);
        return {
            keyMapped: this._getKeyMappedFormDisplayValue(keyPreserved, configs),
            keyPreserved,
        };
    }
    _getKeyPreservedDisplayValue(formValue, configs) {
        const result = structuredClone(formValue);
        if (typeof result === null || typeof result !== 'object') {
            return result;
        }
        for (const item of configs) {
            const value = result?.[item.formControlName];
            if (item.options) {
                const isDynamicOptions = Boolean(item.options.src && typeof item.options.src !== 'string');
                const labelKey = isDynamicOptions
                    ? item.options.src.mapData?.labelKey ??
                        'label'
                    : 'label';
                const getLabel = (val) => {
                    if (typeof val === 'object')
                        return val?.[labelKey];
                    return item.options?.data?.find((x) => x.value === val)?.label;
                };
                result[item.formControlName] = Array.isArray(value)
                    ? value.map((x) => getLabel(x))
                    : getLabel(value);
            }
            if (!!item.children?.length) {
                result[item.formControlName] = this._getKeyPreservedDisplayValue(value, item.children);
            }
        }
        return result;
    }
    _getKeyMappedFormDisplayValue(value, configs) {
        const newResult = {};
        if (value === null || typeof value !== 'object') {
            return value;
        }
        for (const item of configs) {
            const _value = value[item.formControlName];
            const key = item.label ?? item.formControlName;
            newResult[key] = _value;
            if (!!item.children?.length) {
                newResult[key] = this._getKeyMappedFormDisplayValue(_value, item.children);
            }
        }
        return newResult;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValueService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValueService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValueService, decorators: [{
            type: Injectable
        }] });

class HttpRequestCacheService {
    constructor() {
        this._requests = [];
        this._http = inject(HttpClient);
    }
    request$(params) {
        const { src, method, headers, body } = params;
        const source$ = method === 'GET'
            ? this._http.get(src, { headers })
            : this._http.post(src, body ?? {}, { headers });
        const sameRequest = this._prevSameRequest(params);
        if (sameRequest) {
            if (!sameRequest.data$.closed)
                return sameRequest.data$;
            sameRequest.data$ = new Subject();
        }
        else {
            this._requests.push({
                src,
                data$: new Subject(),
                body,
            });
        }
        return source$.pipe(tap((x) => {
            const sameRequest = this._prevSameRequest(params);
            !sameRequest?.data$.closed && sameRequest?.data$.next(x);
        }), finalize(() => {
            const sameRequest = this._prevSameRequest(params);
            sameRequest?.data$.complete();
            sameRequest?.data$.unsubscribe();
        }));
    }
    reset() {
        this._requests
            .filter((x) => !x.data$.closed)
            .forEach(({ data$ }) => {
            data$.next([]);
            data$.complete();
            data$.unsubscribe();
        });
        this._requests = [];
    }
    _prevSameRequest({ src, method, body, }) {
        const result = this._requests.find((x) => {
            if (method === 'POST' && body) {
                const sameBody = JSON.stringify(body) === JSON.stringify(x.body);
                return x.src === src && sameBody;
            }
            return x.src === src;
        });
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpRequestCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpRequestCacheService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpRequestCacheService, decorators: [{
            type: Injectable
        }] });

/**
 * Return the new object with only the keys provided.
 * If any of the data is nested, the final object will be flatten out.
 *
 * @param obj The original object
 * @param keys The keys to use as new object
 * @returns New object contains only specific keys.
 *
 * The following example shows what happened if there is nested data.
 * @example
 * from:
 * {
 *    A: {
 *      childA: ...
 *    },
 *    B: ...,
 *    C: ...
 * }
 *
 * to:
 * {
 *    childA: ...,
 *    B: ...,
 *    C: ...
 * }
 */
function trimObjectByKeys(obj, keys) {
    if (typeof obj !== 'object') {
        return obj;
    }
    if (keys.length === 1) {
        return getValueInObject(obj, keys[0]);
    }
    return keys.reduce((acc, key) => {
        // If any of the data is nested.
        const _keys = key.split('.').map((x) => x.trim());
        // We get the last key as new key if the data is nested.
        const newKey = _keys.length > 1 ? _keys[_keys.length - 1] : key;
        // Finally, we export the new object that's flatten.
        acc[newKey] = getValueInObject(obj, key);
        return acc;
    }, {});
}

class OptionsDataService {
    constructor() {
        this._globalVariableService = inject(GlobalVariableService);
        this._httpRequestCacheService = inject(HttpRequestCacheService);
        this._cancelAll$ = new Subject();
    }
    /**
     * @param srcConfig @see OptionSourceConfig
     * @param valueChangesCallback The callback after `valueChanges` is called
     */
    getOptions$(srcConfig, valueChangesCallback) {
        if (!srcConfig) {
            return EMPTY;
        }
        const event$ = () => {
            const valueChanges$ = this._onTriggerControlChanges$(srcConfig.filter || srcConfig.trigger, valueChangesCallback);
            if (srcConfig.filter) {
                return this._getOptionsByFilter$(srcConfig, valueChanges$);
            }
            if (srcConfig.trigger) {
                return this._getOptionsOnTrigger$(srcConfig, valueChanges$);
            }
            return this._getOptions$(srcConfig);
        };
        return event$().pipe(tap((x) => {
            if (isDevMode() && x.length > 100) {
                console.warn(`NgDynamicJsonForm:\nThe data length from the response ${srcConfig.url} is > 100.\n` +
                    `Please make sure there is optimization made. e.g. virtual scroll, lazy loading`);
            }
        }));
    }
    cancelAllRequest() {
        this._cancelAll$.next();
        this._httpRequestCacheService.reset();
    }
    onDestroy() {
        this.cancelAllRequest();
        this._cancelAll$.complete();
    }
    _getOptions$(srcConfig) {
        if (!srcConfig) {
            return EMPTY;
        }
        const { url, method, headers, mapData } = srcConfig;
        const bodyMapped = this._mapBodyValue(srcConfig);
        const src = this._getMappedSrc(url, bodyMapped);
        return this._httpRequestCacheService
            .request$({
            src,
            method,
            headers,
            body: bodyMapped,
        })
            .pipe(map((x) => this._mapData(x, mapData)), catchError(() => of([])), takeUntil(this._cancelAll$));
    }
    _getOptionsByFilter$(srcConfig, valueChanges$) {
        if (!srcConfig.filter)
            return of([]);
        const mapTupleFn = (tuple, triggerValue, optionItem) => {
            const [triggerValuePath, operator, optionValuePath] = tuple;
            return [
                getValueInObject(triggerValue, triggerValuePath),
                operator,
                getValueInObject(optionItem?.value, optionValuePath),
            ];
        };
        const filterOptions$ = this._getOptions$(srcConfig).pipe(switchMap((x) => combineLatest([of(x), valueChanges$])), map(([options, value]) => options.filter((optionItem) => {
            const result = evaluateConditionsStatements(srcConfig.filter.conditions, (e) => mapTupleFn(e, value, optionItem));
            return result;
        })));
        return filterOptions$.pipe(takeUntil(this._cancelAll$));
    }
    _getOptionsOnTrigger$(srcConfig, valueChanges$) {
        if (!srcConfig.trigger)
            return of([]);
        return valueChanges$.pipe(switchMap((x) => {
            const emptyValue = x === undefined || x === null || x === '';
            return emptyValue ? of([]) : this._getOptions$(srcConfig);
        }), takeUntil(this._cancelAll$));
    }
    /**The `valueChanges` of trigger control */
    _onTriggerControlChanges$(triggerConfig, valueChangesCallback) {
        if (!triggerConfig)
            return EMPTY;
        const { by, debounceTime: _debounceTime = 0 } = triggerConfig;
        if (!by.trim())
            return EMPTY;
        const form = this._globalVariableService.rootForm;
        const paths = getControlAndValuePath(by);
        const control = form?.get(paths.controlPath);
        if (!control) {
            if (isDevMode()) {
                console.warn(`Form control ${paths.controlPath} not found.`);
            }
            return EMPTY;
        }
        return control.valueChanges.pipe(startWith(control.value), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), tap(() => valueChangesCallback && valueChangesCallback()), debounceTime(_debounceTime), map((x) => (!paths.valuePath ? x : getValueInObject(x, paths.valuePath))));
    }
    _mapData(input, mapData) {
        if (!input)
            return [];
        const { contentPath, slice, labelKey, valueKeys } = mapData ?? {};
        const data = contentPath ? getValueInObject(input, contentPath) : input;
        const filteredValueKeys = [...new Set(valueKeys)].filter(Boolean);
        if (!data || !Array.isArray(data))
            return [];
        const slicedData = data.slice(slice?.[0] ?? 0, slice?.[1] ?? data.length);
        const result = slicedData.map((item) => ({
            label: getValueInObject(item, labelKey),
            value: !filteredValueKeys.length
                ? item
                : trimObjectByKeys(item, filteredValueKeys),
        }));
        return result;
    }
    _getMappedSrc(src, body) {
        // url variables (.../:x/:y/:z)
        const urlVariables = src.match(/:([^/:\s]+)/g) || [];
        if (typeof body !== 'object') {
            return src;
        }
        if (!urlVariables.length) {
            return `${src}?${new URLSearchParams(body).toString()}`;
        }
        return Object.keys(body).reduce((acc, key) => {
            acc = acc.replace(`:${key}`, `${body[key]}`);
            return acc;
        }, src);
    }
    _mapBodyValue(config) {
        if (!config.trigger)
            return config.body;
        const triggerBody = config.trigger.body;
        if (!triggerBody)
            return null;
        const form = this._globalVariableService.rootForm;
        const result = Object.keys(triggerBody).reduce((acc, key) => {
            const { controlPath, valuePath } = getControlAndValuePath(triggerBody[key]);
            const control = form?.get(controlPath);
            const value = getValueInObject(control?.value, valuePath);
            acc[key] = !control ? triggerBody[key] : value;
            return acc;
        }, {});
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OptionsDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OptionsDataService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OptionsDataService, decorators: [{
            type: Injectable
        }] });

const NG_DYNAMIC_JSON_FORM_CONFIG = new InjectionToken('ng-dynamic-json-form-config');
function provideNgDynamicJsonForm(config) {
    return {
        provide: NG_DYNAMIC_JSON_FORM_CONFIG,
        useValue: config,
    };
}

function getClassListFromString(classNames) {
    if (!classNames) {
        return [];
    }
    try {
        return classNames
            .split(/\s{1,}/)
            .map((x) => x.trim())
            .filter(Boolean);
    }
    catch {
        return [];
    }
}

function getStyleListFromString(styles) {
    if (!styles) {
        return [];
    }
    try {
        return styles
            .split(';')
            .map((x) => x.trim())
            .filter(Boolean);
    }
    catch {
        return [];
    }
}

class ControlLayoutDirective {
    constructor() {
        this._el = inject(ElementRef);
    }
    ngOnChanges() {
        const hostEl = this._el.nativeElement;
        if (!hostEl || !this.controlLayout)
            return;
        const { type, layout } = this.controlLayout;
        const classNames = layout?.[`${type ?? 'host'}Class`] ?? '';
        const styles = layout?.[`${type ?? 'host'}Styles`] ?? '';
        if (classNames.length > 0) {
            hostEl.classList.add(...getClassListFromString(classNames));
        }
        if (styles.length > 0) {
            const styleList = getStyleListFromString(styles);
            for (const item of styleList) {
                const [name, value] = item.split(':').map((x) => x.trim());
                hostEl.style.setProperty(name, value);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ControlLayoutDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: ControlLayoutDirective, isStandalone: true, selector: "[controlLayout]", inputs: { controlLayout: "controlLayout" }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ControlLayoutDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[controlLayout]',
                    standalone: true,
                }]
        }], propDecorators: { controlLayout: [{
                type: Input
            }] } });

class HostIdDirective {
    constructor() {
        this._el = inject(ElementRef);
    }
    ngOnChanges() {
        const hostEl = this._el.nativeElement;
        if (!hostEl || !this._hostId)
            return;
        // Set `id` to this component so that `querySelector` can find it correctly.
        hostEl.setAttribute('id', this._hostId);
    }
    get _hostId() {
        if (!this.hostId)
            return undefined;
        const { parentId, controlName } = this.hostId;
        return parentId ? `${parentId}.${controlName}` : controlName;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HostIdDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: HostIdDirective, isStandalone: true, selector: "[hostId]", inputs: { hostId: "hostId" }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HostIdDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hostId]',
                    standalone: true,
                }]
        }], propDecorators: { hostId: [{
                type: Input
            }] } });

class ControlTypeByConfigPipe {
    transform(config) {
        if (!config.children) {
            return 'FormControl';
        }
        return 'FormGroup';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ControlTypeByConfigPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ControlTypeByConfigPipe, isStandalone: true, name: "controlTypeByConfig" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ControlTypeByConfigPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'controlTypeByConfig',
                    standalone: true,
                }]
        }] });

class IsControlRequiredPipe {
    transform(value) {
        return value.hasValidator(Validators.required);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IsControlRequiredPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: IsControlRequiredPipe, isStandalone: true, name: "isControlRequired" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IsControlRequiredPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'isControlRequired',
                    standalone: true,
                }]
        }] });

class ErrorMessageComponent {
    constructor() {
        this._internal_destroyRef = inject(DestroyRef);
        this._internal_formValidationService = inject(FormValidationService);
        this._customComponent = null;
        this.errorMessages = [];
    }
    ngAfterViewInit() {
        this._injectComponent();
        this._getErrorMessages();
    }
    _injectComponent() {
        if (!this.customComponent || !this.componentAnchor) {
            return;
        }
        this.componentAnchor.clear();
        const componentRef = this.componentAnchor.createComponent(this.customComponent);
        this._customComponent = componentRef.instance;
        if (this.control) {
            componentRef.instance.control = this.control;
        }
    }
    _getErrorMessages() {
        this._internal_formValidationService
            .getErrorMessages$(this.control, this.validators)
            .pipe(tap((x) => {
            this.errorMessages = x;
            if (this._customComponent) {
                this._customComponent.errorMessages = [...this.errorMessages];
            }
        }), takeUntilDestroyed(this._internal_destroyRef))
            .subscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorMessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ErrorMessageComponent, isStandalone: true, selector: "error-message", inputs: { control: "control", validators: "validators", customComponent: "customComponent", customTemplate: "customTemplate" }, host: { classAttribute: "error-message" }, viewQueries: [{ propertyName: "componentAnchor", first: true, predicate: ["componentAnchor"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<!-- Custom error message component -->\n<ng-container #componentAnchor></ng-container>\n<ng-container\n  [ngTemplateOutlet]=\"customTemplate ?? null\"\n  [ngTemplateOutletContext]=\"{\n    control,\n    messages: errorMessages\n  }\"\n></ng-container>\n\n<!-- Default error message component -->\n<ng-container *ngIf=\"!customComponent && !customTemplate\">\n  <ng-container *ngFor=\"let error of errorMessages\">\n    <div>{{ error }}</div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ErrorMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'error-message', standalone: true, imports: [CommonModule], host: {
                        class: 'error-message',
                    }, template: "<!-- Custom error message component -->\n<ng-container #componentAnchor></ng-container>\n<ng-container\n  [ngTemplateOutlet]=\"customTemplate ?? null\"\n  [ngTemplateOutletContext]=\"{\n    control,\n    messages: errorMessages\n  }\"\n></ng-container>\n\n<!-- Default error message component -->\n<ng-container *ngIf=\"!customComponent && !customTemplate\">\n  <ng-container *ngFor=\"let error of errorMessages\">\n    <div>{{ error }}</div>\n  </ng-container>\n</ng-container>\n" }]
        }], propDecorators: { control: [{
                type: Input
            }], validators: [{
                type: Input
            }], customComponent: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], componentAnchor: [{
                type: ViewChild,
                args: ['componentAnchor', { read: ViewContainerRef }]
            }] } });

class FormLabelComponent {
    constructor() {
        this._destroyRef = inject(DestroyRef);
        this._viewInitialized = false;
        this._collapsibleElCssText = '';
        this.collapsible = false;
        this.expand = false;
        this.toggle = (value) => {
            if (!this._collapsible)
                return;
            this.expand = value ?? !this.expand;
            this._setElementHeight();
            if (this._componentRef) {
                this._componentRef.expand = this.expand;
            }
        };
    }
    get styleDisplay() {
        if (!this.label)
            return null;
        if (this.customComponent)
            return null;
        return this._collapsible ? 'flex' : 'inline-block';
    }
    get styleCursor() {
        return this._collapsible ? 'pointer' : 'normal';
    }
    onClick() {
        this.toggle();
    }
    ngOnChanges(simpleChanges) {
        if (!this._viewInitialized)
            return;
        const { state } = simpleChanges;
        if (state && this._collapsible) {
            switch (this.state) {
                case 'collapse':
                    this.toggle(false);
                    break;
                case 'expand':
                    this.toggle(true);
                    break;
            }
        }
    }
    ngOnInit() {
        this.collapsible = this._collapsible;
        this.expand =
            this.state === undefined
                ? this.layout?.contentCollapsible === 'expand'
                : this.state === 'expand';
    }
    ngAfterViewInit() {
        if (this.customComponent) {
            this._injectComponent();
            return;
        }
        this._initCollapsibleEl();
        this._viewInitialized = true;
    }
    _injectComponent() {
        if (!this.componentAnchor || !this.customComponent) {
            return;
        }
        const componentRef = this.componentAnchor.createComponent(this.customComponent);
        componentRef.instance.label = this.label;
        componentRef.instance.layout = this.layout;
        componentRef.instance.props = this.props;
        componentRef.instance.collapsible = this._collapsible;
        componentRef.instance.expand = this.expand;
        this._initCollapsibleEl();
        this._componentRef = componentRef.instance;
    }
    _listenTransition() {
        if (!this.collapsibleEl) {
            return;
        }
        const transitionEnd$ = fromEvent(this.collapsibleEl, 'transitionend', {
            passive: true,
        }).pipe(filter(() => this.expand), tap(() => {
            this.collapsibleEl?.classList.remove(...['height', 'overflow']);
        }));
        transitionEnd$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
    }
    _setElementHeight() {
        this._setExpandStyle();
        if (!this.expand) {
            requestAnimationFrame(() => this._setCollapseStyle());
        }
    }
    _initCollapsibleEl() {
        if (!this.collapsibleEl || !this.collapsible) {
            return;
        }
        this._collapsibleElCssText = this.collapsibleEl.style.cssText || '';
        this.collapsibleEl.classList.add('collapsible-container');
        this._listenTransition();
        if (!this.expand) {
            this._setCollapseStyle();
        }
    }
    _setCollapseStyle() {
        const stylesToRemove = ['border', 'padding', 'margin'];
        stylesToRemove.forEach((style) => {
            if (!this._collapsibleElCssText.includes(style))
                return;
            this.collapsibleEl?.style.removeProperty(style);
        });
        this.collapsibleEl?.style.setProperty('overflow', 'hidden');
        this.collapsibleEl?.style.setProperty('height', '0px');
    }
    _setExpandStyle() {
        const height = !this.collapsibleEl
            ? 0
            : this.collapsibleEl.scrollHeight + 1;
        // Set existing styles from collapsible element first
        if (this._collapsibleElCssText) {
            this.collapsibleEl?.setAttribute('style', this._collapsibleElCssText);
        }
        // Then set height later to overwrite height style
        this.collapsibleEl?.style.setProperty('height', `${height}px`);
    }
    get _collapsible() {
        return (this.layout?.contentCollapsible === 'collapse' ||
            this.layout?.contentCollapsible === 'expand');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FormLabelComponent, isStandalone: true, selector: "form-label", inputs: { label: "label", layout: "layout", props: "props", collapsibleEl: "collapsibleEl", state: "state", customComponent: "customComponent", customTemplate: "customTemplate" }, host: { listeners: { "click": "onClick($event)" }, properties: { "style.display": "this.styleDisplay", "style.cursor": "this.styleCursor" }, classAttribute: "form-label" }, viewQueries: [{ propertyName: "componentAnchor", first: true, predicate: ["componentAnchor"], descendants: true, read: ViewContainerRef }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"!customComponent && !customTemplate\">\n  <span class=\"text\">{{ label }}</span>\n\n  <ng-container *ngIf=\"collapsible\">\n    <span\n      style=\"margin-left: auto\"\n      [ngStyle]=\"{\n        transform: !expand ? 'rotate(-180deg)' : 'rotate(0deg)',\n      }\"\n    >\n      <!-- prettier-ignore -->\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" fill=\"currentColor\" class=\"bi bi-chevron-up\" viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\" d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z\"/>\n        </svg>\n    </span>\n  </ng-container>\n</ng-container>\n\n<ng-container #componentAnchor></ng-container>\n\n<ng-container\n  *ngIf=\"customTemplate\"\n  [ngTemplateOutlet]=\"customTemplate\"\n  [ngTemplateOutletContext]=\"{\n    label,\n    layout,\n    toggle,\n    collapsible,\n    expand,\n    props\n  }\"\n></ng-container>\n", styles: [":host{align-items:center;gap:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-label', standalone: true, imports: [CommonModule], host: {
                        class: 'form-label',
                    }, template: "<ng-container *ngIf=\"!customComponent && !customTemplate\">\n  <span class=\"text\">{{ label }}</span>\n\n  <ng-container *ngIf=\"collapsible\">\n    <span\n      style=\"margin-left: auto\"\n      [ngStyle]=\"{\n        transform: !expand ? 'rotate(-180deg)' : 'rotate(0deg)',\n      }\"\n    >\n      <!-- prettier-ignore -->\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" fill=\"currentColor\" class=\"bi bi-chevron-up\" viewBox=\"0 0 16 16\">\n          <path fill-rule=\"evenodd\" d=\"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z\"/>\n        </svg>\n    </span>\n  </ng-container>\n</ng-container>\n\n<ng-container #componentAnchor></ng-container>\n\n<ng-container\n  *ngIf=\"customTemplate\"\n  [ngTemplateOutlet]=\"customTemplate\"\n  [ngTemplateOutletContext]=\"{\n    label,\n    layout,\n    toggle,\n    collapsible,\n    expand,\n    props\n  }\"\n></ng-container>\n", styles: [":host{align-items:center;gap:1rem}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], layout: [{
                type: Input
            }], props: [{
                type: Input
            }], collapsibleEl: [{
                type: Input
            }], state: [{
                type: Input
            }], customComponent: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], componentAnchor: [{
                type: ViewChild,
                args: ['componentAnchor', { read: ViewContainerRef }]
            }], styleDisplay: [{
                type: HostBinding,
                args: ['style.display']
            }], styleCursor: [{
                type: HostBinding,
                args: ['style.cursor']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class ContentWrapperComponent {
    constructor() {
        this._globalVariableService = inject(GlobalVariableService);
        this.descriptionPosition = this._globalVariableService.descriptionPosition;
        this.hideErrors$ = this._globalVariableService.hideErrorMessage$;
        this.showErrorsOnTouched = this._globalVariableService.showErrorsOnTouched;
        this.errorComponents = this._globalVariableService.errorComponents;
        this.errorTemplates = this._globalVariableService.errorTemplates;
        this.errorComponentDefault = this._globalVariableService.errorComponentDefault;
        this.errorTemplateDefault = this._globalVariableService.errorTemplateDefault;
        this.labelComponents = this._globalVariableService.labelComponents;
        this.labelTemplates = this._globalVariableService.labelTemplates;
        this.labelComponentDefault = this._globalVariableService.labelComponentDefault;
        this.labelTemplateDefault = this._globalVariableService.labelTemplateDefault;
        this.renderErrorSection = (() => {
            const typesToHide = this._globalVariableService.hideErrorsForTypes ?? [];
            const type = this.config?.type ?? 'text';
            return typesToHide.filter(Boolean).every((x) => x !== type);
        })();
    }
    get showErrors() {
        const controlTouched = this.control?.touched ?? false;
        const controlDirty = this.control?.dirty ?? false;
        const hasErrors = !!this.control?.errors;
        if (!hasErrors) {
            return false;
        }
        if (this.hideErrors$.value === false) {
            return true;
        }
        if (this.showErrorsOnTouched) {
            return controlTouched || controlDirty;
        }
        return controlDirty;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ContentWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ContentWrapperComponent, isStandalone: true, selector: "content-wrapper", inputs: { config: "config", control: "control", collapsibleState: "collapsibleState" }, ngImport: i0, template: "<ng-container *ngIf=\"config && control\">\n  <!-- Label -->\n  <ng-container *ngIf=\"!config.layout?.hideLabel && config.label\">\n    <form-label\n      [label]=\"config.label\"\n      [layout]=\"config.layout\"\n      [props]=\"config.props\"\n      [collapsibleEl]=\"collapsibleEl\"\n      [customComponent]=\"labelComponents?.[config.formControlName] ?? labelComponentDefault\"\n      [customTemplate]=\"labelTemplates?.[config.formControlName] ?? labelTemplateDefault\"\n      [state]=\"collapsibleState\"\n      [controlLayout]=\"{\n        type: 'label',\n        layout: config.layout\n      }\"\n      [ngClass]=\"{\n        required:\n          config.layout?.autoAddRequiredClass === false\n            ? null\n            : (control | isControlRequired)\n      }\"\n    ></form-label>\n  </ng-container>\n\n  <div\n    #collapsibleEl\n    [controlLayout]=\"{\n      type: 'content',\n      layout: config.layout\n    }\"\n  >\n    <!-- Description (before) -->\n    <ng-container\n      *ngIf=\"\n        config.description &&\n        (config.layout?.descriptionPosition ?? descriptionPosition) !== 'after'\n      \"\n      [ngTemplateOutlet]=\"descriptionTemplate\"\n      [ngTemplateOutletContext]=\"{ data: config }\"\n    ></ng-container>\n\n    <ng-content></ng-content>\n\n    <!-- Validation message -->\n    <ng-container *ngIf=\"renderErrorSection\">\n      <error-message\n        [control]=\"control\"\n        [validators]=\"\n          (config.validators ?? []).concat(config.asyncValidators ?? [])\n        \"\n        [customComponent]=\"errorComponents?.[config.formControlName] ?? errorComponentDefault\"\n        [customTemplate]=\"errorTemplates?.[config.formControlName] ?? errorTemplateDefault\"\n        [controlLayout]=\"{\n          type: 'error',\n          layout: config.layout\n        }\"\n        [ngClass]=\"{\n          hidden: !showErrors\n        }\"\n      ></error-message>\n    </ng-container>\n\n    <!-- Description (after) -->\n    <ng-container\n      *ngIf=\"\n        config.description &&\n        (config.layout?.descriptionPosition ?? descriptionPosition) === 'after'\n      \"\n      [ngTemplateOutlet]=\"descriptionTemplate\"\n      [ngTemplateOutletContext]=\"{ data: config }\"\n    ></ng-container>\n  </div>\n</ng-container>\n\n<!-- Description template -->\n<ng-template #descriptionTemplate let-data=\"data\">\n  <span\n    class=\"form-description\"\n    [ngClass]=\"{\n      'position-after':\n        (data.layout?.descriptionPosition ?? descriptionPosition) === 'after'\n    }\"\n    [controlLayout]=\"{\n      type: 'description',\n      layout: data.layout\n    }\"\n    >{{ data.description }}</span\n  >\n</ng-template>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: FormLabelComponent, selector: "form-label", inputs: ["label", "layout", "props", "collapsibleEl", "state", "customComponent", "customTemplate"] }, { kind: "component", type: ErrorMessageComponent, selector: "error-message", inputs: ["control", "validators", "customComponent", "customTemplate"] }, { kind: "directive", type: ControlLayoutDirective, selector: "[controlLayout]", inputs: ["controlLayout"] }, { kind: "pipe", type: IsControlRequiredPipe, name: "isControlRequired" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ContentWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'content-wrapper', standalone: true, imports: [
                        CommonModule,
                        FormLabelComponent,
                        ErrorMessageComponent,
                        ControlLayoutDirective,
                        IsControlRequiredPipe,
                    ], template: "<ng-container *ngIf=\"config && control\">\n  <!-- Label -->\n  <ng-container *ngIf=\"!config.layout?.hideLabel && config.label\">\n    <form-label\n      [label]=\"config.label\"\n      [layout]=\"config.layout\"\n      [props]=\"config.props\"\n      [collapsibleEl]=\"collapsibleEl\"\n      [customComponent]=\"labelComponents?.[config.formControlName] ?? labelComponentDefault\"\n      [customTemplate]=\"labelTemplates?.[config.formControlName] ?? labelTemplateDefault\"\n      [state]=\"collapsibleState\"\n      [controlLayout]=\"{\n        type: 'label',\n        layout: config.layout\n      }\"\n      [ngClass]=\"{\n        required:\n          config.layout?.autoAddRequiredClass === false\n            ? null\n            : (control | isControlRequired)\n      }\"\n    ></form-label>\n  </ng-container>\n\n  <div\n    #collapsibleEl\n    [controlLayout]=\"{\n      type: 'content',\n      layout: config.layout\n    }\"\n  >\n    <!-- Description (before) -->\n    <ng-container\n      *ngIf=\"\n        config.description &&\n        (config.layout?.descriptionPosition ?? descriptionPosition) !== 'after'\n      \"\n      [ngTemplateOutlet]=\"descriptionTemplate\"\n      [ngTemplateOutletContext]=\"{ data: config }\"\n    ></ng-container>\n\n    <ng-content></ng-content>\n\n    <!-- Validation message -->\n    <ng-container *ngIf=\"renderErrorSection\">\n      <error-message\n        [control]=\"control\"\n        [validators]=\"\n          (config.validators ?? []).concat(config.asyncValidators ?? [])\n        \"\n        [customComponent]=\"errorComponents?.[config.formControlName] ?? errorComponentDefault\"\n        [customTemplate]=\"errorTemplates?.[config.formControlName] ?? errorTemplateDefault\"\n        [controlLayout]=\"{\n          type: 'error',\n          layout: config.layout\n        }\"\n        [ngClass]=\"{\n          hidden: !showErrors\n        }\"\n      ></error-message>\n    </ng-container>\n\n    <!-- Description (after) -->\n    <ng-container\n      *ngIf=\"\n        config.description &&\n        (config.layout?.descriptionPosition ?? descriptionPosition) === 'after'\n      \"\n      [ngTemplateOutlet]=\"descriptionTemplate\"\n      [ngTemplateOutletContext]=\"{ data: config }\"\n    ></ng-container>\n  </div>\n</ng-container>\n\n<!-- Description template -->\n<ng-template #descriptionTemplate let-data=\"data\">\n  <span\n    class=\"form-description\"\n    [ngClass]=\"{\n      'position-after':\n        (data.layout?.descriptionPosition ?? descriptionPosition) === 'after'\n    }\"\n    [controlLayout]=\"{\n      type: 'description',\n      layout: data.layout\n    }\"\n    >{{ data.description }}</span\n  >\n</ng-template>\n" }]
        }], propDecorators: { config: [{
                type: Input
            }], control: [{
                type: Input
            }], collapsibleState: [{
                type: Input
            }] } });

/**Get all the errors in the AbstractControl recursively
 * @example
 * root: {
 *  control1: ValidationErrors,
 *  control2: {
 *    childA: ValidationErrors
 *  }
 * }
 */
function getControlErrors(control) {
    if (!control) {
        return null;
    }
    if (isFormControl(control)) {
        return control.errors;
    }
    if (isFormGroup(control)) {
        const result = Object.keys(control.controls).reduce((acc, key) => {
            const childControl = control.controls[key];
            const err = getControlErrors(childControl);
            return err ? { ...acc, [key]: err } : acc;
        }, {});
        return !Object.keys(result).length ? null : result;
    }
    return null;
}

class CustomControlComponent {
    writeValue(obj) {
        this.control?.patchValue(obj);
    }
    registerOnChange(fn) {
        this.control?.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn) {
        return;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.control?.disable() : this.control?.enable();
    }
    validate(control) {
        return getControlErrors(this.control);
    }
    markAsDirty() { }
    markAsPristine() { }
    markAsTouched() { }
    markAsUntouched() { }
    setErrors(errors) { }
    onOptionsGet(data) {
        if (!this.data || !this.data.options) {
            return;
        }
        this.data.options.data = data;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CustomControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: CustomControlComponent, isStandalone: true, selector: "custom-control", ngImport: i0, template: ``, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CustomControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'custom-control',
                    template: ``,
                    standalone: true,
                }]
        }] });

class UiBasicCheckboxComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormArray([]);
    }
    writeValue(obj) {
        this.control.clear();
        if (Array.isArray(obj)) {
            obj.forEach((x) => this._addItem(x));
        }
        else {
            this._addItem(obj);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    toggle(e) {
        const checked = e.target.checked;
        this._onChange(checked);
    }
    onCheckboxChange(e, index) {
        const input = e.target;
        const checked = input.checked;
        const value = this.data?.options?.data
            ?.map((x) => x.value)
            .filter((val, i) => (i === index ? checked : this.isChecked(val)));
        this.control.clear();
        value?.forEach((x) => this._addItem(x));
        this._onChange(this.control.value);
    }
    isChecked(val) {
        return this.control.value.some((x) => JSON.stringify(x) === JSON.stringify(val));
    }
    get groupButtonsStyles() {
        return `
      flex-direction: ${this.data?.options?.layout ?? 'row'};
      align-items: flex-start;
      ${this.data?.options?.containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
    }
    _addItem(val) {
        const control = new FormControl(val);
        this.control.push(control);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicCheckboxComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicCheckboxComponent, isStandalone: true, selector: "ui-basic-checkbox", host: { classAttribute: "ui-basic" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"groupButtonsStyles\"\n    [ngClass]=\"[\n      data.options?.containerClass ?? '',\n      control.disabled ? 'disabled' : ''\n    ]\"\n  >\n    <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n      <label\n        class=\"option-button\"\n        [ngStyle]=\"{\n          'justify-content':\n            data.options?.labelPosition === 'before' ? 'space-between' : null\n        }\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: true\n            }\n          \"\n        ></ng-container>\n\n        <ng-container *ngIf=\"data.options && data.options.data\">\n          <!-- binary checkbox -->\n          <ng-container *ngIf=\"data.options.data.length === 1\">\n            <input\n              type=\"checkbox\"\n              [propsBinding]=\"[\n                {\n                  props: data.props,\n                  omit: ['type']\n                }\n              ]\"\n              [checked]=\"!control.value.length ? false : control.value[0]\"\n              [disabled]=\"control.disabled\"\n              (change)=\"toggle($event)\"\n            />\n          </ng-container>\n\n          <!-- multi-select checkbox -->\n          <ng-container *ngIf=\"data.options.data.length > 1\">\n            <input\n              type=\"checkbox\"\n              [propsBinding]=\"[\n                {\n                  props: data.props,\n                  omit: ['type']\n                }\n              ]\"\n              [checked]=\"isChecked(item.value)\"\n              [disabled]=\"control.disabled\"\n              (change)=\"onCheckboxChange($event, i)\"\n            />\n          </ng-container>\n        </ng-container>\n\n        <span class=\"marker\"></span>\n\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: false\n            }\n          \"\n        ></ng-container>\n      </label>\n    </ng-container>\n  </div>\n\n  <ng-template #labelTemplate let-label=\"label\" let-isBefore=\"isBefore\">\n    <ng-container\n      *ngIf=\"(data.options?.labelPosition === 'before') === isBefore\"\n    >\n      <span>{{ label }}</span>\n    </ng-container>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-checkbox', standalone: true, imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"groupButtonsStyles\"\n    [ngClass]=\"[\n      data.options?.containerClass ?? '',\n      control.disabled ? 'disabled' : ''\n    ]\"\n  >\n    <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n      <label\n        class=\"option-button\"\n        [ngStyle]=\"{\n          'justify-content':\n            data.options?.labelPosition === 'before' ? 'space-between' : null\n        }\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: true\n            }\n          \"\n        ></ng-container>\n\n        <ng-container *ngIf=\"data.options && data.options.data\">\n          <!-- binary checkbox -->\n          <ng-container *ngIf=\"data.options.data.length === 1\">\n            <input\n              type=\"checkbox\"\n              [propsBinding]=\"[\n                {\n                  props: data.props,\n                  omit: ['type']\n                }\n              ]\"\n              [checked]=\"!control.value.length ? false : control.value[0]\"\n              [disabled]=\"control.disabled\"\n              (change)=\"toggle($event)\"\n            />\n          </ng-container>\n\n          <!-- multi-select checkbox -->\n          <ng-container *ngIf=\"data.options.data.length > 1\">\n            <input\n              type=\"checkbox\"\n              [propsBinding]=\"[\n                {\n                  props: data.props,\n                  omit: ['type']\n                }\n              ]\"\n              [checked]=\"isChecked(item.value)\"\n              [disabled]=\"control.disabled\"\n              (change)=\"onCheckboxChange($event, i)\"\n            />\n          </ng-container>\n        </ng-container>\n\n        <span class=\"marker\"></span>\n\n        <ng-container\n          *ngTemplateOutlet=\"\n            labelTemplate;\n            context: {\n              label: item.label,\n              isBefore: false\n            }\n          \"\n        ></ng-container>\n      </label>\n    </ng-container>\n  </div>\n\n  <ng-template #labelTemplate let-label=\"label\" let-isBefore=\"isBefore\">\n    <ng-container\n      *ngIf=\"(data.options?.labelPosition === 'before') === isBefore\"\n    >\n      <span>{{ label }}</span>\n    </ng-container>\n  </ng-template>\n</ng-container>\n" }]
        }] });

class UiBasicDateComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this._locale = inject(LOCALE_ID);
        this.dateSettings = { min: '', max: '' };
        this.control = new FormGroup({
            date: new FormControl(''),
            time: new FormControl(''),
        });
    }
    writeValue(obj) {
        if (!obj)
            return;
        const dateRaw = formatDate(obj, 'yyyy-MM-dd,HH:mm:ss', this._locale);
        this.control.patchValue({
            date: dateRaw.split(',')[0],
            time: dateRaw.split(',')[1],
        });
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    ngOnInit() {
        const { min, max } = this.data?.props ?? {};
        this.dateSettings = {
            min: !min ? '' : formatDate(min, 'yyyy-MM-dd', this._locale),
            max: !max ? '' : formatDate(max, 'yyyy-MM-dd', this._locale),
        };
    }
    updateControl() {
        const { date, time } = this.control.value;
        if (!date) {
            return;
        }
        const _date = new Date(date);
        if (time) {
            const [hours, minutes, seconds] = time.split(':');
            if (hours)
                _date.setHours(parseInt(hours));
            if (minutes)
                _date.setMinutes(parseInt(minutes));
            if (seconds)
                _date.setSeconds(parseInt(seconds));
        }
        this._onChange(_date);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicDateComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicDateComponent, isStandalone: true, selector: "ui-basic-date", host: { classAttribute: "ui-basic" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"date-input\"\n    [ngClass]=\"{\n      disabled: control.disabled\n    }\"\n  >\n    <input\n      type=\"date\"\n      [attr.min]=\"dateSettings.min\"\n      [attr.max]=\"dateSettings.max\"\n      [propsBinding]=\"[\n        {\n          props: data.props,\n          omit: ['min', 'max', 'type']\n        }\n      ]\"\n      [formControl]=\"control.controls.date\"\n      (change)=\"updateControl()\"\n    />\n\n    <ng-container *ngIf=\"data?.props?.showTime === true\">\n      <input type=\"time\" [formControl]=\"control.controls.time\" />\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-date', standalone: true, imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"date-input\"\n    [ngClass]=\"{\n      disabled: control.disabled\n    }\"\n  >\n    <input\n      type=\"date\"\n      [attr.min]=\"dateSettings.min\"\n      [attr.max]=\"dateSettings.max\"\n      [propsBinding]=\"[\n        {\n          props: data.props,\n          omit: ['min', 'max', 'type']\n        }\n      ]\"\n      [formControl]=\"control.controls.date\"\n      (change)=\"updateControl()\"\n    />\n\n    <ng-container *ngIf=\"data?.props?.showTime === true\">\n      <input type=\"time\" [formControl]=\"control.controls.time\" />\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }] });

class UiBasicInputMaskComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicInputMaskComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicInputMaskComponent, isStandalone: true, selector: "ui-basic-input-mask", host: { classAttribute: "ui-basic" }, providers: [
            providePropsBinding([
                {
                    key: 'imask',
                    token: IMaskDirective,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <input\n    type=\"text\"\n    imaskValuePatch\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [imask]=\"data.inputMask\"\n    [propsBinding]=\"[\n      {\n        props: data.props,\n        omit: ['type']\n      },\n      {\n        key: 'imask',\n        props: data.props\n      }\n    ]\"\n    [formControl]=\"control\"\n    (complete)=\"onChange(control.value)\"\n  />\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: IMaskDirective, selector: "[imask]", inputs: ["imask", "unmask", "imaskElement"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { kind: "directive", type: ImaskValuePatchDirective, selector: "[imaskValuePatch]" }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicInputMaskComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-input-mask', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        IMaskDirective,
                        ImaskValuePatchDirective,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'imask',
                                token: IMaskDirective,
                            },
                        ]),
                    ], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <input\n    type=\"text\"\n    imaskValuePatch\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [imask]=\"data.inputMask\"\n    [propsBinding]=\"[\n      {\n        props: data.props,\n        omit: ['type']\n      },\n      {\n        key: 'imask',\n        props: data.props\n      }\n    ]\"\n    [formControl]=\"control\"\n    (complete)=\"onChange(control.value)\"\n  />\n</ng-container>\n" }]
        }] });

class UiBasicInputComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new UntypedFormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    onInput(e) {
        const value = e.target.value;
        this.control.setValue(value);
        this.onChange(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicInputComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicInputComponent, isStandalone: true, selector: "ui-basic-input", host: { classAttribute: "ui-basic" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <input\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [attr.type]=\"data.type ?? 'text'\"\n    [propsBinding]=\"[\n      {\n        props: data.props,\n        omit: ['type']\n      }\n    ]\"\n    [formControl]=\"control\"\n    (input)=\"onInput($event)\"\n  />\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-input', standalone: true, imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <input\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [attr.type]=\"data.type ?? 'text'\"\n    [propsBinding]=\"[\n      {\n        props: data.props,\n        omit: ['type']\n      }\n    ]\"\n    [formControl]=\"control\"\n    (input)=\"onInput($event)\"\n  />\n</ng-container>\n" }]
        }] });

class UiBasicRadioComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.selectedIndex = -1;
        this.isDisabled = false;
    }
    writeValue(obj) {
        const index = this.data?.options?.data?.findIndex((x) => JSON.stringify(x.value) === JSON.stringify(obj)) ?? -1;
        this.selectedIndex = index;
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    onChange(i) {
        const value = this.data?.options?.data?.[i].value;
        this._onChange(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicRadioComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicRadioComponent, isStandalone: true, selector: "ui-basic-radio", host: { classAttribute: "ui-basic" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"data.options?.containerStyles\"\n    [ngClass]=\"[\n      data.options?.containerClass ?? '',\n      isDisabled ? 'disabled' : ''\n    ]\"\n    [ngStyle]=\"{\n      'flex-direction': data.options?.layout,\n    }\"\n  >\n    <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n      <div class=\"option-button-wrapper\">\n        <label\n          class=\"option-button\"\n          [ngStyle]=\"{\n            'justify-content':\n              data.options?.labelPosition === 'before' ? 'space-between' : null\n          }\"\n        >\n          <span *ngIf=\"data.options?.labelPosition === 'before'\">{{\n            item.label\n          }}</span>\n\n          <input\n            type=\"radio\"\n            [name]=\"data.formControlName\"\n            [propsBinding]=\"[\n              {\n                props: data.props,\n                omit: ['type', 'name']\n              }\n            ]\"\n            [checked]=\"selectedIndex === i\"\n            (change)=\"onChange(i)\"\n          />\n          <span class=\"marker\"></span>\n\n          <span *ngIf=\"data.options?.labelPosition !== 'before'\">{{\n            item.label\n          }}</span>\n        </label>\n      </div>\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-radio', standalone: true, imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"data.options?.containerStyles\"\n    [ngClass]=\"[\n      data.options?.containerClass ?? '',\n      isDisabled ? 'disabled' : ''\n    ]\"\n    [ngStyle]=\"{\n      'flex-direction': data.options?.layout,\n    }\"\n  >\n    <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n      <div class=\"option-button-wrapper\">\n        <label\n          class=\"option-button\"\n          [ngStyle]=\"{\n            'justify-content':\n              data.options?.labelPosition === 'before' ? 'space-between' : null\n          }\"\n        >\n          <span *ngIf=\"data.options?.labelPosition === 'before'\">{{\n            item.label\n          }}</span>\n\n          <input\n            type=\"radio\"\n            [name]=\"data.formControlName\"\n            [propsBinding]=\"[\n              {\n                props: data.props,\n                omit: ['type', 'name']\n              }\n            ]\"\n            [checked]=\"selectedIndex === i\"\n            (change)=\"onChange(i)\"\n          />\n          <span class=\"marker\"></span>\n\n          <span *ngIf=\"data.options?.labelPosition !== 'before'\">{{\n            item.label\n          }}</span>\n        </label>\n      </div>\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }] });

class UiBasicRangeComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(0);
        this.tickMarks = [];
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    ngOnInit() {
        this._getTickMarksCount();
    }
    get valuePosition() {
        const min = this.data?.props?.min ?? 0;
        const max = this.data?.props?.max ?? 0;
        return `${((this.control.value - min) / (max - min)) * 100}%`;
    }
    _getTickMarksCount() {
        if (!this.data?.props || !this.data.props.showTickMarks) {
            return;
        }
        const diff = (this.data.props.max ?? 1) - (this.data.props.min ?? 1);
        const steps = this.data.props.step ?? 1;
        if (diff === 0)
            return;
        this.tickMarks = Array.from(Array(Math.ceil(diff / steps) + 1).keys()).map((x, i) => i);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicRangeComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicRangeComponent, isStandalone: true, selector: "ui-basic-range", host: { classAttribute: "ui-basic" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"range-input\"\n    [ngClass]=\"{\n      'show-tick-marks':\n        data.props?.showTickMarks === true ||\n        data.props?.showCurrentValue === true,\n      disabled: control.disabled\n    }\"\n  >\n    <input\n      type=\"range\"\n      [ngStyle]=\"{\n        'background-size': valuePosition\n      }\"\n      [propsBinding]=\"[\n        {\n          props: data.props,\n          omit: ['type']\n        }\n      ]\"\n      [formControl]=\"control\"\n      (input)=\"onChange(control.value)\"\n    />\n\n    <ng-container *ngIf=\"data.props?.showCurrentValue\">\n      <div class=\"current-value\" [style.--left]=\"valuePosition\">\n        {{ control.value }}\n      </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"data.props?.showTickMarks\">\n      <div class=\"tick-marks-container\">\n        <ng-container *ngFor=\"let mark of tickMarks; index as i\">\n          <span class=\"tick-mark\"></span>\n        </ng-container>\n      </div>\n\n      <div class=\"min-number\">{{ data.props?.min }}</div>\n      <div class=\"max-number\">{{ data.props?.max }}</div>\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicRangeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-range', standalone: true, imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"range-input\"\n    [ngClass]=\"{\n      'show-tick-marks':\n        data.props?.showTickMarks === true ||\n        data.props?.showCurrentValue === true,\n      disabled: control.disabled\n    }\"\n  >\n    <input\n      type=\"range\"\n      [ngStyle]=\"{\n        'background-size': valuePosition\n      }\"\n      [propsBinding]=\"[\n        {\n          props: data.props,\n          omit: ['type']\n        }\n      ]\"\n      [formControl]=\"control\"\n      (input)=\"onChange(control.value)\"\n    />\n\n    <ng-container *ngIf=\"data.props?.showCurrentValue\">\n      <div class=\"current-value\" [style.--left]=\"valuePosition\">\n        {{ control.value }}\n      </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"data.props?.showTickMarks\">\n      <div class=\"tick-marks-container\">\n        <ng-container *ngFor=\"let mark of tickMarks; index as i\">\n          <span class=\"tick-mark\"></span>\n        </ng-container>\n      </div>\n\n      <div class=\"min-number\">{{ data.props?.min }}</div>\n      <div class=\"max-number\">{{ data.props?.max }}</div>\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }] });

class UiBasicSelectComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(-1);
        this.onTouched = () => { };
        this.onChange = (_) => { };
    }
    writeValue(obj) {
        const index = this.data?.options?.data?.findIndex((x) => JSON.stringify(x.value) === JSON.stringify(obj));
        if (index !== undefined) {
            this.control.setValue(index);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    updateControl(e) {
        const index = e.target.value;
        if (index) {
            const value = this.data?.options?.data?.map((x) => x.value)?.[parseInt(index)];
            this.onChange(value);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicSelectComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicSelectComponent, isStandalone: true, selector: "ui-basic-select", host: { classAttribute: "ui-basic" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [ngClass]=\"{\n      disabled: control.disabled\n    }\"\n    [ngStyle]=\"{\n      'flex-direction': data.options?.layout\n    }\"\n  >\n    <select\n      [propsBinding]=\"[\n        {\n          props: data.props\n        }\n      ]\"\n      [formControl]=\"control\"\n      (blur)=\"onTouched()\"\n      (change)=\"updateControl($event)\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <option [value]=\"i\">{{ item.label }}</option>\n      </ng-container>\n    </select>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-select', standalone: true, imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [ngClass]=\"{\n      disabled: control.disabled\n    }\"\n    [ngStyle]=\"{\n      'flex-direction': data.options?.layout\n    }\"\n  >\n    <select\n      [propsBinding]=\"[\n        {\n          props: data.props\n        }\n      ]\"\n      [formControl]=\"control\"\n      (blur)=\"onTouched()\"\n      (change)=\"updateControl($event)\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <option [value]=\"i\">{{ item.label }}</option>\n      </ng-container>\n    </select>\n  </div>\n</ng-container>\n" }]
        }] });

class UiBasicSwitchComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(false);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    updateControl(e) {
        const checked = e.target.checked;
        this.control.setValue(checked);
        this._onChange(checked);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicSwitchComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicSwitchComponent, isStandalone: true, selector: "ui-basic-switch", host: { classAttribute: "ui-basic" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"option-button-wrapper\"\n    [ngClass]=\"{\n      disabled: control.disabled\n    }\"\n  >\n    <label class=\"option-button switch-button\">\n      <ng-container\n        *ngIf=\"data.options?.labelPosition === 'before'\"\n        [ngTemplateOutlet]=\"labelTemplate\"\n      ></ng-container>\n\n      <input\n        type=\"checkbox\"\n        [propsBinding]=\"[\n          {\n            props: data.props,\n            omit: ['type']\n          }\n        ]\"\n        [checked]=\"control.value === true\"\n        (change)=\"updateControl($event)\"\n      />\n      <span class=\"marker\"></span>\n\n      <ng-container\n        *ngIf=\"data.options?.labelPosition !== 'before'\"\n        [ngTemplateOutlet]=\"labelTemplate\"\n      ></ng-container>\n    </label>\n  </div>\n\n  <ng-template #labelTemplate>\n    <span *ngIf=\"data.options?.data?.[0]?.label\">{{\n      data.options?.data?.[0]?.label\n    }}</span>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-switch', standalone: true, imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"option-button-wrapper\"\n    [ngClass]=\"{\n      disabled: control.disabled\n    }\"\n  >\n    <label class=\"option-button switch-button\">\n      <ng-container\n        *ngIf=\"data.options?.labelPosition === 'before'\"\n        [ngTemplateOutlet]=\"labelTemplate\"\n      ></ng-container>\n\n      <input\n        type=\"checkbox\"\n        [propsBinding]=\"[\n          {\n            props: data.props,\n            omit: ['type']\n          }\n        ]\"\n        [checked]=\"control.value === true\"\n        (change)=\"updateControl($event)\"\n      />\n      <span class=\"marker\"></span>\n\n      <ng-container\n        *ngIf=\"data.options?.labelPosition !== 'before'\"\n        [ngTemplateOutlet]=\"labelTemplate\"\n      ></ng-container>\n    </label>\n  </div>\n\n  <ng-template #labelTemplate>\n    <span *ngIf=\"data.options?.data?.[0]?.label\">{{\n      data.options?.data?.[0]?.label\n    }}</span>\n  </ng-template>\n</ng-container>\n" }]
        }] });

class UiBasicTextareaComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl('');
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    onInput(e) {
        const value = e.target.value;
        this.control.setValue(value);
        this.onChange(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicTextareaComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicTextareaComponent, isStandalone: true, selector: "ui-basic-textarea", host: { classAttribute: "ui-basic" }, providers: [
            providePropsBinding([
                {
                    key: 'textarea-autoheight',
                    token: TextareaAutHeightDirective,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <textarea\n    textareaAutoHeight\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [propsBinding]=\"[\n      {\n        key: 'textarea-autoheight',\n        props: data.props\n      }\n    ]\"\n    [formControl]=\"control\"\n    (input)=\"onInput($event)\"\n  ></textarea>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: TextareaAutHeightDirective, selector: "[textareaAutoHeight]", inputs: ["autoResize"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-textarea', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        TextareaAutHeightDirective,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'textarea-autoheight',
                                token: TextareaAutHeightDirective,
                            },
                        ]),
                    ], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <textarea\n    textareaAutoHeight\n    [ngClass]=\"{ disabled: control.disabled }\"\n    [propsBinding]=\"[\n      {\n        key: 'textarea-autoheight',\n        props: data.props\n      }\n    ]\"\n    [formControl]=\"control\"\n    (input)=\"onInput($event)\"\n  ></textarea>\n</ng-container>\n" }]
        }] });

const UI_BASIC_COMPONENTS = {
    checkbox: UiBasicCheckboxComponent,
    date: UiBasicDateComponent,
    password: UiBasicInputComponent,
    number: UiBasicInputComponent,
    email: UiBasicInputComponent,
    radio: UiBasicRadioComponent,
    range: UiBasicRangeComponent,
    select: UiBasicSelectComponent,
    switch: UiBasicSwitchComponent,
    text: UiBasicInputComponent,
    textMask: UiBasicInputMaskComponent,
    textarea: UiBasicTextareaComponent,
};

class FormControlComponent {
    constructor() {
        this._cd = inject(ChangeDetectorRef);
        this._destroyRef = inject(DestroyRef);
        this._globalVariableService = inject(GlobalVariableService);
        this._formReadyStateService = inject(FormReadyStateService);
        this._optionsDataService = inject(OptionsDataService);
        this._uiComponents = this._globalVariableService.uiComponents;
        this._pendingValue = null;
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this.customTemplates = this._globalVariableService.customTemplates;
        this.loadingComponent = this._globalVariableService.loadingComponent;
        this.loadingTemplate = this._globalVariableService.loadingTemplate;
        this.loading = false;
        this.useCustomLoading = false;
        this.hostForm = this._globalVariableService.rootForm;
        this.hideErrorMessage$ = this._globalVariableService.hideErrorMessage$;
    }
    onFocusOut() {
        if (this.data?.type === 'select') {
            // For select component, trigger when it's blurred.
            // It's implemented on the corresponding component.
            return;
        }
        this._onTouched();
    }
    writeValue(obj) {
        this._pendingValue = obj;
        this._controlComponent?.writeValue(obj);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this._controlComponent?.setDisabledState(isDisabled);
    }
    validate(control) {
        return this._controlComponent?.validate(control) ?? null;
    }
    ngOnInit() {
        this.useCustomLoading =
            Boolean(this.loadingComponent) || Boolean(this.loadingTemplate);
    }
    ngAfterViewInit() {
        this._injectInputComponent();
        this._fetchOptions();
        this._errorMessageEvent();
        this._cd.detectChanges();
    }
    ngOnDestroy() {
        this.control = undefined;
        this.data = undefined;
    }
    updateControlStatus(status, updateSelf = false) {
        const control = this.control;
        const controlComponent = this._controlComponent;
        const markAsDirty = () => {
            controlComponent?.control?.markAsDirty();
            controlComponent?.markAsDirty();
            if (updateSelf) {
                control?.markAsDirty();
            }
        };
        const markAsPristine = () => {
            controlComponent?.control?.markAsPristine();
            controlComponent?.markAsPristine();
            if (updateSelf) {
                control?.markAsPristine();
            }
        };
        const markAsTouched = () => {
            controlComponent?.control?.markAsTouched();
            controlComponent?.markAsTouched();
            if (updateSelf) {
                control?.markAsTouched();
            }
        };
        const markAsUntouched = () => {
            controlComponent?.control?.markAsUntouched();
            controlComponent?.markAsUntouched();
            if (updateSelf) {
                control?.markAsUntouched();
            }
        };
        switch (status) {
            case 'dirty':
                markAsDirty();
                break;
            case 'pristine':
                markAsPristine();
                break;
            case 'touched':
                markAsTouched();
                break;
            case 'untouched':
                markAsUntouched();
                break;
        }
    }
    get showErrors() {
        const controlTouched = this.control?.touched ?? false;
        const controlDirty = this.control?.dirty ?? false;
        const hasErrors = !!this.control?.errors;
        if (this.hideErrorMessage$) {
            return false;
        }
        return (controlDirty || controlTouched) && hasErrors;
    }
    _injectComponent(vcr, component) {
        if (!vcr || !component)
            return null;
        vcr.clear();
        const componentRef = vcr.createComponent(component);
        return componentRef;
    }
    _injectInputComponent() {
        if (this.customTemplates?.[this.data?.formControlName ?? '']) {
            return;
        }
        const inputComponent = this.customComponent ||
            this._uiComponents?.[this._inputType] ||
            UI_BASIC_COMPONENTS[this._inputType] ||
            UiBasicInputComponent;
        const componentRef = this._injectComponent(this.inputComponentAnchor, inputComponent);
        if (!componentRef)
            return;
        componentRef.instance.data = this.data;
        componentRef.instance.hostForm = this._globalVariableService.rootForm;
        componentRef.instance.writeValue(this._pendingValue);
        componentRef.instance.registerOnChange(this._onChange);
        componentRef.instance.registerOnTouched(this._onTouched);
        this._controlComponent = componentRef.instance;
    }
    _fetchOptions() {
        if (!this.data || !this.data.options) {
            this._pendingValue = null;
            return;
        }
        const { src, srcAppendPosition, autoSelectFirst, data: staticOptions = [], } = this.data.options;
        const updateControlValue = (value) => {
            this.control?.setValue(value);
            this._controlComponent?.writeValue(value);
        };
        const selectFirst = (options) => {
            if (!autoSelectFirst || !options.length)
                return;
            updateControlValue(options[0].value);
        };
        const setLoading = (val) => {
            this.loading = val;
            this._formReadyStateService.optionsLoading(val);
        };
        if (!src) {
            selectFirst(staticOptions);
            return;
        }
        const source$ = typeof src === 'string'
            ? this._globalVariableService.optionsSources?.[src]
            : this._optionsDataService.getOptions$(src, () => {
                setLoading(true);
                updateControlValue(null);
            });
        setLoading(true);
        source$
            ?.pipe(tap((x) => {
            const options = srcAppendPosition === 'before'
                ? x.concat(staticOptions)
                : staticOptions.concat(x);
            if (this._pendingValue) {
                updateControlValue(this._pendingValue);
                this._pendingValue = null;
            }
            else {
                selectFirst(options);
            }
            setLoading(false);
            this._controlComponent?.onOptionsGet(options);
        }), finalize(() => setLoading(false)))
            .subscribe();
    }
    _errorMessageEvent() {
        if (!this.control)
            return;
        const control = this.control;
        const controlComponent = this._controlComponent;
        combineLatest([
            this.hideErrorMessage$,
            control.statusChanges.pipe(startWith(control.status)),
        ])
            .pipe(debounceTime(0), tap(() => {
            const hideErrors = this.hideErrorMessage$.value;
            const controlErrors = control.errors;
            const componentErrors = controlComponent?.control?.errors;
            const errors = hideErrors || (!controlErrors && !componentErrors)
                ? null
                : control.errors;
            if (controlComponent) {
                controlComponent.control?.setErrors(errors);
                controlComponent.setErrors(errors);
                controlComponent.hideErrorMessage = hideErrors;
            }
            if (hideErrors === false) {
                this.updateControlStatus('dirty', true);
                this.updateControlStatus('touched', true);
            }
        }), takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
    get _inputType() {
        if (this.data?.inputMask) {
            return 'textMask';
        }
        // Fallback to text input if `type` is not specified.
        if (!this.data?.type) {
            return 'text';
        }
        switch (this.data.type) {
            case 'number':
            case 'text':
                return 'text';
            default:
                return this.data.type;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FormControlComponent, isStandalone: true, selector: "form-control", inputs: { data: "data", control: "control", customComponent: "customComponent" }, host: { listeners: { "focusout": "onFocusOut($event)" }, classAttribute: "form-control" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => FormControlComponent),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => FormControlComponent),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "inputComponentAnchor", first: true, predicate: ["inputComponentAnchor"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"input-container\"\n    [ngClass]=\"{\n      disabled: !useCustomLoading && loading,\n      hidden: useCustomLoading && loading\n    }\"\n  >\n    <!-- Input template -->\n    <ng-container\n      [ngTemplateOutlet]=\"customTemplates?.[data.formControlName] ?? null\"\n      [ngTemplateOutletContext]=\"{\n        control,\n        data,\n        hostForm,\n        hideErrorMessage: hideErrorMessage$.value\n      }\"\n    ></ng-container>\n\n    <!-- Input component -->\n    <ng-container #inputComponentAnchor></ng-container>\n  </div>\n\n  <div class=\"loading-container\" [ngClass]=\"{ hidden: !loading }\">\n    <!-- Loading component -->\n    <ng-container *ngComponentOutlet=\"loadingComponent ?? null\"></ng-container>\n\n    <!-- Loading template -->\n    <ng-container [ngTemplateOutlet]=\"loadingTemplate ?? null\"> </ng-container>\n  </div>\n</ng-container>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-control', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => FormControlComponent),
                            multi: true,
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => FormControlComponent),
                            multi: true,
                        },
                    ], host: {
                        class: 'form-control',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"input-container\"\n    [ngClass]=\"{\n      disabled: !useCustomLoading && loading,\n      hidden: useCustomLoading && loading\n    }\"\n  >\n    <!-- Input template -->\n    <ng-container\n      [ngTemplateOutlet]=\"customTemplates?.[data.formControlName] ?? null\"\n      [ngTemplateOutletContext]=\"{\n        control,\n        data,\n        hostForm,\n        hideErrorMessage: hideErrorMessage$.value\n      }\"\n    ></ng-container>\n\n    <!-- Input component -->\n    <ng-container #inputComponentAnchor></ng-container>\n  </div>\n\n  <div class=\"loading-container\" [ngClass]=\"{ hidden: !loading }\">\n    <!-- Loading component -->\n    <ng-container *ngComponentOutlet=\"loadingComponent ?? null\"></ng-container>\n\n    <!-- Loading template -->\n    <ng-container [ngTemplateOutlet]=\"loadingTemplate ?? null\"> </ng-container>\n  </div>\n</ng-container>\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { data: [{
                type: Input
            }], control: [{
                type: Input
            }], customComponent: [{
                type: Input
            }], inputComponentAnchor: [{
                type: ViewChild,
                args: ['inputComponentAnchor', { read: ViewContainerRef }]
            }], onFocusOut: [{
                type: HostListener,
                args: ['focusout', ['$event']]
            }] } });

class FormGroupComponent {
    constructor() {
        this._el = inject(ElementRef);
        this._globalVariableService = inject(GlobalVariableService);
        this.parentForm = new UntypedFormGroup({});
        this.customComponents = this._globalVariableService.customComponents;
    }
    ngOnChanges(changes) {
        const host = this._el.nativeElement;
        const { rootClass, rootStyles } = changes;
        if (rootClass) {
            const classList = getClassListFromString(rootClass.currentValue);
            host.classList.add(...classList);
        }
        if (rootStyles) {
            const styleList = getStyleListFromString(rootStyles.currentValue);
            for (const item of styleList) {
                const [name, value] = item.split(':');
                host.style.setProperty(name, value);
            }
        }
    }
    updateStatus(status) {
        this.formControlRefs?.forEach((x) => x.updateControlStatus(status, true));
        this.formGroupRefs?.forEach((x) => x.updateStatus(status));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FormGroupComponent, isStandalone: true, selector: "form-group", inputs: { configs: "configs", collapsibleState: "collapsibleState", parentId: "parentId", parentForm: "parentForm", rootClass: "rootClass", rootStyles: "rootStyles" }, host: { classAttribute: "grid-container form-group-container" }, viewQueries: [{ propertyName: "formGroupRefs", predicate: FormGroupComponent, descendants: true }, { propertyName: "formControlRefs", predicate: FormControlComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container [formGroup]=\"parentForm\">\n  <ng-container *ngFor=\"let item of configs\">\n    <ng-container *ngIf=\"!item.hidden\">\n      <ng-container\n        *ngIf=\"parentForm?.controls?.[item.formControlName] as targetControl\"\n      >\n        <content-wrapper\n          style=\"display: block\"\n          [config]=\"item\"\n          [control]=\"targetControl\"\n          [collapsibleState]=\"collapsibleState\"\n          [controlLayout]=\"{\n            type: 'host',\n            layout: item.layout\n          }\"\n          [hostId]=\"{\n            parentId,\n            controlName: item.formControlName,\n          }\"\n          [ngClass]=\"{\n            'form-control-container': (item | controlTypeByConfig) === 'FormControl',\n            readonly: item.readonly,\n          }\"\n        >\n          <!-- FormControl -->\n          <ng-container *ngIf=\"(item | controlTypeByConfig) === 'FormControl'\">\n            <form-control\n              [data]=\"item\"\n              [control]=\"targetControl\"\n              [formControlName]=\"item.formControlName\"\n              [customComponent]=\"customComponents?.[item.formControlName]\"\n              [controlLayout]=\"{\n                type: 'inputArea',\n                layout: item.layout\n              }\"\n            ></form-control>\n          </ng-container>\n\n          <!-- FormGroup -->\n          <ng-container *ngIf=\"(item | controlTypeByConfig) === 'FormGroup'\">\n            <form-group\n              [parentId]=\"\n                (parentId ? parentId + '.' : '') + item.formControlName\n              \"\n              [parentForm]=\"$any(targetControl)\"\n              [configs]=\"item.children\"\n              [collapsibleState]=\"collapsibleState\"\n              [controlLayout]=\"{\n                type: 'formGroup',\n                layout: item.layout\n              }\"\n            ></form-group>\n          </ng-container>\n        </content-wrapper>\n      </ng-container>\n    </ng-container>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "component", type: FormGroupComponent, selector: "form-group", inputs: ["configs", "collapsibleState", "parentId", "parentForm", "rootClass", "rootStyles"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: ContentWrapperComponent, selector: "content-wrapper", inputs: ["config", "control", "collapsibleState"] }, { kind: "directive", type: HostIdDirective, selector: "[hostId]", inputs: ["hostId"] }, { kind: "directive", type: ControlLayoutDirective, selector: "[controlLayout]", inputs: ["controlLayout"] }, { kind: "component", type: FormControlComponent, selector: "form-control", inputs: ["data", "control", "customComponent"] }, { kind: "pipe", type: ControlTypeByConfigPipe, name: "controlTypeByConfig" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-group', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        ContentWrapperComponent,
                        HostIdDirective,
                        ControlLayoutDirective,
                        FormControlComponent,
                        ControlTypeByConfigPipe,
                    ], host: {
                        class: 'grid-container form-group-container',
                    }, template: "<ng-container [formGroup]=\"parentForm\">\n  <ng-container *ngFor=\"let item of configs\">\n    <ng-container *ngIf=\"!item.hidden\">\n      <ng-container\n        *ngIf=\"parentForm?.controls?.[item.formControlName] as targetControl\"\n      >\n        <content-wrapper\n          style=\"display: block\"\n          [config]=\"item\"\n          [control]=\"targetControl\"\n          [collapsibleState]=\"collapsibleState\"\n          [controlLayout]=\"{\n            type: 'host',\n            layout: item.layout\n          }\"\n          [hostId]=\"{\n            parentId,\n            controlName: item.formControlName,\n          }\"\n          [ngClass]=\"{\n            'form-control-container': (item | controlTypeByConfig) === 'FormControl',\n            readonly: item.readonly,\n          }\"\n        >\n          <!-- FormControl -->\n          <ng-container *ngIf=\"(item | controlTypeByConfig) === 'FormControl'\">\n            <form-control\n              [data]=\"item\"\n              [control]=\"targetControl\"\n              [formControlName]=\"item.formControlName\"\n              [customComponent]=\"customComponents?.[item.formControlName]\"\n              [controlLayout]=\"{\n                type: 'inputArea',\n                layout: item.layout\n              }\"\n            ></form-control>\n          </ng-container>\n\n          <!-- FormGroup -->\n          <ng-container *ngIf=\"(item | controlTypeByConfig) === 'FormGroup'\">\n            <form-group\n              [parentId]=\"\n                (parentId ? parentId + '.' : '') + item.formControlName\n              \"\n              [parentForm]=\"$any(targetControl)\"\n              [configs]=\"item.children\"\n              [collapsibleState]=\"collapsibleState\"\n              [controlLayout]=\"{\n                type: 'formGroup',\n                layout: item.layout\n              }\"\n            ></form-group>\n          </ng-container>\n        </content-wrapper>\n      </ng-container>\n    </ng-container>\n  </ng-container>\n</ng-container>\n" }]
        }], propDecorators: { configs: [{
                type: Input
            }], collapsibleState: [{
                type: Input
            }], parentId: [{
                type: Input
            }], parentForm: [{
                type: Input
            }], rootClass: [{
                type: Input
            }], rootStyles: [{
                type: Input
            }], formGroupRefs: [{
                type: ViewChildren,
                args: [FormGroupComponent]
            }], formControlRefs: [{
                type: ViewChildren,
                args: [FormControlComponent]
            }] } });

class NgDynamicJsonFormComponent {
    constructor() {
        this._providerConfig = inject(NG_DYNAMIC_JSON_FORM_CONFIG, {
            optional: true,
        });
        this._cd = inject(ChangeDetectorRef);
        this._el = inject(ElementRef);
        this._injector = inject(Injector);
        this._destroyRef = inject(DestroyRef);
        this._configValidationService = inject(ConfigValidationService);
        this._formGeneratorService = inject(FormGeneratorService);
        this._formConditionsService = inject(FormConditionsService);
        this._formValueService = inject(FormValueService);
        this._formReadyStateService = inject(FormReadyStateService);
        this._globalVariableService = inject(GlobalVariableService);
        this._optionsDataService = inject(OptionsDataService);
        this._controlDirective = null;
        /**
         * Whether to allow the form to mark as dirty
         * @description
         * If false, then it will automatically set to pristine
         * after each value changes.
         */
        this._allowFormDirty = false;
        this._globalVariablesInitialized = false;
        this._reset$ = new Subject();
        this._validationCount = 0;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.configGet = [];
        this.configValidationErrors = [];
        this.formGet = new EventEmitter();
        /**
         * The value change event of the form, which trigger by the user
         * (by checking click or keydown event)
         */
        this.onChange = new EventEmitter();
        this.optionsLoaded = new EventEmitter();
        this.displayValue = new EventEmitter();
        this.updateStatusFunctions = new EventEmitter();
    }
    ngOnChanges(simpleChanges) {
        const { configs, hideErrorMessage } = simpleChanges;
        if (hideErrorMessage) {
            this._globalVariableService.hideErrorMessage$.next(hideErrorMessage.currentValue);
        }
        if (configs && this._globalVariablesInitialized) {
            this._buildForm();
        }
    }
    ngOnInit() {
        this._setupVariables();
        this._getControlDirective();
        this._buildForm();
    }
    ngOnDestroy() {
        this._reset$.next();
        this._reset$.complete();
        this._optionsDataService.onDestroy();
    }
    validate() {
        if (!this.form || this.form.valid) {
            return of(null);
        }
        return this.form.statusChanges.pipe(startWith(this.form.status), filter((x) => x !== 'PENDING'), take(1), map(() => this._formErrors));
    }
    registerOnValidatorChange(fn) { }
    writeValue(obj) {
        this._formValueService.patchForm(this.form, obj);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.form?.disable() : this.form?.enable();
    }
    _setupVariables() {
        const { errorComponent, labelComponent, loadingComponent, uiComponents, ...providerProps } = this._providerConfig ?? {};
        const errors = {
            errorComponents: this.errorComponents,
            errorTemplates: this.errorTemplates,
            errorComponentDefault: this.errorComponentDefault ?? errorComponent,
            errorTemplateDefault: this.errorTemplateDefault,
        };
        const labels = {
            labelComponents: this.labelComponents,
            labelTemplates: this.labelTemplates,
            labelComponentDefault: this.labelComponentDefault ?? labelComponent,
            labelTemplateDefault: this.labelTemplateDefault,
        };
        const loading = {
            loadingComponent: this.loadingComponent ?? loadingComponent,
            loadingTemplate: this.loadingTemplate,
        };
        this._globalVariableService.setup({
            ...errors,
            ...labels,
            ...loading,
            uiComponents: {
                ...UI_BASIC_COMPONENTS,
                ...uiComponents,
            },
            customComponents: this.customComponents,
            customTemplates: this.customTemplates,
            conditionsActionFunctions: this.conditionsActionFunctions,
            descriptionPosition: this.descriptionPosition,
            hostElement: this._el.nativeElement,
            optionsSources: this.optionsSources,
            customAsyncValidators: providerProps.customAsyncValidators,
            customValidators: providerProps.customValidators,
            hideErrorsForTypes: providerProps.hideErrorsForTypes,
            showErrorsOnTouched: providerProps.showErrorsOnTouched ?? true,
            validationMessages: providerProps.validationMessages,
        });
        this._globalVariablesInitialized = true;
    }
    _buildForm() {
        this._reset();
        if (!this.configs) {
            return;
        }
        const result = this._configValidationService.validateAndGetConfig(this.configs);
        this.configGet = result.configs ?? [];
        this.configValidationErrors = result.errors ?? [];
        this._allowFormDirty = false;
        if (this.configGet.length > 0 && !this.configValidationErrors.length) {
            this.form = this._formGeneratorService.generateFormGroup(this.configGet);
            this._globalVariableService.rootForm = this.form;
            this._globalVariableService.rootConfigs = this.configGet;
            this._cd.detectChanges();
            this._setupListeners();
            if (typeof window !== 'undefined') {
                // The form controls' state will be toggle immediately after conditions listeners are setup.
                // It will be a problem when user calling the `disable()` or `enable()` in the `formGet` callback (race condition).
                // Hence, we emit the event in the next tick to prevent this.
                window.setTimeout(() => {
                    this.formGet.emit(this.form);
                    this.updateStatusFunctions.emit({
                        setDirty: () => this._updateFormStatus('setDirty'),
                        setPristine: () => this._updateFormStatus('setPristine'),
                        setTouched: () => this._updateFormStatus('setTouched'),
                        setUntouched: () => this._updateFormStatus('setUntouched'),
                    });
                    this._checkOptionsLoaded();
                });
            }
        }
        if (!this._formReadyStateService.haveOptionsToWait(this.configGet)) {
            this._formReadyStateService.optionsLoading(false);
        }
    }
    _getControlDirective() {
        this._controlDirective = this._injector.get(NgControl, null, {
            optional: true,
            self: true,
        });
    }
    _setupListeners() {
        if (!this.form || typeof window === 'undefined') {
            return;
        }
        const host = this._el.nativeElement;
        const conditions$ = this._formConditionsService.listenConditions$();
        const event$ = (name) => fromEvent(host, name, { passive: true });
        const valueChanges$ = this._formValueChanges$();
        // Avoid using `debounceTime()` or `distinctUntilChanged()` here
        const statusChanges$ = this.form.statusChanges.pipe(startWith(this.form.status), tap(() => {
            // setErrors() again after statusChanges, to get the correct errors after
            // the re-validation if there are any async validators.
            this.form?.setErrors(this._formErrors, {
                emitEvent: false, // prevent maximum call stack exceeded
            });
        }));
        const onTouched$ = event$('focusout').pipe(take(1), tap(() => this._onTouched()));
        const allowDirtyState$ = merge(event$('pointerdown'), event$('keydown')).pipe(take(1), tap(() => (this._allowFormDirty = true)));
        this._reset$.next();
        merge(allowDirtyState$, conditions$, onTouched$, statusChanges$, valueChanges$)
            .pipe(takeUntil(this._reset$), takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
    _reset() {
        this._reset$.next();
        this._optionsDataService.cancelAllRequest();
        this._formReadyStateService.resetState();
        this._controlDirective?.control.markAsUntouched();
        this._controlDirective?.form.markAsUntouched();
        this.configValidationErrors = [];
    }
    _updateFormStatus(status) {
        switch (status) {
            case 'setDirty':
                this.formGroupRef?.updateStatus('dirty');
                break;
            case 'setPristine':
                this.formGroupRef?.updateStatus('pristine');
                break;
            case 'setTouched':
                this.formGroupRef?.updateStatus('touched');
                break;
            case 'setUntouched':
                this.formGroupRef?.updateStatus('untouched');
                break;
        }
    }
    _formValueChanges$() {
        const form = this.form;
        if (!form) {
            return EMPTY;
        }
        const updateValue = () => {
            const value = form.value;
            if (this._controlDirective) {
                this._onChange(value);
            }
            if (this._allowFormDirty) {
                this.onChange.emit(value);
            }
        };
        const updateDisplayValue = () => {
            const displayValue = this._formValueService.getFormDisplayValue(form.value, this.configGet);
            this.displayValue.emit(displayValue);
        };
        const keepFormPristine = () => {
            if (this._allowFormDirty)
                return;
            this._updateFormStatus('setPristine');
            this._controlDirective?.control.markAsPristine();
        };
        // Avoid using `debounceTime()` or `distinctUntilChanged()` here
        return form.valueChanges.pipe(startWith(form.value), tap(() => {
            //`setErrors()` must be called first, so that the form errors
            // is correctly set when `onChange` callback is called
            form.setErrors(this._formErrors);
            updateValue();
            updateDisplayValue();
            keepFormPristine();
        }));
    }
    _checkOptionsLoaded() {
        const ready$ = this._formReadyStateService.optionsReady$;
        if (ready$.value) {
            this.optionsLoaded.emit();
            return;
        }
        ready$
            .pipe(filter(Boolean), take(1), tap(() => this.optionsLoaded.emit()), takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
    get _formErrors() {
        if (!this.form)
            return null;
        const errors = getControlErrors(this.form);
        return errors;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgDynamicJsonFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NgDynamicJsonFormComponent, isStandalone: true, selector: "ng-dynamic-json-form", inputs: { configs: "configs", customComponents: "customComponents", customTemplates: "customTemplates", conditionsActionFunctions: "conditionsActionFunctions", collapsibleState: "collapsibleState", descriptionPosition: "descriptionPosition", rootClass: "rootClass", rootStyles: "rootStyles", hideErrorMessage: "hideErrorMessage", errorComponents: "errorComponents", errorComponentDefault: "errorComponentDefault", errorTemplates: "errorTemplates", errorTemplateDefault: "errorTemplateDefault", labelComponents: "labelComponents", labelComponentDefault: "labelComponentDefault", labelTemplates: "labelTemplates", labelTemplateDefault: "labelTemplateDefault", loadingComponent: "loadingComponent", loadingTemplate: "loadingTemplate", optionsSources: "optionsSources" }, outputs: { formGet: "formGet", onChange: "onChange", optionsLoaded: "optionsLoaded", displayValue: "displayValue", updateStatusFunctions: "updateStatusFunctions" }, host: { classAttribute: "ng-dynamic-json-form" }, providers: [
            ConfigValidationService,
            ConfigMappingService,
            FormGeneratorService,
            FormConditionsService,
            FormValidationService,
            FormValueService,
            FormReadyStateService,
            GlobalVariableService,
            HttpRequestCacheService,
            OptionsDataService,
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgDynamicJsonFormComponent),
                multi: true,
            },
            {
                provide: NG_ASYNC_VALIDATORS,
                useExisting: forwardRef(() => NgDynamicJsonFormComponent),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "formGroupRef", first: true, predicate: FormGroupComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"!configs\">\n  <div class=\"no-configs-error\">\n    <span>No configs found.</span>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"!!configValidationErrors?.length\">\n  <div class=\"config-validation-error\">\n    <div>NgDynamicJsonForm:</div>\n    <ng-container *ngFor=\"let item of configValidationErrors\">\n      <div style=\"color: var(--color-error)\">{{ item.errors }}</div>\n      <ng-container *ngIf=\"item.config\">\n        <code>{{ item.config | json }}</code>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"form\">\n  <form-group\n    [configs]=\"configGet\"\n    [collapsibleState]=\"collapsibleState\"\n    [parentForm]=\"form\"\n    [rootClass]=\"rootClass\"\n    [rootStyles]=\"rootStyles\"\n  ></form-group>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.JsonPipe, name: "json" }, { kind: "component", type: FormGroupComponent, selector: "form-group", inputs: ["configs", "collapsibleState", "parentId", "parentForm", "rootClass", "rootStyles"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgDynamicJsonFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-dynamic-json-form', standalone: true, imports: [CommonModule, FormGroupComponent], host: {
                        class: 'ng-dynamic-json-form',
                    }, providers: [
                        ConfigValidationService,
                        ConfigMappingService,
                        FormGeneratorService,
                        FormConditionsService,
                        FormValidationService,
                        FormValueService,
                        FormReadyStateService,
                        GlobalVariableService,
                        HttpRequestCacheService,
                        OptionsDataService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgDynamicJsonFormComponent),
                            multi: true,
                        },
                        {
                            provide: NG_ASYNC_VALIDATORS,
                            useExisting: forwardRef(() => NgDynamicJsonFormComponent),
                            multi: true,
                        },
                    ], template: "<ng-container *ngIf=\"!configs\">\n  <div class=\"no-configs-error\">\n    <span>No configs found.</span>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"!!configValidationErrors?.length\">\n  <div class=\"config-validation-error\">\n    <div>NgDynamicJsonForm:</div>\n    <ng-container *ngFor=\"let item of configValidationErrors\">\n      <div style=\"color: var(--color-error)\">{{ item.errors }}</div>\n      <ng-container *ngIf=\"item.config\">\n        <code>{{ item.config | json }}</code>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"form\">\n  <form-group\n    [configs]=\"configGet\"\n    [collapsibleState]=\"collapsibleState\"\n    [parentForm]=\"form\"\n    [rootClass]=\"rootClass\"\n    [rootStyles]=\"rootStyles\"\n  ></form-group>\n</ng-container>\n" }]
        }], propDecorators: { configs: [{
                type: Input
            }], customComponents: [{
                type: Input
            }], customTemplates: [{
                type: Input
            }], conditionsActionFunctions: [{
                type: Input
            }], collapsibleState: [{
                type: Input
            }], descriptionPosition: [{
                type: Input
            }], rootClass: [{
                type: Input
            }], rootStyles: [{
                type: Input
            }], hideErrorMessage: [{
                type: Input
            }], errorComponents: [{
                type: Input
            }], errorComponentDefault: [{
                type: Input
            }], errorTemplates: [{
                type: Input
            }], errorTemplateDefault: [{
                type: Input
            }], labelComponents: [{
                type: Input
            }], labelComponentDefault: [{
                type: Input
            }], labelTemplates: [{
                type: Input
            }], labelTemplateDefault: [{
                type: Input
            }], loadingComponent: [{
                type: Input
            }], loadingTemplate: [{
                type: Input
            }], optionsSources: [{
                type: Input
            }], formGet: [{
                type: Output
            }], onChange: [{
                type: Output
            }], optionsLoaded: [{
                type: Output
            }], displayValue: [{
                type: Output
            }], updateStatusFunctions: [{
                type: Output
            }], formGroupRef: [{
                type: ViewChild,
                args: [FormGroupComponent]
            }] } });

class CustomErrorMessage {
    constructor() {
        this.control = new FormControl();
        this.errorMessages = [];
    }
}

class CustomFormLabel {
    constructor() {
        this.collapsible = false;
        this.expand = false;
    }
}

/*
 * Public API Surface of ng-dynamic-json-form
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ConditionsActionEnum, ConfigMappingService, ConfigValidationService, CustomControlComponent, CustomErrorMessage, CustomFormLabel, FormConditionsService, FormGeneratorService, FormReadyStateService, FormValidationService, FormValueService, GlobalVariableService, HttpRequestCacheService, ImaskValuePatchDirective, NG_DYNAMIC_JSON_FORM_CONFIG, NgDynamicJsonFormComponent, OptionsDataService, PROPS_BINDING_INJECTORS, PropsBindingDirective, TextareaAutHeightDirective, ValidatorsEnum, provideNgDynamicJsonForm, providePropsBinding };
//# sourceMappingURL=ng-dynamic-json-form.mjs.map
