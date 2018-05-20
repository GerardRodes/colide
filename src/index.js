import World from '~/class/World'
import Platform from '~/class/Platform'
import Fighter from '~/class/Fighter'
import { viewport } from '~/utils'

import '~/main.css'

const world = new World()
const platform = new Platform('platform')
const fighter = new Fighter('fighter')

world.spawn(platform, fighter)

platform.watch('size', size => {
  fighter.maxVelocity = Math.trunc(size.width / 50)
})

const setSizes = () => {
  const viewportThird = viewport.width() / 3
  const platformWidth = Math.min(viewportThird * 2, 1000)
  const platformHeight = platformWidth / 20

  platform.setSize(platformWidth, platformHeight)
  platform.setPosition(viewport.width() / 2 - platformWidth / 2, viewport.height() / 2 - platformHeight / 2)

  fighter.setSize(platformHeight, platformHeight)
}
setSizes()
window.addEventListener('resize', setSizes)

fighter.bindActionToKey('goUp', 'ArrowUp')
fighter.bindActionToKey('goRight', 'ArrowRight')
fighter.bindActionToKey('goLeft', 'ArrowLeft')
fighter.bindActionToKey('goDown', 'ArrowDown')

document.body.appendChild(world.$el)
window.world = world
