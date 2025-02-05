import { spaceandtime, gameOver } from "./main.js";
import { player, updateTimer, updatepoints } from "./stats.js";
import { spawnEnemies } from "./enemiessetup.js";
import { showDebug } from "./uisetup.js";

let Redenemy;
let Blueenemy;
let Yellowenemy;
let Orangeenemy;


export function startintervals() {
//timer
setInterval(() => {
    if (!spaceandtime.isPaused && !spaceandtime.offtab) {
    spaceandtime.time -= 1;
    updateTimer(spaceandtime.time);
        if (spaceandtime.time <= 0) {
            gameOver("evolve");
        }
    }
}, spaceandtime.second);

//regen
setInterval(() => {
    if (!spaceandtime.isPaused && player.regen && !spaceandtime.offtab) {
    player.health += Math.min(player.regenvalue, player.maxhealth - player.health)
    }
}, spaceandtime.second);

//Redenemy
setInterval(() => {
    if (!spaceandtime.isPaused && !spaceandtime.offtab) {

        spaceandtime.spawnrate = Math.max(1000, spaceandtime.spawnrate - 10);
        clearInterval(Redenemy);

        Redenemy = setInterval(() => {
            spawnEnemies(1, "red");
            spaceandtime.enemycount += 1;
            player.redpoints += 1 * player.redpointsmult;
            updatepoints();
        }, spaceandtime.spawnrate);
    }
}, 10000);

Blueenemy = setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 250 && !spaceandtime.offtab) {
    spawnEnemies(1, "blue");
    spaceandtime.enemycount += 1;
    player.bluepoints += 1 * player.bluepointsmult;
    updatepoints();
    }
}, spaceandtime.spawnrate * 2);

Yellowenemy = setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 200 && !spaceandtime.offtab) {
        spawnEnemies(1, "yellow");
        spaceandtime.enemycount += 1;
        //player.yellowpoints += 1;
        //updatepoints();
    }
}, spaceandtime.spawnrate * 3);

Orangeenemy = setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 150 && !spaceandtime.offtab) {
    spawnEnemies(1, "orange");
    spaceandtime.enemycount += 1;
    }
}, spaceandtime.spawnrate * 4);
}