class Node {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  unshift(val) {
    const node = new Node(val)

    if (!this.head) this.head.next = node
    else [this.head, node.next] = [node, this.head]

    this.length++
  }

  shift() {
    if (!this.head || !this.head.next) {
      this.length = 0
      return this.head?.val
    }

    const firstNode = this.head
    this.head = this.head.next

    this.length--
    return firstNode.val
  }

  push(val) {
    const node = new Node(val)

    if (!this.head) this.head = node
    else {
      let cur = this.head
      while (cur.next) cur = cur.next
      cur.next = node
    }

    this.length++
  }

  pop() {
    if (!this.head || !this.head.next) {
      this.length = 0
      return this.head?.val
    }

    let cur = this.head
    while (cur.next.next) {
      cur = cur.next
    }

    const lastNode = cur.next
    cur.next = null

    this.length--
    return lastNode.val
  }

  indexOf(val) {
    if (!this.head) return -1

    let cur = this.head,
      count = 0
    while (cur) {
      if (cur.val === val) return count
      cur = cur.next
      count++
    }

    return -1
  }

  splice(start, count) {
    if ((!start && !count) || !this.head) {
      this.head = null
      this.length = 0
      return
    }

    let cur = this.head,
      prev = null
    for (let i = 0; i < start; i++) {
      prev = cur
      cur = cur.next
    }

    if ((!count && count !== 0) || count + start >= this.length) {
      prev.next = null
      this.length = start
      return
    }

    for (let i = 0; i < count; i++) {
      cur.val = cur.next.val
      cur.next = cur.next.next
      this.length--
    }
  }

  isEmpty() {
    return !this.length
  }

  at(idx) {
    if (idx > this.length - 1) return null

    let cur = this.head
    for (let i = 0; i < idx; i++) {
      cur = cur.next
    }

    return cur
  }

  insert(val, idx) {
    const node = new Node(val)
    if (idx > this.length - 1) idx = this.length - 1

    let cur = this.head
    for (let i = 0; i < idx - 1; i++) {
      cur = cur.next
    }

    let prev = cur
    node.next = cur.next
    prev.next = node

    this.length++
  }

  remove(idx) {
    if (idx > this.length - 1) return null

    let cur = this.head
    if (!idx) {
      this.head = cur.next
      this.length--
      return
    }

    for (let i = 0; i < idx - 1; i++) {
      cur = cur.next
    }

    cur.next = cur.next.next

    this.length--
  }
}
