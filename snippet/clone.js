/**
 * ============
 * shallow copy
 * ============
 */

const useAssign = (target) => Object.assign({}, target)

const useSpread = (target) => ({ ...target })

const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const copycat = Array.isArray(target) ? [] : {}

    for (let prop in target) {
      // check specified property
      if (target.hasOwnProperty(prop)) {
        copycat[prop] = target[prop]
      }
    }

    // 1. for structural types
    return copycat
  }

  // 2. for primitive values
  return target
}

/**
 * =========
 * deep copy
 * =========
 */

const useJson = (target) => JSON.parse(JSON.stringify(target))

const deepClone = (target, map = new WeakMap()) => {
  if (target.constructor === Date) return new Date(target)
  if (target.constructor === RegExp) return new RegExp(target)
  if (map.has(target)) return map.get(target) // for circular reference

  let descriptors = Object.getOwnPropertyDescriptors(target) // get all properties with descriptors
  let copycat = Object.create(Object.getPrototypeOf(target), descriptors) // inherit prototype chain
  map.set(target, copycat)

  const isStructuralType = (target) =>
    (typeof target === 'object' || typeof target === 'function') &&
    target !== null

  // include innumerable and symbol
  for (let key of Reflect.ownKeys(target)) {
    copycat[key] =
      isStructuralType(target[key]) && typeof target[key] !== 'function'
        ? deepClone(target[key], map)
        : target[key]
  }

  return copycat
}
