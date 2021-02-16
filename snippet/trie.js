class Trie {
  constructor() {
    this.root = {}
  }

  insert(word) {
    let node = this.root

    for (let c of word) {
      if (!node[c]) node[c] = {}

      node = node[c]
    }

    node.isEnd = true
  }

  traverse(word) {
    let node = this.root

    for (let c of word) {
      if (!node[c]) return null

      node = node[c]
    }

    return node
  }

  search(word) {
    const node = this.traverse(word)

    return !!(node && node.isEnd)
  }

  startsWith(prefix) {
    return !!this.traverse(prefix)
  }
}
