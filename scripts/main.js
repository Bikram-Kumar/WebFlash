import {
    flashlightHandler
} from "./flashlightHandler.js";
import {
    morseCoder
} from "./morseCoder.js";
import {
    soundSynthesizer
} from "./soundSynthesizer.js";

window.audioCtx = new (window.webkitAudioContext || window.AudioContext)();
window.flashlightStatus = false;
window.shouldLoop = false;
window.pattern = "11110001";
window.flashOnDuration = 500;
window.flashOffDuration = 500;

var div = document.getElementById('main-container');
var img = document.querySelector('img');
var btn = document.querySelector('#btn');
var audioSignal;

img.onload = window.onresize = window.onorientationchange = fitImage;

window.onload = () => {
    flashlightHandler.accessFlashlight();
    audioSignal = new soundSynthesizer();
    
    btn.addEventListener('click', function() {
        /*if (!shouldLoop) {
            shouldLoop = true;
            return;
        }*/

        // Invert the flashlightStatus and apply it
        window.flashlightStatus = !window.flashlightStatus;
        flashlightHandler.setFlashlightStatus(window.flashlightStatus);
    });

    window.setTimeout(()=> {
        followPattern(morseCoder.textToDigital("hello world"));
        morseCoder.textToDigital("e");
        morseCoder.textToDigital("ei");
        morseCoder.textToDigital("ei ");
        morseCoder.textToDigital("ei k");
        morseCoder.textToDigital("ei ki");
        morseCoder.textToDigital("ei kij");
        morseCoder.textToDigital("ei kij b");
    }, 2000);


}

function fitImage() {
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    var imgAsp = img.naturalWidth / img.naturalHeight;
    var windAsp = innerWidth / innerHeight;

    if (imgAsp < windAsp) {
        img.width = innerWidth;
        img.height = innerWidth / imgAsp;
    } else {
        img.width = innerHeight * imgAsp;
        img.height = innerHeight;
    }
}

function followPattern(pattern, startingIndex = 0) {
    var currentIndex = startingIndex;
    var patternLength = pattern.length;
    var currentStatus = Boolean(Number.parseInt(pattern[currentIndex]));
    var stateDuration = (currentStatus) ? window.flashOnDuration: window.flashOffDuration;

    console.log(+currentStatus);
    if (flashlightHandler.getFlashlightStatus() != currentStatus) {
        flashlightHandler.setFlashlightStatus(currentStatus);
        (currentStatus) ? audioSignal.start(): audioSignal.stop();
    }

    // If it is the last index, check if looping is enabled.
    // If it is, set currentIndex to 0 and keep looping.
    // If it isn't, check if the last value is true (flash is on), and turn it off if it is, and then return.
    // If it is not the last index, increase the currentIndex and keep going.

    if (currentIndex == (patternLength - 1)) {
        if (shouldLoop) {
            currentIndex = 0;
        } else {
            if (currentStatus) {
                window.setTimeout(function() {
                    flashlightHandler.setFlashlightStatus(false);
                    audioSignal.stop();
                }, stateDuration);
            }
            return;
        }
    } else {
        currentIndex++;
    }
    window.setTimeout(function() {
        followPattern(pattern, currentIndex);
    }, stateDuration);
}