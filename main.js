import { setupCanvas, setupBackdrop, setupStats, drawFloor } from './uisetup.js';
import { drawPlayer, handleMovement, checkCollision } from './playermovement.js';
import { drawEnemies, moveEnemies, spawnEnemies, enemies } from './enemiessetup.js';
import { updateHealth, player, updatepoints } from './stats.js';
import { drawSkills } from './skilltree.js';
import { startintervals } from './interval.js';
//*----------------------------------------------------------------------------------------------------------------
export const canvas = setupCanvas();
export const ctx = canvas.getContext('2d');
document.addEventListener('DOMContentLoaded', (event) => {
    startGame();
    setupBackdrop();
    setupStats();
    startintervals();
});

export let spaceandtime = {
    isPaused: false,
    time: 300
};

//*----------------------------------------------------------------------------------------------------------------
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //
    drawFloor();
    //
    drawPlayer();
    handleMovement();
    //
    drawEnemies();
    moveEnemies();
    //
    updateHealth();
    //
    if (checkCollision()) {
        return;
    }
};

const runGame = () => {
    if (!spaceandtime.isPaused) {
        update();
        requestAnimationFrame(runGame);
    }
};
//*----------------------------------------------------------------------------------------------------------------
export function startGame() {
document.querySelectorAll('.skilltree-button').forEach(button => button.remove());
//
spaceandtime.time = 300;
spaceandtime.isPaused = false;
//
player.health = player.maxhealth;
player.x = 275;
player.y = 275;
//
updatepoints();
runGame();
//
enemies.splice(0, enemies.length);
spawnEnemies(5, "red");
}

export function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spaceandtime.isPaused = true;
    player.health = 0;
    drawSkills();
}
//*----------------------------------------------------------------------------------------------------------------