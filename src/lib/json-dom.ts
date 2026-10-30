import { jsonToLines, type JsonLine, type JsonValue, type TokenKind } from './json-tokens';

const TOKEN_CLASSES: Record<TokenKind, string> = {
  key: 'tok-key',
  string: 'tok-string',
  number: 'tok-number',
  punct: 'tok-punct',
  plain: '',
};

/** Misma clase de línea que usa JsonLines.astro (las líneas largas se cortan en vez de desbordar). */
export const LINE_CLASS = 'block whitespace-pre-wrap [overflow-wrap:anywhere]';

/** Valida que un valor (por ejemplo, el resultado de `response.json()`) sea JSON serializable. */
export function isJsonValue(value: unknown): value is JsonValue {
  if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return true;
  if (Array.isArray(value)) return value.every(isJsonValue);
  if (typeof value === 'object') return Object.values(value).every(isJsonValue);
  return false;
}

/** Crea los elementos de una línea de tokens (con textContent: nunca se inyecta HTML). */
export function renderTokenLine(tokens: JsonLine): HTMLSpanElement {
  const line = document.createElement('span');
  line.className = LINE_CLASS;
  tokens.forEach((token) => {
    const span = document.createElement('span');
    if (TOKEN_CLASSES[token.kind]) span.className = TOKEN_CLASSES[token.kind];
    span.textContent = token.text;
    line.append(span);
  });
  return line;
}

/** Convierte un valor JSON en líneas con resaltado de sintaxis. */
export function renderJson(value: JsonValue): HTMLSpanElement[] {
  return jsonToLines(value).map(renderTokenLine);
}
