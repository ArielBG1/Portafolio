export type JsonValue = string | number | boolean | null | readonly JsonValue[] | { readonly [key: string]: JsonValue };

export type TokenKind = 'key' | 'string' | 'number' | 'punct' | 'plain';

export interface Token {
  kind: TokenKind;
  text: string;
}

export type JsonLine = Token[];

function isJsonArray(value: JsonValue): value is readonly JsonValue[] {
  return Array.isArray(value);
}

function isJsonObject(value: JsonValue): value is { readonly [key: string]: JsonValue } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Convierte un valor JSON en líneas de tokens (para resaltar sintaxis sin librerías).
 * Los arrays y objetos siempre se abren en varias líneas: así entran en pantallas angostas.
 */
export function jsonToLines(value: JsonValue, indentSize = 2): JsonLine[] {
  const lines: JsonLine[] = [];

  const walk = (current: JsonValue, depth: number, prefix: Token[], comma: boolean): void => {
    const indent: Token = { kind: 'plain', text: ' '.repeat(depth * indentSize) };
    const tail: Token[] = comma ? [{ kind: 'punct', text: ',' }] : [];

    if (isJsonArray(current) || isJsonObject(current)) {
      const [open, close] = isJsonArray(current) ? ['[', ']'] : ['{', '}'];
      const entries: [string | null, JsonValue][] = isJsonArray(current)
        ? current.map((item) => [null, item])
        : Object.entries(current);

      if (entries.length === 0) {
        lines.push([indent, ...prefix, { kind: 'punct', text: `${open}${close}` }, ...tail]);
        return;
      }

      lines.push([indent, ...prefix, { kind: 'punct', text: open }]);
      entries.forEach(([key, child], index) => {
        const childPrefix: Token[] =
          key === null
            ? []
            : [
                { kind: 'key', text: JSON.stringify(key) },
                { kind: 'punct', text: ': ' },
              ];
        walk(child, depth + 1, childPrefix, index < entries.length - 1);
      });
      lines.push([indent, { kind: 'punct', text: close }, ...tail]);
      return;
    }

    const kind: TokenKind = typeof current === 'string' ? 'string' : 'number';
    lines.push([indent, ...prefix, { kind, text: JSON.stringify(current) }, ...tail]);
  };

  walk(value, 0, [], false);
  return lines;
}
