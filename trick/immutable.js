/**
 *  📦 @trick
 *
 *  -> primitive value
 */

let [x, y] = [0, 1]
;[x, y] = [y, x]
console.log(x, y) // 1 0

y = +'0.1'
console.log(typeof y) // number

console.log(Math.floor(y) === ~~y) // true
