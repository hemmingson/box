_0: {
  const Init = {
    learn(x) {
      if (!this.tech.includes(x)) this.tech.push(x)
    },
  }

  function Dev(name) {
    const dev = Object.create(Init)
    dev.name = name
    dev.tech = ['md']
    return dev
  }
}

_1: {
  function Dev(name) {
    this.name = name
    this.tech = ['md']
  }

  Dev.prototype.learn = function (x) {
    if (!this.tech.includes(x)) this.tech.push(x)
  }
}

_2: {
  class Dev {
    constructor(name) {
      this.name = name
      this.tech = ['md']
    }

    learn(x) {
      if (!this.tech.includes(x)) this.tech.push(x)
    }
  }
}

_00: {
  const Init = {
    grow() {
      return ++this.age
    },
  }

  function H(name, age) {
    const h = Object.create(Init)
    h.name = name
    h.age = age
    return h
  }

  function Dev(name, age) {
    const dev = H(name, age)
    dev.tech = ['md']
    Object.setPrototypeOf(
      dev,
      Object.create(Init, {
        learn: {
          value: function (x) {
            if (!this.tech.includes(x)) this.tech.push(x)
          },
        },
      })
    )
    Object.defineProperty(dev, 'exp', {
      get() {
        return this.age - 22
      },
    })
    return dev
  }
}

_01: {
  class H {
    constructor(name, age) {
      this.name = name
      this.age = age
    }

    grow() {
      return ++this.age
    }
  }

  class Dev extends H {
    constructor(name, age) {
      super(name, age)
      this.tech = ['md']
    }

    get exp() {
      return this.age - 22
    }

    learn(x) {
      if (!this.tech.includes(x)) this.tech.push(x)
    }
  }
}
