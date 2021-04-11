/**
 *  🧰 @trick
 *
 *  -> primitive value
 */

let [x, y] = [0, 1]
;[x, y] = [y, x]
console.log(x, y) // 1 0
x = (y += x -= y) - x
console.log(x, y) // 0 1

y = +'0.1'
console.log(typeof y) // number

console.log(Math.floor(y) === ~~y) // true

console.log(`${3 & 1 ? 'odd' : 'even'}`) // odd

console.log(0.1 | 0) // 0

console.log(Math.log(0)) // -Infinity

console.log(null ?? 'default') // default

Number.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i <= this; i++) {
    yield i
  }
}
console.log([...2]) // [0, 1, 2]

const freeze = (obj) => {
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const val = obj[prop]

    if (
      obj.hasOwnProperty(prop) &&
      val &&
      ['object', 'function'].includes(typeof val) &&
      !Object.isFrozen(val)
    )
      freeze(val)
  })

  return Object.freeze(obj)
}
