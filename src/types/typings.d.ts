// 全局要用的类型放到这里

import 'alova'

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: {
      /** 是否返回原始响应数据 不传或传false 返回 res.data */
      originalRes?: boolean
      /** 是否不携带token */
      ignoreAuth?: boolean
      /** 是否不显示 notify  */
      hideNotify?: boolean

      /**
       * 返回值类型
       * @default json
       */
      resType?: 'json' | 'blob' | 'text'
    }
  }
}

declare global {
  interface Option {
    label: string
    value: string | number
    [key: string]: any
  }

  type Fn = (...arg: any[]) => void

  type Obj = Record<string, any>
}

export {} // 防止模块污染
