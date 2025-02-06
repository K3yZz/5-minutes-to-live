import { spaceandtime, gameOver } from "./main.js";
import { player, updateTimer, updatepoints } from "./stats.js";
import { spawnEnemies } from "./enemiessetup.js";

let Redenemy;
let Blueenemy;
let Yellowenemy;
let Orangeenemy;


export function startintervals() {
    // Timer
    setInterval(() => {
        if (!spaceandtime.isPaused && !spaceandtime.offtab) {
            spaceandtime.time -= 1;
            updateTimer(spaceandtime.time);
            if (spaceandtime.time <= 0) {
                gameOver("evolve");
            }
        }
    }, spaceandtime.second);

    // Regen
    setInterval(() => {
        if (!spaceandtime.isPaused && player.regen && !spaceandtime.offtab) {
            player.health += Math.min(player.regenvalue, player.maxhealth - player.health);
        }
    }, spaceandtime.second);

    // Red Enemy
    setInterval(() => {
        if (!spaceandtime.isPaused && !spaceandtime.offtab) {
            spaceandtime.spawnrate = Math.max(1000, spaceandtime.spawnrate - 10);
            clearInterval(Redenemy);

            Redenemy = setInterval(() => {
                if(!spaceandtime.isPaused && !spaceandtime.offtab) {
                    spawnEnemies(1, "red");
                    spaceandtime.enemycount += 1;
                    player.redpoints += 1 * player.redpointsmult;
                    updatepoints();
                }
            }, spaceandtime.spawnrate);
        }
    }, 10000);

    // Blue Enemy
    Blueenemy = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 250 && !spaceandtime.offtab) {
            spawnEnemies(1, "blue");
            spaceandtime.enemycount += 1;
            player.bluepoints += 1 * player.bluepointsmult;
            updatepoints();
        }
    }, spaceandtime.spawnrate * 2);

    // Yellow Enemy
    Yellowenemy = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 200 && !spaceandtime.offtab) {
            spawnEnemies(1, "yellow");
            spaceandtime.enemycount += 1;
        }
    }, spaceandtime.spawnrate * 3);

    // Orange Enemy
    Orangeenemy = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 150 && !spaceandtime.offtab) {
            spawnEnemies(1, "orange");
            spaceandtime.enemycount += 1;
        }
    }, spaceandtime.spawnrate * 4);
}