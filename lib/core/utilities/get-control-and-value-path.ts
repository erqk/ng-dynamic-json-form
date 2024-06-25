/**Parse the given path, return the correct control path and the value path if present.
 *
 * @example
 * "controlA"
 * return { controlPath: "controlA" }
 * 
 * "controlA,obj.prop1"
 * return { controlPath: "controlA", valuePath: "obj.prop1" }
 * 
 * "controlA,obj.[,===,A].prop2"
 * return { controlPath: "controlA", valuePath: "obj.[,===,A].prop2" }
 */
export function getControlAndValuePath(path: string): {
  controlPath: string;
  valuePath?: string | undefined;
} {
  const paths = path
    .trim()
    .split(/(,(?![^\[]*\]))/)
    .filter((x) => x !== ',');

  return {
    controlPath: paths[0].trim(),
    ...(paths.length > 1 && {
      valuePath: paths[1],
    }),
  };
}
