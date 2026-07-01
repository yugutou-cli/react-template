import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    AutoImport({
      imports: [
        'react',
        {
          from: '@tanstack/react-router',
          imports: ['useNavigate', 'useMatch', 'useRouter', 'useSearch', 'useParams'],
        },
      ],
      dirs: ['./src/stores'],
      dts: './src/types/auto-imports.d.ts',
    }),
    devtools(),
    tailwindcss(),
    tanstackStart({
      router: {
        routesDirectory: 'pages',
      },
    }),
    viteReact(),
  ],
})

export default config
