// =====================================================================
// ARQUIVO ÚNICO DE CONFIGURAÇÃO DO QUIZ SALVAÊ
// Para adicionar um curso: copie um bloco de `cursos`, troque os textos
// e adicione a variável de checkout em `checkoutPorCurso` (mais abaixo).
// Nenhum componente precisa ser alterado.
// =====================================================================

export type Opcao = { id: string; rotulo: string; emoji?: string };

export type PerguntaConceito = {
  id: string;
  tema: string; // aparece em "pontos a reforçar" quando a pessoa erra
  pergunta: string;
  opcoes: string[];
  correta: number; // índice da opção correta
  explicacao: string; // mostrada logo após a resposta
};

export type Curso = {
  id: string;
  nome: string;
  emoji: string;
  periodos: number;
  materias: Opcao[]; // opções da pergunta "qual matéria você precisa revisar?"
  conceitos: PerguntaConceito[]; // 5 perguntas gamificadas
  mensagemApoio: { titulo: string; texto: string };
  oferta: {
    quantidadeMapas: number | null; // null = esconde o número
    preco: string; // texto exibido, ex.: "27,90"
  };
};

// ---------------------------------------------------------------------
// OFERTA: valores padrão (cada curso pode sobrescrever em `oferta`)
// ---------------------------------------------------------------------
// REVISAR: defina a quantidade real de mapas antes de anunciar.
export const QUANTIDADE_MAPAS_PADRAO: number | null = null;
// REVISAR: preço em teste (opções do plano: 19,90 / 27,90 / 37,90).
export const PRECO_PADRAO = '27,90';

export const bonus = [
  {
    titulo: 'Plano de Revisão de 14 Dias',
    texto: 'Com versões de 8, 10, 12 e 14 dias para você usar a que cabe no seu prazo.',
    emoji: '🗓️',
  },
  { titulo: 'Questões Comentadas', texto: 'Para testar o que você revisou e entender o porquê de cada resposta.', emoji: '✍️' },
  { titulo: 'Resumo de Última Hora', texto: 'O essencial para reler na véspera ou no caminho da prova.', emoji: '⚡' },
  { titulo: 'Checklist Pré-Prova', texto: 'Para não esquecer nada no dia (do conteúdo ao documento).', emoji: '✅' },
];

export const avisoMaterialApoio =
  'Material de apoio aos estudos. Não substitui aulas, professores nem a bibliografia indicada pelo seu curso.';

