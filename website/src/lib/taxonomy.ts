// Categories and interactions as browsable collections: slugs, titles and hand-written copy for
// their pages, plus lookups. The copy is specific on purpose; these pages must not read as filler.
import type { Interaction } from 'react-useanimations';
import { CATEGORIES, type Icon, icons, INTERACTIONS } from './icons';

export type CollectionMeta = {
  /** URL segment, e.g. 'maps-location'. */
  slug: string;
  /** Page heading and <title> stem, e.g. 'Animated loading icons'. */
  title: string;
  /** Two or three sentences on what the icons are for in real interfaces. */
  intro: string;
  /** Concrete UI places to use them, sentence case, no trailing period. */
  useCases: string[];
};

export type CategoryMeta = CollectionMeta & {
  /** Category name as in catalog.json, e.g. 'Maps & location'. */
  name: string;
  /** False for 'Other' and categories with fewer than 3 icons: no page in the sitemap. */
  indexable: boolean;
};

export type InteractionMeta = CollectionMeta & {
  interaction: Interaction;
  /** One standalone sentence of typical uses, e.g. mute/unmute, show/hide password, menu/close. */
  example: string;
};

/** 'Maps & location' -> 'maps-location', 'Text editing' -> 'text-editing'. */
export const categorySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Interactions are already URL-safe ('click-toggle'), so the slug is the key itself. */
export const interactionSlug = (interaction: Interaction) => interaction;

export type Copy = Pick<CollectionMeta, 'title' | 'intro' | 'useCases'>;

