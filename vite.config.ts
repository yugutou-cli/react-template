import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'

import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
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
      dirs: ['./src/stores', './src/utils'],
      dts: './src/types/auto-imports.d.ts',
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3001,
    strictPort: true,
  },
})

export default config
