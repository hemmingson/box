/**
 *  🧰 @trick
 *
 *  -> object & function
 */

const arr = [0, 1]

if (arr.indexOf(1) >= 0) console.log('1 '.repeat(2)) // 1 1

console.log(Math.max(...arr)) // 1

const prop = 'flag'
let obj = {
  [prop]: true,
}
console.log(obj) // { flag: true }

const distinct = (src) => Array.from(new Set(src))
console.log(distinct([0, 1, 1])) // [0, 1]

obj = { ...arr }
console.log(obj) // { 0: 0, 1: 1 }

console.log(new URLSearchParams(Object.entries(obj)).toString()) // 0=0&1=1

const flatten = (arr) => {
  const stack = [...arr]
  const res = []
  while (stack.length) {
    const next = stack.pop()
    if (Array.isArray(next)) stack.push(...next)
    else res.push(next)
  }
  return res.reverse()
}
console.log(flatten([0, [1, [2]]])) // [0, 1, 2]
console.log([0, [1, [2]]].flat(2)) // [0, 1, 2]
console.log([0, [1, [2]]].flat(Infinity)) // [0, 1, 2]
console.log([0, [1, [2]]].toString().split(',')) // [0, 1, 2]
console.log([].concat.apply([], [0, [1, [2]]])) // [0, 1, [2]]

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const switchShorthand = {
  0: fn0,
  1: fn1,
  2: fn2,
}

const swap = (arr) => {
  const len = arr.length

  ;[arr[0], arr[len - 1]] = [arr[len - 1], arr[0]]
}

const isTwin = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx])

console.log([undefined, null, false, 0, ''].filter(Boolean)) // []
console.log([1, 'hem', true].every(Boolean)) // true
console.log([1, 'hem', false].some(Boolean)) // true

const shuffle = (arr) => {
  arr.sort(() => Math.random() - 0.5)
}

const typeOf = (obj) =>
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

const truncate = (arr, len) => {
  arr.length = len
}

const f0 = (num) => {
  f1(num, (res) => {
    console.log(res)
  })

  return num
}
const f1 = (num, cb) => {
  num++

  cb(num)
}
console.log(f0(0)) // 1 0

const target = {}
console.log(target['constructor'].name) // 'Object'

const birth = {
  year: 1995,
  month: 11,

  // *[Symbol.iterator]() {
  //   yield 1995
  //   yield 11
  // },
}
Object.defineProperty(birth, Symbol.iterator, {
  enumerable: false,
  value: function* () {
    yield 1995
    yield 11
  },
})
const { year, ...rest } = birth
console.log(rest) // { month: 11 }

const o = {}
Object.defineProperty(o, Symbol.iterator, {
  value() {
    const keys = Object.keys(o)
    let idx = 0

    return {
      next: () => ({
        value: o[keys[idx++]],
        done: idx > keys.length,
      }),
    }
  },
})

arr[Symbol.iterator] = function () {
  let i = 0,
    arr = this

  return {
    next: function () {
      if (i >= arr.length) return { done: true }

      const value = arr[i]
      i++
      return { value, done: false }
    },
  }
}

outer: for (let c of '💴 2') {
  inner: for (let n of [0, 1, 2]) {
    if (c === ' ') break outer
    if (n === 1) continue inner

    console.log(n) // 0 2
  }
}

const javascripter = new Map(Object.entries({ name: 'hem', age: '25' }))
for (let info of javascripter.values()) {
  console.log(info) // hem 25
}

for (let [k, v] of Object.entries({ name: 'hem', age: '25' })) {
}

const isEmoji = (arr) => arr.every((ele) => ele > 'ÿ') // '\u00ff'

const obj = Object.fromEntries(
  new Map([
    ['name', 'hem'],
    ['age', 25],
  ])
)

const visualizeProtoChain = (o) => {
  let proto = o.constructor.prototype,
    visual = 'o'

  while (proto) {
    visual += ' -> ' + proto.constructor.name
    proto = Object.getPrototypeOf(proto)
  }

  return visual
}

let r = 10,
  A,
  u
with (Math) {
  A = PI * pow(r, 2)
  u = 2 * PI * r
}

const len = 2
const start = 1
console.log([...Array(len).keys()]) // [0, 1]
console.log(Array.from({ length: len }, (e, i) => i + start)) // [1, 2]

function printArgs(...args) {
  console.log([...arguments])
  console.log(args)
  console.log(Array.prototype.slice.call(arguments))
}
printArgs(0, null, 'arg') // [0, null, 'arg']

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

const info = ['hem', 'dev']
const man =
  (strs, ...keys) =>
  (val) =>
    `${keys[0]}${strs[0] + strs[1]}${keys[1]}${val}`
const hem = man`${info[0]} is a ${info[1]}.`
console.log(hem('.')) // hem is a dev.

$global.name = 'facebook'
const dev = {
  name: 'hem',
  hi() {
    return this.name
  },
}
const age = (26, 25)
console.log(age) // 25
console.log((0, dev.hi)()) // 'facebook' <- cut binding

const o = {
  dev: 'hem',
  magic: 'javascript',
}
let dev = 'evan'
let magic = 'vue'
;({ dev, magic } = o)
console.log(dev, magic) // hem javascript

const promise = async () => 26 // async turns return type to a Promise
promise().then(console.log) // 26

const dev = {
  name: 'hem',
  age: 25,
}
const { age, ..._dev } = dev // avoid delete keyword

const devs = ['hem', 'dan', 'evan']
const { 1: react, 2: vue } = devs
console.log(react, vue) // dan evan
