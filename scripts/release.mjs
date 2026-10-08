import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import semver from 'semver';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const base = process.env.RELEASE_BASE_SHA;

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

const previous = JSON.parse(
  execFileSync('git', ['show', `${base}:package.json`], {
    encoding: 'utf8',
  })
);
let release = pkg.version !== previous.version;
const tag = semver.prerelease(pkg.version) ? 'next' : 'latest';

if (release && !semver.gt(pkg.version, previous.version)) {
  throw new Error(`Release version must be newer than ${previous.version}.`);
}

if (process.env.RELEASE_CHECK_REGISTRY === 'true') {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    throw new Error(`Cannot check npm registry: HTTP ${response.status}.`);
  }
  const registry = await response.json();
  if (Object.hasOwn(registry.versions, pkg.version)) {
    release = false;
    console.log(`${pkg.name}@${pkg.version} is already published; skipping release.`);
  } else if (!semver.gt(pkg.version, registry['dist-tags'].latest)) {
    throw new Error(
      'The current package version is not published and is not newer than the version currently tagged latest on npm.'
    );
  } else {
    // Also retry a version whose first publish failed, even when the source version did not change.
    release = true;
  }
}

const outputs = `release=${release}\nversion=${pkg.version}\ntag=${tag}\n`;
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, outputs);
console.log(
  release ? `Release planned: ${pkg.name}@${pkg.version} (${tag}).` : 'No new npm release.'
);
