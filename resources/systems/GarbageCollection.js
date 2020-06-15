import Matter from 'matter-js';
import { Consts } from '../constants';

const GarbageCollection = (entities) => {
    let world = entities.physics.world;

    // Remove any objects that are out of bounds
    Object.keys(entities).filter(key => 
        entities[key].body && entities[key].body.position.y > Consts.MAX_HEIGHT * 2).forEach(key => {
			//We should add a flag here. Something like:
            //if(entity === squirrel) move squirrel to middle of screen.
            Matter.Composite.remove(world, entities[key].body);
            delete entities[key];
        });

    return entities;
}

export default GarbageCollection;
