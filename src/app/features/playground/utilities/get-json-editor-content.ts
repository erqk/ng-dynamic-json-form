import { Content } from 'vanilla-jsoneditor';

export function getJsonEditorContent(input: Content | undefined): Content {
  let jsonContent = null;

  if (!input) return { json: jsonContent };
  if ('json' in input) jsonContent = input['json'];
  if ('text' in input) {
    try {
      jsonContent = JSON.parse(input['text'] || 'null');
    } catch {}
  }

  return { json: jsonContent };
}
