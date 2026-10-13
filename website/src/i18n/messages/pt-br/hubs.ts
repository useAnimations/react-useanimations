import type { Messages } from '../en';
import type { CategoryFacts, Faq, InteractionFacts } from '../en/hubs';
import { formIn, listIn, pluralIn } from '../../format';
import { PLAYS } from './taxonomy';

const list = listIn('pt-BR');
const plural = pluralIn('pt-BR');
const form = formIn('pt-BR');
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);
const icons = (n: number) => plural(n, { one: 'ícone', other: 'ícones' });

/** Up to `max` titles, then 'e mais N'. */
const titles = (items: string[], max = 12) =>
  items.length > max
    ? `${items.slice(0, max).join(', ')} e mais ${items.length - max}`
    : list(items);

/** The category as a noun phrase inside a sentence: 'ícones animados de alerta'. */
const noun = (f: CategoryFacts) =>
  f.name === 'Outros' ? 'outros ícones animados' : lower(f.title);

/** ', além de SVGs estáticos' when every icon has them, else how many do. */
const svgNote = (f: CategoryFacts) => {
  if (f.withSvg === f.count) return ', além de SVGs estáticos';
  return f.withSvg
    ? ` (${f.withSvg} ${form(f.withSvg, { one: 'deles também como SVG estático', other: 'deles também como SVGs estáticos' })})`
    : '';
};

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;

