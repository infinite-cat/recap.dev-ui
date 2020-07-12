import { DateTime, Duration, DurationUnit } from 'luxon'
import { map, compact } from 'lodash-es'

export const formatDateTime = (time?: number | string) =>
  DateTime.fromMillis(Number(time)).toLocaleString(DateTime.DATETIME_SHORT)

export const formatDateTimeShort = (time?: number | string) =>
  DateTime.fromMillis(Number(time)).toFormat('dd LLL HH:mm')

const units: DurationUnit[] = ['hours', 'minutes', 'seconds', 'milliseconds']
const shortNames = ['h', 'm', 's', 'ms']

export const formatDuration = (milliseconds: number) => {
  const duration = Duration.fromObject({ milliseconds })
    .shiftTo(...units)
    .toObject()

  const string = compact(
    map(units, (unit, i) => (duration[unit] ? `${duration[unit]}${shortNames[i]}` : null)),
  ).join(' ')

  return string
}

const units: DurationUnit[] = ['hours', 'minutes', 'seconds', 'milliseconds']
const shortNames = ['h', 'm', 's', 'ms']

export const formatDuration = (milliseconds: number) => {
  const duration = Duration.fromObject({ milliseconds })
    .shiftTo(...units)
    .toObject()

  const string = compact(
    map(units, (unit, i) => (duration[unit] ? `${duration[unit]}${shortNames[i]}` : null)),
  ).join(' ')

  return string
}
