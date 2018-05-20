import { createElement } from '~/utils'

export default class World {
  constructor () {
    this.$el = createElement('div', { id: 'world' })
    this.entities = []
    this.listeners = {
      position (entity, position) {
        entity.$el.style.transform = `translate(${position.x}px, ${position.y}px)`
      },
      size (entity, size) {
        entity.$el.style.width = size.width + 'px'
        entity.$el.style.height = size.height + 'px'
      },
      impulse (entity, impulse) {
        console.log('impulse updated', impulse.x, impulse.y)
        entity.setPosition(
          entity.position.x + impulse.x,
          entity.position.y + impulse.y
        )
      }
    }

    this.gameLoop()
  }

  spawn (...entities) {
    entities.forEach(entity => {
      for (let key in this.listeners) {
        entity.watch(key, value => {
          this.listeners[key].call(this, entity, value)
        })
      }

      this.entities.push(entity)
      this.$el.appendChild(entity.$el)
    })
  }

  gameLoop () {
    function timestamp () {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    let now
    let dt = 0
    let last = timestamp()
    let step = 1 / 60

    const frame = () => {
      now = timestamp()
      dt = dt + Math.min(1, (now - last) / 1000)

      while (dt > step) {
        dt = dt - step
        this.update(step)
      }
      last = now
      window.requestAnimationFrame(frame)
    }

    window.requestAnimationFrame(frame)
  }

  update () {
    this.entities.forEach(entity => {
      if (typeof entity.normalizeImpulse === 'function') {
        entity.normalizeImpulse()
      }
    })
  }
}
