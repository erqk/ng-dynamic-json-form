import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
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
export { ControlTypeByConfigPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ControlTypeByConfigPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'controlTypeByConfig',
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC10eXBlLWJ5LWNvbmZpZy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvcGlwZXMvY29udHJvbC10eXBlLWJ5LWNvbmZpZy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUdwRCxNQUlhLHVCQUF1QjtJQUNsQyxTQUFTLENBQUMsTUFBeUI7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDcEIsT0FBTyxhQUFhLENBQUM7U0FDdEI7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOytHQVBVLHVCQUF1Qjs2R0FBdkIsdUJBQXVCOztTQUF2Qix1QkFBdUI7NEZBQXZCLHVCQUF1QjtrQkFKbkMsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixVQUFVLEVBQUUsSUFBSTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbENvbmZpZyB9IGZyb20gJy4uL21vZGVscyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NvbnRyb2xUeXBlQnlDb25maWcnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sVHlwZUJ5Q29uZmlnUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oY29uZmlnOiBGb3JtQ29udHJvbENvbmZpZyk6ICdGb3JtQ29udHJvbCcgfCAnRm9ybUdyb3VwJyB7XG4gICAgaWYgKCFjb25maWcuY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybiAnRm9ybUNvbnRyb2wnO1xuICAgIH1cblxuICAgIHJldHVybiAnRm9ybUdyb3VwJztcbiAgfVxufVxuIl19