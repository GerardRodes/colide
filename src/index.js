import World from '~/class/World'
import Platform from '~/class/Platform'
import Fighter from '~/class/Fighter'
import { viewport } from '~/utils'

import '~/main.css'

const world = new World()
const platform = new Platform('platform')
const fighterOne = new Fighter('fighter-1')
const fighterTwo = new Fighter('fighter-2')

world.spawn(platform, fighterOne, fighterTwo)

platform.watch('size', size => {
  fighterOne.maxVelocity = Math.trunc(size.width / 50)
  fighterTwo.maxVelocity = Math.trunc(size.width / 50)
})

const setSizes = () => {
  const viewportThird = Math.trunc(viewport.width() / 3)
  const platformWidth = Math.trunc(Math.min(viewportThird * 2, 1000))
  const platformHeight = Math.trunc(platformWidth / 20)

  platform.setSize(platformWidth, platformHeight)
  platform.setPosition(
    Math.trunc(viewport.width() / 2 - platformWidth / 2),
    Math.trunc(viewport.height() / 2 - platformHeight / 2)
  )

  fighterOne.setPosition(
    Math.trunc(viewport.width() / 2 - platformWidth / 4) - platformHeight / 2,
    Math.trunc(viewport.height() / 2 - platformHeight * 10)
  )

  fighterTwo.setPosition(
    Math.trunc(viewport.width() / 2 + platformWidth / 4) - platformHeight / 2,
    Math.trunc(viewport.height() / 2 - platformHeight * 10)
  )

  fighterOne.setSize(platformHeight, platformHeight)
  fighterTwo.setSize(platformHeight, platformHeight)
}
setSizes()
window.addEventListener('resize', setSizes)

fighterOne.bindActionToKey('jump', 'ArrowUp')
fighterOne.bindActionToKey('goRight', 'ArrowRight')
fighterOne.bindActionToKey('goLeft', 'ArrowLeft')

fighterTwo.bindActionToKey('jump', 'w')
fighterTwo.bindActionToKey('goRight', 'd')
fighterTwo.bindActionToKey('goLeft', 'a')

document.body.appendChild(world.$el)
window.world = world
