'use client';

import { AnimatePresence, motion } from 'framer-motion';

type Props = { atual: number; total: number; respondidas: number; xp: number; sequencia: number };

export default function Cabecalho({ atual, total, respondidas, xp, sequencia }: Props) {
  const pct = Math.round((respondidas / total) * 100);
  return (
    <header className="sticky top-0 z-10 bg-offwhite/95 px-4 pb-3 pt-[max(env(safe-area-inset-top),0.75rem)] backdrop-blur">
      <div className="mb-2 flex items-center justify-between text-sm font-bold">
        <span className="text-petroleo">
          Pergunta {atual} de {total}
        </span>
        <span className="flex items-center gap-2">
          <AnimatePresence>
            {sequencia >= 2 && (
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="rounded-full bg-manteiga px-2.5 py-0.5 text-tinta"
                aria-label={`${sequencia} acertos seguidos`}
              >
                🔥 {sequencia}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span
            key={xp}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="rounded-full bg-menta-claro px-2.5 py-0.5 text-petroleo"
            aria-label={`${xp} pontos de experiência`}
          >
            ⚡ {xp} XP
          </motion.span>
        </span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-menta-claro"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Progresso do quiz"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-menta-escuro to-petroleo"
          initial={false}
          animate={{ width: `${Math.max(pct, 4)}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </header>
  );
}
