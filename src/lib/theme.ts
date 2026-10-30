export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
/** Evento que se emite en `document` cada vez que cambia el tema. */
export const THEME_CHANGE_EVENT = 'themechange';

const THEME_COLORS: Record<Theme, string> = {
  dark: '#0B0B14',
  light: '#F7F7FB',
};

export function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sin acceso a localStorage: el cambio aplica solo a esta visita.
  }

  document.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
