import Entity from './Entity'

export default class Platform extends Entity {
  constructor () {
    super()
    this.$el.classList.add('platform')
    this._initReactiveness()
  }
}
