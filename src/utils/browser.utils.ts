import { noop } from 'lodash-es'

export const listenCookieChange = (callback = noop, interval = 500) => {
  let lastCookie = document.cookie
  return setInterval(() => {
    const { cookie } = document
    if (cookie !== lastCookie) {
      try {
        callback({ oldValue: lastCookie, newValue: cookie })
      } finally {
        lastCookie = cookie
      }
    }
  }, interval)
}

export const deleteAllCookies = () => {
  const cookies = document.cookie.split('; ')
  cookies.forEach((name) => {
    document.cookie = `${name.trim().split('=')[0]}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
  })
}
