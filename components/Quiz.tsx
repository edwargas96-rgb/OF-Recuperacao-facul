'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  carregarApos,
  sequencia,
  XP_ACERTO,
  XP_BONUS_SEQUENCIA,
  XP_CONTEXTO,
} from '@/lib/quiz-data';
import { getCurso, type Respostas } from '@/lib/resultado';
import { track } from '@/lib/track';
import Cabecalho from './Cabecalho';
import { Intro, PassoCurso, PassoContexto, PassoConceito } from './Passos';
import Carregamento from './Carregamento';
import Resultado from './Resultado';

type Tela = { tipo: 'intro' } | { tipo: 'pergunta'; i: number } | { tipo: 'carregando'; i: number } | { tipo: 'resultado' };

const TOTAL = sequencia.length;

export default function Quiz() {
  const [tela, setTela] = useState<Tela>({ tipo: 'intro' });
  const [respostas, setRespostas] = useState<Respostas>({ conceitos: {} });
  const [xp, setXp] = useState(0);
  const [sequenciaAcertos, setSequenciaAcertos] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tela]);

  const curso = getCurso(respostas.curso);

  const avancar = useCallback((i: number) => {
    const numero = i + 1; // pergunta 1..12 que acabou de ser respondida
    if (carregarApos.includes(numero)) setTela({ tipo: 'carregando', i });
    else setTela({ tipo: 'pergunta', i: i + 1 });
  }, []);

  const depoisDoCarregamento = (i: number) => {
    track('carregamento_fim', { etapa: carregarApos.indexOf(i + 1) + 1, curso: respostas.curso });
    if (i + 1 >= TOTAL) {
      track('resultado_visto', { curso: respostas.curso, materia: respostas.materia });
      setTela({ tipo: 'resultado' });
    } else setTela({ tipo: 'pergunta', i: i + 1 });
  };

  const responderContexto = (i: number, chave: string, valor: string | number, extra?: Partial<Respostas>) => {
    setRespostas((r) => ({ ...r, [chave]: valor, ...extra }));
    setXp((x) => x + XP_CONTEXTO);
    track('resposta', { pergunta: i + 1, chave, valor: String(valor), curso: (extra?.curso ?? respostas.curso) as string });
  };

  const responderConceito = (i: number, id: string, acertou: boolean) => {
    setRespostas((r) => ({ ...r, conceitos: { ...r.conceitos, [id]: acertou } }));
    if (acertou) {
      const nova = sequenciaAcertos + 1;
      setSequenciaAcertos(nova);
      setXp((x) => x + XP_ACERTO + (nova >= 2 ? XP_BONUS_SEQUENCIA : 0));
    } else setSequenciaAcertos(0);
    track('resposta', { pergunta: i + 1, chave: id, valor: acertou ? 'acerto' : 'erro', curso: respostas.curso });
  };

  const reiniciar = () => {
    setRespostas({ conceitos: {} });
    setXp(0);
    setSequenciaAcertos(0);
    setTela({ tipo: 'intro' });
  };

  let conteudo: React.ReactNode = null;
  let chave: string = tela.tipo;

  if (tela.tipo === 'intro') {
    conteudo = (
      <Intro
        onComecar={() => {
          track('quiz_inicio');
          setTela({ tipo: 'pergunta', i: 0 });
        }}
      />
    );
  } else if (tela.tipo === 'pergunta') {
    const passo = sequencia[tela.i];
    const i = tela.i;
    chave = `p${i}`;
    if (passo.tipo === 'curso') {
      conteudo = (
        <PassoCurso
          inicial={respostas}
          onConfirmar={(cursoId, periodo) => {
            responderContexto(i, 'curso', cursoId, { curso: cursoId, periodo });
            avancar(i);
          }}
        />
      );
    } else if (passo.tipo === 'contexto' && curso) {
      conteudo = (
        <PassoContexto
          chave={passo.chave}
          curso={curso}
          onEscolher={(valor) => {
            responderContexto(i, passo.chave, valor);
            avancar(i);
          }}
        />
      );
    } else if (passo.tipo === 'conceito' && curso) {
      const q = curso.conceitos[passo.indice];
      conteudo = (
        <PassoConceito
          key={q.id}
          pergunta={q}
          sequencia={sequenciaAcertos}
          onResponder={(acertou) => responderConceito(i, q.id, acertou)}
          onProxima={() => avancar(i)}
        />
      );
    }
  } else if (tela.tipo === 'carregando') {
    chave = `c${tela.i}`;
    conteudo = <Carregamento etapa={carregarApos.indexOf(tela.i + 1)} respostas={respostas} onFim={() => depoisDoCarregamento(tela.i)} />;
  } else if (tela.tipo === 'resultado') {
    conteudo = <Resultado respostas={respostas} xp={xp} onReiniciar={reiniciar} />;
  }

  const numeroAtual =
    tela.tipo === 'pergunta' ? tela.i + 1 : tela.tipo === 'carregando' ? tela.i + 1 : tela.tipo === 'resultado' ? TOTAL : 0;
  const respondidas = tela.tipo === 'pergunta' ? tela.i : tela.tipo === 'intro' ? 0 : numeroAtual;

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
        {tela.tipo !== 'intro' && tela.tipo !== 'resultado' && (
          <Cabecalho atual={numeroAtual} total={TOTAL} respondidas={respondidas} xp={xp} sequencia={sequenciaAcertos} />
        )}
        <main className="flex flex-1 flex-col px-4 pb-10 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={chave}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-1 flex-col"
            >
              {conteudo}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}
