export const camelToTitle = (camelCase: string) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim()

export const getMatches = (log: string, searchTerm: string) => {
  const matches = log.matchAll(new RegExp(`.{0,100}${searchTerm}.{0,100}`, 'g'))

  let lastMatchIndex = -100

  return [...matches]
    .filter((match) => {
      const shouldBeIncluded = match.index! - lastMatchIndex >= 100
      if (shouldBeIncluded) {
        lastMatchIndex = match.index!
      }
      return shouldBeIncluded
    })
    .map((match) => match[0])
}
