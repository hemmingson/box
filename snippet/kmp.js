const kmp = (s, p) => {
  const l = p.length,
    t = Array(l).fill(0)

  {
    let i = 1,
      j = 0

    while (i < l) {
      if (p[i] === p[j]) {
        t[i++] = ++j
      } else if (j) j = t[j - 1]
      else i++
    }
  }

  {
    let i = 0,
      j = 0

    while (i < s.length) {
      if (s[i] === p[j]) {
        if (j === l - 1) return true

        i++, j++
      } else if (j) j = t[j - 1]
      else i++
    }
  }

  return false
}
