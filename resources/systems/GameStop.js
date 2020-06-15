import Matter from 'matter-js';

const GameStop = (entities, ref) => {
    if(entities.scoreBoard.score >= 50) {
        ref.dispatch({ type: 'success' });
    }
    if(entities.timer.levelTimer.time <= 0) {
        ref.dispatch({ type: 'game-over' });
    }
    return entities;
}

export default GameStop;
