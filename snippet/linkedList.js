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
}