export const CATEGORY_COPY: Record<string, Copy> = {
  Alerts: {
    title: 'Animated alert icons',
    intro:
      'Warning triangles, alert circles and stop signs that pulse just enough to be noticed without flashing. Put them next to a failed form field, at the start of an error banner or in a status column, where a still icon is easy to scroll past.',
    useCases: [
      'Inline validation errors under form fields',
      'Error and warning banners at the top of a page',
      'Failed rows in a deploy or job status table',
      'Destructive-action confirmation dialogs',
      'System status pages during an incident',
    ],
  },
  Notifications: {
    title: 'Animated notification bell icons',
    intro:
      'Bell icons that ring for new activity or switch between bell and bell-off. A short swing on the bell draws the eye to an unread count, and the toggling versions double as the mute control for a channel or thread.',
    useCases: [
      'Notification centre button in an app header',
      'Unread badge that rings when a new message arrives',
      'Mute and unmute switch for a channel or thread',
      'Email and push notification settings',
      'Reminder and alert subscription buttons',
    ],
  },
  Navigation: {
    title: 'Animated navigation and arrow icons',
    intro:
      'Hamburger menus that morph into a close button, arrows, chevrons and corner arrows that nudge in their direction on hover. They make it obvious which way a control leads: open the drawer, go back, expand the row, leave the site.',
    useCases: [
      'Hamburger menu that turns into a close button on mobile',
      'Previous and next buttons in carousels and pagination',
      'Accordion and dropdown chevrons',
      'Back-to-top and scroll-down cues',
      'Sign-in and sign-out links',
      'External link markers and sidebar toggles',
    ],
  },
  Action: {
    title: 'Animated action icons',
    intro:
      'The verbs of an interface: save, delete, download, refresh, like, bookmark, search and settings. Each one confirms the click or hover it belongs to, so a heart fills when you like a post and a trash can lid lifts before you delete.',
    useCases: [
      'Like, favourite and bookmark buttons on cards',
      'Download, upload and save buttons that confirm the action',
      'Show and hide password toggle in a login form',
      'Refresh and sync buttons in dashboards',
      'Delete buttons in tables and file lists',
      'Search field that turns into a clear button',
    ],
  },
  Content: {
    title: 'Animated file, folder and user icons',
    intro:
      'Files, folders, books, mail, attachments and people. They label the things a user works with, and the add, remove and check variants make list and team management feel responsive.',
    useCases: [
      'File managers and document lists',
      'Attachment and copy-to-clipboard buttons',
      'Inbox and archive views in mail clients',
      'Team member lists with add and remove user actions',
      'Share menus for documents and links',
    ],
  },
  Form: {
    title: 'Animated form control icons',
    intro:
      'A checkbox, a radio button and a toggle switch that animate between their checked and unchecked states. Use them where a plain input feels flat, such as onboarding checklists and settings screens, while keeping the state readable at a glance.',
    useCases: [
      'Settings switches for features and preferences',
      'Onboarding and to-do checklists',
      'Single-choice options in surveys and plan pickers',
      'Terms and consent checkboxes',
    ],
  },
  Media: {
    title: 'Animated media player icons',
    intro:
      'Play and pause, volume, microphone, camera, skip and shuffle for audio and video players. The toggling icons switch between their two states, play to pause or mic to muted, so the button always shows what a click will do.',
    useCases: [
      'Play and pause buttons in audio and video players',
      'Mute and unmute controls in video calls',
      'Camera on and off toggles in meeting apps',
      'Playlist controls for skip, repeat and shuffle',
      'Casting and AirPlay buttons',
      'Podcast and music app controls',
    ],
  },
  'Text editing': {
    title: 'Animated text editing icons',
    intro:
      'Bold, italic, underline, alignment and list icons for rich text toolbars. A quick click animation confirms the formatting was applied, which helps in editors where the change to the text itself is subtle.',
    useCases: [
      'Rich text editor toolbars',
      'Comment and message composers',
      'CMS and blog post editors',
      'Markdown and note-taking apps',
      'Text alignment controls in design tools',
    ],
  },
  Communication: {
    title: 'Animated communication icons',
    intro:
      'Phones, chat bubbles, send buttons, voicemail and RSS. The call icons cover the incoming, outgoing, missed and forwarded states a call log needs, and the send icon gives a message a small send-off on click.',
    useCases: [
      'Send button in chat and comment forms',
      'Call logs with incoming, outgoing and missed calls',
      'Contact and support buttons',
      'Chat widget launchers',
      'Mention and email address fields',
    ],
  },
  Devices: {
    title: 'Animated device icons',
    intro:
      'Phones, tablets, monitors, watches and printers, plus the connection indicators around them: wifi, Bluetooth and battery. They work for device pickers, responsive preview switchers and connectivity status.',
    useCases: [
      'Responsive preview switchers for mobile, tablet and desktop',
      'Wifi and Bluetooth connection status',
      'Battery and charging indicators',
      'Device lists in account security settings',
      'Print buttons on invoices and reports',
    ],
  },
  Weather: {
    title: 'Animated weather icons',
    intro:
      'Sun, moon, clouds, rain, snow, lightning and wind for forecasts and anything that follows the time of day. The sun and moon also make a natural light and dark mode switch.',
    useCases: [
      'Weather widgets and forecast cards',
      'Light and dark theme switches',
      'Sunrise and sunset times in travel apps',
      'Temperature readings on smart home dashboards',
      'Energy and power status indicators',
    ],
  },
  'Maps & location': {
    title: 'Animated map and location icons',
    intro:
      'Map pins, navigation arrows, globes, targets and anchors. A pin that drops on hover helps a store locator or delivery address stand out, and the globe works as a language or region switcher.',
    useCases: [
      'Store locators and address fields',
      'Current location and directions buttons',
      'Language and region selectors',
      'Delivery and order tracking',
      'Travel and booking apps',
    ],
  },
  Commerce: {
    title: 'Animated e-commerce icons',
    intro:
      'Shopping carts, bags, price tags, gifts, credit cards and delivery trucks for online stores. An add-to-cart animation confirms the click without a toast, and the truck and package icons give order status a little life.',
    useCases: [
      'Add-to-cart buttons on product cards',
      'Cart and bag buttons in a store header',
      'Checkout and payment method selection',
      'Discount, coupon and sale badges',
      'Shipping and order tracking steps',
      'Gift cards and gift wrap options',
    ],
  },
  Charts: {
    title: 'Animated chart icons',
    intro:
      'Bar charts, a pie chart and trending arrows for analytics and reporting. The trending-up and trending-down icons show at a glance whether a metric rose or fell, which suits KPI cards and changelogs of numbers.',
    useCases: [
      'KPI cards with rising or falling metrics',
      'Analytics and reports navigation items',
      'Dashboard empty states',
      'Finance and portfolio summaries',
    ],
  },
  Development: {
    title: 'Animated developer icons',
    intro:
      'Code brackets, a terminal, Git branches, commits, merges and pull requests, plus servers and databases. Made for developer tools, documentation sites and status pages where Git and infrastructure terms are part of the interface.',
    useCases: [
      'Pull request, merge and branch status in developer tools',
      'Code snippet and embed buttons in documentation',
      'Terminal and CLI sections on landing pages',
      'Server and database health on status pages',
      'Keyboard shortcut hints with the command key',
    ],
  },
  'Design & layout': {
    title: 'Animated design and layout icons',
    intro:
      'Grids, columns, layers, crop, pen tool and cursor icons for editors and builders. They fit toolbars where users arrange content, switch between grid and table views, or pick a drawing tool.',
    useCases: [
      'Grid, list and table view switchers',
      'Layer panels in design and slide tools',
      'Crop and cut tools in image editors',
      'Page builder and layout pickers',
      'Drag-to-move handles',
    ],
  },
  'Shapes & math': {
    title: 'Animated shape and math icons',
    intro:
      'Circles, squares, triangles, hexagons, an octagon and division signs. Use them as shape tools in drawing apps, as calculator operators, or as neutral markers in diagrams and onboarding steps.',
    useCases: [
      'Shape tools in whiteboard and drawing apps',
      'Calculator and formula editor operators',
      'Bullet and step markers in diagrams',
      'Quiz and game interfaces',
    ],
  },
  Loading: {
    title: 'Animated loading icons',
    intro:
      'Spinners and loaders that loop for as long as something is in progress. Put one inside a submit button while a request runs, in place of content that is still loading, or on a full-screen splash; they hold still when the user prefers reduced motion.',
    useCases: [
      'Submit buttons waiting on a request',
      'Placeholders while a list or chart loads',
      'Infinite scroll and load-more indicators',
      'Full-screen splash and route transitions',
      'File upload and processing progress',
    ],
  },
  'Social media': {
    title: 'Animated social media icons',
    intro:
      'Brand icons for social networks and the tools developers and designers share work on: X, Instagram, YouTube, Discord, Telegram, Figma and more. They animate on hover, which makes footer and profile links feel clickable.',
    useCases: [
      'Social links in a site footer',
      'Share buttons on blog posts',
      'Author and team profile links',
      'Community invite buttons for chat servers',
      'Sign-in with a social or developer account',
    ],
  },
  Other: {
    title: 'More animated icons',
    intro:
      'Icons that do not belong to a larger group: emoji faces for feedback, a coffee cup, a clock, a pulse line and a scroll-down cue. The scroll-down icon is a common hero section hint that there is more below.',
    useCases: [
      'Scroll-down hints at the bottom of a hero section',
      'Happy, neutral and sad faces in feedback widgets',
      'Activity and uptime indicators',
      'Opening hours and time pickers',
      'Buy-me-a-coffee and support links',
    ],
  },
};

