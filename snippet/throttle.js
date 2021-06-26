/**
 * @hem
 * 0. regardless of user operation
 * 1. cut the time averagely
 */

const useBin = (f, t) => {
  let bin = 1

  return () => {
    if (bin) {
      f()
      bin = 0

      setTimeout(() => {
        bin = 1
      }, t)
    }
  }
}

const useTime = (f, t) => {
  let prev = 0

  return () => {
    const now = Date.now()

    if (now - prev >= t) {
      f()

      prev = now
    }
  }
}
