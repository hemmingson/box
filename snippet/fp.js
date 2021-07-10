// λ functional programming 💛

const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, f) => f(acc), x)

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, f) => f(acc), x)

const curry = (f) => {
  let params = []

  const next = (...args) => {
    params = [...params, ...args]

    if (params.length < f.length) return next
    return f.apply(f, params)
  }

  return next
}
