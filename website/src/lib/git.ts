// Last-modified dates from Git history, so dates in the site change only when content does.
// Never falls back to the build time: no date is better than one that changes on every build.
import { execFileSync } from 'node:child_process';

let cache: Map<string, string> | undefined;

const git = (...args: string[]) =>
  execFileSync('git', args, {
    cwd: import.meta.env.REPO_DIR,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const read = () => {
  const dates = new Map<string, string>();
  // A shallow clone (e.g. a CI checkout) would date everything to its single commit.
  if (git('rev-parse', '--is-shallow-repository').trim() !== 'false') return dates;
  let date = '';
  // Newest first: a date line (%cI), then the paths of that commit. Keep each path's first date.
  for (const line of git('log', '--name-only', '--format=%cI').split('\n')) {
    if (!line) continue;
    if (/^\d{4}-\d{2}-\d{2}T/.test(line)) date = line;
    else if (!dates.has(line)) dates.set(line, date);
  }
  return dates;
};

/**
 * Path (relative to the repository root) -> ISO 8601 date of the last commit that touched it.
 * Read once per build; empty when Git or its history is unavailable.
 */
export const lastModified = (): Map<string, string> => {
  if (!cache) {
    try {
      cache = read();
    } catch {
      cache = new Map();
    }
  }
  return cache;
};

/**
 * The latest commit date over files and directories (a path ending in '/' covers everything
 * under it), e.g. lastModifiedOf(['icons/']). Undefined when none of them is in the history.
 */
export const lastModifiedOf = (paths: string[]): string | undefined => {
  let latest: string | undefined;
  for (const [path, date] of lastModified()) {
    const matches = paths.some((p) => (p.endsWith('/') ? path.startsWith(p) : path === p));
    if (matches && (!latest || Date.parse(date) > Date.parse(latest))) latest = date;
  }
  return latest;
};
