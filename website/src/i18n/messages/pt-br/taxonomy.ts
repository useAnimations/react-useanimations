import type { Interaction } from 'react-useanimations';
import type { Messages } from '../en';

/** How icons play, by number: "<n> ícone fica em loop" / "<n> ícones ficam em loop". */
export const PLAYS: Record<Interaction, { one: string; other: string }> = {
  loop: { one: 'fica em loop contínuo', other: 'ficam em loop contínuo' },
  'click-toggle': {
    one: 'alterna entre dois estados no clique',
    other: 'alternam entre dois estados no clique',
  },
  'click-replay': { one: 'toca de novo a cada clique', other: 'tocam de novo a cada clique' },
  hover: {
    one: 'toca no hover e volta ao contrário quando o mouse sai',
    other: 'tocam no hover e voltam ao contrário quando o mouse sai',
  },
  'hover-replay': { one: 'toca uma vez no hover', other: 'tocam uma vez no hover' },
  'hover-loop': { one: 'fica em loop durante o hover', other: 'ficam em loop durante o hover' },
};

export const taxonomy: Messages['taxonomy'] = {
  categories: {
    Alerts: {
      name: 'Alertas',
      title: 'Ícones animados de alerta',
      intro:
        'Triângulos de aviso, círculos de alerta e placas de pare que pulsam só o bastante para chamar a atenção, sem piscar. Use-os ao lado de um campo de formulário com erro, no início de um banner de erro ou numa coluna de status, onde um ícone estático passa despercebido na rolagem.',
      useCases: [
        'Erros de validação logo abaixo dos campos de formulário',
        'Banners de erro e de aviso no topo da página',
        'Linhas com falha numa tabela de status de deploys ou jobs',
        'Diálogos de confirmação de ações destrutivas',
        'Páginas de status do sistema durante um incidente',
      ],
    },
    Notifications: {
      name: 'Notificações',
      title: 'Ícones animados de sino de notificação',
      intro:
        'Sinos que tocam quando há novidades ou que alternam entre sino e sino silenciado. Um balanço curto do sino leva o olhar até o contador de não lidas, e as versões que alternam servem também como controle para silenciar um canal ou uma conversa.',
      useCases: [
        'Botão da central de notificações no cabeçalho do app',
        'Badge de não lidas que toca quando chega uma nova mensagem',
        'Botão para silenciar e reativar um canal ou uma conversa',
        'Configurações de notificações por e-mail e push',
        'Botões de inscrição em lembretes e alertas',
      ],
    },
    Navigation: {
      name: 'Navegação',
      title: 'Ícones animados de navegação e setas',
      intro:
        'Menus hambúrguer que se transformam em botão de fechar, além de setas, chevrons e setas de canto que se deslocam na própria direção no hover. Eles deixam claro para onde um controle leva: abrir a gaveta, voltar, expandir a linha, sair do site.',
      useCases: [
        'Menu hambúrguer que vira botão de fechar no mobile',
        'Botões de anterior e próximo em carrosséis e paginação',
        'Chevrons de accordions e dropdowns',
        'Indicações de voltar ao topo e de rolar para baixo',
        'Links de entrar e sair',
        'Marcadores de link externo e botões de abrir a sidebar',
      ],
    },
    Action: {
      name: 'Ações',
      title: 'Ícones animados de ação',
      intro:
        'Os verbos da interface: salvar, excluir, baixar, atualizar, curtir, favoritar, buscar e configurar. Cada um confirma o clique ou o hover a que pertence: o coração se preenche quando você curte um post, e a tampa da lixeira se levanta antes de você excluir.',
      useCases: [
        'Botões de curtir, favoritar e salvar em cards',
        'Botões de baixar, enviar e salvar que confirmam a ação',
        'Botão de mostrar e ocultar senha num formulário de login',
        'Botões de atualizar e sincronizar em dashboards',
        'Botões de excluir em tabelas e listas de arquivos',
        'Campo de busca que vira botão de limpar',
      ],
    },
    Content: {
      name: 'Conteúdo',
      title: 'Ícones animados de arquivos, pastas e usuários',
      intro:
        'Arquivos, pastas, livros, e-mail, anexos e pessoas. Eles identificam aquilo com que o usuário trabalha, e as variantes de adicionar, remover e confirmar fazem o gerenciamento de listas e equipes parecer mais responsivo.',
      useCases: [
        'Gerenciadores de arquivos e listas de documentos',
        'Botões de anexar e de copiar para a área de transferência',
        'Caixa de entrada e arquivo em clientes de e-mail',
        'Listas de membros da equipe com ações de adicionar e remover usuários',
        'Menus de compartilhamento de documentos e links',
      ],
    },
    Form: {
      name: 'Formulários',
      title: 'Ícones animados de controles de formulário',
      intro:
        'Um checkbox, um radio button e um switch que animam entre os estados marcado e desmarcado. Use-os onde um input comum parece sem graça, como checklists de onboarding e telas de configurações, sem perder a leitura do estado num relance.',
      useCases: [
        'Switches de recursos e preferências nas configurações',
        'Checklists de onboarding e listas de tarefas',
        'Opções de escolha única em pesquisas e seletores de plano',
        'Checkboxes de termos e consentimento',
      ],
    },
    Media: {
      name: 'Mídia',
      title: 'Ícones animados de player de mídia',
      intro:
        'Play e pause, volume, microfone, câmera, pular e aleatório para players de áudio e vídeo. Os ícones que alternam trocam entre seus dois estados, de play para pause ou de microfone ligado para mudo, então o botão sempre mostra o que o clique vai fazer.',
      useCases: [
        'Botões de play e pause em players de áudio e vídeo',
        'Controles de mudo em chamadas de vídeo',
        'Botões de ligar e desligar a câmera em apps de reunião',
        'Controles de playlist para pular, repetir e ordem aleatória',
        'Botões de transmissão e AirPlay',
        'Controles de apps de podcast e música',
      ],
    },
    'Text editing': {
      name: 'Edição de texto',
      title: 'Ícones animados de edição de texto',
      intro:
        'Negrito, itálico, sublinhado, alinhamento e listas para barras de ferramentas de rich text. Uma animação rápida no clique confirma que a formatação foi aplicada, o que ajuda em editores em que a mudança no próprio texto é sutil.',
      useCases: [
        'Barras de ferramentas de editores de rich text',
        'Caixas de escrita de comentários e mensagens',
        'Editores de CMS e de posts de blog',
        'Apps de Markdown e de anotações',
        'Controles de alinhamento de texto em ferramentas de design',
      ],
    },
    Communication: {
      name: 'Comunicação',
      title: 'Ícones animados de comunicação',
      intro:
        'Telefones, balões de chat, botões de enviar, correio de voz e RSS. Os ícones de chamada cobrem os estados de que um histórico de ligações precisa (recebida, efetuada, perdida e encaminhada), e o ícone de enviar dá à mensagem uma pequena despedida no clique.',
      useCases: [
        'Botão de enviar em formulários de chat e comentários',
        'Histórico de chamadas recebidas, efetuadas e perdidas',
        'Botões de contato e suporte',
        'Botões que abrem o widget de chat',
        'Campos de menção e de endereço de e-mail',
      ],
    },
    Devices: {
      name: 'Dispositivos',
      title: 'Ícones animados de dispositivos',
      intro:
        'Celulares, tablets, monitores, relógios e impressoras, além dos indicadores de conexão ao redor deles: wifi, Bluetooth e bateria. Servem para seletores de dispositivo, alternadores de preview responsivo e status de conectividade.',
      useCases: [
        'Alternadores de preview responsivo entre mobile, tablet e desktop',
        'Status da conexão wifi e Bluetooth',
        'Indicadores de bateria e carregamento',
        'Listas de dispositivos nas configurações de segurança da conta',
        'Botões de imprimir em faturas e relatórios',
      ],
    },
    Weather: {
      name: 'Clima',
      title: 'Ícones animados de clima',
      intro:
        'Sol, lua, nuvens, chuva, neve, raios e vento para previsões do tempo e tudo o que acompanha a hora do dia. O sol e a lua também formam um seletor natural entre modo claro e modo escuro.',
      useCases: [
        'Widgets de clima e cards de previsão do tempo',
        'Seletores de tema claro e escuro',
        'Horários de nascer e pôr do sol em apps de viagem',
        'Leituras de temperatura em dashboards de casa inteligente',
        'Indicadores de energia e status de alimentação',
      ],
    },
    'Maps & location': {
      name: 'Mapas e localização',
      title: 'Ícones animados de mapa e localização',
      intro:
        'Pins de mapa, setas de navegação, globos, alvos e âncoras. Um pin que cai no hover destaca um localizador de lojas ou um endereço de entrega, e o globo funciona como seletor de idioma ou região.',
      useCases: [
        'Localizadores de lojas e campos de endereço',
        'Botões de localização atual e de rotas',
        'Seletores de idioma e região',
        'Entrega e rastreamento de pedidos',
        'Apps de viagem e reservas',
      ],
    },
    Commerce: {
      name: 'E-commerce',
      title: 'Ícones animados de e-commerce',
      intro:
        'Carrinhos, sacolas, etiquetas de preço, presentes, cartões de crédito e caminhões de entrega para lojas virtuais. Uma animação de adicionar ao carrinho confirma o clique sem precisar de toast, e os ícones de caminhão e de pacote dão um pouco de vida ao status do pedido.',
      useCases: [
        'Botões de adicionar ao carrinho nos cards de produto',
        'Botões de carrinho e sacola no cabeçalho da loja',
        'Checkout e escolha da forma de pagamento',
        'Selos de desconto, cupom e promoção',
        'Etapas de envio e rastreamento do pedido',
        'Vale-presente e opções de embrulho para presente',
      ],
    },
    Charts: {
      name: 'Gráficos',
      title: 'Ícones animados de gráficos',
      intro:
        'Gráficos de barras, um gráfico de pizza e setas de tendência para analytics e relatórios. Os ícones de tendência de alta e de baixa mostram num relance se uma métrica subiu ou caiu, o que combina com cards de KPI e históricos de números.',
      useCases: [
        'Cards de KPI com métricas em alta ou em queda',
        'Itens de navegação de analytics e relatórios',
        'Estados vazios de dashboards',
        'Resumos financeiros e de portfólio',
      ],
    },
    Development: {
      name: 'Desenvolvimento',
      title: 'Ícones animados para desenvolvedores',
      intro:
        'Chaves de código, terminal, branches do Git, commits, merges e pull requests, além de servidores e bancos de dados. Feitos para ferramentas de desenvolvimento, sites de documentação e páginas de status em que termos de Git e de infraestrutura fazem parte da interface.',
      useCases: [
        'Status de pull requests, merges e branches em ferramentas de desenvolvimento',
        'Botões de snippet de código e de embed na documentação',
        'Seções de terminal e CLI em landing pages',
        'Saúde de servidores e bancos de dados em páginas de status',
        'Dicas de atalhos de teclado com a tecla Command',
      ],
    },
    'Design & layout': {
      name: 'Design e layout',
      title: 'Ícones animados de design e layout',
      intro:
        'Grades, colunas, camadas, recorte, caneta e cursor para editores e builders. Eles cabem em barras de ferramentas em que o usuário organiza conteúdo, alterna entre visualização em grade e em tabela ou escolhe uma ferramenta de desenho.',
      useCases: [
        'Alternadores de visualização em grade, lista e tabela',
        'Painéis de camadas em ferramentas de design e de slides',
        'Ferramentas de recortar e cortar em editores de imagem',
        'Page builders e seletores de layout',
        'Alças para arrastar e mover',
      ],
    },
    'Shapes & math': {
      name: 'Formas e matemática',
      title: 'Ícones animados de formas e matemática',
      intro:
        'Círculos, quadrados, triângulos, hexágonos, um octógono e sinais de divisão. Use-os como ferramentas de forma em apps de desenho, como operadores de calculadora ou como marcadores neutros em diagramas e etapas de onboarding.',
      useCases: [
        'Ferramentas de forma em apps de whiteboard e desenho',
        'Operadores de calculadoras e editores de fórmulas',
        'Marcadores de tópicos e etapas em diagramas',
        'Interfaces de quizzes e jogos',
      ],
    },
    Loading: {
      name: 'Carregamento',
      title: 'Ícones animados de carregamento',
      intro:
        'Spinners e loaders que ficam em loop enquanto algo está em andamento. Coloque um dentro do botão de enviar enquanto a requisição roda, no lugar de um conteúdo que ainda está carregando ou numa splash screen; eles ficam parados quando o usuário prefere movimento reduzido.',
      useCases: [
        'Botões de enviar aguardando uma requisição',
        'Placeholders enquanto uma lista ou um gráfico carrega',
        'Indicadores de scroll infinito e de carregar mais',
        'Splash screens e transições de rota',
        'Progresso de upload e processamento de arquivos',
      ],
    },
    'Social media': {
      name: 'Redes sociais',
      title: 'Ícones animados de redes sociais',
      intro:
        'Ícones de marca de redes sociais e das ferramentas em que desenvolvedores e designers compartilham trabalho: X, Instagram, YouTube, Discord, Telegram, Figma e outras. Eles animam no hover, o que deixa os links do rodapé e do perfil com mais cara de clicáveis.',
      useCases: [
        'Links de redes sociais no rodapé do site',
        'Botões de compartilhar em posts de blog',
        'Links de perfil de autores e da equipe',
        'Botões de convite para servidores de comunidade',
        'Login com conta de rede social ou de desenvolvedor',
      ],
    },
    Other: {
      name: 'Outros',
      title: 'Mais ícones animados',
      intro:
        'Ícones que não pertencem a um grupo maior: carinhas de emoji para feedback, uma xícara de café, um relógio, uma linha de pulso e uma indicação de rolar para baixo. O ícone de rolar para baixo é uma dica comum na seção hero de que há mais conteúdo abaixo.',
      useCases: [
        'Dicas de rolar para baixo no fim da seção hero',
        'Carinhas feliz, neutra e triste em widgets de feedback',
        'Indicadores de atividade e uptime',
        'Horário de funcionamento e seletores de hora',
        'Links de “buy me a coffee” e de apoio',
      ],
    },
  },
  interactions: {
    loop: {
      label: 'Loop',
      title: 'Ícones animados em loop',
      intro:
        'Estes ícones tocam sem parar enquanto estão na tela, por isso combinam com estados que duram: algo carregando, um aviso ativo, um terminal esperando. Quando o usuário prefere movimento reduzido, eles param no primeiro frame e continuam funcionando como um ícone comum.',
      useCases: [
        'Spinners de carregamento e indicadores de progresso',
        'Estados ativos de aviso e de erro',
        'Indicadores de ao vivo e de gravação',
        'Indicações de rolar para baixo em seções hero',
        'Marcadores que chamam a atenção para novas notificações',
      ],
      example:
        'Ícones em loop costumam aparecer em spinners de carregamento, alertas ativos, um sino tocando ou uma dica de rolar para baixo.',
      description:
        'Toca continuamente; fica no primeiro frame estático quando o usuário prefere movimento reduzido.',
      reducedMotion:
        'Com movimento reduzido, o ícone não inicia sozinho e fica no primeiro frame, estático.',
      plays: PLAYS.loop.other,
    },
    'click-toggle': {
      label: 'Alternar no clique',
      title: 'Ícones animados que alternam no clique',
      intro:
        'Cada clique anima a passagem entre dois estados, e o ícone permanece no novo estado. Isso faz desses ícones a parte visual de um controle liga/desliga. O ícone sempre mostra o estado atual; combine-o com aria-pressed ou com um atributo checked e o botão se explica sozinho.',
      useCases: [
        'Botões de mudo',
        'Campos de senha com mostrar e ocultar',
        'Botões de menu hambúrguer e de fechar',
        'Controles de play e pause',
        'Botões de curtir, dar estrela e salvar',
        'Checkboxes, radio buttons e switches',
      ],
      example:
        'Ícones que alternam no clique costumam controlar botões de mudo, mostrar/ocultar senha, menu/fechar, play/pause e curtir.',
      description:
        'Alterna entre dois estados no clique, ou troca na hora quando o usuário prefere movimento reduzido.',
      reducedMotion:
        'Com movimento reduzido, o clique troca para o outro estado na hora, sem a animação de transição.',
      plays: PLAYS['click-toggle'].other,
    },
    'click-replay': {
      label: 'Reproduzir no clique',
      title: 'Ícones animados no clique',
      intro:
        'Estes ícones tocam uma vez, desde o início, a cada clique: uma pequena confirmação de que a ação deu certo. Combinam com ações pontuais que não deixam um estado para trás: enviar, salvar, atualizar, baixar, imprimir ou excluir.',
      useCases: [
        'Botões de enviar em formulários de chat e comentários',
        'Botões de salvar, baixar e enviar arquivos',
        'Botões de atualizar e girar',
        'Botões de adicionar ao carrinho',
        'Botões de formatação de texto em editores',
      ],
      example:
        'Ícones de clique costumam confirmar botões de enviar, salvar, atualizar, baixar, adicionar ao carrinho e formatar.',
      description:
        'Toca de novo desde o início a cada clique, a menos que o usuário prefira movimento reduzido.',
      reducedMotion:
        'Com movimento reduzido, os cliques continuam chegando ao seu handler, mas a animação não toca.',
      plays: PLAYS['click-replay'].other,
    },
    hover: {
      label: 'Hover',
      title: 'Ícones animados no hover',
      intro:
        'Estes ícones tocam para a frente quando o ponteiro entra e voltam ao contrário quando ele sai, então o movimento acompanha o cursor e nunca termina pela metade. Combinam com itens de navegação e botões que antecipam o que abrem: a tampa da lixeira se levanta, a engrenagem de configurações gira, a pasta se abre.',
      useCases: [
        'Itens da sidebar e do menu de navegação',
        'Botões de excluir que levantam a tampa antes do clique',
        'Links de configurações e de perfil',
        'Controles de aumentar e diminuir zoom',
        'Links de redes sociais no rodapé',
      ],
      example:
        'Ícones de hover costumam marcar itens de navegação, botões de excluir, configurações, controles de zoom e links de redes sociais.',
      description: 'Toca para a frente no mouseenter e ao contrário no mouseleave.',
      reducedMotion: 'Com movimento reduzido, o hover não toca a animação.',
      plays: PLAYS.hover.other,
    },
    'hover-replay': {
      label: 'Reproduzir no hover',
      title: 'Ícones animados que tocam no hover',
      intro:
        'Estes ícones tocam uma vez quando o ponteiro entra e terminam sozinhos, o que evita que passadas rápidas por uma barra de ferramentas virem um movimento nervoso. A maior parte do conjunto funciona assim: setas, arquivos, dispositivos, clima e ícones de marcas que ganham vida no hover.',
      useCases: [
        'Listas de recursos e tabelas de preços',
        'Links com seta e botões de call to action',
        'Botões de barras de ferramentas em editores e dashboards',
        'Cards numa grade de landing page',
        'Links de rodapé e de contato',
      ],
      example:
        'Ícones que tocam no hover costumam dar vida a links com seta, listas de recursos, botões de barras de ferramentas e cards de landing page.',
      description:
        'Toca uma vez no mouseenter, a menos que o usuário prefira movimento reduzido. Sair não interrompe a animação, e entrar durante a reprodução não a reinicia.',
      reducedMotion: 'Com movimento reduzido, o hover não toca a animação.',
      plays: PLAYS['hover-replay'].other,
    },
    'hover-loop': {
      label: 'Loop no hover',
      title: 'Ícones animados em loop no hover',
      intro:
        'Estes ícones ficam em loop enquanto o ponteiro está sobre eles e terminam o ciclo atual depois que ele sai, então nunca param no meio do movimento. Funcionam bem em links que convidam a olhar com mais calma, principalmente ícones de redes sociais e de comunidades.',
      useCases: [
        'Links de redes sociais no cabeçalho e no rodapé',
        'Botões de convite para comunidades e chats',
        'Links de portfólio e de perfil',
        'Seletores de idioma e região',
      ],
      example:
        'Ícones em loop no hover costumam marcar links de redes sociais, convites para comunidades, links de portfólio e seletores de idioma.',
      description:
        'Fica em loop durante o hover, termina o ciclo atual depois do mouseleave e fica estático quando o usuário prefere movimento reduzido.',
      reducedMotion: 'Com movimento reduzido, o ícone fica estático durante o hover.',
      plays: PLAYS['hover-loop'].other,
    },
  },
};
