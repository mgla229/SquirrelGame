import { Consts } from './constants';

export default class LevelTimerSingleton {
    static instance;

    constructor() {
        if(LevelTimerSingleton.instance) {
            return LevelTimerSingleton.instance;
        }
        LevelTimerSingleton.instance = this;
        this.time = Consts.TIME_START;
        this.interval = null;
    }

    startTimer = () => {
        this.interval = setInterval(
            () => {
                if(this.time > 0) this.time--;
                else {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            }, 1000);
    }

    stopTimer = () => {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.time = Consts.TIME_START;
    }

    resetTimer = () => {
        this.stopTimer();
        this.startTimer();
    }

}
