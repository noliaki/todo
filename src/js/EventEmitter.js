export default class EventEmitter {
  constructor() {
    this._handlers = {}
  }
  on(type, handler) {
    if (typeof this._handlers[type] === 'undefined') {
      this._handlers[type] = []
    }
    this._handlers[type].push(handler)
  }
  emit(type, data) {
    const handlers = this._handlers[type] || []

    handlers.forEach( handler => {
      handler.call(this, data)
    })
  }
}
