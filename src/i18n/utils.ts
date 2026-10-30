import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, languages, sectionIds, ui, type Lang, type SectionKey, type UiKey } from './ui';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}

/** Normaliza `Astro.currentLocale` a un idioma soportado. */
export function getLang(locale: string | undefined): Lang {
  return isLang(locale) ? locale : defaultLang;
}

/** Devuelve el helper `t()` para el idioma indicado. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** URL de la home en el idioma indicado (`/` o `/en/`). */
export function getHomeUrl(lang: Lang): string {
  return getRelativeLocaleUrl(lang, '');
}

export function getSectionId(lang: Lang, section: SectionKey): string {
  return sectionIds[lang][section];
}

export function getSectionHref(lang: Lang, section: SectionKey): string {
  return `#${getSectionId(lang, section)}`;
}
