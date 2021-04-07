class Node {
  constructor(key = null) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  add(key) {
    !this.root
      ? (this.root = new Node(key))
      : this.insertNode(this.root, new Node(key))
  }

  insertNode(target, node) {
    if (node.key < target.key) {
      !target.left ? (target.left = node) : this.insertNode(target.left, node)
      return
    }

    !target.right ? (target.right = node) : this.insertNode(target.right, node)
  }

  delete(key) {
    this.root = this.removeNode(this.root, key)
  }

  removeNode(node, key) {
    if (!node) return null

    if (node.key === key) {
      if (!node.left) return node.right
      if (!node.right) return node.left

      let cur = node.right
      while (cur.left) cur = cur.left

      cur.left = node.left
      return node.right
    }

    if (node.key < key) node.right = this.removeNode(node.right, key)
    else node.left = this.removeNode(node.left, key)

    return node
  }
}
