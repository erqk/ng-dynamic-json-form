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
export declare function trimObjectByKeys(obj: any, keys: string[]): any;
