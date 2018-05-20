import Entity from './Entity'

export default class Platform extends Entity {
  constructor (id) {
    super(id)
    this.$el.classList.add('platform')
    this._initReactiveness()
  }
}
