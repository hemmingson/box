// λ functional programming 💛

const compose = (...fns) => (x) => fns.reduceRight((acc, f) => f(acc), x)
