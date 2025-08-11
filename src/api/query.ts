import { apiClient } from './client'

export type QueryResponse = {
  data: ITimeLineData
}

export type ITimeLineData = {
  groups: ITimeLineGroupItem[]
  dataSets: ITimeLineDataSetItem[]
  properties: ITimeLineProperties
}

export type ITimeLineGroupItem = {
  id: string
  content: string
}

export type ITimeLineDataSetItem = {
  id: string
  title: string
  className: string
  group: string
  start: string
  end: string
  content: string
}

export type ITimeLineProperties = {
  startTime: string
  endTime: string
}

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
