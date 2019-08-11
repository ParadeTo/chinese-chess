export default class Event {
  private events: {
    [k: string]: ((...args: any[]) => void)[]
  }

  constructor() {
    this.events = {}
  }

  on(event: string | string[], fn: (...args: any[]) => void) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.on(event[i], fn)
      }
    } else {
      (this.events[event] || (this.events[event] = [])).push(fn)
    }
    return this
  }

  emit (event: string, ...restArgs: any[]) {
    let cbs = this.events[event]
    if (cbs) {
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i](...restArgs)
      }
    }
  }

  // cls.prototype.once = function (event, fn) {
  //   const me = this
  //   function on () {
  //     me.off(event, on)
  //     fn.apply(me, arguments)
  //   }
  //   on.fn = fn
  //   me.on(event, on)
  //   return me
  // }

  // cls.prototype.off = function (event, fn) {
  //   const me = this
  //   if (!arguments.length) {
  //     me._events = Object.create(null)
  //     return me
  //   }

  //   if (Array.isArray(event)) {
  //     for (let i = 0, l = event.length; i < l; i++) {
  //       this.off(event[i], fn)
  //     }
  //     return me
  //   }

  //   const cbs = me._events[event]
  //   if (!cbs) {
  //     return me
  //   }
  //   if (!fn) {
  //     me._events[event] = null
  //     return me
  //   }
  //   if (fn) {
  //     let cb
  //     let i = cbs.length
  //     while (i--) {
  //       cb = cbs[i]
  //       if (cb === fn || cb.fn === fn) {
  //         cbs.splice(i, 1)
  //         break
  //       }
  //     }
  //   }
  //   return me
  // }
}
