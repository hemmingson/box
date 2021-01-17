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
