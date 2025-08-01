import { Injectable, inject } from '@angular/core';
import { getValueInObject } from '../utilities/get-value-in-object';
import { ConfigMainSchema } from '../utilities/schema-validator';
import { ConfigMappingService } from './config-mapping.service';
import * as i0 from "@angular/core";
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
export { ConfigValidationService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ConfigValidationService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXZhbGlkYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9jb3JlL3NlcnZpY2VzL2NvbmZpZy12YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRWhFLE1BQU0sUUFBUSxHQUFHLGdCQUFvQyxDQUFDO0FBQ3RELE1BQ2EsdUJBQXVCO0lBRHBDO1FBRVUsMEJBQXFCLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FnRTlEO0lBOURDLG9CQUFvQixDQUFDLEtBQStDO1FBSWxFLE1BQU0sWUFBWSxHQUFHO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztTQUN6QyxDQUFDO1FBRUYsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ3RELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQ2xDLENBQUM7Z0JBRUYsT0FBTyxZQUFZLENBQUM7YUFDckI7WUFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLO2lCQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDO2lCQUNmLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztTQUNoQztRQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEM7WUFBQyxPQUFPLEdBQVEsRUFBRTtnQkFDakIsWUFBWSxDQUFDLE1BQU0sR0FBRztvQkFDcEI7d0JBQ0UsNkdBQTZHO3dCQUM3RyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDaEU7aUJBQ0YsQ0FBQztnQkFFRixPQUFPLFlBQVksQ0FBQzthQUNyQjtTQUNGO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVPLGtCQUFrQixDQUN4QixHQUFnQixFQUNoQixPQUE0QjtRQUU1QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkQsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEUsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sWUFBWSxHQUFHLFFBQVE7WUFDM0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRTtZQUNuQixDQUFDLENBQUMsSUFBSSxXQUFXLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXRDLE9BQU87WUFDTCxNQUFNLEVBQUUsWUFBWTtZQUNwQixNQUFNO1NBQ1AsQ0FBQztJQUNKLENBQUM7K0dBaEVVLHVCQUF1QjttSEFBdkIsdUJBQXVCOztTQUF2Qix1QkFBdUI7NEZBQXZCLHVCQUF1QjtrQkFEbkMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXJyb3JPYmplY3QsIFZhbGlkYXRlRnVuY3Rpb24gfSBmcm9tICdhanYnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgQ29uZmlnVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJy4uL21vZGVscy9jb25maWctdmFsaWRhdGlvbi1lcnJvcnMuaW50ZXJmYWNlJztcbmltcG9ydCB7IGdldFZhbHVlSW5PYmplY3QgfSBmcm9tICcuLi91dGlsaXRpZXMvZ2V0LXZhbHVlLWluLW9iamVjdCc7XG5pbXBvcnQgeyBDb25maWdNYWluU2NoZW1hIH0gZnJvbSAnLi4vdXRpbGl0aWVzL3NjaGVtYS12YWxpZGF0b3InO1xuaW1wb3J0IHsgQ29uZmlnTWFwcGluZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy1tYXBwaW5nLnNlcnZpY2UnO1xuXG5jb25zdCB2YWxpZGF0ZSA9IENvbmZpZ01haW5TY2hlbWEgYXMgVmFsaWRhdGVGdW5jdGlvbjtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWdWYWxpZGF0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgX2NvbmZpZ01hcHBpbmdTZXJ2aWNlID0gaW5qZWN0KENvbmZpZ01hcHBpbmdTZXJ2aWNlKTtcblxuICB2YWxpZGF0ZUFuZEdldENvbmZpZyhpbnB1dDogc3RyaW5nIHwgRm9ybUNvbnRyb2xDb25maWdbXSB8IHVuZGVmaW5lZCk6IHtcbiAgICBjb25maWdzOiBGb3JtQ29udHJvbENvbmZpZ1tdIHwgbnVsbDtcbiAgICBlcnJvcnM/OiBDb25maWdWYWxpZGF0aW9uRXJyb3JzW107XG4gIH0ge1xuICAgIGNvbnN0IGZhaWxlZFJlc3VsdCA9IHtcbiAgICAgIGNvbmZpZ3M6IG51bGwsXG4gICAgICBlcnJvcnM6IFt7IGVycm9yczogJ05vIGNvbmZpZ3MgZm91bmQnIH1dLFxuICAgIH07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIGlmICghdmFsaWRhdGUoaW5wdXQpKSB7XG4gICAgICAgIGZhaWxlZFJlc3VsdC5lcnJvcnMgPSAodmFsaWRhdGUuZXJyb3JzIHx8IFtdKS5tYXAoKHgpID0+XG4gICAgICAgICAgdGhpcy5fZ2V0QmVhdXRpZnlFcnJvcnMoeCwgaW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGZhaWxlZFJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnc0dldCA9IGlucHV0XG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgLm1hcCgoeCkgPT4gdGhpcy5fY29uZmlnTWFwcGluZ1NlcnZpY2UuZ2V0Q29ycmVjdGVkQ29uZmlnKHgpKTtcblxuICAgICAgcmV0dXJuIHsgY29uZmlnczogY29uZmlnc0dldCB9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShpbnB1dCk7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlQW5kR2V0Q29uZmlnKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgZmFpbGVkUmVzdWx0LmVycm9ycyA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xODM5MTIxMi9pcy1pdC1ub3QtcG9zc2libGUtdG8tc3RyaW5naWZ5LWFuLWVycm9yLXVzaW5nLWpzb24tc3RyaW5naWZ5XG4gICAgICAgICAgICBlcnJvcnM6IEpTT04uc3RyaW5naWZ5KGVyciwgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKSwgNCksXG4gICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gZmFpbGVkUmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWlsZWRSZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRCZWF1dGlmeUVycm9ycyhcbiAgICBlcnI6IEVycm9yT2JqZWN0LFxuICAgIGNvbmZpZ3M6IEZvcm1Db250cm9sQ29uZmlnW11cbiAgKTogQ29uZmlnVmFsaWRhdGlvbkVycm9ycyB7XG4gICAgY29uc3QgcGF0aHMgPSBlcnIuaW5zdGFuY2VQYXRoLnN1YnN0cmluZygxKS5zcGxpdCgnLycpO1xuICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gcGF0aHNbcGF0aHMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgaXNPYmplY3QgPSBuZXcgUmVnRXhwKC9eXFxkKyQvKS50ZXN0KGxhc3RTZWdtZW50KTtcbiAgICBjb25zdCBjb25maWdQYXRoID0gaXNPYmplY3QgPyBwYXRocy5qb2luKCcuJykgOiBwYXRoc1twYXRocy5sZW5ndGggLSAyXTtcbiAgICBjb25zdCBjb25maWcgPSBnZXRWYWx1ZUluT2JqZWN0KGNvbmZpZ3MsIGNvbmZpZ1BhdGgpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGlzT2JqZWN0XG4gICAgICA/IGVyci5tZXNzYWdlID8/ICcnXG4gICAgICA6IGBcIiR7bGFzdFNlZ21lbnR9XCIgJHtlcnIubWVzc2FnZX1gO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yczogZXJyb3JNZXNzYWdlLFxuICAgICAgY29uZmlnLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==