// The licence page (/licencing-and-terms). The LICENSE text itself is shown in English on every page.
export const licence = {
  title: 'Licencing & Terms — useAnimations',
  description:
    'useAnimations icons and the react-useanimations package are MIT licensed: free for personal and commercial use and redistribution, no attribution needed.',
  /** Small label above the heading, the breadcrumb and the JSON-LD page name. */
  name: 'Licencing & Terms',
  heading: 'Free to use. MIT licensed.',
  introHtml: (mitHref: string) =>
    `The useAnimations icons and the <code>react-useanimations</code> package are released under the <a href="${mitHref}">MIT license</a>.`,
  canDo: 'What you can do',
  canDoItemsHtml: [
    '<strong>Use</strong> the icons in personal and commercial websites, apps and products.',
    '<strong>Modify</strong> them: change colors, sizes, timing or the motion itself.',
    '<strong>Redistribute</strong> them, including inside icon packs, templates, themes, UI kits and component registries.',
  ],
  attribution: 'Attribution',
  attributionText:
    "Not required, but appreciated. Keep the license notice when you redistribute the files themselves, and if you'd like to credit us:",
  /** The credit line people paste into their site; `link` is the HTML link to useAnimations. */
  credit: (link: string) => `Animated icons by ${link}`,
  noWarranty: 'No warranty',
  noWarrantyText: 'The icons and the code are provided as-is, without warranty of any kind.',
  licenseText: 'License text',
  /** Shown above the LICENSE text on translated pages only. */
  bindingNote:
    'The license text below is the original English version, which is the legally binding one.',
};
