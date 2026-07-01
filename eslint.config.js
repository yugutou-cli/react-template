//  @ts-check

import { antfu } from '@antfu/eslint-config'

export default antfu({
  vue: false,
  react: true,
  ignores: ['tsconfig.json', 'tsconfig.*.json'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-console': 'off',
  },
})
