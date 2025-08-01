import { Pipe } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
class IsControlRequiredPipe {
    transform(value) {
        return value.hasValidator(Validators.required);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IsControlRequiredPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: IsControlRequiredPipe, isStandalone: true, name: "isControlRequired" }); }
}
export { IsControlRequiredPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IsControlRequiredPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'isControlRequired',
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY29udHJvbC1yZXF1aXJlZC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvcGlwZXMvaXMtY29udHJvbC1yZXF1aXJlZC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBbUIsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRTdELE1BSWEscUJBQXFCO0lBQ2hDLFNBQVMsQ0FBQyxLQUFzQjtRQUM5QixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7K0dBSFUscUJBQXFCOzZHQUFyQixxQkFBcUI7O1NBQXJCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQUpqQyxJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQFBpcGUoe1xuICBuYW1lOiAnaXNDb250cm9sUmVxdWlyZWQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBJc0NvbnRyb2xSZXF1aXJlZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBBYnN0cmFjdENvbnRyb2wpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUuaGFzVmFsaWRhdG9yKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICB9XG59XG4iXX0=