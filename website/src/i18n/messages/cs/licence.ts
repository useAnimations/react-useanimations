import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'Licence a podmínky — useAnimations',
  description:
    'Ikony useAnimations i balíček react-useanimations jsou pod licencí MIT: zdarma pro osobní i komerční použití a další šíření, bez nutnosti uvádět autora.',
  name: 'Licence a podmínky',
  heading: 'Volně k použití. Pod licencí MIT.',
  introHtml: (mitHref: string) =>
    `Ikony useAnimations a balíček <code>react-useanimations</code> jsou vydané pod <a href="${mitHref}">licencí MIT</a>.`,
  canDo: 'Co můžete',
  canDoItemsHtml: [
    '<strong>Používat</strong> ikony na osobních i komerčních webech, v aplikacích a produktech.',
    '<strong>Upravovat</strong> je: měnit barvy, velikosti, časování i samotný pohyb.',
    '<strong>Dále je šířit</strong>, a to i v rámci sad ikon, šablon, motivů, UI kitů a registrů komponent.',
  ],
  attribution: 'Uvedení autora',
  attributionText:
    'Není povinné, ale potěší nás. Když šíříte samotné soubory, ponechte u nich licenční doložku, a pokud nás chcete uvést:',
  credit: (link: string) => `Animované ikony od ${link}`,
  noWarranty: 'Bez záruky',
  noWarrantyText: 'Ikony i kód se poskytují tak, jak jsou, bez jakékoli záruky.',
  licenseText: 'Text licence',
  bindingNote: 'Níže je původní anglické znění licence, které je právně závazné.',
};
