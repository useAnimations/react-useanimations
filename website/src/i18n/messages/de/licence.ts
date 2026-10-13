import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'Lizenz & Nutzungsbedingungen — useAnimations',
  description:
    'useAnimations-Icons und react-useanimations stehen unter der MIT-Lizenz: kostenlos nutzbar und weitergebbar, privat wie kommerziell, ohne Namensnennung.',
  name: 'Lizenz & Nutzungsbedingungen',
  heading: 'Frei nutzbar. MIT-lizenziert.',
  introHtml: (mitHref: string) =>
    `Die useAnimations-Icons und das Paket <code>react-useanimations</code> werden unter der <a href="${mitHref}">MIT-Lizenz</a> veröffentlicht.`,
  canDo: 'Was Sie dürfen',
  canDoItemsHtml: [
    '<strong>Nutzen:</strong> die Icons in privaten und kommerziellen Websites, Apps und Produkten einsetzen.',
    '<strong>Verändern:</strong> Farben, Größen, Timing oder die Bewegung selbst anpassen.',
    '<strong>Weitergeben:</strong> auch als Teil von Icon-Paketen, Templates, Themes, UI-Kits und Komponenten-Registries.',
  ],
  attribution: 'Namensnennung',
  attributionText:
    'Nicht erforderlich, aber willkommen. Wenn Sie die Dateien selbst weitergeben, behalten Sie den Lizenzhinweis bei. Und falls Sie uns nennen möchten:',
  credit: (link: string) => `Animierte Icons von ${link}`,
  noWarranty: 'Keine Gewährleistung',
  noWarrantyText:
    'Die Icons und der Code werden ohne Mängelgewähr und ohne jegliche Gewährleistung bereitgestellt.',
  licenseText: 'Lizenztext',
  bindingNote:
    'Der folgende Lizenztext ist die englische Originalfassung; nur sie ist rechtlich verbindlich.',
};
