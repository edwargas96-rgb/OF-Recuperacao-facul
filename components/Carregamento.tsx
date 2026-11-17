'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DURACAO_CARREGAMENTO_MS, prazos, temposEstudo } from '@/lib/quiz-data';
import { getCurso, type Respostas } from '@/lib/resultado';

const OBJETIVO_SITUACAO: Record<string, string> = {
  recuperacao: 'sair da recuperação',
  final: 'mandar bem na prova final',
  substitutiva: 'arrasar na substitutiva',
  melhorar: 'subir suas notas',
};

// Mensagens rotativas que usam as respostas reais da pessoa.
function mensagens(r: Respostas): string[] {
  const curso = getCurso(r.curso);
  const materia = curso?.materias.find((m) => m.id === r.materia)?.rotulo;
  const prazo = prazos.find((p) => p.id === r.prazo);
  const tempo = temposEstudo.find((t) => t.id === r.tempo)?.rotulo.toLowerCase();
  const lista = [
    curso ? `Criando seu plano personalizado de ${curso.nome}...` : 'Criando seu plano personalizado...',
    r.situacao ? `Montando seu plano para ${OBJETIVO_SITUACAO[r.situacao]}...` : 'Montando seu plano para sair da recuperação...',
    materia ? `Organizando as matérias por prioridade, com ${materia} no topo...` : 'Organizando as matérias por prioridade...',
    tempo
      ? `Ajustando o plano para ${tempo} de estudo por dia...`
      : prazo
        ? `Ajustando o plano aos ${prazo.rotulo.toLowerCase()} que você tem...`
        : 'Ajustando o plano ao tempo que você tem...',
    curso ? `Separando os mapas mentais de ${curso.nome}...` : 'Separando os mapas mentais do seu curso...',
  ];
  return lista;
}

const TITULOS = ['Analisando suas respostas', 'Juntando as peças', 'Quase lá', 'Finalizando seu plano'];

export default function Carregamento({ etapa, respostas, onFim }: { etapa: number; respostas: Respostas; onFim: () => void }) {
  const reduzir = useReducedMotion();
  const lista = useMemo(() => {
    const m = mensagens(respostas);
    // cada etapa começa numa mensagem diferente
    return [...m.slice(etapa % m.length), ...m.slice(0, etapa % m.length)];
  }, [respostas, etapa]);
  const [idx, setIdx] = useState(0);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const passo = DURACAO_CARREGAMENTO_MS / lista.length;
    const t = setInterval(() => setIdx((i) => Math.min(i + 1, lista.length - 1)), passo);
    const fim = setTimeout(() => setPronto(true), DURACAO_CARREGAMENTO_MS);
    return () => {
      clearInterval(t);
      clearTimeout(fim);
    };
  }, [lista.length]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-8 text-center">
      <div className="relative h-36 w-36" aria-hidden>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#DDF5EB" strokeWidth="10" />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#0E5A5F"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: DURACAO_CARREGAMENTO_MS / 1000, ease: 'easeInOut' }}
          />
        </svg>
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-5xl"
          animate={reduzir ? {} : { rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          {pronto ? '✅' : '🛟'}
        </motion.span>
      </div>

      <div className="w-full">
        <p className="text-sm font-extrabold uppercase tracking-wide text-menta-escuro">{TITULOS[etapa] ?? TITULOS[0]}</p>
        <div className="mt-2 flex min-h-[4.5rem] items-center justify-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={pronto ? 'pronto' : idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="px-2 text-xl font-extrabold text-petroleo-escuro"
            >
              {pronto ? 'Prontinho! Vamos continuar.' : lista[idx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="h-14 w-full">
        {pronto && (
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="btn-primario" onClick={onFim} autoFocus>
            {etapa === 3 ? 'Ver meu resultado' : 'Continuar'}
          </motion.button>
        )}
      </div>
    </div>
  );
}
