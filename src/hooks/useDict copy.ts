import type { ToRefs } from 'vue'
import type { DictResult } from '@/api'
import { getDictByTypeApi } from '@/api'

export interface DictObject {
  list: { value: DictResult['dictValue'], label: DictResult['dictLabel'], [key: string]: any }[]
  map: Record<string, string | number | boolean>
}

type Dict<T extends [...string[]]> = {
  [K in T[number]]: DictObject
}

// 字典缓存
const dictMapCache = new Map<string, DictObject>()

/**
 * 字典hooks
 * @param dicts 字典值
 */
export function useDict<T extends string[]>(...dicts: T): ToRefs<Dict<T>> {
  const initvalue = dicts.reduce((prev, item) => {
    prev[item as T[number]] = { list: [], map: {} }
    return prev
  }, {} as Dict<T>)

  const dictMap = reactive(initvalue) as Dict<T>

  dicts.forEach((dict) => {
    const dictCache = dictMapCache.get(dict)
    if (dictCache) {
      dictMap[dict as T[number]] = dictCache
    }
    else {
      getDictByTypeApi(dict).then((res) => {
        const dictValue = transformDict(res)
        dictMap[dict as T[number]] = dictValue
        dictMapCache.set(dict, dictValue)
      })
    }
  })

  return toRefs(dictMap)
}

function transformDict(dictValue: DictResult[]): DictObject {
  return {
    list: dictValue.map(item => ({ ...item, value: item.dictValue, label: item.dictLabel })),
    map: dictValue.reduce<DictObject['map']>((prev, item) => {
      prev[item.dictValue] = item.dictLabel
      prev[item.dictLabel] = item.dictValue
      return prev
    }, {}),
  }
}
