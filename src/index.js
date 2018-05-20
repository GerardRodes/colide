import World from '~/class/World'
import Platform from '~/class/Platform'
import Fighter from '~/class/Fighter'
import { viewport } from '~/utils'

import '~/main.css'

const world = new World()
const platform = new Platform()
const fighter = new Fighter()

world.spawn(platform, fighter)

const viewportThird = viewport.width() / 3
const platformWidth = viewportThird * 2
const platformHeight = platformWidth / 10

platform.setSize(platformWidth, platformHeight)
platform.setPosition(viewportThird / 2, viewport.height() / 2 - platformHeight / 2)

fighter.setSize(platformHeight, platformHeight)

const impulseMutation = 2

document.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'ArrowLeft':
      fighter.setImpulse(fighter.impulse.x - impulseMutation, fighter.impulse.y)
      break
    case 'ArrowRight':
      fighter.setImpulse(fighter.impulse.x + impulseMutation, fighter.impulse.y)
      break
    case 'ArrowDown':
      fighter.setImpulse(fighter.impulse.x, fighter.impulse.y + impulseMutation)
      break
    case 'ArrowUp':
      fighter.setImpulse(fighter.impulse.x, fighter.impulse.y - impulseMutation)
      break
  }
})

document.body.appendChild(world.$el)
window.platform = platform
