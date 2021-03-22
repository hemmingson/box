const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const copycat = Array.isArray(target) ? [] : {}

    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        copycat[prop] = target[prop]
      }
    }

    return copycat
  }

  return target
}

const deepClone = (target, map = new WeakMap()) => {
  if (target.constructor === Date) return new Date(target)
  if (target.constructor === RegExp) return new RegExp(target)
  if (map.has(target)) return map.get(target)

  let descriptors = Object.getOwnPropertyDescriptors(target)
  let copycat = Object.create(Object.getPrototypeOf(target), descriptors)
  map.set(target, copycat)

  const isComplexDataType = (target) =>
    (typeof target === 'object' || typeof target === 'function') &&
    target !== null

  for (let key of Reflect.ownKeys(target)) {
    copycat[key] =
      isComplexDataType(target[key]) && typeof target[key] !== 'function'
        ? deepClone(target[key], map)
        : target[key]
  }

  return copycat
}
