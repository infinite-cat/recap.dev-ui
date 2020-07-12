import { isArray } from 'lodash-es'

export const safeParse = (parseString?: string | null) => {
  try {
    return JSON.parse(parseString!)
  } catch (e) {
    return null
  }
}

export const formatJSONViewerInput = (src = '') => {
  const parsed = safeParse(src)
  if (!isArray(src)) {
    const { length, ...formatted } = parsed
    return JSON.stringify(formatted)
  }
  return JSON.stringify(src)
}
