/**
 * Cliente de API del Hero (estilo Postman). Hace requests reales a la API estática del sitio
 * (/api/v1/<lang>/*.json) y muestra status, tiempo y tamaño reales de cada respuesta.
 */
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { isJsonValue, renderJson, renderTokenLine } from '../lib/json-dom';

gsap.registerPlugin(ScrambleTextPlugin);

const URL_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789/._-';
const STATUS_TEXT: Record<number, string> = {
  200: 'OK',
  304: 'Not Modified',
  404: 'Not Found',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

const formatSize = (bytes: number): string => (bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`);
const prefersReducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupClient(client: HTMLElement): void {
  const $ = <T extends Element = HTMLElement>(selector: string): T | null => client.querySelector<T>(selector);
  const url = $('[data-api-url]');
  const send = $<HTMLButtonElement>('[data-api-send]');
  const progress = $('[data-api-progress]');
  const status = $('[data-api-status]');
  const statusText = $('[data-api-status-text]');
  const time = $('[data-api-time]');
  const size = $('[data-api-size]');
  const body = $('[data-api-body]');
  const headers = $('[data-api-headers]');
  const open = $<HTMLAnchorElement>('[data-api-open]');
  const live = $('[data-api-live]');
  const copy = $<HTMLButtonElement>('[data-api-copy]');
  const copyIcon = $('[data-copy-icon]');
  const copiedIcon = $('[data-copied-icon]');
  const endpoints = Array.from(client.querySelectorAll<HTMLButtonElement>('[data-api-endpoint]'));
  const tabs = Array.from(client.querySelectorAll<HTMLButtonElement>('[data-api-tab]'));
  const panels = Array.from(client.querySelectorAll<HTMLElement>('[data-api-panel]'));
  const messages = client.dataset;
  const motionFallback = document.documentElement.classList.contains('motion-fallback');

  let current = endpoints[0]?.dataset.apiEndpoint ?? '';
  let lastText = '';
  let controller: AbortController | null = null;

  const setStatus = (text: string, color: string): void => {
    if (statusText) statusText.textContent = text;
    if (status) status.style.color = color;
  };

  const setUrl = (endpoint: string, animate: boolean): gsap.core.Tween | null => {
    if (!url) return null;
    gsap.set(url, { clipPath: 'none' });
    if (!animate) {
      url.textContent = endpoint;
      return null;
    }
    return gsap.to(url, { duration: 0.6, scrambleText: { text: endpoint, chars: URL_CHARS, speed: 0.9 } });
  };

  /** Hace el request real. Con `replaceBody: false` solo actualiza métricas (el body ya está renderizado). */
  const request = async (endpoint: string, options: { animate: boolean; replaceBody: boolean }): Promise<boolean> => {
    controller?.abort();
    const ownController = new AbortController();
    controller = ownController;

    if (send) send.disabled = true;
    setStatus(messages.msgPending ?? '', 'var(--c-warn)');
    if (time) time.textContent = '';
    const bar = options.animate
      ? gsap.fromTo(progress, { scaleX: 0, opacity: 1 }, { scaleX: 0.85, duration: 0.6, ease: 'power2.out' })
      : null;

    const started = performance.now();
    let ok = false;
    try {
      const response = await fetch(endpoint, { signal: ownController.signal, cache: 'no-cache' });
      const text = await response.text();
      const elapsed = Math.max(1, Math.round(performance.now() - started));
      const code = `${response.status} ${response.statusText || STATUS_TEXT[response.status] || ''}`.trim();
      ok = response.ok;

      setStatus(code, ok ? 'var(--c-ok)' : 'var(--c-err)');
      if (time) time.textContent = `${elapsed} ms`;
      if (size) size.textContent = formatSize(new TextEncoder().encode(text).length);

      if (headers) {
        const lines: HTMLSpanElement[] = [];
        response.headers.forEach((value, name) => {
          lines.push(
            renderTokenLine([
              { kind: 'key', text: name },
              { kind: 'punct', text: ': ' },
              { kind: 'plain', text: value },
            ]),
          );
        });
        headers.replaceChildren(...lines);
      }

      let parsed: unknown = null;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }
      if (ok && isJsonValue(parsed)) {
        lastText = text;
        if (options.replaceBody && body) {
          const lines = renderJson(parsed);
          body.replaceChildren(...lines);
          body.parentElement?.scrollTo({ top: 0 });
          if (options.animate) {
            gsap.from(lines, { opacity: 0, x: -6, duration: 0.25, ease: 'power1.out', stagger: Math.min(0.03, 1.2 / lines.length) });
          }
        }
      }
      if (live) live.textContent = `${messages.msgReceived ?? ''}: ${code}, GET ${endpoint}`;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return false;
      setStatus(messages.msgError ?? '', 'var(--c-err)');
      if (live) live.textContent = messages.msgError ?? '';
    } finally {
      if (controller === ownController) {
        if (send) send.disabled = false;
        if (bar) {
          bar.kill();
          gsap
            .timeline()
            .to(progress, { scaleX: 1, duration: 0.2 })
            .to(progress, { opacity: 0, duration: 0.3 })
            .set(progress, { scaleX: 0, opacity: 1 });
        }
      }
    }
    return ok;
  };

  // Cambiar de endpoint (pestañas de la colección): actualiza la URL y envía el request.
  endpoints.forEach((button) => {
    button.addEventListener('click', () => {
      const endpoint = button.dataset.apiEndpoint;
      if (!endpoint) return;
      endpoints.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
      current = endpoint;
      if (open) open.href = endpoint;
      const animate = !prefersReducedMotion();
      setUrl(endpoint, animate);
      void request(endpoint, { animate, replaceBody: true });
    });
  });

  send?.addEventListener('click', () => {
    void request(current, { animate: !prefersReducedMotion(), replaceBody: true });
  });

  // Pestañas Body / Headers.
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((other) => other.setAttribute('aria-pressed', String(other === tab)));
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.apiPanel !== tab.dataset.apiTab;
      });
    });
  });

  // Copiar la respuesta cruda.
  copy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(lastText || (body?.innerText ?? ''));
      copyIcon?.classList.add('hidden');
      copiedIcon?.classList.remove('hidden');
      if (live) live.textContent = messages.msgCopied ?? '';
      window.setTimeout(() => {
        copyIcon?.classList.remove('hidden');
        copiedIcon?.classList.add('hidden');
      }, 1600);
    } catch {
      // Sin permiso de portapapeles: no hacemos nada.
    }
  });

  // Intro: la URL se "tipea", queda pendiente y llega la respuesta real del perfil.
  const intro = async (): Promise<void> => {
    const streamLines = Array.from(client.querySelectorAll<HTMLElement>('[data-stream]'));
    const animate = !prefersReducedMotion() && !motionFallback;
    if (animate) {
      await gsap.to({}, { duration: 0.2 });
      await setUrl(current, true);
    }
    await request(current, { animate, replaceBody: false });
    if (animate) {
      gsap.to(streamLines, { opacity: 1, duration: 0.2, ease: 'power1.out', stagger: 0.04 });
    }
  };

  void intro();
}

const client = document.querySelector<HTMLElement>('[data-api-client]');
if (client) setupClient(client);
