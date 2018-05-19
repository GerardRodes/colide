import Entity from './Entity'

export default class Platform extends Entity {
  constructor () {
    super()
    this.x = 10
    this.y = 10
    this.width = 100
    this.height = 10

    this.$el.classList.add('platform')
  }
}
