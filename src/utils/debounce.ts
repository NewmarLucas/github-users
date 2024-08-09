const time = 300
let timeout: NodeJS.Timeout | null = null

export function debounce(fn: () => void, timer: number = time) {
  if (timeout) clearTimeout(timeout)
  return (function (...args) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(function () {
      // @ts-expect-error
      fn.apply(this, args)
    }, timer)
  })()
}
