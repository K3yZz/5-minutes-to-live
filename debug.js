import { spaceandtime, runGame, rungameframe } from './main.js';
import { showDebug } from './uisetup.js';

setInterval(() => {
    if(spaceandtime.debug) {
    showDebug();
    }
}, 1000);

let fps, fpsInterval, now, then, elapsed;
export const currentfps = 0;

function startFPSCounter() {
    fpsInterval = 1000 / 60;
    then = Date.now();
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


export function fixTabExploit() {
    if (spaceandtime.restart) {
        cancelAnimationFrame(rungameframe);
        runGame();
        spaceandtime.restart = false;
    }
}