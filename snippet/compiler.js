// ⚙️ compiler

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

      tokens.push({ type: 'content', value })

      continue
    }

    throw new TypeError('error')
  }

  return tokens
}

const parser = (x) => {
  let cur = 0

  const recursion = () => {
    let { type, value } = x[cur]

    if (type === 'numeric') {
      ++cur

      return {
        type: 'NumericLiteral',
        value,
      }
    }

    if (type === 'string') {
      ++cur

      return {
        type: 'StringLiteral',
        value,
      }
    }

    if (type === 'parenthesis' && value === '(') {
      token = tokens[++cur]

      let node = {
        type: 'CallExpression',
        content: token.value,
        params: [],
      }

      token = tokens[++cur]

      while (type !== 'parenthesis') {
        node.params.push(recursion())

        token = tokens[cur]
      }

      ++cur

      return node
    }

    throw new TypeError(token.type)
  }
}
