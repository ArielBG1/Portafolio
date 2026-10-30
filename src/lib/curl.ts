import type { JsonLine } from './json-tokens';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** La access key es pública por diseño, pero en la vista previa se muestra enmascarada. */
export const MASKED_KEY = '••••••••';

/** Comando cURL equivalente al request del formulario, como líneas de tokens para resaltar. */
export function curlLines(body: Record<string, string>): JsonLine[] {
  return [
    [
      { kind: 'key', text: 'curl' },
      { kind: 'plain', text: ' -X ' },
      { kind: 'number', text: 'POST' },
      { kind: 'plain', text: ` ${WEB3FORMS_ENDPOINT}` },
      { kind: 'punct', text: ' \\' },
    ],
    [
      { kind: 'plain', text: '  -H ' },
      { kind: 'string', text: '"Content-Type: application/json"' },
      { kind: 'punct', text: ' \\' },
    ],
    [
      { kind: 'plain', text: '  -d ' },
      { kind: 'string', text: `'${JSON.stringify(body)}'` },
    ],
  ];
}
