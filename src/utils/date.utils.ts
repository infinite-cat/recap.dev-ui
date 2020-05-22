import { DateTime } from 'luxon'

export const formatDateTime = (time?: number | string) =>
  DateTime.fromMillis(Number(time)).toLocaleString(DateTime.DATETIME_SHORT)
