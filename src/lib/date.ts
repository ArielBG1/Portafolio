import type { Lang } from '../i18n/ui';

/** Convierte `YYYY-MM` en "Abril 2024" / "April 2024". */
export function formatMonthYear(isoMonth: string, lang: Lang): string {
  const [year = 0, month = 1] = isoMonth.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  const monthName = new Intl.DateTimeFormat(lang, { month: 'long', timeZone: 'UTC' }).format(date);
  return `${monthName.charAt(0).toLocaleUpperCase(lang)}${monthName.slice(1)} ${year}`;
}
