import { apiClient } from './client'

export const apiUrls = {
  day: (serverId: string) => `/day/${serverId}`,
  week: (serverId: string) => `/week/${serverId}`,
  custom: (serverId: string, start: string, end: string) =>
    `/custom/${serverId}?start=${start}&end=${end}`,
}

export const queryDay = (serverId: string, reCaptchaToken: string) =>
  apiClient().get(apiUrls.day(serverId), {
    headers: {
      'g-recaptcha-token': reCaptchaToken,
    },
  })
export const queryWeek = (serverId: string, reCaptchaToken: string) =>
  apiClient().get(apiUrls.week(serverId), {
    headers: {
      'g-recaptcha-token': reCaptchaToken,
    },
  })
export const queryCustom = (serverId: string, start: string, end: string, reCaptchaToken: string) =>
  apiClient().get(apiUrls.custom(serverId, start, end), {
    headers: {
      'g-recaptcha-token': reCaptchaToken,
    },
  })
