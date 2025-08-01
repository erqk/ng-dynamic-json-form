export function evaluateBooleanOperation([left, operator, right]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWJvb2xlYW4tb3BlcmF0aW9uLXJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9jb3JlL3V0aWxpdGllcy9nZXQtYm9vbGVhbi1vcGVyYXRpb24tcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUk5RDtJQUNDLFFBQVEsUUFBUSxFQUFFO1FBQ2hCLEtBQUssS0FBSztZQUNSLE9BQU8sSUFBSSxLQUFLLEtBQUssQ0FBQztRQUV4QixLQUFLLEtBQUs7WUFDUixPQUFPLElBQUksS0FBSyxLQUFLLENBQUM7UUFFeEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxJQUFJLElBQUksS0FBSyxDQUFDO1FBRXZCLEtBQUssR0FBRztZQUNOLE9BQU8sSUFBSSxHQUFHLEtBQUssQ0FBQztRQUV0QixLQUFLLElBQUk7WUFDUCxPQUFPLElBQUksSUFBSSxLQUFLLENBQUM7UUFFdkIsS0FBSyxHQUFHO1lBQ04sT0FBTyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRXRCLEtBQUssVUFBVTtZQUNiLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRTVELEtBQUssYUFBYTtZQUNoQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQzlEO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmRpdGlvbnNPcGVyYXRvciB9IGZyb20gJy4uL21vZGVscy9jb25kaXRpb25zLW9wZXJhdG9yLnR5cGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVCb29sZWFuT3BlcmF0aW9uKFtsZWZ0LCBvcGVyYXRvciwgcmlnaHRdOiBbXG4gIGFueSxcbiAgQ29uZGl0aW9uc09wZXJhdG9yLFxuICBhbnlcbl0pOiBib29sZWFuIHtcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgJz09PSc6XG4gICAgICByZXR1cm4gbGVmdCA9PT0gcmlnaHQ7XG5cbiAgICBjYXNlICchPT0nOlxuICAgICAgcmV0dXJuIGxlZnQgIT09IHJpZ2h0O1xuXG4gICAgY2FzZSAnPj0nOlxuICAgICAgcmV0dXJuIGxlZnQgPj0gcmlnaHQ7XG5cbiAgICBjYXNlICc+JzpcbiAgICAgIHJldHVybiBsZWZ0ID4gcmlnaHQ7XG5cbiAgICBjYXNlICc8PSc6XG4gICAgICByZXR1cm4gbGVmdCA8PSByaWdodDtcblxuICAgIGNhc2UgJzwnOlxuICAgICAgcmV0dXJuIGxlZnQgPCByaWdodDtcblxuICAgIGNhc2UgJ2luY2x1ZGVzJzpcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGxlZnQpID8gbGVmdC5pbmNsdWRlcyhyaWdodCkgOiBmYWxzZTtcblxuICAgIGNhc2UgJ25vdEluY2x1ZGVzJzpcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGxlZnQpID8gIWxlZnQuaW5jbHVkZXMocmlnaHQpIDogZmFsc2U7XG4gIH1cbn1cbiJdfQ==