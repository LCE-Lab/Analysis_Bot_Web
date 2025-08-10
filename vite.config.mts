// Plugins
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts-next'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Fonts from 'unplugin-fonts/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import Inspect from 'vite-plugin-inspect'
import Inspector from 'unplugin-vue-inspector/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      dts: './src/types/typed-router.d.ts',
    }),

    Vue({
      template: { transformAssetUrls },
    }),

    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      defaultLayout: 'defaultLayout',
    }),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: ['vue', VueRouterAutoImports, 'vue-i18n', 'vee-validate'],
      dts: './src/types/auto-imports.d.ts', // or a custom path
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),

    // https://github.com/unplugin/unplugin-vue-components
    Components({
      dts: './src/types/components.d.ts', // enabled by default if `typescript` is installed
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18nPlugin({
      include: resolve(__dirname, './locales/**'),
    }),

    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
    }),

    // https://github.com/antfu/vite-plugin-inspect
    Inspect(),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector(),

    // https://github.com/vuejs/devtools-next
    VueDevTools(),
  ],
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
})
