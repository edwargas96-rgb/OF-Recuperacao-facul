// Eventos do funil. Vão para o Meta Pixel quando NEXT_PUBLIC_META_PIXEL_ID
// existe; em desenvolvimento também aparecem no console.

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Eventos padrão do Meta usam `track`; os demais usam `trackCustom`.
const PADRAO_META: Record<string, string> = {
  oferta_vista: 'ViewContent',
  clique_comprar: 'InitiateCheckout',
};

export type Evento =
  | 'quiz_inicio'
  | 'resposta'
  | 'carregamento_fim'
  | 'resultado_visto'
  | 'oferta_vista'
  | 'clique_comprar';

export function track(evento: Evento, params: Params = {}) {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[track]', evento, params);
  }
  if (!PIXEL_ID || !window.fbq) return;
  const padrao = PADRAO_META[evento];
  if (padrao) window.fbq('track', padrao, params);
  else window.fbq('trackCustom', evento, params);
}
