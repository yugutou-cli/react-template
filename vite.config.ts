import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'

import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.') as unknown as ImportMetaEnv

  const { VITE_BASE_URL } = env

  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      devtools(),
      tailwindcss(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/pages',
      }),
      AutoImport({
        imports: [
          'react',
          {
            from: '@tanstack/react-router',
            imports: ['useNavigate', 'useMatch', 'useRouter', 'useSearch', 'useParams'],
          },
        ],
        // fix: tanstack router auto import not working with vite-plugin-react-pages
        include: [
          /\.[tj]sx?(?:\?.*)?$/,
        ],
        dirs: ['./src/stores', './src/utils/**', './src/hooks', './src/components'],
        dts: './src/types/auto-imports.d.ts',
      }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    server: {
      proxy: {
        [VITE_BASE_URL]: {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp(`^${VITE_BASE_URL}`), VITE_BASE_URL),
        },
      },
    },
  }
})

export default config
