import Entity from './Entity'

export default class Fighter extends Entity {
  constructor () {
    super()
    this.$el.classList.add('fighter')
    this.impulse = {
      x: 0,
      y: 0
    }

    this._initReactiveness()
  }

  setImpulse (x, y) {
    const maxImpulseX = Math.trunc(this.size.width / 2)
    const maxImpulseY = Math.trunc(this.size.height / 2)

    this.impulse = {
      x: x >= 0 ? Math.min(x, maxImpulseX) : Math.max(x, maxImpulseX * -1),
      y: y >= 0 ? Math.min(y, maxImpulseY) : Math.max(y, maxImpulseY * -1)
    }
  }

  normalizeImpulse () {
    if (this.impulse.x === 0 && this.impulse.y === 0) {
      return
    }

    this.impulse = {
      x: Math.trunc(
        this.impulse.x !== 0
          ? (Math.abs(this.impulse.x) - 1) * (this.impulse.x >= 0 ? 1 : -1)
          : 0
      ),
      y: Math.trunc(
        this.impulse.y !== 0
          ? (Math.abs(this.impulse.y) - 1) * (this.impulse.y >= 0 ? 1 : -1)
          : 0
      )
    }
  }

  update () {
    this.normalizeImpulse()
  }
}
