export interface RichSegment {
  text: string;
  strong: boolean;
}

/** Divide un texto con negritas estilo Markdown (`**así**`) en segmentos. */
export function parseRichText(input: string): RichSegment[] {
  return input
    .split('**')
    .map((text, index) => ({ text, strong: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}
