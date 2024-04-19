/**Parse the given path, return the correct control path and the value path if present.
 *
 * - `"controlA.controlB.value"` will get only return the control path.
 * - `"controlA.controlB.value,obj.prop1.prop2"` will return the control path and value path.
 */
export function getControlAndValuePath(path: string): {
  controlPath: string;
  valuePath?: string | undefined;
} {
  const paths = path.trim().split(',');

  return {
    controlPath: paths[0].trim(),
    ...(paths.length > 1 && { valuePath: paths[1].trim() }),
  };
}
