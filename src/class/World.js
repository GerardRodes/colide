import { createElement, viewport } from '~/utils'

export default class World {
  constructor () {
    this.$el = createElement('div', { id: 'world' })
    this.entities = []

    const positionX = createElement('x: ')
    const positionY = createElement('y: ')
    const impulseX = createElement('x: ')
    const impulseY = createElement('y: ')
    const velocityX = createElement('x: ')
    const velocityY = createElement('y: ')
    this._data = {
      root: createElement('div', { id: 'data' }, [
        ['fighter'],
        ['div', {}, [
          ['position'],
          ['br', {}],
          positionX,
          ['br', {}],
          positionY
        ]],
        ['div', {}, [
          ['impulse'],
          ['br', {}],
          impulseX,
          ['br', {}],
          impulseY
        ]],
        ['div', {}, [
          ['velocity'],
          ['br', {}],
          velocityX,
          ['br', {}],
          velocityY
        ]]
      ]),
      position: {
        x: positionX,
        y: positionY
      },
      impulse: {
        x: impulseX,
        y: impulseY
      },
      velocity: {
        x: velocityX,
        y: velocityY
      }
    }
    this.$el.appendChild(this._data.root)

    this.listeners = {
      position (entity, position) {
        this._data.position.x.nodeValue = 'x: ' + Math.trunc(position.x)
        this._data.position.y.nodeValue = 'y: ' + Math.trunc(position.y)
        entity.$el.style.transform = `translate(${position.x}px, ${position.y}px)`
      },
      size (entity, size) {
        entity.$el.style.width = size.width + 'px'
        entity.$el.style.height = size.height + 'px'
      },
      impulse (entity, impulse) {
        this._data.impulse.x.nodeValue = 'x: ' + impulse.x.toFixed(2)
        this._data.impulse.y.nodeValue = 'y: ' + impulse.y.toFixed(2)

        entity.setVelocity(
          entity.maxVelocity * impulse.x / 100,
          entity.maxVelocity * impulse.y / 100
        )
      },
      velocity (entity, velocity) {
        this._data.velocity.x.nodeValue = 'x: ' + Math.trunc(velocity.x)
        this._data.velocity.y.nodeValue = 'y: ' + Math.trunc(velocity.y)

        const newPositionX = entity.position.x + velocity.x
        const newPositionY = entity.position.y + velocity.y

        entity.setPosition(
          newPositionX >= 0 ? Math.min(newPositionX, viewport.width() - entity.size.width) : 0,
          newPositionY >= 0 ? Math.min(newPositionY, viewport.height() - entity.size.height) : 0
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