// ---------------------------------------------------------------------
// CURSOS
// // REVISAR CONTEÚDO: todas as perguntas, respostas e explicações abaixo
// precisam ser conferidas por alguém da área antes de rodar anúncios.
// ---------------------------------------------------------------------
export const cursos: Curso[] = [
  {
    id: 'adm',
    nome: 'Administração',
    emoji: '📊',
    periodos: 8,
    materias: [
      { id: 'tga', rotulo: 'Teoria Geral da Administração' },
      { id: 'marketing', rotulo: 'Marketing' },
      { id: 'pessoas', rotulo: 'Gestão de Pessoas' },
      { id: 'financas', rotulo: 'Contabilidade e Finanças' },
      { id: 'estrategia', rotulo: 'Planejamento Estratégico' },
    ],
    // REVISAR CONTEÚDO
    conceitos: [
      {
        id: 'adm1',
        tema: 'Teoria Geral da Administração (escolas clássicas)',
        pergunta: 'Quem é considerado o pai da Administração Científica?',
        opcoes: ['Henri Fayol', 'Frederick Taylor', 'Max Weber', 'Abraham Maslow'],
        correta: 1,
        explicacao: 'Taylor focou na eficiência das tarefas. Fayol é o nome da Teoria Clássica, com foco na estrutura.',
      },
      {
        id: 'adm2',
        tema: 'Processo administrativo (PODC)',
        pergunta: 'Quais são as quatro funções administrativas do famoso PODC?',
        opcoes: [
          'Produzir, Organizar, Distribuir e Comprar',
          'Planejar, Operar, Delegar e Cobrar',
          'Planejar, Organizar, Dirigir e Controlar',
          'Pesquisar, Orçar, Decidir e Contratar',
        ],
        correta: 2,
        explicacao: 'Planejar, Organizar, Dirigir e Controlar. Cai muito em prova, vale decorar a ordem.',
      },
      {
        id: 'adm3',
        tema: 'Planejamento estratégico (análise SWOT)',
        pergunta: 'Na análise SWOT, Oportunidades e Ameaças fazem parte de qual ambiente?',
        opcoes: ['Ambiente interno', 'Ambiente externo', 'Ambiente financeiro', 'Depende da empresa'],
        correta: 1,
        explicacao: 'Oportunidades e Ameaças são externas. Forças e Fraquezas são internas.',
      },
      {
        id: 'adm4',
        tema: 'Comportamento organizacional (motivação)',
        pergunta: 'Na pirâmide de Maslow, que necessidades ficam na base?',
        opcoes: ['Autorrealização', 'Estima', 'Fisiológicas', 'Sociais'],
        correta: 2,
        explicacao: 'A base são as necessidades fisiológicas (comer, dormir). No topo fica a autorrealização.',
      },
      {
        id: 'adm5',
        tema: 'Marketing (composto de marketing)',
        pergunta: 'Quais são os 4 Ps do marketing?',
        opcoes: [
          'Produto, Preço, Praça e Promoção',
          'Pessoas, Processos, Prazo e Preço',
          'Produto, Público, Propaganda e Prazo',
          'Planejamento, Preço, Posição e Parceria',
        ],
        correta: 0,
        explicacao: 'Produto, Preço, Praça (distribuição) e Promoção, o composto proposto por McCarthy.',
      },
    ],
    mensagemApoio: {
      titulo: 'Toda empresa tem um trimestre ruim.',
      texto:
        'O que separa quem quebra de quem vira o jogo é ter um plano de ação. O seu começa hoje, e sem precisar de reunião que poderia ser um e-mail.',
    },
    oferta: { quantidadeMapas: QUANTIDADE_MAPAS_PADRAO, preco: PRECO_PADRAO },
  },
  {
    id: 'psico',
    nome: 'Psicologia',
    emoji: '🧠',
    periodos: 10,
    materias: [
      { id: 'historia', rotulo: 'História da Psicologia' },
      { id: 'desenvolvimento', rotulo: 'Psicologia do Desenvolvimento' },
      { id: 'personalidade', rotulo: 'Teorias da Personalidade' },
      { id: 'aprendizagem', rotulo: 'Behaviorismo e Aprendizagem' },
      { id: 'neuro', rotulo: 'Neuropsicologia' },
      { id: 'psicopatologia', rotulo: 'Psicopatologia' },
    ],
    // REVISAR CONTEÚDO
    conceitos: [
      {
        id: 'psi1',
        tema: 'História da Psicologia',
        pergunta: 'Quem fundou o primeiro laboratório de psicologia experimental, em 1879?',
        opcoes: ['Sigmund Freud', 'William James', 'Wilhelm Wundt', 'Jean Piaget'],
        correta: 2,
        explicacao: 'Wundt, em Leipzig (Alemanha). É o marco da psicologia como ciência independente.',
      },
      {
        id: 'psi2',
        tema: 'Behaviorismo e condicionamento',
        pergunta: 'O condicionamento clássico, com o famoso experimento dos cães, é associado a quem?',
        opcoes: ['B. F. Skinner', 'Ivan Pavlov', 'Carl Rogers', 'Albert Bandura'],
        correta: 1,
        explicacao: 'Pavlov. Skinner é o nome do condicionamento operante (reforço e punição).',
      },
      {
        id: 'psi3',
        tema: 'Psicanálise (estrutura do aparelho psíquico)',
        pergunta: 'Na segunda tópica de Freud, quais são as três instâncias psíquicas?',
        opcoes: [
          'Consciente, pré-consciente e inconsciente',
          'Id, ego e superego',
          'Persona, sombra e self',
          'Sensação, percepção e memória',
        ],
        correta: 1,
        explicacao: 'Id, ego e superego. Consciente, pré-consciente e inconsciente são a primeira tópica.',
      },
      {
        id: 'psi4',
        tema: 'Psicologia do Desenvolvimento (Piaget)',
        pergunta: 'Qual é o primeiro estágio do desenvolvimento cognitivo segundo Piaget?',
        opcoes: ['Operatório concreto', 'Pré-operatório', 'Sensório-motor', 'Operatório formal'],
        correta: 2,
        explicacao: 'Sensório-motor (aprox. 0 a 2 anos), seguido de pré-operatório, operatório concreto e formal.',
      },
      {
        id: 'psi5',
        tema: 'Bases biológicas do comportamento',
        pergunta: 'Onde os neurotransmissores são liberados para passar a mensagem de um neurônio a outro?',
        opcoes: ['Na bainha de mielina', 'Na fenda sináptica', 'No núcleo do neurônio', 'Nos dendritos'],
        correta: 1,
        explicacao: 'Na fenda sináptica, o espacinho entre um neurônio e o próximo.',
      },
    ],
    mensagemApoio: {
      titulo: 'Você passa o semestre acolhendo os outros.',
      texto:
        'Agora é a sua vez de receber uma ajudinha. Respira: dá pra organizar isso sem 50 minutos de sessão e sem precisar culpar a sua mãe.',
    },
    oferta: { quantidadeMapas: QUANTIDADE_MAPAS_PADRAO, preco: PRECO_PADRAO },
  },
  {
    id: 'odonto',
    nome: 'Odontologia',
    emoji: '🦷',
    periodos: 10,
    materias: [
      { id: 'anatomia-dental', rotulo: 'Anatomia Dental' },
      { id: 'histologia', rotulo: 'Histologia e Embriologia' },
      { id: 'cabeca-pescoco', rotulo: 'Anatomia de Cabeça e Pescoço' },
      { id: 'cariologia', rotulo: 'Microbiologia e Cariologia' },
      { id: 'periodontia', rotulo: 'Periodontia' },
      { id: 'farmaco', rotulo: 'Farmacologia' },
    ],
    // REVISAR CONTEÚDO
    conceitos: [
      {
        id: 'odo1',
        tema: 'Anatomia Dental (dentição decídua)',
        pergunta: 'Quantos dentes tem a dentição decídua (de leite) completa?',
        opcoes: ['16', '20', '24', '32'],
        correta: 1,
        explicacao: 'São 20 dentes decíduos. A dentição permanente completa tem 32, contando os terceiros molares.',
      },
      {
        id: 'odo2',
        tema: 'Histologia dental',
        pergunta: 'Qual é o tecido mais mineralizado do corpo humano?',
        opcoes: ['Dentina', 'Cemento', 'Esmalte', 'Osso cortical'],
        correta: 2,
        explicacao: 'O esmalte, com cerca de 96% de conteúdo mineral (principalmente hidroxiapatita).',
      },
      {
        id: 'odo3',
        tema: 'Notação dentária (sistema FDI)',
        pergunta: 'No sistema FDI, o dente 11 é o:',
        opcoes: [
          'Incisivo central superior direito',
          'Incisivo central superior esquerdo',
          'Primeiro molar inferior direito',
          'Incisivo central inferior esquerdo',
        ],
        correta: 0,
        explicacao: 'Primeiro dígito = quadrante (1 = superior direito); segundo = dente (1 = incisivo central).',
      },
      {
        id: 'odo4',
        tema: 'Microbiologia e Cariologia',
        pergunta: 'Qual micro-organismo é classicamente associado ao início da cárie?',
        opcoes: ['Streptococcus mutans', 'Candida albicans', 'Staphylococcus aureus', 'Escherichia coli'],
        correta: 0,
        explicacao: 'Streptococcus mutans, que metaboliza açúcares e produz ácido. Lactobacilos participam da progressão.',
      },
      {
        id: 'odo5',
        tema: 'Anatomia de Cabeça e Pescoço (inervação)',
        pergunta: 'Qual nervo craniano é responsável pela sensibilidade dos dentes?',
        opcoes: ['Nervo facial (VII)', 'Nervo trigêmeo (V)', 'Nervo vago (X)', 'Nervo hipoglosso (XII)'],
        correta: 1,
        explicacao: 'O trigêmeo, pelos ramos maxilar (V2) e mandibular (V3). O facial cuida da mímica.',
      },
    ],
    mensagemApoio: {
      titulo: 'Calma, ninguém vai precisar de anestesia aqui.',
      texto:
        'Dá pra tratar essa nota no começo, antes que vire canal. E o melhor: sem aquele barulhinho de motor.',
    },
    oferta: { quantidadeMapas: QUANTIDADE_MAPAS_PADRAO, preco: PRECO_PADRAO },
  },
];

