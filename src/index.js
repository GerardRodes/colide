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
const platformWidth = Math.min(viewportThird * 2, 1000)
const platformHeight = platformWidth / 20

platform.setSize(platformWidth, platformHeight)
platform.setPosition(viewport.width() / 2 - platformWidth / 2, viewport.height() / 2 - platformHeight / 2)

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
