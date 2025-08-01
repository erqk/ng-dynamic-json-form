import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class FormConditionsService {
    private _globalVariableService;
    private _formValidationService;
    /**Listen to the controls that specified in `conditions` to trigger the `targetControl` status and validators
     * @param form The root form
     * @param configs The JSON data
     */
    listenConditions$(): Observable<any>;
    private _handleValueChanges;
    private _toggleControlStates;
    private _disableControl;
    private _hideControl$;
    private _toggleValidators;
    private _executeCustomActions;
    /**Get the target element by using `id`(full control path) on each `div` inside current NgDynamicJsonForm instance */
    private _getTargetEl$;
    private _getPathsOfControlsToListen;
    /**
     * Get all the configs which has `conditions` set.
     *
     * @description
     * The `fullControlPath` is the path to the control where the conditions will have effect on it.
     */
    private _configsWithConditions;
    private _evaluateConditionsStatement;
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
    private _getControlPathFromStatement;
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
    private _getValueFromStatement;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormConditionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormConditionsService>;
}
