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
export function getControlAndValuePath(path) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRyb2wtYW5kLXZhbHVlLXBhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvY29yZS91dGlsaXRpZXMvZ2V0LWNvbnRyb2wtYW5kLXZhbHVlLXBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsSUFBWTtJQUlqRCxNQUFNLEtBQUssR0FBRyxJQUFJO1NBQ2YsSUFBSSxFQUFFO1NBQ04sS0FBSyxDQUFDLGlCQUFpQixDQUFDO1NBQ3hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRTVCLE9BQU87UUFDTCxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtRQUM1QixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUk7WUFDdEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDcEIsQ0FBQztLQUNILENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqUGFyc2UgdGhlIGdpdmVuIHBhdGgsIHJldHVybiB0aGUgY29ycmVjdCBjb250cm9sIHBhdGggYW5kIHRoZSB2YWx1ZSBwYXRoIGlmIHByZXNlbnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIFwiY29udHJvbEFcIlxuICogcmV0dXJuIHsgY29udHJvbFBhdGg6IFwiY29udHJvbEFcIiB9XG4gKiBcbiAqIFwiY29udHJvbEEsb2JqLnByb3AxXCJcbiAqIHJldHVybiB7IGNvbnRyb2xQYXRoOiBcImNvbnRyb2xBXCIsIHZhbHVlUGF0aDogXCJvYmoucHJvcDFcIiB9XG4gKiBcbiAqIFwiY29udHJvbEEsb2JqLlssPT09LEFdLnByb3AyXCJcbiAqIHJldHVybiB7IGNvbnRyb2xQYXRoOiBcImNvbnRyb2xBXCIsIHZhbHVlUGF0aDogXCJvYmouWyw9PT0sQV0ucHJvcDJcIiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cm9sQW5kVmFsdWVQYXRoKHBhdGg6IHN0cmluZyk6IHtcbiAgY29udHJvbFBhdGg6IHN0cmluZztcbiAgdmFsdWVQYXRoPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xufSB7XG4gIGNvbnN0IHBhdGhzID0gcGF0aFxuICAgIC50cmltKClcbiAgICAuc3BsaXQoLygsKD8hW15cXFtdKlxcXSkpLylcbiAgICAuZmlsdGVyKCh4KSA9PiB4ICE9PSAnLCcpO1xuXG4gIHJldHVybiB7XG4gICAgY29udHJvbFBhdGg6IHBhdGhzWzBdLnRyaW0oKSxcbiAgICAuLi4ocGF0aHMubGVuZ3RoID4gMSAmJiB7XG4gICAgICB2YWx1ZVBhdGg6IHBhdGhzWzFdLFxuICAgIH0pLFxuICB9O1xufVxuIl19