import { DateTime, Duration, DurationUnit } from 'luxon'
import { map, compact } from 'lodash-es'

export const formatDateTime = (time?: number | string) =>
  DateTime.fromMillis(Number(time)).toLocaleString(DateTime.DATETIME_SHORT)

export const formatDateTimeShort = (time?: number | string) =>
  DateTime.fromMillis(Number(time)).toFormat('dd LLL HH:mm')

const units: DurationUnit[] = ['hours', 'minutes', 'seconds', 'milliseconds']
const shortNames = ['h', 'm', 's', 'ms']

export const formatDuration = (milliseconds: number) => {
  if (!milliseconds) {
    return '< 1ms'
  }

  const duration = Duration.fromObject({ milliseconds })
    .shiftTo(...units)
    .toObject()

  return compact(
    map(units, (unit, i) => (duration[unit] ? `${duration[unit]}${shortNames[i]}` : null)),
  ).join(' ')
}

export const getDateFrom = (range: string) => {
  if (range === '7 days') {
    return DateTime.utc().minus({ hours: 23, days: 6 }).startOf('hour').toMillis()
  }

  if (range === '24 hours') {
    return DateTime.utc().minus({ hours: 23 }).startOf('hour').toMillis()
  }

  if (range === '1 hour') {
    return DateTime.utc().minus({ hours: 1 }).startOf('hour').toMillis()
  }

  return DateTime.utc().minus({ hours: 23, days: 6 }).startOf('hour').toMillis()
}
