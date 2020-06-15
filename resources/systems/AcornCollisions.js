import Matter from 'matter-js';
import { Consts } from '../constants';

const AcornHitsSquirrel = (entities) => {
    let squirrelSize = Consts.SQUIRREL_SIZE;
    let world = entities.physics.world;
    let acornHandler = entities.acorn.handler;

    Object.keys(entities).filter(key => entities[key].body).forEach(key => {
        let acornId = entities[key].body.id;

        // Handle acorn hitting squirrel
        if(acornHandler.acornHitSquirrel[acornId]) {
            if (entities[key].body.position.y < entities.squirrel.body.position.y - squirrelSize/2) {
                entities.scoreBoard.score++;
                Matter.Composite.remove(world, entities[key].body);
                delete entities[key];
            }
            else {
                Matter.Body.applyForce(entities[key].body, 
                                       entities[key].body.position, 
                                       {x: 0.005 * Matter.Common.choose([1,-1]), y: -0.003});
            }
            delete acornHandler.acornHitSquirrel[acornId];
        }
    });

    return entities;
}

const AcornHitsFloor = (entities) => {
    let acornHandler = entities.acorn.handler;

    Object.keys(entities).filter(key => entities[key].body).forEach(key => {
        let acornId = entities[key].body.id;
        let bounceDirection = Matter.Common.choose([1,-1]);

        // Bounce acorn when hitting floor
        if(acornHandler.acornHitFloor[acornId]) {
            Matter.Body.applyForce(entities[key].body, 
                                   entities[key].body.position, 
                                   {x: 0.003 * bounceDirection, y: -0.02});
            entities[key].body.torque = 0.02 * bounceDirection;
            entities[key].body.collisionFilter.mask = Consts.CollisionCategorySquirrel; 
            delete acornHandler.acornHitFloor[acornId];
        }

    });

    return entities;
}

export { AcornHitsSquirrel, AcornHitsFloor };
