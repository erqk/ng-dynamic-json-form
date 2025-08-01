import { evaluateBooleanOperation } from './get-boolean-operation-result';
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
export function getValueInObject(obj, path) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXZhbHVlLWluLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9jb3JlL3V0aWxpdGllcy9nZXQtdmFsdWUtaW4tb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUFRLEVBQUUsSUFBd0I7SUFDakUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFDNUMsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUVELGdEQUFnRDtJQUNoRCxpQ0FBaUM7SUFDakMsSUFBSSxTQUFTLEdBQVUsRUFBRSxDQUFDO0lBRTFCLElBQUk7UUFDRixPQUFPLElBQUk7YUFDUixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEIsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ25CLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO2dCQUNyQyxPQUFPLEdBQUcsQ0FBQzthQUNaO1lBRUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sYUFBYSxHQUNqQixHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztZQUU5QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDbkI7WUFFRCxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ25FLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNYO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsS0FBWSxFQUFFLElBQVk7SUFDOUMsTUFBTSxXQUFXLEdBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUU3RSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUNuQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTlDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUk7U0FDaEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDaEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUE2QixDQUFDO0lBRXBELE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUF1QixDQUFDO0lBRS9ELHVGQUF1RjtJQUN2RiwrRkFBK0Y7SUFDL0YsOEVBQThFO0lBQzlFLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUN2QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUU1QyxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsV0FBVyxFQUFFLENBQUM7UUFFNUIsT0FBTyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDNUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmRpdGlvbnNTdGF0ZW1lbnRUdXBsZSwgQ29uZGl0aW9uc09wZXJhdG9yIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGV2YWx1YXRlQm9vbGVhbk9wZXJhdGlvbiB9IGZyb20gJy4vZ2V0LWJvb2xlYW4tb3BlcmF0aW9uLXJlc3VsdCc7XG5cbi8qKlxuICogR2V0IHRoZSB2YWx1ZSBpbiBhbiBvYmplY3QgbG9jYXRlZCBpbiBhIHNwZWNpZmljIGtleS5cbiAqXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3Qgd2Ugd2FudCB0byBnZXQgdGhlIHZhbHVlLlxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gdGhlIHRhcmdldCB2YWx1ZSwgd2l0aCBwZXJpb2QgZGVsaW1pdGVyXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJZiBvbmUgb2YgdGhlIHBhdGgncyB2YWx1ZSBpcyBhcnJheSBhbmQgdGhlIGluZGV4IG5lZWRzIHRvIGV2YWx1YXRlIGF0IHJ1bnRpbWUsXG4gKiB1c2UgdGhlIHN5bnRheCBzYW1lIHdpdGggYENvbmRpdGlvbnNJZlR1cHBsZWAuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbGV2ZWwxOiB7XG4gKiAgbGV2ZWwyOiB7XG4gKiAgICBsaXN0OiBbXG4gKiAgICAgIHtcbiAqICAgICAgICB2YWx1ZTogMCxcbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIHZhbHVlOiAxLFxuICogICAgICB9LFxuICogICAgICAuLi5cbiAqICAgIF0sXG4gKiAgfSxcbiAqfVxuICogYGBgXG4gKiBPcmlnbmFsIHBhdGg6IGBsZXZlbDEubGV2ZWwyLmxpc3QuW1widmFsdWVcIiwgXCI9PT1cIiwgMV0udmFsdWVgXG4gKlxuICogUmVzdWx0aW5nIHBhdGg6IGBsZXZlbDEubGV2ZWwyLmxpc3QuMS52YWx1ZWBcbiAqXG4gKiBJZiB0aGUgYXJyYXkgY29udGFpbnMgb25seSBwcmltaXRpdmUgdmFsdWUsIGxlYXZlIHRoZSBmaXJzdCBwYXJhbWV0ZXIgb2YgQ29uZGl0aW9uc0lmVHVwcGxlIGVtcHR5LlxuICogRm9yIGV4YW1wbGUsIGNoYW5nZSBgW1widmFsdWVcIiwgXCI9PT1cIiwgMV1gIHRvIGBbLFwiPT09XCIsIDFdLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVJbk9iamVjdChvYmo6IGFueSwgcGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFwYXRoIHx8ICFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgLy8gU3RvcmUgdGhlIGFycmF5IHZhbHVlLCBzbyB0aGF0IHdlIGNhbiBnZXQgdGhlXG4gIC8vIHRhcmdldCBpbmRleCBpbiB0aGUgbmV4dCBsb29wLlxuICBsZXQgdGVtcEFycmF5OiBhbnlbXSA9IFtdO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIHBhdGhcbiAgICAgIC5zcGxpdCgnLicpXG4gICAgICAubWFwKCh4KSA9PiB4LnRyaW0oKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICAgIGlmIChhY2MgPT09IG51bGwgfHwgYWNjID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBhY2Nba2V5XTtcbiAgICAgICAgY29uc3QgZ2V0S2V5QnlJbmRleCA9XG4gICAgICAgICAga2V5LnN0YXJ0c1dpdGgoJ1snKSAmJlxuICAgICAgICAgIGtleS5lbmRzV2l0aCgnXScpICYmXG4gICAgICAgICAga2V5LnNwbGl0KCcsJykubGVuZ3RoID09PSAzO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHRlbXBBcnJheSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdldEtleUJ5SW5kZXggPyBhY2NbZ2V0SXRlbUluZGV4KHRlbXBBcnJheSwga2V5KV0gOiB2YWx1ZTtcbiAgICAgIH0sIG9iaik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0SXRlbUluZGV4KGFycmF5OiBhbnlbXSwgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdmFsaWRTeW50YXggPVxuICAgIHBhdGguc3RhcnRzV2l0aCgnWycpICYmIHBhdGguZW5kc1dpdGgoJ10nKSAmJiBwYXRoLnNwbGl0KCcsJykubGVuZ3RoID09PSAzO1xuXG4gIGlmICghdmFsaWRTeW50YXggfHwgIUFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBjb25zdCByZW1vdmVRdW90ZXMgPSAoc3RyOiBzdHJpbmcpID0+XG4gICAgc3RyLnJlcGxhY2VBbGwoJ1wiJywgJycpLnJlcGxhY2VBbGwoXCInXCIsICcnKTtcblxuICBjb25zdCBba2V5LCBvcGVyYXRvciwgdmFsdWVdID0gcGF0aFxuICAgIC5yZXBsYWNlKCdbJywgJycpXG4gICAgLnJlcGxhY2UoJ10nLCAnJylcbiAgICAuc3BsaXQoJywnKVxuICAgIC5tYXAoKHgpID0+IHgudHJpbSgpKSBhcyBDb25kaXRpb25zU3RhdGVtZW50VHVwbGU7XG5cbiAgY29uc3QgX2tleSA9IHJlbW92ZVF1b3RlcyhrZXkpO1xuICBjb25zdCBfb3BlcmF0b3IgPSByZW1vdmVRdW90ZXMob3BlcmF0b3IpIGFzIENvbmRpdGlvbnNPcGVyYXRvcjtcblxuICAvLyBUaGUgYHBhdGhgIGlzIGFscmVhZHkgYSBzdHJpbmcsIHNvIHdlIGhhdmUgdG8gcGFyc2Ugd2hhdCBpcyB0aGUgdHlwZSBvZiB0aGUgYHZhbHVlYC5cbiAgLy8gSWYgdGhlIGB2YWx1ZWAgaXMgd3JhcHBlZCB3aXRoIHF1b3RlcyB0aGVuIHdlIHRha2UgaXQgYXMgYSBzdHJpbmcgYWZ0ZXIgcmVtb3ZpbmcgdGhlIHF1b3Rlcy5cbiAgLy8gT3RoZXJ3aXNlIHVzZSBKU09OLnBhcnNlKCkgdG8gZ2V0IHRoZSB2YWx1ZSB3aXRoIGNvcnJlY3QgdHlwZS4gKGV4OiBudW1iZXIpXG4gIGNvbnN0IHZhbHVlUGFyc2VkID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSByZXR1cm4gdmFsdWU7XG5cbiAgICBjb25zdCBpc1N0cmluZyA9IG5ldyBSZWdFeHAoL14oJ3xcIikuKignfFwiKSQvKS50ZXN0KHZhbHVlKTtcbiAgICByZXR1cm4gaXNTdHJpbmcgPyByZW1vdmVRdW90ZXModmFsdWUpIDogSlNPTi5wYXJzZSh2YWx1ZSk7XG4gIH07XG5cbiAgY29uc3QgaW5kZXggPSBhcnJheS5maW5kSW5kZXgoKGl0ZW0pID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gIV9rZXkgPyBpdGVtIDogZ2V0VmFsdWVJbk9iamVjdChpdGVtLCBfa2V5KTtcbiAgICBjb25zdCByaWdodCA9IHZhbHVlUGFyc2VkKCk7XG5cbiAgICByZXR1cm4gZXZhbHVhdGVCb29sZWFuT3BlcmF0aW9uKFtsZWZ0LCBfb3BlcmF0b3IsIHJpZ2h0XSk7XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyAnMCcgOiBpbmRleC50b1N0cmluZygpO1xufVxuIl19