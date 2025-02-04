import { spaceandtime } from "./main.js";
import { player, updateTimer, updatepoints } from "./stats.js";
import { spawnEnemies } from "./enemiessetup.js";

export function startintervals() {
//timer
setInterval(() => {
    if (!spaceandtime.isPaused) {
    spaceandtime.time -= 1;
    updateTimer(spaceandtime.time);
    }
}, 1000); //default 1000

//spawn redenemies
setInterval(() => {
    if (!spaceandtime.isPaused) {
    spawnEnemies(1, "red");
    player.redpoints += 1 * player.redpointsmult;
    updatepoints();
    }
}, 3500);

//spawn blueenemies
setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 250) {
    spawnEnemies(1, "blue");
    player.bluepoints += 1 * player.bluepointsmult;
    updatepoints();
    }
}, 3500 * 2);

//spawn yellowenemies
setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 200) {
        spawnEnemies(1, "yellow");
        //player.yellowpoints += 1;
        //updatepoints();
    }
}, 3500 * 3);

//spawn orangeenemies
setInterval(() => {
    if (!spaceandtime.isPaused && spaceandtime.time <= 150) {
    spawnEnemies(1, "orange");
    }
}, 3500 * 4);

//regen
setInterval(() => {
    if (!spaceandtime.isPaused && player.regen) {
    player.health += Math.min(player.regenvalue, player.maxhealth - player.health)
    }
}, 1000);

}
