export class soundSynthesizer {

    constructor() {
        this.oscillator = window.audioCtx.createOscillator();
        this.gainNode = window.audioCtx.createGain();
        this.oscillator.type = 'square';
        this.oscillator.frequency.setValueAtTime(10000, window.audioCtx.currentTime);
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(window.audioCtx.destination);
        this.gainNode.gain.setValueAtTime(0, window.audioCtx.currentTime);
        this.oscillator.start();
    }
    
    start() {
        this.gainNode.gain.setTargetAtTime(1, window.audioCtx.currentTime, 0.02);
    }
    
    stop() {
        this.gainNode.gain.setTargetAtTime(0, window.audioCtx.currentTime, 0.02);
    }

}