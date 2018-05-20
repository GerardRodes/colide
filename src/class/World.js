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
        const newX = Math.trunc(position.x)
        const newY = Math.trunc(position.y)
        this._data.position.x.nodeValue = 'x: ' + newX
        this._data.position.y.nodeValue = 'y: ' + newY
        entity.$el.style.transform = `translateZ(0) scale(1.0, 1.0) translate(${newX}px, ${newY}px)`
      },
      size (entity, size) {
        entity.$el.style.width = Math.trunc(size.width) + 'px'
        entity.$el.style.height = Math.trunc(size.height) + 'px'
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
        this._data.velocity.x.nodeValue = 'x: ' + velocity.x.toFixed(2)
        this._data.velocity.y.nodeValue = 'y: ' + velocity.y.toFixed(2)

        let newPositionX = entity.position.x + velocity.x
        let newPositionY = entity.position.y + velocity.y

        const collisions = this.detectCollisions(entity, newPositionX, newPositionY)
        collisions.forEach((collision, index) => {
          if (collisions.length > 1) {
            if (index > 0) {
              const a = {
                x: newPositionX,
                y: newPositionY,
                ...entity.size
              }

              if (!this.collide(a, collision.coor)) {
                return
              }
            }
          }

          switch (collision.at) {
            case 'top':
              entity.impulse.y = 0
              newPositionY = collision.with.position.y - entity.size.height
              break
            case 'bottom':
              entity.impulse.y = 0
              newPositionY = collision.with.position.y + collision.with.size.height
              break
            case 'left':
              entity.impulse.x = 0
              newPositionX = collision.with.position.x - entity.size.width
              break
            case 'right':
              entity.impulse.x = 0
              newPositionX = collision.with.position.x + collision.with.size.width
              break
          }
        })

        entity.setPosition(
          newPositionX >= 0 ? Math.min(newPositionX, viewport.width() - entity.size.width) : 0,
          newPositionY >= 0 ? Math.min(newPositionY, viewport.height() - entity.size.height) : 0
        )
      }
    }

    this.gameLoop()
  }

  detectCollisions (entity, newX, newY) {
    const collisions = []
    const a = {
      x: newX,
      y: newY,
      ...entity.size
    }

    this.entities.forEach(anotherEntity => {
      if (entity._id === anotherEntity._id) {
        return
      }

      const b = {
        ...anotherEntity.position,
        ...anotherEntity.size
      }

      if (this.collide(a, b)) {
        const realA = {
          ...entity.size,
          ...entity.position
        }
        let coor = {...b, y: b.y - b.height - a.height / 2}
        if (this.collide(realA, coor)) {
          collisions.push({
            at: 'top',
            with: anotherEntity,
            area: this.intersectArea(realA, {...b, y: b.y - b.height}),
            coor: { ...coor }
          })
        }

        coor = {...b, y: b.y + b.height + a.height / 2}
        if (this.collide(realA, coor)) {
          collisions.push({
            at: 'bottom',
            with: anotherEntity,
            area: this.intersectArea(realA, {...b, y: b.y + b.height}),
            coor: { ...coor }
          })
        }

        coor = {...b, x: b.x - b.width - a.width / 2}
        if (this.collide(realA, coor)) {
          collisions.push({
            at: 'left',
            with: anotherEntity,
            area: this.intersectArea(realA, {...b, x: b.x - b.width}),
            coor: { ...coor }
          })
        }

        coor = {...b, x: b.x + b.width + a.width / 2}
        if (this.collide(realA, coor)) {
          collisions.push({
            at: 'right',
            with: anotherEntity,
            area: this.intersectArea(realA, {...b, x: b.x + b.width}),
            coor: { ...coor }
          })
        }
      }
    })

    return collisions
      .filter(collision => collision.area > 0)
      .sort((a, b) => a.area <= b.area)
  }

  collide (a, b) {
    return !(
      ((a.y + a.height) < (b.y)) ||
      (a.y > (b.y + b.height)) ||
      ((a.x + a.width) < b.x) ||
      (a.x > (b.x + b.width))
    )
  }

  intersectArea (a, b) {
    return (
      Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
      Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
    )
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
        entity.setImpulse(
          entity.impulse.x,
          entity.impulse.y + 8
        )
      }
    })

    window.requestAnimationFrame(() => {
      this.gameLoop()
    })
  }
}
