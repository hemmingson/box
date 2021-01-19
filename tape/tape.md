# 🗃️

1. map and set

- map

  - hash like
    - value value pair
  - object key
    - follow reference

- set
  - unique values
    - `===` except `NaN`
  - key equals value
  - iterable

```javascript
// union
new Set([...m, ...n])
// intersect
new Set([...m].filter((item) => n.has(item)))
// difference
new Set([...m].filter((item) => !n.has(item)))
```

`entries` return tuples

2. binary search

![](../assets/binary-search.png)

- `required` sorted sequence
- `time complexity` O(logn)

```javascript
let l = 0,
  r = s.length
while (l <= r) {
  const mid = (l + r) >>> 1
  if (s[mid] === target) return mid
  else if (s[mid] > target) r = mid - 1
  else l = mid + 1
}
```
