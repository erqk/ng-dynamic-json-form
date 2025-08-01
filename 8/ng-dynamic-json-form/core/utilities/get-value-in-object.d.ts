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
export declare function getValueInObject(obj: any, path: string | undefined): any;
