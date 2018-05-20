export default class Reactive {
  constructor () {
    this._watchers = {}
    this._reactive = {}
  }

  _initReactiveness () {
    const copy = { ...this }

    for (let key in this) {
      if (!key.startsWith('_') && !key.startsWith('$') && this.hasOwnProperty(key)) {
        Object.defineProperty(this, key, {
          get: () => {
            return this._reactive[key]
          },
          set: value => {
            this._set(this, key, value)
          },
          enumerable: true,
          configurable: true
        })

        this[key] = copy[key]
      }
    }
  }

  _set (item, key, value) {
    this._reactive[key] = value
    this._emit(key, value)
  }

  _emit (key, value) {
    if (typeof this._watchers[key] === 'undefined') {
      return
    }

    this._watchers[key].forEach(watcher => {
      watcher(value)
    })
  }

  watch (key, fn) {
    if (typeof this._watchers[key] === 'undefined') {
      this._watchers[key] = []
    }

    this._watchers[key].push(fn)
  }
}
