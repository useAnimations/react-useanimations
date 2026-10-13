import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'Licença e termos — useAnimations',
  description:
    'Os ícones do useAnimations e o pacote react-useanimations têm licença MIT: uso e redistribuição livres em projetos pessoais e comerciais, sem atribuição.',
  name: 'Licença e termos',
  heading: 'Livre para usar. Licença MIT.',
  introHtml: (mitHref: string) =>
    `Os ícones do useAnimations e o pacote <code>react-useanimations</code> são distribuídos sob a <a href="${mitHref}">licença MIT</a>.`,
  canDo: 'O que você pode fazer',
  canDoItemsHtml: [
    '<strong>Usar</strong> os ícones em sites, apps e produtos pessoais e comerciais.',
    '<strong>Modificar</strong> os ícones: mudar cores, tamanhos, tempo ou o próprio movimento.',
    '<strong>Redistribuir</strong> os ícones, inclusive dentro de pacotes de ícones, templates, temas, UI kits e registries de componentes.',
  ],
  attribution: 'Atribuição',
  attributionText:
    'Não é obrigatória, mas é bem-vinda. Mantenha o aviso de licença ao redistribuir os próprios arquivos e, se quiser nos dar o crédito:',
  credit: (link: string) => `Ícones animados por ${link}`,
  noWarranty: 'Sem garantia',
  noWarrantyText:
    'Os ícones e o código são fornecidos no estado em que se encontram, sem garantia de qualquer tipo.',
  licenseText: 'Texto da licença',
  bindingNote:
    'O texto da licença abaixo é a versão original em inglês, que é a juridicamente vinculante.',
};
