import { spaceandtime, gameOver } from "./main.js";
import { player, updateTimer, updatepoints } from "./stats.js";
import { spawnEnemies } from "./enemiessetup.js";

export function startintervals() {

    // Timer
    const timerInterval = setInterval(() => {
        if (!spaceandtime.isPaused && !spaceandtime.offtab) {
            spaceandtime.time -= 1;
            updateTimer(spaceandtime.time);
            if (spaceandtime.time <= 0) {
                gameOver("evolve");
            }
        }
    }, spaceandtime.second);

    // Regen
    const regenInterval = setInterval(() => {
        if (!spaceandtime.isPaused && player.regen && !spaceandtime.offtab) {
            player.health += Math.min(player.regenvalue, player.maxhealth - player.health);
        }
    }, spaceandtime.second);

    // Red Enemy
    setInterval(() => {
        if (!spaceandtime.isPaused && !spaceandtime.offtab) {
            spaceandtime.spawnrate = Math.max(1000, spaceandtime.spawnrate - 10);
            clearInterval(Redenemy);

            const RedenemyInterval = setInterval(() => {
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
    const BlueenemyInterval = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 250 && !spaceandtime.offtab) {
            spawnEnemies(1, "blue");
            spaceandtime.enemycount += 1;
            player.bluepoints += 1 * player.bluepointsmult;
            updatepoints();
        }
    }, spaceandtime.spawnrate * 2);

    // Yellow Enemy
    const YellowenemyInterval = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 200 && !spaceandtime.offtab) {
            spawnEnemies(1, "yellow");
            spaceandtime.enemycount += 1;
        }
    }, spaceandtime.spawnrate * 3);

    // Orange Enemy
    const OrangeenemyInterval = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 150 && !spaceandtime.offtab) {
            spawnEnemies(1, "orange");
            spaceandtime.enemycount += 1;
        }
    }, spaceandtime.spawnrate * 4);

    const GreenenemyInterval = setInterval(() => {
        if (!spaceandtime.isPaused && spaceandtime.time <= 100 && !spaceandtime.offtab) {
            spawnEnemies(1, "green");
            spaceandtime.enemycount += 1;
        }
    }, spaceandtime.spawnrate * 5);
}