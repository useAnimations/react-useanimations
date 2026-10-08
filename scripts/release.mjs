import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import semver from 'semver';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const base = process.env.RELEASE_BASE_SHA;
const pullRequest = process.env.GITHUB_EVENT_NAME === 'pull_request';
const gitTag = `v${pkg.version}`;
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });

if (!semver.valid(pkg.version) || semver.parse(pkg.version).build.length) {
  throw new Error('Use a valid semantic version without build metadata.');
}
if (lock.version !== pkg.version || lock.packages[''].version !== pkg.version) {
  throw new Error('package.json and package-lock.json must have the same version.');
}
if (pkg.name !== lock.name || pkg.name !== lock.packages[''].name) {
  throw new Error('package.json and package-lock.json must have the same package name.');
}
if (!base || !/^[a-f0-9]{40}$/.test(base) || /^0+$/.test(base)) {
  throw new Error('RELEASE_BASE_SHA must identify the commit before these changes.');
}

const previous = JSON.parse(git('show', `${base}:package.json`));
const changed = pkg.version !== previous.version;
const tag = semver.prerelease(pkg.version) ? 'next' : 'latest';

if (changed && !semver.gt(pkg.version, previous.version)) {
  throw new Error(`Release version must be newer than ${previous.version}.`);
}

const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`, {
  signal: AbortSignal.timeout(15000),
});
if (!response.ok) {
  throw new Error(`Cannot check npm registry: HTTP ${response.status}.`);
}
const registry = await response.json();
const published = Object.hasOwn(registry.versions, pkg.version);

if (published) {
  if (changed && pullRequest) {
    throw new Error(`${pkg.name}@${pkg.version} is already published on npm.`);
  }
  console.log(`${pkg.name}@${pkg.version} is already published; skipping release.`);
} else {
  if (!semver.gt(pkg.version, registry['dist-tags'].latest)) {
    throw new Error(
      'The current package version is not published and is not newer than the version currently tagged latest on npm.'
    );
  }
  // CI creates the tag after publishing, so an existing tag means it points at different sources.
  if (git('tag', '--list', gitTag).trim()) {
    throw new Error(
      `Git tag ${gitTag} already exists, but ${pkg.name}@${pkg.version} is not published.`
    );
  }
}

// Also retry a version whose first publish failed, even when the source version did not change.
const release = !published;
const outputs = `release=${release}\nname=${pkg.name}\nversion=${pkg.version}\ntag=${tag}\n`;
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, outputs);
console.log(
  release ? `Release planned: ${pkg.name}@${pkg.version} (${tag}).` : 'No new npm release.'
);
