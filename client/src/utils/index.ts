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

export class CancelablePromise<T> {
  /**
   * 构造器
   * @param executor Promise中的 executor
   * @param abortSignal AbortController中的signal对象
   * @returns
   */
  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void,
    abortSignal: AbortSignal
  ) {
    // 记录reject和resolve方法
    let _reject: any = null
    let _resolve: any = null
    let _isExecResolve = false // 创建和执行Promise
    let _isAbort = false
    const cancelablePromise = new Promise<T>((resolve, reject) => {
      _reject = reject
      _resolve = (value: T) => {
        _isExecResolve = true
        resolve(value)
      }
      return executor(_resolve, reject)
    }) // 监听Signal的abourt事件
    abortSignal.addEventListener('abort', () => {
      _isAbort = true
      if (_isExecResolve) {
        return
      } // 抛出错误
      const error = new DOMException('user cancel promise', CancelablePromise.CancelExceptionName)
      _reject(error)
    })
    return cancelablePromise
  } // 取消后抛出的异常名称
  static CancelExceptionName = 'CancelablePromise AbortError'
}
