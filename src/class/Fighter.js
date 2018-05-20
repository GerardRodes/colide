import Entity from './Entity'

export default class Fighter extends Entity {
  constructor () {
    super()
    this.$el.classList.add('fighter')

    this.maxImpulse = 100
    this.impulseMutation = 3
    this.impulse = {
      x: 0,
      y: 0
    }
    this.velocity = {
      x: 0,
      y: 0
    }

    this._actions = {
      goLeft: {
        active: false,
        actived_at: 0,
        handler () {
          if (
            this._actions.goRight.active &&
            this._actions.goRight.actived_at > this._actions.goLeft.actived_at
          ) {
            return
          }
          this.setImpulse(this.impulse.x - this.impulseMutation, this.impulse.y)
        }
      },
      goRight: {
        active: false,
        actived_at: 0,
        handler () {
          if (
            this._actions.goLeft.active &&
            this._actions.goLeft.actived_at > this._actions.goRight.actived_at
          ) {
            return
          }
          this.setImpulse(this.impulse.x + this.impulseMutation, this.impulse.y)
        }
      },
      goUp: {
        active: false,
        actived_at: 0,
        handler () {
          if (
            this._actions.goDown.active &&
            this._actions.goDown.actived_at > this._actions.goUp.actived_at
          ) {
            return
          }
          this.setImpulse(this.impulse.x, this.impulse.y - this.impulseMutation)
        }
      },
      goDown: {
        active: false,
        actived_at: 0,
        handler () {
          if (
            this._actions.goUp.active &&
            this._actions.goUp.actived_at > this._actions.goDown.actived_at
          ) {
            return
          }
          this.setImpulse(this.impulse.x, this.impulse.y + this.impulseMutation)
        }
      }
    }

    this._initReactiveness()
    this.watch('size', size => {
      this.maxVelocity = Math.trunc(size.width / 2)
    })
  }

  bindActionToKey (action, keyName) {
    document.addEventListener('keydown', ({ key }) => {
      if (keyName === key) {
        this._actions[action].active = true
        this._actions[action].actived_at = new Date().getTime()
      }
    })
    document.addEventListener('keyup', ({ key }) => {
      if (keyName === key) {
        this._actions[action].active = false
      }
    })
  }

  setImpulse (x, y) {
    this.impulse = {
      x: x >= 0 ? Math.min(x, this.maxImpulse) : Math.max(x, this.maxImpulse * -1),
      y: y >= 0 ? Math.min(y, this.maxImpulse) : Math.max(y, this.maxImpulse * -1)
    }
  }

  setVelocity (x, y) {
    this.velocity = {
      x: x >= 0 ? Math.min(x, this.maxVelocity) : Math.max(x, this.maxVelocity * -1),
      y: y >= 0 ? Math.min(y, this.maxVelocity) : Math.max(y, this.maxVelocity * -1)
    }
  }

  normalizeImpulse () {
    if (this.impulse.x === 0 && this.impulse.y === 0) {
      return
    }

    this.impulse = {
      x: this._actions.goLeft.active || this._actions.goRight.active
        ? this.impulse.x
        : Math.trunc(
          this.impulse.x !== 0
            ? (Math.abs(this.impulse.x) * 0.95) * (this.impulse.x >= 0 ? 1 : -1)
            : 0
        ),
      y: this._actions.goUp.active || this._actions.goDown.active
        ? this.impulse.y
        : Math.trunc(
          this.impulse.y !== 0
            ? (Math.abs(this.impulse.y) * 0.95) * (this.impulse.y >= 0 ? 1 : -1)
            : 0
        )
    }
  }

  normalizeVelocity () {
    if (this.velocity.x === 0 && this.velocity.y === 0) {
      return
    }

    this.velocity = {
      x: Math.trunc(
        this.velocity.x !== 0
          ? (Math.abs(this.velocity.x) - 1) * (this.velocity.x >= 0 ? 1 : -1)
          : 0
      ),
      y: Math.trunc(
        this.velocity.y !== 0
          ? (Math.abs(this.velocity.y) - 1) * (this.velocity.y >= 0 ? 1 : -1)
          : 0
      )
    }
  }

  update () {
    this.normalizeImpulse()
    this.normalizeVelocity()
    for (let action in this._actions) {
      if (this._actions[action].active && typeof this._actions[action].handler === 'function') {
        this._actions[action].handler.call(this)
      }
    }
  }
}
