import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { inspect } from 'node:util'

import { antfu, jsonc } from '@antfu/eslint-config'

const json = await jsonc({
  files: ['**/package.json'],
  overrides: {
    'jsonc/sort-keys': [
      'error',
      {
        order: [
          'publisher',
          'name',
          'displayName',
          'type',
          'version',
          'private',
          'packageManager',
          'description',
          'author',
          'contributors',
          'license',
          'funding',
          'homepage',
          'repository',
          'bugs',
          'keywords',
          'categories',
          'sideEffects',
          'imports',
          'exports',
          'main',
          'module',
          'unpkg',
          'jsdelivr',
          'types',
          'typesVersions',
          'bin',
          'icon',
          'files',
          'engines',
          'activationEvents',
          'contributes',
          'scripts',
          'peerDependencies',
          'peerDependenciesMeta',
          'dependencies',
          'optionalDependencies',
          'devDependencies',
          'pnpm',
          'overrides',
          'resolutions',
          'husky',
          'simple-git-hooks',
          'lint-staged',
          'eslintConfig',
        ],
        pathPattern: '^$',
      },
      {
        order: {
          type: 'asc',
        },
        pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
      },
      {
        order: {
          type: 'asc',
        },
        pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
      },
      {
        order: {
          type: 'asc',
        },
        pathPattern: '^workspaces\\.catalog$',
      },
      {
        order: {
          type: 'asc',
        },
        pathPattern: '^workspaces\\.catalogs\\.[^.]+$',
      },
      {
        order: [
          'types',
          'import',
          'require',
          'default',
        ],
        pathPattern: '^exports.*$',
      },
      {
        order: [
          'pre-commit',
          'prepare-commit-msg',
          'commit-msg',
          'post-commit',
          'pre-rebase',
          'post-rewrite',
          'post-checkout',
          'post-merge',
          'pre-push',
          'pre-auto-gc',
        ],
        pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
      },
    ],
  },
})

const oxlintrc = await jsonc({
  files: ['.oxlintrc.json'],
  overrides: {
    'jsonc/sort-keys': [
      'error',
      {
        order: [
          '$schema',
          'plugins',
          'jsPlugins',
          'rules',
          'overrides',
          'ignorePatterns',
        ],
        pathPattern: '^$',
      },
      {
        pathPattern: '^(rules|plugins|jsPlugins|overrides|ignorePatterns)$',
        order: {
          type: 'asc',
        },
      },
      // 4️⃣ overrides 数组内每个元素的 rules 对象：键名按 asc 排序
      {
        pathPattern: '^overrides\\[\\d+\\]\\.(rules|plugins|jsPlugins|overrides|ignorePatterns)$',
        order: {
          type: 'asc',
        },
      },
    ],
  },
})

const b = await antfu()
console.log(inspect(b, {
  depth: 4,
  colors: true,
}))
console.log('==========================')

const file = 'antfu.json'

await mkdir(dirname(file), { recursive: true })
const seen = new WeakSet()
await writeFile(file, JSON.stringify(b, (_, value) => {
  if (typeof value === 'object' && value !== null) {
    if (seen.has(value))
      return '[Circular]'

    seen.add(value)
  }

  return value
},
2), 'utf8')

export default [...json, ...oxlintrc]
