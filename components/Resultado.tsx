'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { avisoMaterialApoio, bonus } from '@/lib/quiz-data';
import { montarResultado, urlCheckout, type Respostas } from '@/lib/resultado';
import { track } from '@/lib/track';

const aparecer = (atraso: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: atraso },
});

export default function Resultado({ respostas, xp, onReiniciar }: { respostas: Respostas; xp: number; onReiniciar: () => void }) {
  const r = montarResultado(respostas);
  const ofertaVista = useRef(false);
  const checkout = urlCheckout(r.curso.id, respostas.materia);
  const { quantidadeMapas, preco } = r.curso.oferta;

  const desempenho =
    r.acertos === r.total
      ? 'Você gabaritou os desafios. A base está firme, então o foco é revisar com estratégia.'
      : r.acertos >= 3
        ? 'Você foi bem nos desafios, mas alguns temas ainda escaparam.'
        : 'Os desafios mostraram alguns temas que precisam de atenção antes da prova.';

  const comprar = () => {
    track('clique_comprar', { curso: r.curso.id, materia: respostas.materia, content_name: `Kit ${r.curso.nome}` });
    if (checkout) window.location.href = checkout;
  };

  return (
    <div className="space-y-5 py-2">
      {/* 1. Mensagem de apoio */}
      <motion.section {...aparecer(0)} className="rounded-4xl bg-petroleo p-6 text-white shadow-card">
        <p className="text-sm font-extrabold uppercase tracking-wide text-menta">
          {r.curso.emoji} Seu resultado de {r.curso.nome}
        </p>
        <h1 className="mt-2 text-2xl font-black leading-tight">{r.curso.mensagemApoio.titulo}</h1>
        <p className="mt-2 text-base text-white/90">{r.curso.mensagemApoio.texto}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-extrabold">
          <span className="rounded-full bg-white/15 px-3 py-1">⚡ {xp} XP</span>
          <span className="rounded-full bg-white/15 px-3 py-1">
            🎯 {r.acertos} de {r.total} desafios
          </span>
        </div>
      </motion.section>

      {/* 2. Resumo do plano e pontos a reforçar */}
      <motion.section {...aparecer(0.15)} className="card">
        <h2 className="text-xl font-extrabold text-petroleo-escuro">Seu plano em resumo</h2>
        <dl className="mt-3 space-y-2 text-base">
          {r.situacao && <Linha rotulo="Situação" valor={r.situacao.rotulo} />}
          {respostas.periodo && <Linha rotulo="Período" valor={`${respostas.periodo}º`} />}
          {r.materia && <Linha rotulo="Matéria prioritária" valor={r.materia.rotulo} />}
          {r.prazo && <Linha rotulo="Prazo" valor={r.prazo.rotulo} />}
          {r.tempo && <Linha rotulo="Tempo por dia" valor={r.tempo.rotulo} />}
          {r.objetivo && <Linha rotulo="Objetivo" valor={r.objetivo.rotulo} />}
        </dl>
        <p className="mt-4 rounded-2xl bg-menta-claro p-4 text-base font-semibold text-petroleo-escuro">
          Recomendação: seguir a versão de <b>{r.planoDias} dias</b> do Plano de Revisão
          {r.materia ? (
            <>
              , começando por <b>{r.materia.rotulo}</b>
            </>
          ) : null}
          .
          {r.prazo?.curto && ' Como o prazo está curto, comece também pelo Resumo de Última Hora.'}
        </p>

        <h3 className="mt-5 text-lg font-extrabold text-petroleo-escuro">Pontos a reforçar</h3>
        <p className="mt-1 text-base text-tinta/80">{desempenho}</p>
        <ul className="mt-3 space-y-2">
          {r.temasFracos.map((t) => (
            <li key={t} className="flex gap-2 rounded-2xl bg-coral/10 p-3 text-base font-semibold">
              <span aria-hidden>📌</span>
              <span>
                {t} <span className="font-normal text-tinta/70">(você errou o desafio desse tema)</span>
              </span>
            </li>
          ))}
          {r.dificuldade && (
            <li className="flex gap-2 rounded-2xl bg-manteiga-claro p-3 text-base font-semibold">
              <span aria-hidden>🧭</span>
              <span>{r.dificuldade.reforco}</span>
            </li>
          )}
        </ul>
      </motion.section>

      {/* 3. Oferta */}
      <motion.section
        {...aparecer(0.3)}
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => {
          if (ofertaVista.current) return;
          ofertaVista.current = true;
          track('oferta_vista', { curso: r.curso.id, materia: respostas.materia, content_name: `Kit ${r.curso.nome}` });
        }}
        className="rounded-4xl border-4 border-manteiga bg-white p-6 shadow-card"
        aria-labelledby="titulo-oferta"
      >
        <p className="text-sm font-extrabold uppercase tracking-wide text-menta-escuro">Para colocar o plano em prática</p>
        <h2 id="titulo-oferta" className="mt-1 text-2xl font-black leading-tight text-petroleo-escuro">
          Kit de Mapas Mentais de {r.curso.nome}
        </h2>
        <p className="mt-2 text-base text-tinta/80">
          {quantidadeMapas ? `${quantidadeMapas} mapas mentais` : 'Mapas mentais'} das matérias do curso, para revisar
          rápido e enxergar como cada conteúdo se conecta.
        </p>

        <div className="mt-4">
          <p className="text-sm font-extrabold text-petroleo">Matérias abordadas</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {r.curso.materias.map((m) => (
              <span
                key={m.id}
                className={`rounded-full px-3 py-1 text-sm font-bold ${
                  m.id === respostas.materia ? 'bg-petroleo text-white' : 'bg-menta-claro text-petroleo'
                }`}
              >
                {m.rotulo}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-extrabold text-petroleo">Bônus incluídos</p>
          <ul className="mt-2 space-y-2">
            {bonus.map((b) => (
              <li key={b.titulo} className="flex gap-3 rounded-2xl bg-offwhite p-3">
                <span className="text-xl" aria-hidden>
                  {b.emoji}
                </span>
                <span>
                  <b className="block text-base text-tinta">{b.titulo}</b>
                  <span className="text-sm text-tinta/75">{b.texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-bold text-tinta/70">Tudo isso por</p>
          <p className="text-4xl font-black text-petroleo">R$ {preco}</p>
        </div>

        {checkout ? (
          <button className="btn-primario mt-4 bg-petroleo text-xl" onClick={comprar}>
            Quero meu kit de {r.curso.nome}
          </button>
        ) : (
          <button className="btn-primario mt-4" disabled aria-disabled>
            Em breve
          </button>
        )}

        <p className="mt-4 text-center text-xs text-tinta/60">{avisoMaterialApoio}</p>
      </motion.section>

      <button onClick={onReiniciar} className="mx-auto block py-3 text-sm font-bold text-petroleo underline underline-offset-4">
        Refazer o quiz
      </button>
    </div>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-menta-claro pb-2 last:border-0">
      <dt className="text-tinta/70">{rotulo}</dt>
      <dd className="text-right font-bold">{valor}</dd>
    </div>
  );
}
