import Matter from 'matter-js';
import { Consts } from '../constants';

const MoveSquirrel = (entities, { touches }) => {
    let poseHandler = entities.squirrel.handler;

    touches.filter(t => t.type === 'move').forEach(t => {
        if(t.delta.pageX < 0) {
            poseHandler.direction = 'left';
        }
        if(t.delta.pageX > 0) {
            poseHandler.direction = 'right';
        }
        Matter.Body.translate(entities.squirrel.body, {x: t.delta.pageX, y: 0});
        poseHandler.changePose();
    });

    touches.filter(t => t.type === 'end').forEach(t => {
        poseHandler.pose = 0;
    });

    return entities;
}

export default MoveSquirrel;