// Links de checkout por curso. O Next.js só lê variáveis NEXT_PUBLIC_
// escritas por extenso, por isso cada uma aparece aqui literalmente.
export const checkoutPorCurso: Record<string, string | undefined> = {
  adm: process.env.NEXT_PUBLIC_CHECKOUT_URL_ADM,
  psico: process.env.NEXT_PUBLIC_CHECKOUT_URL_PSICO,
  odonto: process.env.NEXT_PUBLIC_CHECKOUT_URL_ODONTO,
};

// ---------------------------------------------------------------------
// PERGUNTAS DE CONTEXTO (iguais para todos os cursos)
// ---------------------------------------------------------------------
export const situacoes: Opcao[] = [
  { id: 'recuperacao', rotulo: 'Estou de recuperação', emoji: '🆘' },
  { id: 'final', rotulo: 'Vou fazer prova final', emoji: '📝' },
  { id: 'substitutiva', rotulo: 'Vou fazer substitutiva', emoji: '🔁' },
  { id: 'melhorar', rotulo: 'Quero melhorar minhas notas', emoji: '📈' },
];

// `planoDias` escolhe a versão do Plano de Revisão recomendada no resultado.
export const prazos: (Opcao & { planoDias: number; curto?: boolean })[] = [
  { id: 'ate8', rotulo: 'Até 8 dias', emoji: '⏰', planoDias: 8, curto: true },
  { id: '9a10', rotulo: '9 a 10 dias', emoji: '📆', planoDias: 10 },
  { id: '11a12', rotulo: '11 a 12 dias', emoji: '🗓️', planoDias: 12 },
  { id: '13mais', rotulo: '13 dias ou mais', emoji: '🌱', planoDias: 14 },
];

