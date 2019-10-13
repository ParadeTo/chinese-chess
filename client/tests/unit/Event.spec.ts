import Event from '@/event'

describe('Event.ts', () => {
  it('listen event', () => {
    const event = new Event()
    event.on('test', (...args) => {
      expect(args).toEqual([1, 2])
    })
    event.emit('test', 1, 2)
  })

  it('listen events', () => {
    const event = new Event()
    event.on(['test1', 'tesst2'], (...args) => {
      expect(args).toEqual([1, 2])
    })
    event.emit('test2', 1, 2)
  })
})
