import { cursos, dificuldades, objetivos, prazos, situacoes, temposEstudo, checkoutPorCurso, type Curso } from './quiz-data';

export type Respostas = {
  curso?: string;
  periodo?: number;
  situacao?: string;
  prazo?: string;
  materia?: string;
  dificuldade?: string;
  tempo?: string;
  objetivo?: string;
  conceitos: Record<string, boolean>; // id da pergunta -> acertou?
};

export const getCurso = (id?: string): Curso | undefined => cursos.find((c) => c.id === id);
const rotulo = <T extends { id: string; rotulo: string }>(lista: T[], id?: string) => lista.find((o) => o.id === id);

export function montarResultado(r: Respostas) {
  const curso = getCurso(r.curso)!;
  const materia = rotulo(curso.materias, r.materia);
  const prazo = prazos.find((p) => p.id === r.prazo);
  const dificuldade = dificuldades.find((d) => d.id === r.dificuldade);
  const acertos = curso.conceitos.filter((q) => r.conceitos[q.id]).length;
  const errados = curso.conceitos.filter((q) => r.conceitos[q.id] === false);

  return {
    curso,
    materia,
    prazo,
    dificuldade,
    situacao: rotulo(situacoes, r.situacao),
    tempo: rotulo(temposEstudo, r.tempo),
    objetivo: rotulo(objetivos, r.objetivo),
    acertos,
    total: curso.conceitos.length,
    temasFracos: errados.map((q) => q.tema),
    planoDias: prazo?.planoDias ?? 14,
  };
}

export function urlCheckout(cursoId: string, materiaId?: string): string | null {
  const base = checkoutPorCurso[cursoId];
  if (!base) return null;
  try {
    const u = new URL(base);
    u.searchParams.set('curso', cursoId);
    if (materiaId) u.searchParams.set('materia', materiaId);
    // repassa UTMs do anúncio, se houver
    if (typeof window !== 'undefined') {
      new URLSearchParams(window.location.search).forEach((v, k) => {
        if (k.startsWith('utm_') || k === 'fbclid') u.searchParams.set(k, v);
      });
    }
    return u.toString();
  } catch {
    return null;
  }
}
