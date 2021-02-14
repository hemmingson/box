var Trie = function () {
  this.root = {}
}

Trie.prototype.insert = function (word) {
  let node = this.root

  word.split('').forEach((char) => {
    if (!node[char]) node[char] = {}

    node = node[char]
  })

  node.isEnd = true
}

Trie.prototype.search = function (word) {
  const node = this.searchNode(word)

  return !!(node && node.isEnd)
}

Trie.prototype.startsWith = function (prefix) {
  const node = this.searchNode(prefix)
  return !!node
}

Trie.prototype.searchNode = function (word) {
  let node = this.root

  for (const char of word.split('')) {
    if (!node[char]) return null

    node = node[char]
  }
}
