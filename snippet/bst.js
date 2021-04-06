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
    const dummy = new Node(key)

    !this.root ? (this.root = node) : this.addNode(this.root, dummy)
  }

  addNode(node, newNode) {
    if (newNode.key < node.key) {
      !node.left ? (node.left = newNode) : this.addNode(node.left, newNode)
      return
    }

    !node.right ? (node.right = newNode) : this.addNode(node.right, newNode)
  }

  delete(key) {
    this.root = this.deleteNode(this.root, key)
  }

  deleteNode(node, key) {
    if (!node) return null

    if (key < node.key) {
      node.left = this.deleteNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this.deleteNode(node.right, key)
      return node
    } else {
      if (!node.left && !node.right) {
        node = null
        return node
      } else if (!node.left) {
        node = node.right
        return node
      } else if (!node.right) {
        node = node.left
        return node
      }

      const dummy = this.min(node.right)
      node.key = dummy.key

      node.right = this.deleteNode(node.right, dummy.key)
      return node
    }
  }

  min(node) {
    if (!node.left) return node

    return this.min(node.left)
  }
}
