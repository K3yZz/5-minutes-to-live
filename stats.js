import { gameOver } from "./main.js";
import { setupStats } from "./uisetup.js";

export const player = {
    maxhealth: tothenearest100th(3),
    health: tothenearest100th(3),
    speed: 1,
    regen: false,
    regenvalue: 0,
    redpoints: 0,
    redpointsmult: 1,
    bluepoints: 0,
    bluepointsmult: 1,
    x: 275,
    y: 275,
    width: 50,
    height: 50,
    color: 'black',
};

const { timer, healthdisplay, redpoints, bluepoints, bluepointimg } = setupStats();

let bluepointslocked = true;

export function updateHealth() {
    healthdisplay.innerHTML = Math.round(player.health * 100) / 100;
    if (player.health <= 0) {
        gameOver();
    }
}

export function updateTimer(Time) {
    timer.innerHTML = Time;
}

export function updatepoints() {
    redpoints.innerHTML = player.redpoints;
    if (player.bluepoints > 0 || !bluepointslocked) {
        bluepoints.style.display = "block";
        bluepointimg.style.display = "block";
        bluepoints.innerHTML = player.bluepoints;
        bluepointslocked = false;
    }
}

function tothenearest100th(num) {
    return Math.ceil(num * 100) / 100;
}