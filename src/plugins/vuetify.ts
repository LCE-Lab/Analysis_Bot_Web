/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'
import { VDateInput } from 'vuetify/labs/VDateInput'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        colors: {
          primary: '#5865f2',
          secondary: '#eeeef0',
          background: '#f3f3f4',
          surface: '#fbfbfb',
        },
      },
      dark: {
        colors: {
          primary: '#5865f2',
          secondary: '#333339',
          background: '#121214',
          surface: '#202024',
        },
      },
    },
  },
  components: {
    VDateInput,
  },
})
