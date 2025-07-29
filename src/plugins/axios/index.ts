// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import api from './api'
import _Vue from 'vue'

const Plugin = {
  install: (Vue: typeof _Vue) => {
    Object.defineProperties(Vue.prototype, {
      axios: {
        get () {
          return api
        }
      },
      $axios: {
        get () {
          return api
        }
      }
    })
  }
}

export default Plugin
