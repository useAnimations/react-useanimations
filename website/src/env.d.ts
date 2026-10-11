/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Absolute path of the repository root, set in astro.config.ts. */
  readonly REPO_DIR: string;
}

type UmamiTracker = { track: (name: string, data?: Record<string, string>) => unknown };

interface Window {
  umami?: UmamiTracker;
  /** The cloud.umami.is tracker, set aside by Layout.astro so ours can load too. */
  umamiCloud?: UmamiTracker;
}
