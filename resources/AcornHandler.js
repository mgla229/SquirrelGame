export default class AcornHandler {
    constructor(generationSignal) {
        this.generationSignal = generationSignal;
        this.numberOfAcorns = 0;
        this.acornHitFloor = {};
        this.acornHitSquirrel = {};
    }
}
