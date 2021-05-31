/**
 * ⚙️ compiler
 * @example (add 2 (subtract 4 2))
 */

const compiler = (src) => {
  const tokens = tokenizer(src)

  const ast = parser(tokens)

  const $ast = transformer(ast)

  return generator($ast)
}

const tokenizer = (x) => {
  const tokens = []
  let cur = 0

  while (cur < x.length) {
    let c = x[cur]

    if (['(', ')'].includes(c)) {
      tokens.push({
        type: 'parenthesis',
        value: c,
      })

      ++cur

      continue
    }

    const WHITESPACE = /\s/
    if (WHITESPACE.test(c)) {
      ++cur

      continue
    }

    const NUMBERS = /[0-9]/
    if (NUMBERS.test(c)) {
      let value = ''

      while (NUMBERS.test(c)) {
        value += c

        c = x[++cur]
      }

      tokens.push({
        type: 'numeric',
        value,
      })

      continue
    }

    if (c === '"') {
      let value = ''

      c = x[++cur]

      while (c !== '"') {
        value += c

        c = x[++cur]
      }

      c = x[++cur]

      tokens.push({ type: 'string', value })

      continue
    }

    const LETTERS = /[a-z]/i
    if (LETTERS.test(c)) {
      let value = ''

      while (LETTERS.test(c)) {
        value += c

        c = x[++cur]
      }

      tokens.push({ type: 'name', value })

      continue
    }

    throw new TypeError('error')
  }

  return tokens
}

const parser = (x) => {
  let cur = 0

  const recursion = () => {
    let token = x[cur]

    if (token.type === 'numeric') {
      ++cur

      return {
        type: 'NumericLiteral',
        value: token.value,
      }
    }

    if (token.type === 'string') {
      ++cur

      return {
        type: 'StringLiteral',
        value: token.value,
      }
    }

    if (token.type === 'parenthesis' && token.value === '(') {
      token = x[++cur]

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      }

      token = x[++cur]

      while (
        token.type !== 'parenthesis' ||
        (token.type === 'parenthesis' && token.value !== ')')
      ) {
        node.params.push(recursion())

        token = x[cur]
      }

      ++cur

      return node
    }

    throw new TypeError(token.type)
  }

  const ast = {
    type: 'Program',
    body: [],
  }

  while (cur < x.length) {
    ast.body.push(recursion())
  }

  return ast
}

const traverser = (ast, visitor) => {
  const traverseArray = (arr, parent) => {
    arr.forEach((el) => {
      traverseNode(el, parent)
    })
  }

  const traverseNode = (node, parent) => {
    const methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break

      case 'CallExpression':
        traverseArray(node.params, node)
        break

      case 'NumericLiteral':

      case 'StringLiteral':
        break

      default:
        throw new TypeError(node.type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast, null)
}

const transformer = (ast) => {
  const dummy = {
    type: 'Program',
    body: [],
  }

  ast._context = dummy.body

  traverser(ast, {
    NumericLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumericLiteral',
          value: node.value,
        })
      },
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        })
      },
    },

    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        }

        node._context = expression.arguments

        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression,
          }
        }

        parent._context.push(expression)
      },
    },
  })

  return dummy
}

const generator = (node) => {
  switch (node.type) {
    case 'Program':
      return node.body.map(generator).join('\n')

    case 'ExpressionStatement':
      return generator(node.expression) + ';'

    case 'CallExpression':
      return `${generator(node.callee)}(${node.arguments
        .map(generator)
        .join(', ')})`

    case 'Identifier':
      return node.name

    case 'NumericLiteral':
      return node.value

    case 'StringLiteral':
      return `$[node.value]`

    default:
      throw new TypeError(node.type)
  }
}
