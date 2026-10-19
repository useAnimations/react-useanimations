import { useCallback, useEffect, useRef, useState } from 'react';
import UseAnimations, { type Interaction } from 'react-useanimations';
import { islands } from '../i18n/messages/en/islands';
import { loadIconData } from '../lib/icon-data';
import { tabFromKey } from '../lib/tabs';
import ControlIcon from './ControlIcon';
import { openIcon } from './IconCard';

export type DialogIcon = {
  id: string;
  name: string;
  exportName: string;
  component: string;
  title: string;
  category: string;
  interaction: Interaction;
  svg: string[];
  durationMs: number;
};

/** The dialog's text in the page's language: t(locale).islands.iconDialog. */
export type DialogStrings = typeof islands.iconDialog;

/** Code blocks highlighted at build time, with __PLACEHOLDERS__ for the icon. */
export type Templates = {
  react: string;
  shadcnCommand: string;
  shadcn: string;
  files: string;
};

// Tab keys are language-neutral: state, DOM ids and analytics (data-track-tab).
const TABS = ['react', 'shadcn', 'files'] as const;
const COLORS = ['', '#4b5cff', '#e5484d', '#f59e0b', '#12a594', '#a24bff'];

const fill = (template: string, icon: DialogIcon) =>
  template
    .replaceAll('__EXPORT__', icon.exportName)
    .replaceAll('__NAME__', icon.name)
    .replaceAll('__COMPONENT__', icon.component)
    .replaceAll('__ID__', icon.id);

function Code({
  html,
  icon,
  code,
  label,
}: {
  html: string;
  icon: string;
  code: string;
  label: string;
}) {
  return (
    <div className="code-block group/code" data-copy-scope>
      <div data-code dangerouslySetInnerHTML={{ __html: html }} />
      <button
        type="button"
        data-copy-from="[data-code]"
        data-track="copy"
        data-track-icon={icon}
        data-track-code={code}
        className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-2 py-1 text-xs text-muted opacity-0 transition group-hover/code:opacity-100 focus:opacity-100 data-[copied]:text-accent"
      >
        <ControlIcon icon="copy" copied="checkmark" size={14} />
        <span data-copy-label>{label}</span>
      </button>
    </div>
  );
}

