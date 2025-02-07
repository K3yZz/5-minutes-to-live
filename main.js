import { setupCanvas, setupBackdrop, setupStats, drawFloor } from './uisetup.js';
import { drawPlayer, handleMovement, checkPlayerCollision, checkFriendCollision } from './playermovement.js';
import { drawEnemies, moveEnemies, spawnEnemies, enemies } from './enemiessetup.js';
import { updateHealth, player, updatepoints } from './stats.js';
import { drawSkills } from './skilltree.js';
import { startintervals } from './interval.js';
import { drawEvolve, permmult } from './evolve.js';
import { fixTabExploit } from './debug.js';
import { drawAllies, moveAllies } from './allysetup.js';
//*----------------------------------------------------------------------------------------------------------------
export const canvas = setupCanvas();
export const ctx = canvas.getContext('2d');

export let spaceandtime = {
    isPaused: false,
    offtab: false,
    restart: false,
    time: 300,
    second: 1000,
    spawnrate: 3500,
    enemycount: 0,
    debug: false,
};

document.addEventListener('DOMContentLoaded', (event) => {
    startGame();
    setupBackdrop();
    setupStats();
    startintervals();
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) { 
        spaceandtime.offtab = true;
        spaceandtime.restart = true;
     } 
    else { 
        spaceandtime.offtab = false;
        fixTabExploit();
     }
});

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
    drawAllies();
    moveAllies();
    //
    updateHealth();
    //
    if (checkPlayerCollision() || checkFriendCollision()) {
        return;
    }
};

export let rungameframe;

export const runGame = () => {
    if (!spaceandtime.isPaused && !spaceandtime.offtab) {
        update();
        rungameframe = requestAnimationFrame(runGame);
    }
};
//*----------------------------------------------------------------------------------------------------------------
export function startGame(type) {
    document.querySelectorAll('.skilltree-button').forEach(button => button.remove());
    document.querySelectorAll('.evolvetree-button').forEach(button => button.remove());
    //
    spaceandtime.time = 300;
    spaceandtime.isPaused = false;
    spaceandtime.spawnrate = 3500;
    //
    player.health = player.maxhealth;
    player.x = 275;
    player.y = 275;
    //
    spaceandtime.enemycount = 0;
    //
    updatepoints();
    updateHealth();
    runGame();
    //
    enemies.splice(0, enemies.length);
    spawnEnemies(5, "red");
    spaceandtime.enemycount += 5;
    if (type == "evolve") {
        player.maxhealth = 3;
        player.health = player.maxhealth;
        player.redpoints = 0;
        player.bluepoints = 0;
        player.redpointsmult = 1 * permmult;
        player.bluepointsmult = 1 * permmult;
        player.regen = false;
        player.regenvalue = 0;
        player.speed = 1;
        player.height = 50;
        player.width = 50;
        player.enemysizedebuff = 1;
        const backdrop = document.getElementById('backdrop');
        backdrop.style.backgroundColor = 'rgba(245, 3, 3, 0.5)';
        backdrop.style.backgroundImage = '';
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