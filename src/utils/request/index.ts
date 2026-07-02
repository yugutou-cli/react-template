import type { ApiResponse } from './type'

import { redirect } from '@tanstack/react-router'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import reactHook from 'alova/react'
import { ContentTypeEnum, ResultEnum, ShowMessage } from './type'

export const baseURL = import.meta.env.VITE_BASE_URL

/**
 * method.meta 类型扩展在 types/typings.d.ts
 */
export const alovaInstance = createAlova({
  baseURL,
  requestAdapter: adapterFetch(),
  statesHook: reactHook,
  timeout: 20000,
  cacheFor: null,
  beforeRequest: (method) => {
    method.config.headers = {
      ContentType: ContentTypeEnum.JSON,
      Accept: 'application/json, text/plain, */*',
      ...method.config.headers,
    }

    if (method.meta?.ignoreAuth !== true) {
      const token = getToken()

      method.config.headers.Authorization = `Bearer ${token}`
    }
  },
  responded: async (response, method) => {
    const { meta } = method

    const { data } = await response.json()

    if (data.code !== 200) {
      const errorMessage = ShowMessage(data.code) || `HTTP请求错误[${data.code}]`
      console.error(`请求失败, ${errorMessage}`)
      throw new Error(`${errorMessage}`)
    }

    const { code, msg, data: rawData } = data as ApiResponse

    if (code !== ResultEnum.Success0 && code !== ResultEnum.Success200) {
      if (code === ResultEnum.Unauthorized && window.location.pathname !== import.meta.env.VITE_LOGIN_URL) {
        redirect({ to: import.meta.env.VITE_LOGIN_URL })
      }
      if (meta?.hideNotify !== true) {
        console.error(`${msg}`)
      }
      throw new Error(`请求失败 ${code}, ${msg}`)
    }

    return (meta?.originalRes ? data : rawData) as ApiResponse
  },
})
