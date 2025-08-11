/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import { VueReCaptcha } from 'vue-recaptcha-v3'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia)

  // ReCaptcha
  app.use(VueReCaptcha, {
    siteKey: window.__env.captcha.key,
    loaderOptions: {},
  })
}