export const dificuldades: (Opcao & { reforco: string })[] = [
  { id: 'memorizar', rotulo: 'Memorizar o conteúdo', emoji: '🧩', reforco: 'Fixação: revisar em ciclos curtos e se testar, em vez de só reler.' },
  { id: 'entender', rotulo: 'Entender a matéria', emoji: '🤔', reforco: 'Compreensão: ver como os conceitos se ligam antes de decorar detalhes.' },
  { id: 'organizar', rotulo: 'Organizar o que estudar', emoji: '🗂️', reforco: 'Organização: saber o que vem primeiro e o que pode ficar para depois.' },
  { id: 'ansiedade', rotulo: 'Ansiedade na hora da prova', emoji: '😰', reforco: 'Confiança: treinar com questões para chegar na prova já tendo "visto aquilo".' },
  { id: 'tempo', rotulo: 'Falta de tempo', emoji: '⌛', reforco: 'Foco: estudar o que mais cai, em blocos curtos que cabem na sua rotina.' },
];

export const temposEstudo: Opcao[] = [
  { id: '30min', rotulo: 'Até 30 minutos', emoji: '☕' },
  { id: '1h', rotulo: 'Cerca de 1 hora', emoji: '📖' },
  { id: '2h', rotulo: '2 horas', emoji: '📚' },
  { id: '3h', rotulo: '3 horas ou mais', emoji: '🔥' },
];

export const objetivos: Opcao[] = [
  { id: 'passar', rotulo: 'Só passar e respirar aliviado(a)', emoji: '😮‍💨' },
  { id: 'nota', rotulo: 'Tirar uma nota boa', emoji: '⭐' },
  { id: 'entender', rotulo: 'Entender a matéria de vez', emoji: '💡' },
  { id: 'medo', rotulo: 'Perder o medo dessa disciplina', emoji: '🦁' },
];

// ---------------------------------------------------------------------
// ORDEM DO QUIZ (12 perguntas). Telas de carregamento após 3, 6, 9 e 12.
// tipo: 'curso' | 'contexto' | 'conceito'; conceito usa o índice (0..4)
// ---------------------------------------------------------------------
export type ChaveContexto = 'situacao' | 'prazo' | 'materia' | 'dificuldade' | 'tempo' | 'objetivo';
export type Passo =
  | { tipo: 'curso' }
  | { tipo: 'contexto'; chave: ChaveContexto }
  | { tipo: 'conceito'; indice: number };

export const sequencia: Passo[] = [
  { tipo: 'curso' }, // 1
  { tipo: 'contexto', chave: 'situacao' }, // 2
  { tipo: 'conceito', indice: 0 }, // 3
  { tipo: 'contexto', chave: 'prazo' }, // 4
  { tipo: 'contexto', chave: 'materia' }, // 5
  { tipo: 'conceito', indice: 1 }, // 6
  { tipo: 'contexto', chave: 'dificuldade' }, // 7
  { tipo: 'conceito', indice: 2 }, // 8
  { tipo: 'contexto', chave: 'tempo' }, // 9
  { tipo: 'conceito', indice: 3 }, // 10
  { tipo: 'contexto', chave: 'objetivo' }, // 11
  { tipo: 'conceito', indice: 4 }, // 12
];

export const carregarApos = [3, 6, 9, 12]; // número da pergunta (1 a 12)
export const DURACAO_CARREGAMENTO_MS = 5000; // entre 4 e 6 s

export const XP_CONTEXTO = 5;
export const XP_ACERTO = 20;
export const XP_BONUS_SEQUENCIA = 10; // a partir do 2º acerto seguido

export const textosContexto: Record<ChaveContexto, { pergunta: string; ajuda?: string }> = {
  situacao: { pergunta: 'Qual é a sua situação agora?', ajuda: 'Sem julgamento. Só pra montar o plano certo.' },
  prazo: { pergunta: 'Quantos dias faltam pra sua prova?' },
  materia: { pergunta: 'Qual matéria você mais precisa revisar?' },
  dificuldade: { pergunta: 'O que mais te atrapalha nos estudos?' },
  tempo: { pergunta: 'Quanto tempo por dia você consegue estudar?' },
  objetivo: { pergunta: 'Qual é o seu objetivo com essa prova?' },
};
