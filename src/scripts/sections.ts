/**
 * Secciones colapsables al estilo Swagger UI: el título de cada sección es un botón (`data-collapse`)
 * que muestra u oculta su contenido, y la barra de la API tiene un botón para expandir/contraer todo
 * (`data-collapse-all`). Con movimiento reducido el cambio es instantáneo.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-collapse]'));
const toggleAll = document.querySelector<HTMLButtonElement>('[data-collapse-all]');
const isExpanded = (button: HTMLButtonElement): boolean => button.getAttribute('aria-expanded') === 'true';

/** El botón general dice "Contraer todo" mientras haya alguna sección abierta; si no, "Expandir todo". */
function syncToggleAll(): void {
  if (!toggleAll) return;
  const anyExpanded = buttons.some(isExpanded);
  const label = toggleAll.querySelector('[data-collapse-all-label]');
  if (label) label.textContent = (anyExpanded ? toggleAll.dataset.labelCollapse : toggleAll.dataset.labelExpand) ?? '';
  toggleAll.querySelector('[data-icon-collapse]')?.classList.toggle('hidden', !anyExpanded);
  toggleAll.querySelector('[data-icon-expand]')?.classList.toggle('hidden', anyExpanded);
}

/**
 * Abre o cierra una sección. Se resuelve al terminar la animación.
 * `refresh: false` evita recalcular ScrollTrigger en cada una cuando se cambian varias juntas.
 */
function setExpanded(button: HTMLButtonElement, expand: boolean, refresh = true): Promise<void> {
  const body = document.getElementById(button.getAttribute('aria-controls') ?? '');
  if (!body) return Promise.resolve();
  button.setAttribute('aria-expanded', String(expand));
  button.closest('[data-section]')?.toggleAttribute('data-collapsed', !expand);
  syncToggleAll();
  gsap.killTweensOf(body);

  return new Promise((resolve) => {
    // Al cambiar alturas, ScrollTrigger tiene que recalcular posiciones (pins, reveals, sección activa).
    const done = (): void => {
      if (refresh) ScrollTrigger.refresh();
      resolve();
    };

    if (prefersReducedMotion()) {
      body.hidden = !expand;
      done();
      return;
    }

    if (expand) {
      body.hidden = false;
      gsap.fromTo(
        body,
        { height: 0, opacity: 0, overflow: 'hidden' },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out', clearProps: 'height,opacity,overflow', onComplete: done },
      );
    } else {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          body.hidden = true;
          gsap.set(body, { clearProps: 'height,opacity,overflow' });
          done();
        },
      });
    }
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => void setExpanded(button, !isExpanded(button)));
});

if (toggleAll) {
  toggleAll.addEventListener('click', async () => {
    const expand = !buttons.some(isExpanded);
    const targets = buttons.filter((button) => isExpanded(button) !== expand);
    await Promise.all(targets.map((button) => setExpanded(button, expand, false)));
    ScrollTrigger.refresh();
  });
  toggleAll.hidden = false;
  syncToggleAll();
}

/** Si se navega a una sección colapsada (menú, links internos, hash), se expande sola. */
function expandFor(hash: string): void {
  if (!hash) return;
  const section = document.getElementById(decodeURIComponent(hash.slice(1)));
  const button = section?.querySelector<HTMLButtonElement>('[data-collapse]');
  if (button && !isExpanded(button)) void setExpanded(button, true);
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
  if (link) expandFor(link.hash);
});
window.addEventListener('hashchange', () => expandFor(window.location.hash));
