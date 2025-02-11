import { resetGame } from "./save.js";
import { spaceandtime } from "./main.js";
import { fixTabExploit } from "./debug.js";
import { player } from "./stats.js";

const settingsBox = document.createElement('div');
const settingsBlur = document.createElement('div');
const settingsClose = document.createElement('button');
const settingsReset = document.createElement('button');
const settingsLobby = document.createElement('button');

export const drawSettings = () => {
    settingsBox.style.width = '300px';
    settingsBox.style.height = '300px';
    settingsBox.style.backgroundColor ='rgb(43, 43, 45)';
    settingsBox.style.border = '1px solid black';
    settingsBox.style.borderRadius = '20px';
    settingsBox.style.position = 'absolute';
    settingsBox.style.left = '50%';
    settingsBox.style.top = '50%';
    settingsBox.style.transform = "translate(-50%, -50%)";
    settingsBox.style.zIndex = '200';
    settingsBox.style.display = 'none';
    //
    settingsBlur.style.width = '100%';
    settingsBlur.style.height = '100%';
    settingsBlur.style.position = 'absolute';
    settingsBlur.style.left = '50%';
    settingsBlur.style.top = '50%';
    settingsBlur.style.transform = "translate(-50%, -50%)";
    settingsBlur.style.backgroundColor = 'rgba(29, 29, 29, 0.68)';
    settingsBlur.style.opacity = 0.5;
    settingsBlur.style.zIndex = '199';
    settingsBlur.style.backdropFilter = 'blur(11px)';
    settingsBlur.style.display = 'none';
    //
    settingsClose.style.width = '35px';
    settingsClose.style.height = '35px';
    settingsClose.style.position = 'absolute';
    settingsClose.style.top = '10px';
    settingsClose.style.right = '10px';
    settingsClose.style.borderRadius = '5px';
    settingsClose.style.backgroundColor = 'rgb(24, 23, 23)';
    settingsClose.style.border = 'none';
    settingsClose.style.color = 'white';
    settingsClose.style.fontFamily = 'MONOFONT';
    settingsClose.style.fontSize = '24px';
    settingsClose.innerText = ' X ';
    settingsClose.onclick = () => closeSettings();
    //
    settingsReset.style.position = 'absolute';
    settingsReset.style.top = '20%';
    settingsReset.style.left = '10px';
    settingsReset.style.borderRadius = '5px';
    settingsReset.style.backgroundColor = 'rgb(44, 2, 2)';
    settingsReset.style.border = 'none';
    settingsReset.style.color = 'white';
    settingsReset.style.fontFamily = 'MONOFONT';
    settingsReset.style.fontSize = '16px';
    settingsReset.innerText = ' Reset ';
    settingsReset.style.transform = 'translateY(-50%)';
    settingsReset.onclick = () => resetGame();
    //
    settingsLobby.style.position = 'absolute';
    settingsLobby.style.top = '30%';
    settingsLobby.style.left = '10px';
    settingsLobby.style.borderRadius = '5px';
    settingsLobby.style.backgroundColor = 'rgb(24, 23, 23)';
    settingsLobby.style.border = 'none';
    settingsLobby.style.color = 'white';
    settingsLobby.style.fontFamily = 'MONOFONT';
    settingsLobby.style.fontSize = '16px';
    settingsLobby.innerText = ' Back to Skill Tree ';
    settingsLobby.style.transform = 'translateY(-50%)';
    settingsLobby.onclick = () => player.health = 0;
    //
    document.body.appendChild(settingsBlur);
    settingsBox.appendChild(settingsClose);
    settingsBox.appendChild(settingsReset);
    settingsBox.appendChild(settingsLobby);
    document.body.appendChild(settingsBox);
};

function closeSettings() {
    spaceandtime.isPaused = false;
    spaceandtime.restart = true;
    fixTabExploit();
    settingsBox.style.display = 'none';
    settingsBlur.style.display = 'none';
}

export function openSettings() {
    spaceandtime.isPaused = true;
    settingsBox.style.display = 'block';
    settingsBlur.style.display = 'block';
}