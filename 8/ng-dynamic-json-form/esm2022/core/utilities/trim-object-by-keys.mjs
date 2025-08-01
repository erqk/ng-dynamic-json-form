import { getValueInObject } from './get-value-in-object';
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
export function trimObjectByKeys(obj, keys) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbS1vYmplY3QtYnkta2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9jb3JlL3V0aWxpdGllcy90cmltLW9iamVjdC1ieS1rZXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEdBQVEsRUFBRSxJQUFjO0lBQ3ZELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzNCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzlCLGdDQUFnQztRQUNoQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFbEQsd0RBQXdEO1FBQ3hELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWhFLG9EQUFvRDtRQUNwRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQVMsQ0FBQyxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRWYWx1ZUluT2JqZWN0IH0gZnJvbSAnLi9nZXQtdmFsdWUtaW4tb2JqZWN0JztcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHRoZSBrZXlzIHByb3ZpZGVkLlxuICogSWYgYW55IG9mIHRoZSBkYXRhIGlzIG5lc3RlZCwgdGhlIGZpbmFsIG9iamVjdCB3aWxsIGJlIGZsYXR0ZW4gb3V0LlxuICpcbiAqIEBwYXJhbSBvYmogVGhlIG9yaWdpbmFsIG9iamVjdFxuICogQHBhcmFtIGtleXMgVGhlIGtleXMgdG8gdXNlIGFzIG5ldyBvYmplY3RcbiAqIEByZXR1cm5zIE5ldyBvYmplY3QgY29udGFpbnMgb25seSBzcGVjaWZpYyBrZXlzLlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyB3aGF0IGhhcHBlbmVkIGlmIHRoZXJlIGlzIG5lc3RlZCBkYXRhLlxuICogQGV4YW1wbGVcbiAqIGZyb206XG4gKiB7XG4gKiAgICBBOiB7XG4gKiAgICAgIGNoaWxkQTogLi4uXG4gKiAgICB9LFxuICogICAgQjogLi4uLFxuICogICAgQzogLi4uXG4gKiB9XG4gKlxuICogdG86XG4gKiB7XG4gKiAgICBjaGlsZEE6IC4uLixcbiAqICAgIEI6IC4uLixcbiAqICAgIEM6IC4uLlxuICogfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpbU9iamVjdEJ5S2V5cyhvYmo6IGFueSwga2V5czogc3RyaW5nW10pOiBhbnkge1xuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGdldFZhbHVlSW5PYmplY3Qob2JqLCBrZXlzWzBdKTtcbiAgfVxuXG4gIHJldHVybiBrZXlzLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGRhdGEgaXMgbmVzdGVkLlxuICAgIGNvbnN0IF9rZXlzID0ga2V5LnNwbGl0KCcuJykubWFwKCh4KSA9PiB4LnRyaW0oKSk7XG5cbiAgICAvLyBXZSBnZXQgdGhlIGxhc3Qga2V5IGFzIG5ldyBrZXkgaWYgdGhlIGRhdGEgaXMgbmVzdGVkLlxuICAgIGNvbnN0IG5ld0tleSA9IF9rZXlzLmxlbmd0aCA+IDEgPyBfa2V5c1tfa2V5cy5sZW5ndGggLSAxXSA6IGtleTtcblxuICAgIC8vIEZpbmFsbHksIHdlIGV4cG9ydCB0aGUgbmV3IG9iamVjdCB0aGF0J3MgZmxhdHRlbi5cbiAgICBhY2NbbmV3S2V5XSA9IGdldFZhbHVlSW5PYmplY3Qob2JqLCBrZXkpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9IGFzIGFueSk7XG59XG4iXX0=