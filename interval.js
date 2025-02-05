import { spaceandtime, gameOver } from "./main.js";
import { player, updateTimer, updatepoints } from "./stats.js";
import { spawnEnemies } from "./enemiessetup.js";

let spawnrate = 3500;
let second = 1000;

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
}, second);

//regen
setInterval(() => {
    if (!spaceandtime.isPaused && player.regen && !spaceandtime.offtab) {
    player.health += Math.min(player.regenvalue, player.maxhealth - player.health)
    }
}, second);

//Redenemy
setInterval(() => {
    spawnrate = Math.max(100, spawnrate - 100);
    clearInterval(Redenemy);

    Redenemy = setInterval(() => {
        if (!spaceandtime.isPaused && !spaceandtime.offtab) {
            spawnEnemies(1, "red");
            player.redpoints += 1 * player.redpointsmult;
            updatepoints();
        }
    }, spawnrate);
}, 10000);

Blueenemy = setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 250 && !spaceandtime.offtab) {
    spawnEnemies(1, "blue");
    player.bluepoints += 1 * player.bluepointsmult;
    updatepoints();
    }
}, spawnrate * 2);

Yellowenemy = setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 200 && !spaceandtime.offtab) {
        spawnEnemies(1, "yellow");
        //player.yellowpoints += 1;
        //updatepoints();
    }
}, spawnrate * 3);

Orangeenemy = setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 150 && !spaceandtime.offtab) {
    spawnEnemies(1, "orange");
    }
}, spawnrate * 4);
}
