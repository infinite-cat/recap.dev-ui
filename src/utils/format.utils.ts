export const safeParse = (parseString: string) => {
  try {
    return JSON.parse(parseString)
  } catch (e) {
    return null
  }
}
