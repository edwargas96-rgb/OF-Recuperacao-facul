# Salvaê: quiz de recuperação universitária

Quiz mobile (12 perguntas) que leva ao "Kit de Mapas Mentais" do curso. Next.js + TypeScript + Tailwind + Framer Motion.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # confere se compila
```

## Onde trocar as coisas

Tudo fica em **`lib/quiz-data.ts`**:

| O quê | Onde |
|---|---|
| Preço (`R$ X`) | `PRECO_PADRAO` ou `oferta.preco` de cada curso |
| Quantidade de mapas (`X mapas`) | `QUANTIDADE_MAPAS_PADRAO` ou `oferta.quantidadeMapas` (null esconde o número) |
| Bônus e aviso de material de apoio | `bonus` e `avisoMaterialApoio` |
| Perguntas gamificadas, matérias, mensagem de apoio | dentro de cada curso em `cursos` (marcado `REVISAR CONTEÚDO`) |
| Perguntas de contexto e ordem do quiz | `situacoes`, `prazos`, `dificuldades`, `temposEstudo`, `objetivos`, `sequencia` |
| Telas de carregamento | `carregarApos` e `DURACAO_CARREGAMENTO_MS` |

## Adicionar um curso

1. Copie um bloco de `cursos` em `lib/quiz-data.ts` e troque `id`, nome, matérias, as 5 perguntas e a mensagem de apoio.
2. Adicione a linha do checkout em `checkoutPorCurso`, por exemplo `enf: process.env.NEXT_PUBLIC_CHECKOUT_URL_ENF`.
3. Crie a variável na Vercel. Nenhum componente precisa mudar.

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_CHECKOUT_URL_ADM` | Link do checkout de Administração |
| `NEXT_PUBLIC_CHECKOUT_URL_PSICO` | Link do checkout de Psicologia |
| `NEXT_PUBLIC_CHECKOUT_URL_ODONTO` | Link do checkout de Odontologia |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Meta Pixel |

Sem link de checkout, o botão mostra "Em breve". O link recebe `curso`, `materia` e as UTMs do anúncio como parâmetros. Depois de mudar uma variável, faça um novo deploy.

## Eventos (lib/track.ts)

`quiz_inicio`, `resposta`, `carregamento_fim`, `resultado_visto` (eventos personalizados), `oferta_vista` (→ ViewContent) e `clique_comprar` (→ InitiateCheckout). Em desenvolvimento aparecem no console.
