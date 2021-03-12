const box = document.getElementById('box')
const light = ['red', 'yellow', 'green']
const time = [5, 2, 10]
let pos = -1

const render = () => {
  light.map((o) => {
    const div = document.createElement('div')
    div.setAttribute('color', `${o}`)
    div.classList.add('light')
    box.appendChild(div)
  })
}

const change = () => {
  pos++
  if (pos > 2) pos = 0
  const list = document.querySelectorAll('.light')
  list[pos].classList.add(list[pos].getAttribute('color'))
  clear(list[pos])
}

const clear = (o) => {
  let list = Array.from(document.getElementsByClassName('light'))
  list = list.filter((node) => node !== o)
  list.map((node) => node.classList.remove(node.getAttribute('color')))
}

const first = () => {
  change()
  setTimeout(() => {
    change()
    setTimeout(() => {
      change()
      setTimeout(first, 10000)
    }, 2000)
  }, 5000)
}

const second = () => {
  return new Promise(() => {
    _change(5000)
      .then(() => _change(2000))
      .then(() => _change(10000))
      .then(second)
  })
}

const _change = (dur) => {
  return new Promise((resolve) => {
    change()
    sleep(dur).then(resolve)
  })
}

const third = async () => {
  for (let i = 0; i < light.length; i++) {
    change()
    await sleep(time[pos] * 1000)
  }
  third()
}

function* forth() {
  while (1) {
    change()
    yield sleep(5000)
    change()
    yield sleep(2000)
    change()
    yield sleep(10000)
  }
}

const _filter = (iter) => {
  const { value, done } = iter.next()
  if (done) return
  if (value instanceof Promise) value.then(() => _filter(iter))
}

const go = (gen) => _filter(gen())

const go4 = () => go(forth)

const sleep = (dur) => {
  return new Promise((resolve) => {
    setTimeout(resolve, dur)
  })
}

const engine = (f) => f.map((f) => f())

console.log('%c hello 🚥 ', 'background: #adefd1; color: #00203f')
engine([render, third])
