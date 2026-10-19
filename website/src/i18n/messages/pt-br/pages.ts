import type { Messages } from '../en';
import type { Faq } from '../en/hubs';
import { listIn, pluralIn } from '../../format';

const list = listIn('pt-BR');
const plural = pluralIn('pt-BR');
const icons = (n: number) => plural(n, { one: 'ícone', other: 'ícones' });
const lower = (text: string) => text[0].toLowerCase() + text.slice(1);

const code = (text: string) => `<code class="font-mono text-sm text-fg">${text}</code>`;
const link = (href: string, text: string) =>
  `<a class="text-fg underline underline-offset-4" href="${href}">${text}</a>`;
const strong = (text: string) => `<strong class="font-medium text-fg">${text}</strong>`;

export const pages: Messages['pages'] = {
  icons: {
    titles: (count: number) => [
      `Todos os ${count} ícones animados por categoria`,
      `Todos os ${count} ícones animados`,
    ],
    descriptions: (count: number, categories: number) => [
      `Todos os ícones do useAnimations numa só página: ${count} ícones animados gratuitos em ${categories} categorias, para React, shadcn/ui, Lottie JSON e SVG. Licença MIT.`,
      `${count} ícones animados gratuitos em ${categories} categorias, para React, shadcn/ui, Lottie JSON e SVG. Licença MIT.`,
    ],
    title: 'Todos os ícones animados',
    badge: (count: number) => `${icons(count)} · licença MIT`,
    introHtml: (browser: string) =>
      `Todos os ícones do conjunto, agrupados por categoria. Abra um deles para ver a prévia ao vivo, o código para React e shadcn/ui e os downloads em Lottie JSON, SVG e ZIP (as páginas dos ícones estão em inglês). Para buscar por palavra-chave e testar as animações aqui mesmo, use o ${link(browser, 'navegador de ícones')}.`,
    categoriesNav: 'Categorias',
    byInteraction: 'Por interação:',
    categoryLink: (count: number, name: string) =>
      name === 'Outros' ? `${count} outros ícones` : `${icons(count)} de ${lower(name)}`,
  },

  categories: {
    titles: (categories: number) => [
      `Categorias de ícones animados: ${categories} coleções`,
      'Categorias de ícones animados',
    ],
    descriptions: (iconCount: number, categories: number) => [
      `Explore ${iconCount} ícones animados gratuitos em ${categories} categorias: navegação, ações, mídia, carregamento, redes sociais e mais. Para React, shadcn/ui e Lottie.`,
    ],
    title: 'Categorias de ícones animados',
    badge: (iconCount: number, categories: number) =>
      `${icons(iconCount)} · ${plural(categories, { one: 'categoria', other: 'categorias' })}`,
    introHtml: (interactions: string) =>
      `Cada ícone do useAnimations pertence a uma categoria, de setas de navegação e controles de mídia a loaders e logos de redes sociais. Abra uma categoria para ver todos os ícones dela, onde usá-los e o código para adicionar um, ou navegue por ${link(interactions, 'interação')}.`,
    iconCount: icons,
  },

  interactions: {
    titles: ['Microinterações de hover, clique e loop', 'Microinterações para ícones animados'],
    descriptions: (iconCount: number, interactions: number) => [
      `${iconCount} ícones animados em ${interactions} microinterações: loop, alternar e reproduzir no clique, hover, reproduzir e loop no hover. Com suporte a movimento reduzido.`,
      `${iconCount} ícones animados em ${interactions} microinterações de hover, clique e loop, com suporte a movimento reduzido.`,
    ],
    title: 'Interações dos ícones animados',
    badge: (interactions: number, iconCount: number) =>
      `${plural(interactions, { one: 'interação', other: 'interações' })} · ${icons(iconCount)}`,
    introHtml: `Cada ícone vem com a microinteração para a qual foi desenhado: fica em loop, alterna ou toca de novo no clique, ou toca no hover. O componente React faz toda a ligação e respeita o movimento reduzido, e a prop <code class="font-mono text-base text-fg">interaction</code> troca a interação de qualquer ícone.`,
    iconCount: icons,
    chooseTitle: 'Como escolher uma interação',
    chooseHtml: {
      loop: (href: string) =>
        `${strong('Um estado que dura')}, como carregamento ou um alerta ativo: ${link(href, 'loop')}.`,
      'click-toggle': (href: string) =>
        `${strong('Um controle liga/desliga')}, como mudo, menu ou mostrar senha: ${link(href, 'alternar no clique')}, com ${code('active')} para estado controlado.`,
      'click-replay': (href: string) =>
        `${strong('Uma ação pontual')}, como enviar, salvar ou atualizar: ${link(href, 'reproduzir no clique')}.`,
      hover: (href: string) =>
        `${strong('Uma dica do que o link abre')}: ${link(href, 'hover')}, que volta ao contrário quando o ponteiro sai.`,
      'hover-replay': (href: string) =>
        `${strong('Barras de ferramentas e listas que o usuário percorre rapidamente')}: ${link(href, 'reproduzir no hover')}, que termina sozinho.`,
      'hover-loop': (href: string) =>
        `${strong('Links que convidam a olhar com mais calma')}, como ícones de redes sociais: ${link(href, 'loop no hover')}.`,
    },
    motionTitle: 'Movimento reduzido',
    motionHtml: `O componente React segue ${code('prefers-reduced-motion')} e se atualiza quando a configuração muda. Toques em telas sensíveis ao toque nunca iniciam animações de hover.`,
    reducedMotion: {
      loop: 'o ícone não inicia sozinho e fica no primeiro frame, estático.',
      'click-toggle': 'o clique troca para o outro estado na hora, sem a animação de transição.',
      'click-replay': 'os cliques continuam chegando ao seu handler, mas a animação não toca.',
      hover: 'o hover não toca a animação.',
      'hover-replay': 'o hover não toca a animação.',
      'hover-loop': 'o ícone fica estático durante o hover.',
    },
  },

  lottie: {
    titles: (count: number) => [
      `Ícones Lottie grátis: ${count} ícones animados em JSON`,
      'Ícones Lottie grátis',
    ],
    descriptions: (count: number) => [
      `${count} ícones Lottie gratuitos em JSON puro, com licença MIT. Código pronto para lottie-web, dotLottie, React, React Native, iOS, Android e Flutter.`,
      `${count} ícones Lottie gratuitos em Lottie JSON, com licença MIT. Código pronto para lottie-web, React, React Native, iOS, Android e Flutter.`,
    ],
    title: 'Ícones Lottie grátis',
    crumb: 'Ícones Lottie',
    datasetName: 'Catálogo de ícones do useAnimations',
    datasetDescription: (count: number) =>
      `Metadados e URLs dos arquivos de ${count} ícones Lottie animados: id, título, categoria, palavras-chave, interação, tamanho e duração.`,
    badge: (count: number) => `${icons(count)} · Lottie JSON · licença MIT`,
    intro:
      'Cada ícone do useAnimations é uma animação Lottie JSON padrão, então qualquer player Lottie consegue tocá-la: lottie-web na web, lottie-ios, lottie-android, Flutter e React Native. Os arquivos são gratuitos sob a licença MIT, sem cadastro, e servidos em URLs estáveis com CORS habilitado, então você pode carregá-los direto ou baixá-los para o seu projeto.',
    popular: 'Ícones Lottie populares',
    allIcons: (count: number) => `Todos os ${count} ícones`,
    filesTitle: 'Arquivos e URLs',
    filesIntroHtml: `Cada ícone tem uma página em ${code('/icons/&lt;id&gt;')} (em inglês) com prévia e downloads. Os arquivos em si:`,
    files: {
      json: 'animação Lottie JSON',
      zip: 'o JSON e os SVGs estáticos',
      svg: 'SVG estático de cada estado',
      catalog: 'catálogo de todos os ícones',
    },
    catalogHtml: (catalog: string, median: number) =>
      `O ${link(catalog, 'icons.json')} lista cada ícone com id, título, categoria, palavras-chave, interação, tamanho, duração e URLs dos arquivos, o que facilita escolher ícones por palavra-chave num script ou deixar um agente de código escolher. A mediana dos arquivos Lottie é de ${median} kB.`,
    players: {
      web: {
        title: 'Web: lottie-web',
        text: 'O player de referência, do Airbnb. Carregue-o de uma CDN, aponte para a URL de um ícone e escolha o renderer SVG, que mantém o ícone nítido e permite mudar a cor via CSS. Use o build completo (lottie.min.js): o build light ignora expressões.',
        cssLabel: 'Seguir a cor do texto (renderer SVG)',
      },
      'web-interactions': {
        title: 'Web: interações de hover e clique',
        text: 'O lottie-web toca e para, mas as interações ficam por sua conta. Este é o “alternar no clique” do ícone de menu, com suporte a movimento reduzido; todas as interações seguem o mesmo padrão, e o componente React mais abaixo faz tudo isso por você.',
      },
      dotlottie: {
        title: 'Web: web component dotLottie',
        text: 'O player da LottieFiles renderiza num canvas com um motor em WebAssembly e toca tanto Lottie JSON puro quanto arquivos .lottie. Um canvas mantém as cores do arquivo, então os ícones ficam pretos, a menos que você mude as cores no JSON.',
        jsLabel: 'Ou a API JavaScript: npm install @lottiefiles/dotlottie-web',
      },
      react: {
        title: 'React: react-useanimations',
        text: 'Nenhum player Lottie para instalar: o pacote tem o próprio player de 8 kB, executa a interação de cada ícone, segue a cor do texto e respeita o movimento reduzido. Cada ícone é um módulo separado, então só vão para produção os que você importa.',
      },
      'react-native': {
        title: 'React Native: lottie-react-native',
        text: 'Inclua o JSON no bundle com require() para uso offline ou carregue-o pela URL.',
      },
      ios: {
        title: 'iOS: lottie-ios (SwiftUI)',
        text: 'Adicione o pacote https://github.com/airbnb/lottie-spm.git com o Swift Package Manager e depois coloque o JSON no bundle do app ou carregue-o pela URL.',
      },
      android: {
        title: 'Android: lottie-android (Jetpack Compose)',
        text: 'Adicione com.airbnb.android:lottie-compose (ou com.airbnb.android:lottie para views). Coloque o JSON em res/raw para uso offline com LottieCompositionSpec.RawRes.',
      },
      flutter: {
        title: 'Flutter: lottie',
        text: 'O pacote lottie é um player escrito em Dart puro para Android, iOS, web e desktop.',
      },
    },
    expressionsTitle: 'Ícones com expressões',
    expressionsHtml: (count: number) =>
      `${icons(count)} ${count === 1 ? 'usa' : 'usam'} expressões do After Effects (${code('loopOut')} ou ${code('wiggle')}). Na web, toque-os com o build completo do lottie-web, não com o ${code('lottie_light')}. Os players nativos não avaliam expressões, então teste esses ícones no iOS, no Android e no Flutter ou escolha outro; o react-useanimations os toca como foram desenhados.`,
    faq: (f: {
      count: number;
      minSize: number;
      maxSize: number;
      medianSize: number;
      expressions: string[];
    }): Faq => [
      {
        question: 'Estes ícones Lottie são gratuitos para uso comercial?',
        answer: `Sim. Todos os ${f.count} ícones Lottie têm licença MIT: você pode usar, modificar e redistribuir em projetos pessoais e comerciais, sem exigência de atribuição e sem precisar de conta para baixar.`,
      },
      {
        question: 'Em que formato estão os arquivos Lottie?',
        answer: `Lottie JSON padrão (o formato Bodymovin), só com shape layers: sem imagens, fontes ou assets externos. Cada ícone é desenhado numa prancheta de 24 ou 32 px, escala para qualquer tamanho e pesa de ${f.minSize} kB a ${f.maxSize} kB, com mediana de ${f.medianSize} kB.`,
      },
      {
        question: 'Preciso do lottie-web para usar os ícones no React?',
        answer:
          'Não. O react-useanimations tem o próprio player de 8 kB, sem dependências, então você instala um único pacote e importa os ícones de que precisa. O lottie-web só é necessário fora do React, em páginas web comuns ou em outros frameworks.',
      },
      {
        question: 'Quais ícones precisam do build completo do lottie-web?',
        answer: `${icons(f.expressions.length)} ${f.expressions.length === 1 ? 'usa' : 'usam'} expressões do After Effects (loopOut ou wiggle): ${list(f.expressions)}. Na web, eles precisam do build completo do lottie-web; o lottie_light ignora expressões. Os players nativos (lottie-ios, lottie-android e o lottie do Flutter) também não avaliam expressões, então esses ícones podem se mover de outro jeito neles.`,
      },
      {
        question: 'Posso mudar a cor de um ícone Lottie?',
        answer:
          'Na web, o renderer SVG do lottie-web escreve as cores como atributos, então uma regra CSS nos paths muda a cor do ícone. Os players nativos usam suas APIs de propriedades dinâmicas: ColorValueProvider no iOS, LottieProperty.COLOR e STROKE_COLOR no Android e ValueDelegate.color no Flutter.',
      },
    ],
    byCategory: 'Ícones Lottie por categoria',
  },

  shadcn: {
    titles: (count: number) => [
      `Ícones animados para shadcn/ui: ${count} componentes`,
      'Ícones animados para shadcn/ui',
    ],
    descriptions: (count: number) => [
      `${count} ícones animados para shadcn/ui: adicione qualquer um com um comando da CLI. Microinterações de hover, clique e loop, licença MIT, sem lottie-web.`,
      `${count} ícones animados para shadcn/ui, adicionados com um único comando da CLI. Hover, clique e loop, licença MIT, sem lottie-web.`,
    ],
    title: 'Ícones animados para shadcn/ui',
    crumb: 'shadcn/ui',
    popularList: 'Ícones animados populares para shadcn/ui',
    badge: (count: number) =>
      `${plural(count, { one: 'componente', other: 'componentes' })} · registry do shadcn · licença MIT`,
    intro:
      'Todos os ícones do useAnimations estão num registry do shadcn. Um comando da CLI adiciona ao seu projeto um componente React tipado, com a interação de hover, clique ou loop para a qual o ícone foi desenhado, suporte a movimento reduzido e cores que seguem o seu tema. O código fica no seu repositório, como qualquer outro componente do shadcn/ui.',
    addTitle: 'Adicionar um ícone',
    addIntro: 'Rode a CLI do shadcn com a URL do ícone no registry:',
    namingHtml: `O componente se chama ${code('Animated')} + o id do ícone em PascalCase (${code('check-box')} → ${code('AnimatedCheckBox')}) e vai para ${code('components/animations/&lt;id&gt;.tsx')}. A CLI também adiciona o wrapper compartilhado ${code('components/use-animation.tsx')} e instala o ${code('react-useanimations')}, que traz o próprio player: nada de lottie-web.`,
    namespaceTitle: 'Nomes curtos com um namespace de registry',
    namespaceHtml: `Adicione o registry ao ${code('components.json')} uma vez e depois adicione ícones pelo nome, vários de uma vez:`,
    registryHtml: (registry: string) =>
      `O índice do registry em ${link(registry, '/r/registry.json')} lista cada item com título, categoria e interação.`,
    usageTitle: 'Use num Button do shadcn',
    usageHtml: `Os componentes recebem as mesmas props que o ${code('UseAnimations')}. Para um toggle como o ícone de menu, passe ${code('active')} e mantenha o estado no botão; o ícone anima sempre que ele muda:`,
    colorHtml: (docs: string) =>
      `Os ícones seguem a cor do texto, então ${code('text-primary')} ou ${code('text-muted-foreground')} mudam a cor deles, e o modo escuro não precisa de nada extra. Mais props e padrões estão na ${link(docs, 'documentação')}.`,
    codeText: { closeMenu: 'Fechar menu', openMenu: 'Abrir menu' },
    popular: 'Ícones populares para shadcn/ui',
    allIcons: (count: number) => `Todos os ${count} ícones`,
    popularNote: 'A página de cada ícone (em inglês) mostra o comando do shadcn.',
    faq: (f: { count: number; version: string }): Faq => [
      {
        question: 'Os ícones animados para shadcn/ui são gratuitos?',
        answer: `Sim. Todos os ${f.count} ícones e o código dos componentes têm licença MIT, para projetos pessoais e comerciais. O registry não exige conta nem chave de API.`,
      },
      {
        question: 'O que a CLI do shadcn adiciona ao meu projeto?',
        answer: `O componente do ícone em components/animations/<id>.tsx, o wrapper compartilhado do player UseAnimation em components/use-animation.tsx (uma única vez, como dependência do registry) e o react-useanimations@^${f.version} do npm. O lottie-web não é necessário: o pacote tem o próprio player de 8 kB.`,
      },
      {
        question: 'Os componentes funcionam com server components do Next.js?',
        answer:
          'Sim. Os componentes são marcados com "use client" e desenham a animação só no navegador, então você pode renderizá-los a partir de server components e páginas sem imports dinâmicos nem ssr: false.',
      },
      {
        question: 'Posso mudar a aparência e o movimento dos ícones?',
        answer:
          'O código é seu e fica no seu repositório. Os componentes recebem as props do UseAnimations: size, strokeColor, fillColor, interaction, active, autoplay, loop e speed. Os ícones seguem a cor do texto, então classes do Tailwind como text-primary ou text-muted-foreground mudam a cor deles.',
      },
    ],
    byCategory: 'Navegue por categoria',
  },
};