// 0.80 in the page's language (0,80 in German); the dialog's content only renders in the browser.
const formatSeconds = (ms: number) =>
  new Intl.NumberFormat(document.documentElement.lang || 'en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ms / 1000);

const onClose = () => {
  const url = new URL(location.href);
  url.searchParams.delete('icon');
  history.replaceState(history.state, '', url);
};

/**
 * The details of an icon: live preview, code and downloads. Opens on `ua:open-icon` events.
 * `categories` maps English category names to the page language's (t(locale).taxonomy.categories).
 */
export default function IconDialog({
  templates,
  strings: s = islands.iconDialog,
  categories,
}: {
  templates: Templates;
  strings?: DialogStrings;
  categories?: Record<string, string>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [icon, setIcon] = useState<DialogIcon>();
  const [data, setData] = useState<object>();
  const [tab, setTab] = useState<(typeof TABS)[number]>('react');
  const [color, setColor] = useState('');

  const open = useCallback((id: string) => {
    const index = JSON.parse(
      document.getElementById('icon-index')?.textContent ?? '[]'
    ) as DialogIcon[];
    const next = index.find((item) => item.id === id);
    if (!next) return false;
    setIcon(next);
    setData(undefined);
    void loadIconData(id).then(setData);
    if (!dialog.current?.open) dialog.current?.showModal();
    const url = new URL(location.href);
    url.searchParams.set('icon', id);
    history.replaceState(history.state, '', url);
    return true;
  }, []);

  useEffect(() => {
    // Cancelling the event tells openIcon() that the dialog took it.
    const onOpen = (event: Event) => {
      if (open((event as CustomEvent<string>).detail)) event.preventDefault();
    };
    window.addEventListener('ua:open-icon', onOpen);
    // A shared link (?icon=<id>) opens the icon.
    const initial = new URLSearchParams(location.search).get('icon');
    if (initial) openIcon(initial);
    return () => window.removeEventListener('ua:open-icon', onOpen);
  }, [open]);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(event) => event.target === dialog.current && dialog.current.close()}
      aria-labelledby="icon-dialog-title"
      className="icon-dialog m-auto w-[min(56rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-3xl border border-line bg-bg p-0 text-fg shadow-2xl backdrop:bg-black/45 backdrop:backdrop-blur-sm"
    >
      {icon && (
        <div className="grid md:grid-cols-[19rem_1fr]">
          <div className="flex flex-col border-b border-line p-6 md:border-r md:border-b-0">
            <div
              className="relative flex aspect-square items-center justify-center rounded-2xl border border-line bg-surface-2 bg-grid"
              style={{ color: color || 'var(--fg)' }}
            >
              {data ? (
                <UseAnimations
                  key={icon.id}
                  animation={{ animationData: data, interaction: icon.interaction }}
                  size={120}
                  aria-label={s.preview.replace('{title}', icon.title)}
                  render={(eventProps, animationProps) => (
                    <div
                      className="flex size-full cursor-pointer items-center justify-center"
                      {...eventProps}
                    >
                      <span {...animationProps} />
                    </div>
                  )}
                />
              ) : (
                <span className="size-6 animate-pulse rounded-full bg-line-strong" />
              )}
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-surface px-2.5 py-1 text-[11px] whitespace-nowrap text-muted shadow-sm">
                {s.hints[icon.interaction]}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2" role="group" aria-label={s.colors}>
              {COLORS.map((value) => (
                <button
                  key={value || 'default'}
                  type="button"
                  aria-label={value ? s.color.replace('{color}', value) : s.textColor}
                  aria-pressed={color === value}
                  onClick={() => setColor(value)}
                  className="size-6 rounded-full border border-line-strong ring-offset-2 ring-offset-bg aria-pressed:ring-2 aria-pressed:ring-accent"
                  style={{ background: value || 'var(--fg)' }}
                />
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-y-3 text-sm">
              <dt className="text-subtle">{s.interaction}</dt>
              <dd className="font-mono text-xs leading-5">{icon.interaction}</dd>
              <dt className="text-subtle">{s.duration}</dt>
              <dd>{s.seconds.replace('{seconds}', formatSeconds(icon.durationMs))}</dd>
              <dt className="text-subtle">{s.import}</dt>
              <dd className="font-mono text-xs leading-5">{icon.exportName}</dd>
            </dl>
          </div>
          <div className="min-w-0 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted">{categories?.[icon.category] ?? icon.category}</p>
                <h2 id="icon-dialog-title" className="text-2xl font-semibold tracking-tight">
                  {icon.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label={s.close}
                className="rounded-full p-2 text-muted hover:bg-surface-2 hover:text-fg"
              >
                {/* A plus that turns into an X each time the dialog opens. */}
                <ControlIcon icon="plusToX" on="screen" size={24} />
              </button>
            </div>
            <div
              role="tablist"
              aria-label={s.code}
              className="mt-6 inline-flex rounded-full border border-line bg-surface-2 p-1"
            >
              {TABS.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  id={`icon-tab-${name}`}
                  aria-selected={tab === name}
                  aria-controls="icon-tabpanel"
                  tabIndex={tab === name ? 0 : -1}
                  data-track="code-tab"
                  data-track-icon={icon.id}
                  data-track-tab={name}
                  onClick={() => setTab(name)}
                  onKeyDown={(event) => {
                    const next = tabFromKey(event.key, i, TABS.length);
                    if (next === undefined) return;
                    setTab(TABS[next]);
                    (event.currentTarget.parentElement!.children[next] as HTMLElement).focus();
                  }}
                  className="rounded-full px-3.5 py-1.5 text-sm text-muted transition aria-selected:bg-surface aria-selected:text-fg aria-selected:shadow-sm"
                >
                  {s.tabs[name]}
                </button>
              ))}
            </div>
            <div
              className="mt-4 space-y-3"
              role="tabpanel"
              id="icon-tabpanel"
              aria-labelledby={`icon-tab-${tab}`}
            >
              {tab === 'react' && (
                <Code
                  html={fill(templates.react, icon)}
                  icon={icon.id}
                  code="react"
                  label={s.copy}
                />
              )}
              {tab === 'shadcn' && (
                <>
                  <Code
                    html={fill(templates.shadcnCommand, icon)}
                    icon={icon.id}
                    code="shadcn-command"
                    label={s.copy}
                  />
                  <Code
                    html={fill(templates.shadcn, icon)}
                    icon={icon.id}
                    code="shadcn"
                    label={s.copy}
                  />
                </>
              )}
              {tab === 'files' && (
                <Code
                  html={fill(templates.files, icon)}
                  icon={icon.id}
                  code="files"
                  label={s.copy}
                />
              )}
            </div>
            <h3 className="mt-8 text-sm font-medium">{s.download}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`/icons/${icon.id}.zip`}
                download
                data-track="download"
                data-track-icon={icon.id}
                data-track-format="zip"
                className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-85"
              >
                <ControlIcon icon="download" size={14} />
                ZIP
              </a>
              <a
                href={`/icons/${icon.id}.json`}
                download
                data-track="download"
                data-track-icon={icon.id}
                data-track-format="json"
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm hover:bg-surface-2"
              >
                <ControlIcon icon="download" size={14} />
                Lottie JSON
              </a>
              {icon.svg.map((state) => (
                <a
                  key={state}
                  href={`/icons/${icon.id}/${state}.svg`}
                  download
                  data-track="download"
                  data-track-icon={icon.id}
                  data-track-format="svg"
                  data-track-file={`${state}.svg`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm hover:bg-surface-2"
                >
                  <ControlIcon icon="download" size={14} />
                  {icon.svg.length > 1 ? `${state}.svg` : 'SVG'}
                </a>
              ))}
              <a
                href={`/icons/${icon.id}`}
                data-track="icon-page"
                data-track-icon={icon.id}
                className="ml-auto inline-flex items-center gap-1 self-center text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
              >
                {s.iconPage}
                <ControlIcon icon="arrowRight" size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
