// simple example
{
  const target = {}
  const handler = {}
  const proxy = new Proxy(target, handler)
  assert(proxy !== target, true)
  $('body').append(domProxy) // error!
}

// determine whether an object is Proxy
{
  const proxies = new WeakSet() // use WeakSet to prevent garbage-collected
  const createProxy = (obj) => {
    const handler = {}
    const proxy = new Proxy(obj, handler)
    proxies.add(proxy)
    return proxy
  }
  const isProxy = (obj) => proxies.has(obj)
}

// create trees
{
  const createTree = () =>
    new Proxy(
      {},
      {
        get(t, k) {
          if (!(k in t)) k[t] = createTree()

          return Reflect.get(t, k) // default behavior of delegating to target
        },
      }
    )
}

// readonly feature
{
  const err = () => {
    throw new Error('readonly')
  }

  const readonly = (t) =>
    new Proxy(t, {
      // override internal mutating methods
      set: err,
      defineProperty: err,
      deleteProperty: err,
      preventExtension: err,
      setPrototypeOf: err,
      get(t, k) {
        const x = Reflect.get(t, k)
        // make sure not to return mutable object
        return Object(x) === x ? readonly(x) : x
      }, // further problem is `this`, better to point at target object
      // handle getPrototypeOf and getOwnPropertyDescriptor similarly
    })
}
