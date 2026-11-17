'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  cursos,
  dificuldades,
  objetivos,
  prazos,
  situacoes,
  temposEstudo,
  textosContexto,
  XP_ACERTO,
  XP_BONUS_SEQUENCIA,
  type ChaveContexto,
  type Curso,
  type Opcao,
  type PerguntaConceito,
} from '@/lib/quiz-data';
import type { Respostas } from '@/lib/resultado';

function Titulo({ children, ajuda }: { children: React.ReactNode; ajuda?: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-extrabold leading-tight text-petroleo-escuro">{children}</h1>
      {ajuda && <p className="mt-1 text-base text-tinta/70">{ajuda}</p>}
    </div>
  );
}

// ---------------------------------------------------------------- Intro
export function Intro({ onComecar }: { onComecar: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-6 py-6">
      <div className="text-center">
        <motion.div
          initial={{ rotate: -8, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-manteiga text-4xl shadow-card"
          aria-hidden
        >
          🛟
        </motion.div>
        <p className="text-4xl font-black tracking-tight text-petroleo">Salvaê</p>
      </div>
      <div className="card text-center">
        <h1 className="text-2xl font-extrabold leading-tight text-petroleo-escuro">
          Recuperação ou prova final chegando?
        </h1>
        <p className="mt-3 text-base text-tinta/80">
          Responda 12 perguntas rápidas, teste o que você já sabe e receba um plano de revisão feito para o seu
          curso e para o tempo que você tem.
        </p>
        <ul className="mt-4 space-y-1 text-sm font-semibold text-petroleo">
          <li>⏱️ Leva uns 3 minutos</li>
          <li>🎯 Mostra o que você precisa reforçar</li>
        </ul>
      </div>
      <button className="btn-primario" onClick={onComecar}>
        Bora montar meu plano
      </button>
    </div>
  );
}

// ---------------------------------------------------------------- P1: curso + período
export function PassoCurso({
  inicial,
  onConfirmar,
}: {
  inicial: Respostas;
  onConfirmar: (curso: string, periodo: number) => void;
}) {
  const [curso, setCurso] = useState<string | undefined>(inicial.curso);
  const [periodo, setPeriodo] = useState<number | undefined>(inicial.periodo);
  const selecionado = cursos.find((c) => c.id === curso);

  return (
    <div>
      <Titulo ajuda="Assim a gente separa o conteúdo certo pra você.">Qual é o seu curso?</Titulo>
      <div className="space-y-3" role="radiogroup" aria-label="Curso">
        {cursos.map((c) => {
          const ativo = c.id === curso;
          return (
            <button
              key={c.id}
              role="radio"
              aria-checked={ativo}
              onClick={() => {
                setCurso(c.id);
                if (periodo && periodo > c.periodos) setPeriodo(undefined);
              }}
              className={`opcao ${ativo ? 'border-petroleo bg-menta-claro' : ''}`}
            >
              <span className="text-2xl" aria-hidden>
                {c.emoji}
              </span>
              {c.nome}
            </button>
          );
        })}
      </div>

      {selecionado && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <p className="mb-3 text-lg font-extrabold text-petroleo-escuro">E em qual período você está?</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Período">
            {Array.from({ length: selecionado.periodos }, (_, k) => k + 1).map((n) => {
              const ativo = n === periodo;
              return (
                <button
                  key={n}
                  role="radio"
                  aria-checked={ativo}
                  onClick={() => setPeriodo(n)}
                  className={`min-h-12 min-w-14 rounded-full border-2 px-4 text-base font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-manteiga ${
                    ativo ? 'border-petroleo bg-petroleo text-white' : 'border-menta-claro bg-white text-petroleo'
                  }`}
                >
                  {n}º
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      <div className="mt-8">
        <button className="btn-primario" disabled={!curso || !periodo} onClick={() => curso && periodo && onConfirmar(curso, periodo)}>
          Continuar
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Perguntas de contexto
function opcoesDe(chave: ChaveContexto, curso: Curso): Opcao[] {
  switch (chave) {
    case 'situacao':
      return situacoes;
    case 'prazo':
      return prazos;
    case 'materia':
      return curso.materias;
    case 'dificuldade':
      return dificuldades;
    case 'tempo':
      return temposEstudo;
    case 'objetivo':
      return objetivos;
  }
}

export function PassoContexto({
  chave,
  curso,
  onEscolher,
}: {
  chave: ChaveContexto;
  curso: Curso;
  onEscolher: (valor: string) => void;
}) {
  const [escolhido, setEscolhido] = useState<string | null>(null);
  const texto = textosContexto[chave];
  const opcoes = opcoesDe(chave, curso);

  const escolher = (id: string) => {
    if (escolhido) return;
    setEscolhido(id);
    setTimeout(() => onEscolher(id), 280);
  };

  return (
    <div>
      <Titulo ajuda={texto.ajuda}>{texto.pergunta}</Titulo>
      <div className="space-y-3" role="radiogroup" aria-label={texto.pergunta}>
        {opcoes.map((o) => {
          const ativo = o.id === escolhido;
          return (
            <motion.button
              key={o.id}
              role="radio"
              aria-checked={ativo}
              whileTap={{ scale: 0.98 }}
              onClick={() => escolher(o.id)}
              className={`opcao ${ativo ? 'border-petroleo bg-menta-claro' : ''}`}
            >
              {o.emoji && (
                <span className="text-2xl" aria-hidden>
                  {o.emoji}
                </span>
              )}
              {o.rotulo}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Perguntas gamificadas
const LETRAS = ['A', 'B', 'C', 'D', 'E'];

export function PassoConceito({
  pergunta,
  sequencia,
  onResponder,
  onProxima,
}: {
  pergunta: PerguntaConceito;
  sequencia: number;
  onResponder: (acertou: boolean) => void;
  onProxima: () => void;
}) {
  const [escolha, setEscolha] = useState<number | null>(null);
  const respondeu = escolha !== null;
  const acertou = escolha === pergunta.correta;

  const responder = (k: number) => {
    if (respondeu) return;
    setEscolha(k);
    onResponder(k === pergunta.correta);
  };

  // `sequencia` já vem atualizada depois da resposta
  const ganho = acertou ? XP_ACERTO + (sequencia >= 2 ? XP_BONUS_SEQUENCIA : 0) : 0;

  return (
    <div>
      <span className="mb-3 inline-block rounded-full bg-manteiga px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-tinta">
        🎮 Desafio rápido
      </span>
      <Titulo>{pergunta.pergunta}</Titulo>
      <div className="space-y-3">
        {pergunta.opcoes.map((op, k) => {
          const certa = respondeu && k === pergunta.correta;
          const errada = respondeu && k === escolha && !acertou;
          return (
            <motion.button
              key={k}
              disabled={respondeu}
              onClick={() => responder(k)}
              animate={errada ? { x: [0, -6, 6, -4, 4, 0] } : certa ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`opcao disabled:cursor-default ${
                certa ? 'border-menta-escuro bg-menta-claro' : errada ? 'border-coral bg-coral/10' : respondeu ? 'opacity-60' : ''
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                  certa ? 'bg-menta-escuro text-white' : errada ? 'bg-coral text-white' : 'bg-menta-claro text-petroleo'
                }`}
                aria-hidden
              >
                {certa ? '✓' : errada ? '✕' : LETRAS[k]}
              </span>
              <span>{op}</span>
              {certa && <span className="sr-only">(resposta correta)</span>}
              {errada && <span className="sr-only">(sua resposta, incorreta)</span>}
            </motion.button>
          );
        })}
      </div>

      {respondeu && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-3xl bg-white p-5 shadow-card"
          role="status"
          aria-live="polite"
        >
          <p className={`text-lg font-black ${acertou ? 'text-menta-escuro' : 'text-coral'}`}>
            {acertou ? `Mandou bem! +${ganho} XP` : 'Quase! Esse vai pro seu plano.'}
            {acertou && sequencia >= 2 && <span className="ml-1">🔥 {sequencia} seguidas</span>}
          </p>
          <p className="mt-1 text-base text-tinta/80">{pergunta.explicacao}</p>
          <button className="btn-primario mt-4" onClick={onProxima} autoFocus>
            Próxima
          </button>
        </motion.div>
      )}
    </div>
  );
}
