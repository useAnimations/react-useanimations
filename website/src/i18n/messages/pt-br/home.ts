import type { Messages } from '../en';
import type { FaqLinks, HomeFaq } from '../en/home';

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="underline underline-offset-4" href="${href}">${text}</a>`;

export const home: Messages['home'] = {
  title: 'Ícones animados e microanimações grátis — useAnimations',
  description: (count: number) =>
    `${count} microanimações gratuitas para UI: uma biblioteca de ícones animados para React, shadcn/ui e Lottie, com hover, clique e loop prontos. MIT.`,

  hero: {
    badge: (count: number) => `${count} ícones · zero dependências · MIT`,
    headline: { start: 'Ícones que ', accent: 'ganham vida.', end: '' },
    h1: 'Ícones animados grátis para React, shadcn/ui e Lottie',
    intro: (count: number) =>
      `${count} microanimações feitas à mão, com microinterações de hover, clique e loop já incluídas. Use como componente React, adicione com o shadcn ou baixe em SVG e Lottie JSON. Licença MIT.`,
    browse: 'Ver ícones',
    fieldHint: 'Passe o ponteiro pelo campo de ícones.',
  },

  numbers: {
    label: 'Em resumo',
    icons: 'ícones animados',
    interactions: 'interações prontas',
    size: 'player, com gzip',
    dependencies: 'dependências',
  },

  interactions: {
    eyebrow: 'Interações prontas',
    title: 'Cada ícone sabe como se mover.',
    intro:
      'Cada ícone vem com a interação para a qual foi desenhado. É só colocar na página e funciona — ou escolha outra com uma única prop. Experimente:',
    demos: {
      loop: 'Toca continuamente, para loaders e status em segundo plano.',
      'click-toggle': 'Alterna entre dois estados: menu e fechar, play e pause.',
      'click-replay': 'Toca de novo desde o início a cada clique, como feedback.',
      hover: 'Toca para a frente ao entrar e volta ao sair.',
      'hover-loop': 'Fica em loop durante o hover e termina o ciclo ao sair.',
      'hover-replay': 'Toca uma vez desde o início a cada entrada do ponteiro.',
    },
  },

  browser: {
    eyebrow: 'A biblioteca',
    title: (count: number) => `${count} ícones animados grátis`,
    intro:
      'Passe o mouse ou clique para tocar. Abra um ícone para ver o código e os downloads — Lottie JSON, SVG e ZIP.',
    search: 'Buscar ícones',
    searchPlaceholder: (count: number) =>
      `Busque entre ${count} ícones — tente “eye”, “bell” ou “arrow”`,
    interaction: 'Interação',
    allInteractions: 'Todas as interações',
    color: 'Cor do ícone',
    colors: {
      text: 'Cor do texto',
      indigo: 'Índigo',
      red: 'Vermelho',
      amber: 'Âmbar',
      teal: 'Verde-azulado',
      violet: 'Violeta',
    },
    customColor: 'Cor personalizada',
    size: 'Tamanho',
    category: 'Categoria',
    all: 'Todos',
    count: { one: '{n} ícone', other: '{n} ícones' },
    noMatch: 'Nenhum ícone encontrado.',
    noMatchHintHtml: (href: string) => `Tente outra palavra ou ${link(href, 'sugira um ícone')}.`,
  },

  everywhere: {
    eyebrow: 'Use do seu jeito',
    title: 'Instale, importe, pronto.',
    intro:
      'Um componente React sem dependências, um registry do shadcn, arquivos para download com URLs estáveis e um catálogo que agentes de IA conseguem ler.',
    docs: 'Leia a documentação',
    tablist: 'Plataforma',
    tabs: { react: 'React', shadcn: 'shadcn', files: 'Arquivos', agents: 'Agentes' },
    codeText: {
      afterAdding: 'depois',
      files: 'Cada ícone em SVG, como animação (Lottie JSON) e num ZIP com os dois',
    },
  },

  features: {
    title: 'Leves, acessíveis e fáceis de estilizar.',
    colors: 'Segue as suas cores',
    colorsHtml: `Os ícones usam ${code('currentColor')}: assumem sozinhos a cor do texto, os estados de hover e o modo escuro. Para mudar, use uma prop, uma classe ou CSS puro.`,
    tiny: 'Leve de propósito',
    tinyText: 'Player embutido, zero dependências. Cada ícone é um módulo próprio de 2 kB.',
    accessible: 'Acessível por padrão',
    accessibleText:
      'Respeita o movimento reduzido, toca as animações de hover no foco pelo teclado e fica fora dos leitores de tela, a menos que você dê um rótulo ao ícone.',
    ssr: 'Pronto para renderização no servidor',
    ssrText:
      'Um client component que renderiza sem problemas em Next.js, Remix e Astro. Os ícones são dados simples que você pode importar em qualquer lugar.',
    agents: 'Feito para agentes',
    agentsHtml: (iconsJson: string, llmsTxt: string) =>
      `Um catálogo tipado com palavras-chave para cada ícone, ${link(iconsJson, 'icons.json')}, ${link(llmsTxt, 'llms.txt')} e documentação em Markdown.`,
  },

  browse: {
    title: 'Encontre a microanimação certa.',
    byCategory: 'Navegue por categoria',
    byInteraction: 'Navegue por interação',
    formats: 'Todos os ícones e formatos',
  },

  hubs: {
    icons: 'Todos os ícones animados',
    categories: 'Categorias de ícones',
    interactions: 'Ícones por interação',
    lottie: 'Ícones Lottie (JSON)',
    shadcn: 'Ícones animados para shadcn/ui',
  },

  faqTitle: 'Perguntas frequentes',
  faq: (f: { version: string; links: FaqLinks }): HomeFaq => [
    {
      question: 'O que são microanimações e ícones animados?',
      answer:
        'Microanimações são movimentos curtos, com um único propósito, que respondem a uma ação do usuário: um ícone de menu que vira botão de fechar, um coração que se preenche quando você curte um post, um sino que toca quando chega uma notificação. Os ícones animados são o tipo mais comum. Eles deixam a interface mais responsiva e mostram mudanças de estado sem precisar de texto extra.',
    },
    {
      question: 'Qual é a diferença entre os arquivos Lottie e SVG?',
      answer:
        'O arquivo Lottie JSON contém a animação inteira e toca em qualquer player Lottie, inclusive no que vem embutido no react-useanimations. Os arquivos SVG são imagens estáticas do ícone em repouso, uma por estado (por exemplo, eye e eye-off), para lugares em que nada deve se mexer: e-mails, documentos, ferramentas de design ou um fallback sem JavaScript.',
    },
    {
      question: 'Funciona com Next.js e renderização no servidor?',
      answer:
        "Sim. O componente é marcado com 'use client' e desenha a animação só no navegador, então pode ser renderizado a partir de server components e de frameworks com SSR, como Next.js, Remix e Astro, sem imports dinâmicos. Os módulos dos ícones são dados simples que os server components podem importar e passar como props.",
      link: { href: f.links.serverRendering, label: 'Next.js e renderização no servidor' },
    },
    {
      question: 'Posso usar os ícones em projetos comerciais?',
      answer:
        'Sim. Os ícones e o pacote react-useanimations têm licença MIT: você pode usar, modificar e redistribuir em trabalhos pessoais e comerciais. A atribuição é bem-vinda, mas não é obrigatória.',
      link: { href: f.links.licence, label: 'Licença e termos' },
    },
    {
      question: 'Posso usar os ícones sem React?',
      answer:
        'Sim. Cada ícone é um arquivo Lottie JSON padrão, então toca com lottie-web em JavaScript puro, Vue, Svelte, Angular ou num CMS, e nos players Lottie para iOS, Android e Flutter. A página de ícones Lottie traz as URLs dos arquivos e snippets prontos de lottie-web para cada interação.',
      link: { href: f.links.lottie, label: 'Ícones Lottie' },
    },
    {
      question: 'Quanto os ícones aumentam o meu bundle?',
      answer: `O player do react-useanimations ${f.version} tem cerca de 8 kB com gzip e nenhuma dependência, e cada ícone é um módulo próprio de 1 a 15 kB (mediana de 2 kB), então o bundle inclui só os ícones que você importa.`,
    },
  ],

  cta: {
    title: { start: 'Deixe a sua interface ', accent: 'pulsar.', end: '' },
    text: 'Grátis e com licença MIT, para uso pessoal e comercial.',
    start: 'Começar',
  },

  schema: {
    software: (count: number) =>
      `Componente React e ${count} ícones animados (Lottie) com interações de hover, clique e loop prontas. Sem dependências.`,
    catalogName: 'Catálogo de ícones do useAnimations',
    catalog: (count: number) =>
      `Todos os ${count} ícones do useAnimations com id, título, categoria, palavras-chave, interação, URLs de Lottie JSON, SVG e ZIP, import para React e comando do shadcn.`,
  },
};