const byCategory = Map.groupBy(icons, (icon) => icon.category);

/** Every category in site order, with its page copy. */
export const CATEGORY_META: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((name) => {
    const copy = CATEGORY_COPY[name];
    if (!copy) throw new Error(`taxonomy: no copy for category "${name}"`);
    const indexable = name !== 'Other' && (byCategory.get(name)?.length ?? 0) >= 3;
    return [name, { name, slug: categorySlug(name), indexable, ...copy }];
  })
);

export const INTERACTION_COPY: Record<Interaction, Copy & { example: string }> = {
  loop: {
    title: 'Looping animated icons',
    intro:
      'These icons play continuously for as long as they are on screen, so they suit states that last: something is loading, a warning is active, a terminal is waiting. With reduced motion preferred they stop on their first frame and still read as a normal icon.',
    useCases: [
      'Loading spinners and progress indicators',
      'Active warning and error states',
      'Live and recording indicators',
      'Scroll-down cues in hero sections',
      'Attention markers for new notifications',
    ],
    example:
      'Looping icons typically show loading spinners, active alerts, a ringing bell or a scroll-down hint.',
  },
  'click-toggle': {
    title: 'Click-to-toggle animated icons',
    intro:
      'Each click animates between two states and stays there, which makes these icons the visual half of an on/off control. The icon always shows the current state, so pair it with aria-pressed or a checked attribute and the button explains itself.',
    useCases: [
      'Mute and unmute buttons',
      'Show and hide password fields',
      'Hamburger menu and close buttons',
      'Play and pause controls',
      'Like, star and bookmark toggles',
      'Checkboxes, radio buttons and switches',
    ],
    example:
      'Click-to-toggle icons typically drive mute/unmute, show/hide password, menu/close, play/pause and like buttons.',
  },
  'click-replay': {
    title: 'Click animated icons',
    intro:
      'These icons play once from the start every time they are clicked, a small confirmation that the action went through. They fit one-shot actions that do not leave a state behind: send, save, refresh, download, print or delete.',
    useCases: [
      'Send buttons in chat and comment forms',
      'Save, download and upload buttons',
      'Refresh and rotate buttons',
      'Add-to-cart buttons',
      'Text formatting buttons in editors',
    ],
    example:
      'Click icons typically confirm send, save, refresh, download, add-to-cart and formatting buttons.',
  },
  hover: {
    title: 'Hover animated icons',
    intro:
      'These icons play forward when the pointer enters and run backward when it leaves, so the motion follows the cursor and never ends half-way. They suit navigation items and buttons that hint at what they open: a trash lid lifts, a settings cog turns, a folder opens.',
    useCases: [
      'Sidebar and navigation menu items',
      'Delete buttons that lift the lid before the click',
      'Settings and profile links',
      'Zoom in and zoom out controls',
      'Social links in a footer',
    ],
    example:
      'Hover icons typically mark navigation items, delete buttons, settings, zoom controls and social links.',
  },
  'hover-replay': {
    title: 'Hover-to-play animated icons',
    intro:
      'These icons play once when the pointer enters and finish on their own, which keeps quick passes over a toolbar from turning into jittery motion. Most of the set works this way: arrows, files, devices, weather and brand icons that come alive on hover.',
    useCases: [
      'Feature lists and pricing tables',
      'Arrow links and call-to-action buttons',
      'Toolbar buttons in editors and dashboards',
      'Cards in a landing page grid',
      'Footer and contact links',
    ],
    example:
      'Hover-to-play icons typically liven up arrow links, feature lists, toolbar buttons and landing page cards.',
  },
  'hover-loop': {
    title: 'Hover loop animated icons',
    intro:
      'These icons loop while the pointer stays on them and finish the current cycle after it leaves, so they never stop mid-motion. They work for links that invite a longer look, mostly social and community icons.',
    useCases: [
      'Social media links in headers and footers',
      'Community and chat invite buttons',
      'Portfolio and profile links',
      'Language and region pickers',
    ],
    example:
      'Hover loop icons typically mark social links, community invites, portfolio links and language pickers.',
  },
};

