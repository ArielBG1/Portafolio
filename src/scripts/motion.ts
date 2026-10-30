/**
 * Animaciones del sitio con GSAP + ScrollTrigger.
 *
 * - Todo lo que se mueve vive dentro de `gsap.matchMedia()` con `prefers-reduced-motion: no-preference`:
 *   con movimiento reducido no se anima nada y el contenido se ve completo.
 * - Los estados iniciales (oculto, recortado) están en global.css y solo aplican con JS y sin movimiento
 *   reducido. Si este script tarda más de 3 s, BaseLayout agrega `.motion-fallback` y se muestra todo.
 * - El progreso de lectura y la sección activa funcionan siempre: no son animaciones decorativas.
 * - La intro del cliente de API del Hero vive en api-client.ts; el colapsado de secciones, en sections.ts.
 */
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const PATH_CHARS = 'abcdefghijklmnopqrstuvwxyz/-_';

const root = document.documentElement;
const fallbackActive = root.classList.contains('motion-fallback');
root.classList.add('motion-ready');

const $ = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document): T | null =>
  scope.querySelector<T>(selector);
const $$ = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document): T[] =>
  Array.from(scope.querySelectorAll<T>(selector));

/**
 * Para disparos "una sola vez" o de estado se usa IntersectionObserver en lugar de ScrollTrigger:
 * es asíncrono y no fuerza recálculos de layout al cargar (mejora el Total Blocking Time en móviles).
 * ScrollTrigger queda solo para lo que sigue al scroll (scrub, pin, progreso).
 */
function onEnterView(elements: Element[], callback: (entered: Element[]) => void, rootMargin = '0px 0px -12% 0px'): void {
  if (elements.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const entered = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target);
      if (entered.length === 0) return;
      entered.forEach((element) => observer.unobserve(element));
      callback(entered);
    },
    { rootMargin },
  );
  elements.forEach((element) => observer.observe(element));
}

/* -------------------------------------------------------------------------- */
/* Siempre activos                                                             */
/* -------------------------------------------------------------------------- */

/** Barra de progreso del "request" bajo la navbar. */
function setupProgress(): void {
  const bar = $('[data-progress]');
  if (!bar) return;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
  });
}

