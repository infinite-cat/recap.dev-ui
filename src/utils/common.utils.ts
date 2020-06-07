export const getStatusByErrorRate = (rate: number) => {
  if (rate > 5) {
    return 'error'
  }
  if (rate > 0.01) {
    return 'warning'
  }
  return 'ok'
}
