import { spaceandtime, runGame } from './main.js';
import { showDebug } from './uisetup.js';

setInterval(() => {
    if(spaceandtime.debug) {
    showDebug();
    }
}, 1000);

let fps, fpsInterval, startTime, now, then, elapsed;
export let currentfps = 0;

function startFPSCounter() {
    fpsInterval = 1000 / 60;
    then = Date.now();
    startTime = then;
    fps = 0;

    function tick() {
        requestAnimationFrame(tick);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);

            fps = Math.round(1000 / elapsed);
            currentfps = fps;
        }
    }

    tick();
}

startFPSCounter();


export let restart = false;

export function fixTabExploit() {
    if (restart) {
        runGame();
        restart = false;
    }
}