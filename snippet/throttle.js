/**
 * @hem
 * 0. regardless of user operation
 * 1. cut the time averagely
 */

const useBin = (f, t) => {
  let bin = 1

  return (...args) => {
    if (bin) {
      f(...args)
      bin = 0

      setTimeout(() => {
        bin = 1
      }, t)
    }
  }
}

const useTime = (f, t) => {
  let prev = 0

  return (...args) => {
    const now = Date.now()

    if (now - prev >= t) {
      f(...args)

      prev = now
    }
  }
}
