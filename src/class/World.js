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
    this.entities.forEach(entity => {
      if (typeof entity.update === 'function') {
        entity.update()
      }
    })
    window.requestAnimationFrame(() => {
      this.gameLoop()
    })
  }
}
