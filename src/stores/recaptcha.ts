// Utilities
import { defineStore } from 'pinia'
import { useReCaptcha } from 'vue-recaptcha-v3'

export const useReCaptchaStore = defineStore('recaptcha', () => {
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!
  const recaptcha = async (action: string = 'container') => {
    // (optional) Wait until recaptcha has been loaded.
    await recaptchaLoaded()

    // Execute reCAPTCHA with action.
    const token = await executeRecaptcha(action)

    return token
  }

  return {
    recaptcha,
  }
})