export const hubs: Messages['hubs'] = {
  titleSuffix: ' — useAnimations',
  iconCount: icons,

  category: {
    titles: (f: CategoryFacts) => [
      `${f.title} para React e Lottie`,
      `${f.title} para React`,
      `${f.title} grátis`,
      f.title,
    ],
    descriptions: (f: CategoryFacts) => {
      const name = noun(f);
      const examples = list(f.titles.slice(0, 3));
      return [
        `${f.count} ${name} gratuitos, como ${examples}. Microanimações de hover, clique e loop para React, shadcn/ui e Lottie JSON, com licença MIT.`,
        `${f.count} ${name} gratuitos, como ${examples}. Para React, shadcn/ui e Lottie JSON, com licença MIT.`,
        `${f.count} ${name} gratuitos, como ${examples}. Para React, shadcn/ui e Lottie, MIT.`,
        `${f.count} ${name} gratuitos para React, shadcn/ui e Lottie JSON, com licença MIT.`,
      ];
    },
    summary: (f: CategoryFacts) => {
      const plays = list(
        f.groups.map(({ interaction, count }) => `${count} ${form(count, PLAYS[interaction])}`)
      );
      const intro =
        f.groups.length === 1
          ? f.count === 1
            ? `O único ícone ${PLAYS[f.groups[0].interaction].one}`
            : `Todos os ${f.count} ícones ${PLAYS[f.groups[0].interaction].other}`
          : `Dos ${f.count} ícones, ${plays}`;
      return `${intro}. Cada um vem como componente React, componente shadcn/ui e animação Lottie JSON${svgNote(f)}, e é gratuito para uso comercial sob a licença MIT.`;
    },
    faq: (f: CategoryFacts): Faq => {
      const name = noun(f);
      const ex = f.example;
      const n = f.expressions.length;
      return [
        {
          question: `Quais ${name} estão incluídos?`,
          answer: `${icons(f.count)}: ${titles(f.titles)}. Todos são gratuitos para projetos pessoais e comerciais sob a licença MIT, sem exigência de atribuição.`,
        },
        {
          question: `Como uso estes ${name} no React?`,
          answer: `Instale o react-useanimations, adicione ${ex.importLine} e renderize <UseAnimations animation={${ex.exportName}} size={32} />. O ícone executa a interação “${ex.interactionLabel}” e segue a cor do texto. Se você usa shadcn/ui, rode ${ex.shadcnCommand}.`,
        },
        {
          question: `Posso usar estes ${name} sem React?`,
          answer: `Sim. Cada ícone é um arquivo Lottie JSON em ${f.site}/icons/<id>.json (por exemplo, ${f.site}/icons/${ex.id}.json), que pode ser reproduzido com lottie-web, lottie-ios, lottie-android ou o pacote lottie do Flutter${f.withSvg ? '; os SVGs estáticos ficam na página de cada ícone (em inglês)' : ''}. ${
            n
              ? `${titles(f.expressions, 6)} ${n === 1 ? 'usa' : 'usam'} expressões do After Effects, então na web ${n === 1 ? 'precisa' : 'precisam'} do build completo do lottie-web.`
              : 'Nenhum deles usa expressões, então o build light do lottie-web é suficiente.'
          }`,
        },
      ];
    },
    badge: (n: number) => `${icons(n)} · licença MIT`,
    allIcons: (name: string) =>
      name === 'Outros' ? 'Todos os outros ícones' : `Todos os ícones de ${lower(name)}`,
    whereToUse: 'Onde usar',
    byInteraction: 'Por interação',
    addOne: 'Adicione um ao seu app',
    addOneHtml: (label: string, name: string) =>
      `Com React, instale o ${code('react-useanimations')} e importe o ícone; ele executa a interação “${label}” sozinho. Todos os ícones desta categoria funcionam do mesmo jeito: troque ${code(name)} pelo nome que aparece na página do ícone.`,
    shadcnHtml: (href: string) =>
      `Com o ${link(href, 'shadcn/ui')}, a CLI adiciona um componente pronto:`,
    noReactHtml: (href: string) =>
      `Não usa React? Cada ícone é um arquivo Lottie JSON em ${code('/icons/&lt;id&gt;.json')}; veja em ${link(href, 'Ícones Lottie')} os players para web, iOS, Android e Flutter.`,
    more: 'Mais categorias',
    allIconsButton: 'Todos os ícones',
  },

  interaction: {
    titles: (f: InteractionFacts) => [
      `${f.title} para React e Lottie`,
      `${f.title} para React`,
      f.title,
    ],
    descriptions: (f: InteractionFacts) => {
      const plays = form(f.count, PLAYS[f.interaction]);
      return [
        `${f.count} ícones animados gratuitos que ${plays}, como ${list(f.titles.slice(0, 3))}. Para React, shadcn/ui e Lottie JSON, com licença MIT.`,
        `${f.count} ícones animados gratuitos que ${plays}, como ${list(f.titles.slice(0, 3))}. Para React, shadcn/ui e Lottie, MIT.`,
        `${f.count} ícones animados gratuitos que ${plays}. Para React, shadcn/ui e Lottie JSON, com licença MIT.`,
        `${f.count} ${lower(f.title)} gratuitos para React, shadcn/ui e Lottie JSON, com licença MIT.`,
      ];
    },
    faq: (f: InteractionFacts): Faq => [
      {
        question: `Quais ícones usam a interação “${f.label}”?`,
        answer: `${icons(f.count)}: ${titles(f.titles, 15)}. ${f.example}`,
      },
      {
        question: 'O que acontece quando o usuário prefere movimento reduzido?',
        answer: `${f.reducedMotion} O componente React lê prefers-reduced-motion e se atualiza quando a configuração muda, então você não precisa escrever nenhum código para isso.`,
      },
      {
        question: 'Como mudo a interação de um ícone?',
        answer: `Cada ícone executa a interação para a qual foi desenhado. Passe interaction="${f.interaction}" para dar esse comportamento a qualquer outro ícone, ou outro valor ('loop', 'click-toggle', 'click-replay', 'hover', 'hover-loop', 'hover-replay') para trocá-la. As props autoplay, loop e speed ajustam a reprodução.${
          f.interaction === 'click-toggle'
            ? ' Para controlar o estado você mesmo, passe active={isOn} e atualize o valor no onClick: a partir daí, os cliques não alternam mais o ícone por conta própria.'
            : ''
        }`,
      },
    ],
    allIcons: (label: string) => `Todos os ícones com a interação “${label}”`,
    behaviour: 'Como funciona',
    hoverNote:
      ' Toques em telas sensíveis ao toque não iniciam animações de hover; já o foco pelo teclado inicia, quando o ícone está dentro de um elemento focável.',
    handled: 'O componente React cuida de tudo isso; você só escolhe o ícone.',
    whereToUse: 'Onde usar',
    byCategory: 'Por categoria',
    useInReact: 'Use no React',
    overrideHtml: `Os ícones listados aqui usam esta interação por padrão. Qualquer outro ícone também pode usá-la: basta passar a prop ${code('interaction')}.`,
    normallyUses: (title: string, interaction: string) =>
      `${title} normalmente usa '${interaction}'`,
    extra: {
      loop: 'Os loops começam sozinhos e pausam quando saem da área visível. Deixe um mais lento com speed, toque uma única vez com loop={false} ou mantenha parado com autoplay={false}:',
      'click-toggle':
        'Os cliques alternam o ícone sozinhos. Para mantê-lo em sincronia com o seu estado, passe active: o ícone anima sempre que active muda, e os cliques deixam de alterná-lo por conta própria.',
      'click-replay':
        'Coloque o ícone num botão de verdade com a render prop, para que ele possa receber foco e ser anunciado por leitores de tela. O seu onClick roda primeiro; chame event.preventDefault() para pular a animação.',
      hover:
        'Coloque o ícone num link ou botão com a render prop: assim a animação também toca quando o elemento recebe foco pelo teclado, e toques em telas sensíveis ao toque não a disparam.',
      'hover-replay':
        'Faça o hover valer para o card ou o link inteiro, não só para o ícone: com a render prop, os eventos ficam no seu elemento, e o foco pelo teclado também toca a animação.',
      'hover-loop':
        'Use a render prop para que o link inteiro dispare o loop, inclusive com foco pelo teclado. Ajuste o ritmo com speed:',
    },
    codeText: {
      halfSpeed: 'metade da velocidade',
      playsOnce: 'toca uma vez e para',
      staticFrame: 'primeiro frame, estático',
      endState: 'true mostra o estado final',
      closeMenu: 'Fechar menu',
      openMenu: 'Abrir menu',
      download: 'Baixar',
      archive: 'Arquivar',
      weeklyGrowth: 'Crescimento semanal',
    },
    docsHtml: (docs: string, lottie: string) =>
      `Todas as props estão na ${link(docs, 'documentação')}. Fora do React, os ícones são arquivos Lottie JSON; a página ${link(lottie, 'Ícones Lottie')} mostra como recriar as interações com lottie-web.`,
    other: 'Outras interações',
    browseByCategory: 'Navegue por categoria',
  },
};
