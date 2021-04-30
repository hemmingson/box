ht0: {
  var hash = (string, max) => {
    var hash = 0

    for (var i = 0; i < string.length; i++) {
      hash += string.charCodeAt(i)
    }

    return hash % max
  }

  let HashTable = function () {
    let storage = []
    const storageLimit = 4

    this.print = function () {
      console.log(storage)
    }

    this.add = function (key, value) {
      var index = hash(key, storageLimit)

      if (storage[index] === undefined) {
        storage[index] = [[key, value]]
      } else {
        var inserted = false

        for (var i = 0; i < storage[index].length; i++) {
          if (storage[index][i][0] === key) {
            storage[index][i][0] = value
            inserted = true
          }
        }

        if (inserted === false) {
          storage[index].push([key, value])
        }
      }
    }

    this.remove = function (key) {
      var index = hash(key, storageLimit)

      if (storage[index].length === 1 && storage[index][0][0] === key) {
        delete storage[index]
      } else {
        for (var i = 0; i < storage[index].length; i++) {
          if (storage[index][i][0] === key) {
            delete storage[index][i]
          }
        }
      }
    }

    this.lookup = function (key) {
      var index = hash(key, storageLimit)

      if (storage[index] === undefined) {
        return undefined
      } else {
        for (var i = 0; i < storage[index].length; i++) {
          if (storage[index][i][0] === key) {
            return storage[index][i][1]
          }
        }
      }
    }
  }
}

ht1: {
  const hash = (s, len) =>
    Array.from(s).reduce((res, c) => (13 * res * c.charCodeAt(0)) % len, 17)

  class HashTable {
    t = new Array(17)
    size = 0

    resize = () => {
      const dummy = new Array(this.t.length * 2)

      this.t.forEach((cell) => {
        !!cell &&
          cell.forEach(([k, v]) => {
            const idx = hash(k, dummy.length)
            idx ? dummy[idx].push([k, v]) : (dummy[idx] = [[k, v]])
          })
      })

      this.t = dummy
    }

    setItem = (k, v) => {
      this.size++
      const loadFactor = this.size / this.t.length
      loadFactor > 0.8 && this.resize()

      const idx = hash(k, this.t.length)
      idx ? this.t[idx].push([k, v]) : (this.t[idx] = [[k, v]])
    }

    getItem = (k) =>
      this.t[hash(k, this.t.length)].find((item) => item[0] === k)?.[1] || null
  }
}