/** Marca el link de la sección visible y muestra su endpoint en la navbar (tablet). */
function setupScrollSpy(): void {
  const links = $$<HTMLAnchorElement>('[data-nav-link]');
  const method = $('[data-current-method]');
  const path = $('[data-current-path]');
  const defaultLabel = `GET ${path?.textContent ?? ''}`;

  const activate = (section: HTMLElement | null): void => {
    links.forEach((link) => {
      if (section && link.hash === `#${section.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const [verb = 'GET', route = ''] = (section?.dataset.endpointLabel ?? defaultLabel).split(' ');
    if (method) {
      method.textContent = verb;
      method.classList.toggle('text-post', verb === 'POST');
      method.classList.toggle('text-get', verb !== 'POST');
    }
    if (path) path.textContent = route;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => activate(entry.target.hasAttribute('data-section') ? (entry.target as HTMLElement) : null));
    },
    { rootMargin: '-45% 0px -55% 0px' },
  );
  [...$$('[data-hero]'), ...$$('[data-section]')].forEach((element) => observer.observe(element));
}

/* -------------------------------------------------------------------------- */
/* Animaciones (solo sin movimiento reducido)                                  */
/* -------------------------------------------------------------------------- */

/** Al salir del Hero, la consola se inclina y se aleja (parallax con el scroll). */
function heroScroll(): void {
  const hero = $('[data-hero]');
  if (!hero) return;
  const scrollTrigger = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } as const;
  gsap.to('[data-hero-console]', {
    yPercent: -10,
    rotateX: 8,
    scale: 0.95,
    opacity: 0.55,
    transformPerspective: 1000,
    transformOrigin: '50% 0%',
    ease: 'none',
    scrollTrigger,
  });
  gsap.to('[data-hero-copy]', { y: -50, ease: 'none', scrollTrigger });
  gsap.to('[data-hero-backdrop]', { yPercent: 25, ease: 'none', scrollTrigger });
}

/** Aparición de bloques al entrar en pantalla, en tandas. */
function reveals(): void {
  onEnterView($$('[data-reveal]'), (elements) =>
    // overwrite 'auto': solo pisa opacity/y; no cancela otras animaciones del mismo elemento (ej. el Stack).
    gsap.to(elements, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: 'auto' }),
  );
}

/** Encabezados estilo Swagger: el bloque entra, el método aparece, la ruta se "descifra" y llega el status. */
function endpoints(): void {
  // Los timelines se crean pausados (así el estado inicial ya se aplica) y se reproducen al entrar en pantalla.
  const timelines = new Map<Element, gsap.core.Timeline>();
  $$('[data-endpoint]').forEach((block) => {
    const path = $('[data-type]', block);
    const finalPath = path?.textContent ?? '';
    const timeline = gsap
      .timeline({ paused: true })
      .from($('.opblock-summary', block), { x: -24, opacity: 0, duration: 0.5, ease: 'power3.out' })
      .from($('.method-solid', block), { scale: 0.5, opacity: 0, duration: 0.35, ease: 'back.out(2.5)' }, '-=0.25')
      .set(path, { clipPath: 'none' }, '<')
      .to(path, { duration: 0.7, scrambleText: { text: finalPath, chars: PATH_CHARS, speed: 0.7 } }, '<')
      .from($('[data-leader]', block), { scaleX: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .from($('[data-status]', block), { opacity: 0, x: -8, duration: 0.3 }, '-=0.2');
    timelines.set(block, timeline);
  });
  onEnterView([...timelines.keys()], (blocks) => blocks.forEach((block) => timelines.get(block)?.play()));
}

/**
 * Stack como arquitectura: un "paquete" baja del frontend a la base de datos (request) y vuelve con 200 OK.
 * En escritorio con altura suficiente el diagrama queda fijo (pin) mientras se scrollea.
 */
function stackPipeline(pin: boolean): void {
  const stack = $('[data-stack]');
  const pipeline = $('[data-pipeline]');
  if (!stack || !pipeline) return;
  const packet = $('[data-packet]', pipeline);
  const fill = $('[data-pipeline-fill]', pipeline);
  const request = $('[data-packet-request]', pipeline);
  const response = $('[data-packet-response]', pipeline);
  const layers = $$('[data-layer]', pipeline);

  // Posición vertical del nodo de cada capa, relativa al primer nodo.
  const nodeOffset = (layer: HTMLElement): number => layer.offsetTop - (layers[0]?.offsetTop ?? 0);
  const fillRatio = (layer: HTMLElement): number => nodeOffset(layer) / Math.max(1, fill?.parentElement?.offsetHeight ?? 1);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    // refreshPriority: el pin se calcula antes que el resto, así los triggers de más abajo cuentan su espacio extra.
    scrollTrigger: pin
      ? { trigger: stack, start: 'top 96px', end: '+=130%', pin: true, scrub: 0.6, invalidateOnRefresh: true, refreshPriority: 1 }
      : { trigger: pipeline, start: 'top 75%', end: 'bottom 45%', scrub: 0.6, invalidateOnRefresh: true },
  });

  // Arranca "en vuelo": se ve el GET y la respuesta queda oculta hasta el final.
  tl.fromTo(fill, { scaleY: 0 }, { scaleY: 0, duration: 0.01 })
    .fromTo(request, { opacity: 1 }, { opacity: 1, duration: 0.01 }, 0)
    .fromTo(response, { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0)
    .fromTo(packet, { backgroundColor: '#7c6cf2' }, { backgroundColor: '#7c6cf2', duration: 0.01 }, 0);
  layers.forEach((layer, index) => {
    const tiles = $$('[data-tech]', layer);
    const card = $('[data-layer-card]', layer);
    tl.to(packet, { y: () => nodeOffset(layer), duration: index === 0 ? 0.2 : 1 })
      .to(fill, { scaleY: () => fillRatio(layer), duration: index === 0 ? 0.2 : 1 }, '<')
      .fromTo(
        card,
        { boxShadow: '0 0 0 1px rgba(124, 108, 242, 0), 0 16px 40px -18px rgba(124, 108, 242, 0)' },
        { boxShadow: '0 0 0 1px rgba(124, 108, 242, 0.9), 0 16px 40px -18px rgba(124, 108, 242, 0.55)', duration: 0.3 },
      )
      .fromTo(tiles, { opacity: 0.25, filter: 'grayscale(1)' }, { opacity: 1, filter: 'grayscale(0)', stagger: 0.06, duration: 0.4 }, '<');
  });

  // Respuesta: el paquete se vuelve verde y sube; al llegar, la línea de estado pasa a 200 OK.
  tl.to(packet, { backgroundColor: '#10b981', duration: 0.15 })
    .to(packet, { y: 0, duration: 1.2 })
    .to(request, { opacity: 0, duration: 0.15 })
    .to(response, { opacity: 1, duration: 0.15 }, '<');
}

/** Experiencia: las líneas del log se "imprimen" a medida que se scrollea. */
function logs(): void {
  $$('[data-log]').forEach((log) => {
    gsap.fromTo(
      $$('[data-log-line]', log),
      { opacity: 0.15, x: -10 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: log, start: 'top 82%', end: 'bottom 60%', scrub: 0.5 },
      },
    );
  });
}

/** Proyectos: el destacado "se acerca" al entrar y el JSON de cada tarjeta tiene parallax. */
function projects(): void {
  const featured = $('[data-featured] > article');
  if (featured) {
    gsap.fromTo(
      featured,
      { scale: 0.94 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: featured, start: 'top 95%', end: 'top 45%', scrub: true } },
    );
  }
  $$('[data-parallax]').forEach((element) => {
    gsap.fromTo(
      element,
      { y: 18 },
      {
        y: -18,
        ease: 'none',
        scrollTrigger: { trigger: element.closest('article') ?? element, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

/** Footer: las letras del wordmark suben a medida que se llega al final de la página. */
function footerWordmark(): void {
  const letters = $$('[data-wordmark-char]');
  if (letters.length === 0) return;
  gsap.fromTo(
    letters,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      ease: 'power3.out',
      stagger: 0.04,
      scrollTrigger: { trigger: '[data-wordmark]', start: 'top 98%', end: 'bottom 92%', scrub: 0.8 },
    },
  );
}

/** Footer: al entrar la terminal, cada comando se "tipea" y después aparece su salida. */
function footerTerminal(): void {
  const terminal = $('[data-terminal]');
  if (!terminal) return;
  const timeline = gsap.timeline({ paused: true });
  $$('[data-term-step]', terminal).forEach((step) => {
    timeline
      .fromTo(
        $$('[data-term-cmd]', step),
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(16)' },
      )
      .from($('[data-term-output]', step), { opacity: 0, y: 6, duration: 0.3, ease: 'power2.out' }, '+=0.05');
  });
  onEnterView([terminal], () => timeline.play(), '0px 0px -25% 0px');
}

/* -------------------------------------------------------------------------- */

setupProgress();
setupScrollSpy();

/**
 * La inicialización se reparte en varias tareas cortas (cediendo el hilo entre una y otra) para no bloquear
 * la interacción en móviles. `context.add()` registra lo creado en cada tramo para que matchMedia pueda revertirlo.
 */
const nextTask = (): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, 0));

async function runInChunks(context: gsap.Context, steps: (() => void)[]): Promise<void> {
  for (const step of steps) {
    await nextTask();
    context.add(step);
  }
}

/** Al terminar de crear todo: ordenar por posición (el pin afecta a lo que viene después) y recalcular una vez. */
function finishSetup(chunks: Promise<void>[]): void {
  void Promise.all(chunks).then(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
}

const mm = gsap.matchMedia();
const reduceMotionOff = '(prefers-reduced-motion: no-preference)';
const initialChunks: Promise<void>[] = [];
let initialRun = true;

// Depende del tamaño: se rearma al cruzar los breakpoints. Va primero porque el pin del Stack corre lo de abajo.
mm.add(
  {
    motion: reduceMotionOff,
    desktop: '(min-width: 64rem)',
    pinnable: '(min-width: 64rem) and (min-height: 46rem)',
  },
  (context) => {
    const { motion = false, desktop = false, pinnable = false } = context.conditions ?? {};
    if (!motion) return;
    const chunks = runInChunks(context, [() => stackPipeline(pinnable), ...(desktop ? [heroScroll] : [])]);
    if (initialRun) initialChunks.push(chunks);
    else finishSetup([chunks]);
  },
);

// Una sola vez por carga (no se re-ejecuta al cambiar el tamaño de la ventana).
mm.add(reduceMotionOff, (context) => {
  const steps = fallbackActive ? [] : [reveals, endpoints];
  const chunks = runInChunks(context, [...steps, logs, projects, footerWordmark, footerTerminal]);
  if (initialRun) initialChunks.push(chunks);
  else finishSetup([chunks]);
});

initialRun = false;
finishSetup(initialChunks);

