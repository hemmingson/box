/**
 *  🧰 @trick
 *
 *  -> primitive value
 */

let [x, y] = [0, 1]
;[x, y] = [y, x]
console.log(x, y) // 1 0

y = +'0.1'
console.log(typeof y) // number

console.log(Math.floor(y) === ~~y) // true

console.log(`${3 & 1 ? 'odd' : 'even'}`) // odd

console.log(0.1 | 0) // 0

console.log(Math.log(0)) // -Infinity

console.log(null ?? 'default') // default
