import { spaceandtime, gameOver } from "./main.js";
import { player, updateTimer, updatepoints } from "./stats.js";
import { spawnEnemies } from "./enemiessetup.js";
import { spawnAllies } from "./allysetup.js";
import { save } from "./save.js";

let Redenemy, Blueenemy, Yellowenemy, Orangeenemy, Greenenemy;
let friendlyally;


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

    // Save
    setInterval(() => {
        save();
    }, spaceandtime.second);

    // Red Enemy
    setInterval(() => {
        if (!spaceandtime.isPaused && !spaceandtime.offtab) {
            spaceandtime.spawnrate = Math.max(1000, spaceandtime.spawnrate - 10);
            clearInterval(Redenemy);

            Redenemy = setInterval(() => {
                if(!spaceandtime.isPaused && !spaceandtime.offtab) {
                    spawnEnemies(1, "1");
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
            spawnEnemies(1, "2");
            spaceandtime.enemycount += 1;
            player.bluepoints += 1 * player.bluepointsmult;
            updatepoints();
        }
    }, spaceandtime.spawnrate * 2);

    // Yellow Enemy
    Yellowenemy = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 200 && !spaceandtime.offtab) {
            spawnEnemies(1, "3");
            spaceandtime.enemycount += 1;
        }
    }, spaceandtime.spawnrate * 3);

    // Orange Enemy
    Orangeenemy = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 150 && !spaceandtime.offtab) {
            spawnEnemies(1, "4");
            spaceandtime.enemycount += 1;
        }
    }, spaceandtime.spawnrate * 4);

    Greenenemy = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 100 && !spaceandtime.offtab) {
            spawnEnemies(1, "5");
            spaceandtime.enemycount += 1;
        }
    }, spaceandtime.spawnrate * 5);

    friendlyally = setInterval(() => {
        if (player.allysunlocked && !spaceandtime.isPaused && !spaceandtime.offtab) {
            spawnAllies(1, "red");
        }
    }, 5000);
}