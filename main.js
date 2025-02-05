import { setupCanvas, setupBackdrop, setupStats, drawFloor } from './uisetup.js';
import { drawPlayer, handleMovement, checkCollision } from './playermovement.js';
import { drawEnemies, moveEnemies, spawnEnemies, enemies } from './enemiessetup.js';
import { updateHealth, player, updatepoints } from './stats.js';
import { drawSkills } from './skilltree.js';
import { startintervals } from './interval.js';
import { drawEvolve, incomebonus } from './evolve.js';
//*----------------------------------------------------------------------------------------------------------------
export const canvas = setupCanvas();
export const ctx = canvas.getContext('2d');
document.addEventListener('DOMContentLoaded', (event) => {
    startGame();
    setupBackdrop();
    setupStats();
    startintervals();
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      spaceandtime.offtab = true;
      alert("the exploit twas patched");
    } else {
        spaceandtime.offtab = false;
    }
});

export let spaceandtime = {
    isPaused: false,
    offtab: false,
    time: 300,
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
    if (!spaceandtime.isPaused && !spaceandtime.offtab) {
        update();
        requestAnimationFrame(runGame);
    }
};
//*----------------------------------------------------------------------------------------------------------------
export function startGame(type) {
    document.querySelectorAll('.skilltree-button').forEach(button => button.remove());
    document.querySelectorAll('.evolvetree-button').forEach(button => button.remove());
    //
    spaceandtime.time = 300;
    spaceandtime.isPaused = false;
    //
    player.health = player.maxhealth;
    player.x = 275;
    player.y = 275;
    player.redpointsmult *= incomebonus;
    player.bluepointsmult *= incomebonus;
    //
    updatepoints();
    updateHealth();
    runGame();
    //
    enemies.splice(0, enemies.length);
    spawnEnemies(5, "red");
    if (type == "evolve") {
        player.maxhealth = 3;
        player.health = player.maxhealth;
        player.redpoints = 0;
        player.bluepoints = 0;
        player.redpointsmult = 1;
        player.bluepointsmult = 1;
        player.regen = false;
        player.regenvalue = 0;
        player.speed = 1;
        player.height = 50;
        player.width = 50;
        player.enemysizedebuff = 1;
        const backdrop = document.getElementById('backdrop');
        backdrop.style.backgroundColor = 'rgba(245, 3, 3, 0.5)';
        updatepoints();
        updateHealth();
    }
}

export function gameOver(type) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spaceandtime.isPaused = true;
    if (type == "skill") {
    drawSkills();
    player.health = 0;
    } else if (type == "evolve") {
        player.evolvepoints += 1;
        updatepoints();
        drawEvolve();
    }
}
//*----------------------------------------------------------------------------------------------------------------