/** Every interaction, keyed like INTERACTIONS in icons.ts, with its page copy. */
export const INTERACTION_META: Record<Interaction, InteractionMeta> = Object.fromEntries(
  (Object.keys(INTERACTIONS) as Interaction[]).map((interaction) => [
    interaction,
    { interaction, slug: interactionSlug(interaction), ...INTERACTION_COPY[interaction] },
  ])
) as Record<Interaction, InteractionMeta>;

/** The category's metadata from its URL slug, or undefined. */
export const categoryBySlug = (slug: string): CategoryMeta | undefined =>
  Object.values(CATEGORY_META).find((meta) => meta.slug === slug);

/** The icons of a category, in site order. */
export const iconsByCategory = (name: string): Icon[] => byCategory.get(name) ?? [];

const byInteraction = Map.groupBy(icons, (icon) => icon.interaction);

/** The icons with an interaction, in site order. */
export const iconsByInteraction = (interaction: Interaction): Icon[] =>
  byInteraction.get(interaction) ?? [];

// How a group of icons plays, as a plural verb phrase: "<n> icons <phrase>".
export const PLAY: Record<Interaction, string> = {
  loop: 'loop continuously',
  'click-toggle': 'toggle between two states on click',
  'click-replay': 'replay on every click',
  hover: 'play on hover and reverse on mouse leave',
  'hover-replay': 'play once on hover',
  'hover-loop': 'loop while hovered',
};

/** What each interaction does when the user prefers reduced motion (src/index.tsx). */
export const REDUCED_MOTION: Record<Interaction, string> = {
  loop: 'With reduced motion preferred, the icon does not autoplay and stays on its static first frame.',
  'click-toggle':
    'With reduced motion preferred, a click switches to the other state immediately, without the animation in between.',
  'click-replay':
    'With reduced motion preferred, clicks still reach your handler but the animation does not play.',
  hover: 'With reduced motion preferred, hovering does not play the animation.',
  'hover-replay': 'With reduced motion preferred, hovering does not play the animation.',
  'hover-loop': 'With reduced motion preferred, the icon stays static while hovered.',
};
