export function deepClone(source: any): any {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(k => {
    if (source[k] && typeof source[k] === 'object') {
      ;(targetObj as { [k: string]: any })[k] = deepClone(source[k])
    } else {
      ;(targetObj as { [k: string]: any })[k] = source[k]
    }
  })
  return targetObj
}

export function deepEq(a: any, b: any) {
  const className = Object.prototype.toString.call(a)
  if (className !== Object.prototype.toString.call(b)) return false

  switch (className) {
    case '[object String]':
    case '[object Number]':
    case '[object Boolean]':
    case '[object Null]':
      return a === b
  }

  let len
  if (className === '[object Array]') {
    len = a.length
    if (len !== b.length) return false
    while (len--) {
      if (!deepEq(a[len], b[len])) return false
    }
  } else {
    const keys = Object.keys(a)
    let key
    len = keys.length

    if (Object.keys(b).length !== len) return false
    while (len--) {
      key = keys[len]
      if (!(b.hasOwnProperty(key) && deepEq(a[key], b[key]))) return false
    }
  }

  return true
}
