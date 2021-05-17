/**
 * =============================
 * 🌀 javascript object notation
 * =============================
 * @method stringify javascript -> json
 * @method parse json -> javascript
 */

//#region basic
const hem = {
  age: 25,
  gender: 'male',
  bloodGroup: 'AB',
  constellation: 'scorpio',
  occupation: 'javascripter',
  ignore() {
    return 'undefined, functions, symbols are not valid json values'
  },
}

let filterArray = ['age'],
  tabSize = ''

let grow = (key, value) => {
  if (key === 'age') value++

  return value
}

console.log(JSON.stringify(hem, filterArray, tabSize)) // {"age":25}
console.log(JSON.stringify(hem, grow, tabSize)) // {"age":26,...}

hem.toJSON = function () {
  return `hem is a ${this.occupation}`
}
console.log(JSON.stringify(hem)) // hem is a javascripter
//#endregion

const o = {
    0: {
      0: 'itm1',
      1: 'itm2',
    },
    1: {
      1: 'itm2',
      0: 'itm1',
    },
    2: {
      t: 'o',
      m: true,
    },
    3: {
      t: 'o',
      m: true,
    },
    4: {
      m: true,
      t: 'o',
    },
  },
  o0 = {
    0: 'itm1',
    1: 'itm2',
  }

console.log(JSON.stringify(o).indexOf(JSON.stringify(o0)) !== -1) // true

console.log(
  JSON.stringify(o[2]) === JSON.stringify(o[3]),
  JSON.stringify(o[0]) === JSON.stringify(o[1]),
  JSON.stringify(o[3]) === JSON.stringify(o[4])
) // true true false

const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorage = (key) => {
  const value = window.localStorage.getItem(key)

  return JSON.parse(value)
}

// trap 🕳️
let trap = {
  n0: NaN,
  n1: Infinity,

  f() {
    return 0
  },
  s: Symbol('s'),

  e: Object.create(null, { p: { value: 0, enumerable: false } }),
}

console.log(JSON.stringify(trap)) // {"n0":null,"n1":null,"e":{}}

let baz = {},
  circle = {
    foo: {
      bar: baz,
    },
  }
baz.qux = circle

console.log(JSON.stringify(circle)) // error
