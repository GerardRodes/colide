import World from '~/class/World'
import Platform from '~/class/Platform'

const world = new World()
world.spawn(new Platform())

document.body.appendChild(world.$el)
