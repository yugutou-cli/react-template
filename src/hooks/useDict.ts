import { useEffect, useMemo, useRef, useState } from 'react'
import { getDictByTypeApi } from '@/api'

export interface DictObject {
  list: { value: string; label: string; [key: string]: any }[]
  map: Record<string, string | number | boolean>
}

type Dict<T extends string[]> = {
  [K in T[number]]: DictObject
}

interface DictResult {
  dictLabel: string
  dictValue: string
}

const dictMapCache = new Map<string, DictObject>()

export function useDict<T extends string[]>(...dicts: T): Dict<T> {
  const settersRef = useRef(new Map<string, React.Dispatch<React.SetStateAction<DictObject>>>())

  const values = dicts.map((dict) => {
    const [value, setValue] = useState<DictObject>(
      () => dictMapCache.get(dict) ?? { list: [], map: {} },
    )
    settersRef.current.set(dict, setValue)
    return [dict, value] as const
  })

  const dictsKey = dicts.join('\0')

  useEffect(() => {
    dicts.forEach((dict) => {
      const setDict = settersRef.current.get(dict)
      if (!setDict)
        return

      const cached = dictMapCache.get(dict)
      if (cached) {
        setDict(cached)
      }
      else {
        getDictByTypeApi(dict).then((res: DictResult[]) => {
          const value = transformDict(res)
          dictMapCache.set(dict, value)
          setDict(value)
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictsKey])

  return useMemo(
    () =>
      values.reduce(
        (prev, [dict, value]) => {
          prev[dict as T[number]] = value
          return prev
        },
        {} as Dict<T>,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    values.map(([, value]) => value),
  )
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
