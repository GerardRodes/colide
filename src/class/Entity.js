import { createElement } from '~/utils'

export default class Entity {
  constructor () {
    this.$el = createElement('div', { class: 'entity' })
    this.position = { x: null, y: null }
    this.size = { width: null, height: null }
  }

  set x (x) {
    this.position.x = x
  }

  get x () {
    return this.position.x
  }

  set y (y) {
    this.position.y = y
  }

  get y () {
    return this.position.y
  }

  set width (width) {
    this.size.width = width
  }

  get width () {
    return this.size.width
  }

  set height (height) {
    this.size.height = height
  }

  get height () {
    return this.size.height
  }
}
