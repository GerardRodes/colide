import { createElement } from '~/utils'

export default class World {
  constructor () {
    this.$el = createElement('div', { id: 'world' })
    this.entities = []
  }

  spawn (...entities) {
    entities.forEach(entity => {
      this.$el.appendChild(entity.$el)
      this.entities.push(entity)
    })
  }
}
