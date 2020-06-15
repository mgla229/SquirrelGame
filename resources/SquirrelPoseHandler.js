export default class SquirrelPoseHandler {
    constructor(tickTime) {
        this.tickTime = tickTime;
        this.tick = 0;
        this.pose = 0;
        this.direction = 'left';
    }

    changePose = () => {
        this.tick++;
        if(this.tick % this.tickTime === 0){
            this.pose = (this.pose + 1) % 3;
        }
    }
}
