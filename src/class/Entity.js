import Reactive from '~/class/Reactive'
import { createElement } from '~/utils'

export default class Entity extends Reactive {
  constructor () {
    super()
    this.$el = createElement('div', { class: 'entity' })
    this.position = { x: 0, y: 0 }
    this.size = { width: 0, height: 0 }
  }

  setPosition (x, y) {
    this.position = { x, y }
  }

  setSize (width, height) {
    this.size = { width, height }
  }
}
