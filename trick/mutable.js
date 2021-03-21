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
