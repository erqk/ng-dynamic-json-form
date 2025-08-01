import { isFormControl, isFormGroup, } from '@angular/forms';
/**Get all the errors in the AbstractControl recursively
 * @example
 * root: {
 *  control1: ValidationErrors,
 *  control2: {
 *    childA: ValidationErrors
 *  }
 * }
 */
export function getControlErrors(control) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRyb2wtZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvdXRpbGl0aWVzL2dldC1jb250cm9sLWVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsYUFBYSxFQUNiLFdBQVcsR0FDWixNQUFNLGdCQUFnQixDQUFDO0FBRXhCOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixPQUFvQztJQUVwQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztLQUN2QjtJQUVELElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTNDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUM1QyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFUCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ3BEO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBpc0Zvcm1Db250cm9sLFxuICBpc0Zvcm1Hcm91cCxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKipHZXQgYWxsIHRoZSBlcnJvcnMgaW4gdGhlIEFic3RyYWN0Q29udHJvbCByZWN1cnNpdmVseVxuICogQGV4YW1wbGVcbiAqIHJvb3Q6IHtcbiAqICBjb250cm9sMTogVmFsaWRhdGlvbkVycm9ycyxcbiAqICBjb250cm9sMjoge1xuICogICAgY2hpbGRBOiBWYWxpZGF0aW9uRXJyb3JzXG4gKiAgfVxuICogfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJvbEVycm9ycyhcbiAgY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgdW5kZWZpbmVkXG4pOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gIGlmICghY29udHJvbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKGlzRm9ybUNvbnRyb2woY29udHJvbCkpIHtcbiAgICByZXR1cm4gY29udHJvbC5lcnJvcnM7XG4gIH1cblxuICBpZiAoaXNGb3JtR3JvdXAoY29udHJvbCkpIHtcbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhjb250cm9sLmNvbnRyb2xzKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBjb25zdCBjaGlsZENvbnRyb2wgPSBjb250cm9sLmNvbnRyb2xzW2tleV07XG4gICAgICBjb25zdCBlcnIgPSBnZXRDb250cm9sRXJyb3JzKGNoaWxkQ29udHJvbCk7XG5cbiAgICAgIHJldHVybiBlcnIgPyB7IC4uLmFjYywgW2tleV06IGVyciB9IDogYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiAhT2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGggPyBudWxsIDogcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=