import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
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
export { FormReadyStateService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormReadyStateService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZWFkeS1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvc2VydmljZXMvZm9ybS1yZWFkeS1zdGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHdkMsTUFDYSxxQkFBcUI7SUFEbEM7UUFFRSxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRTVDLHlCQUFvQixHQUFHLENBQUMsQ0FBQztLQWlDbEM7SUEvQkMsY0FBYyxDQUFDLEdBQVk7UUFDekIsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFFNUIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO2dCQUU5QixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQy9CO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQTRCO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRWxDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNoQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTTtZQUNqQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQVEsQ0FBQyxHQUFHLENBQUM7WUFDL0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQ3ZDLENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOytHQW5DVSxxQkFBcUI7bUhBQXJCLHFCQUFxQjs7U0FBckIscUJBQXFCOzRGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZvcm1Db250cm9sQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1SZWFkeVN0YXRlU2VydmljZSB7XG4gIG9wdGlvbnNSZWFkeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBwcml2YXRlIF9vcHRpb25zTG9hZGluZ0NvdW50ID0gMDtcblxuICBvcHRpb25zTG9hZGluZyhhZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoYWRkKSB7XG4gICAgICB0aGlzLl9vcHRpb25zTG9hZGluZ0NvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX29wdGlvbnNMb2FkaW5nQ291bnQtLTtcblxuICAgICAgaWYgKHRoaXMuX29wdGlvbnNMb2FkaW5nQ291bnQgPD0gMCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zTG9hZGluZ0NvdW50ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zUmVhZHkkLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zUmVhZHkkLm5leHQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9uc1JlYWR5JC5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGhhdmVPcHRpb25zVG9XYWl0KGNvbmZpZ3M6IEZvcm1Db250cm9sQ29uZmlnW10pOiBib29sZWFuIHtcbiAgICBpZiAoIWNvbmZpZ3MubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCByZXN1bHQgPSBjb25maWdzLnNvbWUoKHgpID0+XG4gICAgICAheC5jaGlsZHJlbj8ubGVuZ3RoXG4gICAgICAgID8gQm9vbGVhbih4Lm9wdGlvbnMpICYmIEJvb2xlYW4oeC5vcHRpb25zIS5zcmMpXG4gICAgICAgIDogdGhpcy5oYXZlT3B0aW9uc1RvV2FpdCh4LmNoaWxkcmVuKVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=