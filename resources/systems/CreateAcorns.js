import AcornRenderer from '../renderers/AcornRenderer';
import Matter from 'matter-js';
import { Consts } from '../constants';

const CreateAcorns = (entities, { time }) => {
    let engine = entities.physics.engine;
    let world = entities.physics.world;
    let acornHandler = entities.acorn.handler;

    // Create acorns
    let acornSignal = time.current % (acornHandler.generationSignal + 1);
    if(acornSignal === acornHandler.generationSignal) {
        let acornSize = Consts.ACORN_SIZE;
        let spawnPointPositionX = Matter.Common.random(acornSize/2, Consts.MAX_WIDTH - acornSize/2);
        let acornBody = Matter.Bodies.rectangle(spawnPointPositionX, 0, acornSize, acornSize, {
        collisionFilter: { 
            category: Consts.CollisionCategoryAcorn,
            mask: Consts.CollisionCategoryFloor | Consts.CollisionCategorySquirrel
        }});

        Matter.World.add(world, [acornBody]);

        // Handle collisions
        Matter.Events.on(engine, 'collisionStart', (event) => {
            let pairs = event.pairs;
            for(let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                let acornId = null;
                if(pair.bodyA === acornBody) acornId = pair.bodyA.id;
                if(pair.bodyB === acornBody) acornId = pair.bodyB.id;
                let involvesFloor = pair.bodyA === entities.floor.body || 
                                    pair.bodyB === entities.floor.body;
                let involvesSq = pair.bodyA === entities.squirrel.body || 
                                 pair.bodyB === entities.squirrel.body;
                if(involvesFloor && acornId) acornHandler.acornHitFloor[acornId] = true;
                if(involvesSq && acornId) acornHandler.acornHitSquirrel[acornId] = true;
            }
        });

        entities[++acornHandler.numberOfAcorns] = { body: acornBody, 
                                              size: [acornSize, acornSize], 
                                              renderer: AcornRenderer };
    }

    return entities;
}

export default CreateAcorns; 
