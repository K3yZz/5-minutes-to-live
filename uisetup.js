import { currentfps } from "./debug.js";
import { canvas, ctx, spaceandtime } from "./main.js";
import { player } from "./stats.js";

export function setupCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    canvas.style.border = '5px solid white';
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.style.backgroundColor = 'white';
    document.body.appendChild(canvas);
    return canvas;
}
export function setupBackdrop() {
    const backdrop = document.createElement('div');
    // backdrop
    backdrop.style.width = '100vw';
    backdrop.style.height = '100vh';
    backdrop.style.position = 'fixed';
    backdrop.style.backgroundColor = 'rgba(245, 3, 3, 0.5)';
    backdrop.style.top = 0;
    backdrop.style.left = 0;
    backdrop.style.display = 'flex';
    backdrop.style.justifyContent = 'center';
    backdrop.style.alignItems = 'center';
    backdrop.style.zIndex = -20;
    backdrop.id = "backdrop";
    document.body.appendChild(backdrop);
    return backdrop;
}
export function setupStats() {
    const healthdisplay = document.createElement('div');
    const healthicon = document.createElement('img');
    const timer = document.createElement('div');
    const versiondisplay = document.createElement('div');
    const redpoints = document.createElement('div');
    const redpointimg = document.createElement('img');
    const bluepoints = document.createElement('div');
    const bluepointimg = document.createElement('img');
    const evolvepoints = document.createElement('div');
    const evolvepointsimg = document.createElement('img');
    //
    healthdisplay.style.position = 'absolute';
    healthdisplay.style.top = '10px';
    healthdisplay.style.left = '40px';
    healthdisplay.style.color = 'white';
    healthdisplay.style.fontSize = '24px';
    healthdisplay.style.zIndex = 100;
    //
    healthicon.style.position = 'absolute';
    healthicon.style.top = '-5px';
    healthicon.style.left = '-5px';
    healthicon.style.zIndex = 100;
    healthicon.style.width = "50px";
    healthicon.style.height = "50px";
    healthicon.src = "assets/health.png";
    //
    timer.style.position = 'absolute';
    timer.style.top = '25px';
    timer.style.right = '50%';
    timer.style.transform = 'translate(50%)';
    timer.style.color = 'white';
    timer.style.fontSize = '24px';
    timer.style.zIndex = 100;
    //
    versiondisplay.style.position = 'absolute';
    versiondisplay.style.top = '95%';
    versiondisplay.style.left = '10px';
    versiondisplay.style.color = 'white';
    versiondisplay.style.fontSize = '24px';
    versiondisplay.style.zIndex = 100;
    //! MAKE SURE TO CHANGE
    versiondisplay.innerText = 'V1.2.9';
    //! MAKE SURE TO CHANGE
    //
    redpoints.style.position = 'absolute';
    redpoints.style.top = '40px';
    redpoints.style.left = '40px';
    redpoints.style.color = 'white';
    redpoints.style.fontSize = '24px';
    redpoints.style.zIndex = 100;
    //
    redpointimg.style.position = 'absolute';
    redpointimg.style.top = '30px';
    redpointimg.style.left = '-5px';
    redpointimg.style.zIndex = 100;
    redpointimg.src = "assets/redpoint.png";
    redpointimg.width = 50;
    redpointimg.height = 50;
    //
    bluepoints.style.position = 'absolute';
    bluepoints.style.top = '70px';
    bluepoints.style.left = '40px';
    bluepoints.style.color = 'white';
    bluepoints.style.fontSize = '24px';
    bluepoints.style.zIndex = 100;
    bluepoints.style.display = 'none';
    //
    bluepointimg.style.position = 'absolute';
    bluepointimg.style.top = '60px';
    bluepointimg.style.left = '-5px';
    bluepointimg.style.zIndex = 100;
    bluepointimg.src = "assets/bluepoint.png";
    bluepointimg.width = 50;
    bluepointimg.height = 50;
    bluepointimg.style.display = 'none';
    //
    evolvepoints.style.position = 'absolute';
    evolvepoints.style.top = '100px';
    evolvepoints.style.left = '40px';
    evolvepoints.style.color = 'white';
    evolvepoints.style.fontSize = '24px';
    evolvepoints.style.zIndex = 100;
    evolvepoints.style.display = 'none';
    //
    evolvepointsimg.style.position = 'absolute';
    evolvepointsimg.style.top = '90px';
    evolvepointsimg.style.left = '-5px';
    evolvepointsimg.style.zIndex = 100;
    evolvepointsimg.src = "assets/bluepoint.png";
    evolvepointsimg.width = 50;
    evolvepointsimg.height = 50;
    evolvepointsimg.style.display = 'none';
    //
    document.body.appendChild(healthdisplay);
    document.body.appendChild(healthicon);
    document.body.appendChild(timer);
    document.body.appendChild(versiondisplay);
    document.body.appendChild(redpoints);
    document.body.appendChild(redpointimg);
    document.body.appendChild(bluepoints);
    document.body.appendChild(bluepointimg);
    document.body.appendChild(evolvepoints);
    document.body.appendChild(evolvepointsimg);
    return { timer, healthdisplay, redpoints, bluepoints, bluepointimg, evolvepoints, evolvepointsimg };
}
export function showDebug() {
    const Debug = document.createElement('div');
    const Debugmessage = document.createElement('p');
    //
    Debug.style.position = 'absolute';
    Debug.style.left = '80%';
    Debug.style.top = '10%';
    Debug.style.backgroundColor = '#3b3b3b';
    Debug.style.border = '1px solid white';
    Debug.style.width = '200px';
    Debug.style.height = '300px';
    Debug.style.zIndex = 100;
    //
    const status = `
    IsPaused: ${spaceandtime.isPaused}
    offtab: ${spaceandtime.offtab}
    Spawnrate: ${spaceandtime.spawnrate}
    Player X: ${player.x}
    Player Y: ${player.y}
    Player Speed: ${player.speed}
    Player Regen: ${player.regen}
    Player Regen value: ${player.regenvalue}
    Player MaxHP: ${player.maxhealth}
    Enemy count: ${spaceandtime.enemycount}
    FPS: ${currentfps}
    `;
    //
    Debugmessage.style.color ='white';
    Debugmessage.innerText = status;
    //
    Debug.appendChild(Debugmessage);
    document.body.appendChild(Debug);
}
export const drawFloor = () => {
    const tileSize = 50;
    const rows = canvas.height / tileSize;
    const cols = canvas.width / tileSize;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            ctx.fillStyle = (x + y) % 2 === 0 ? '#8B4513' : '#A0522D'; 
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
};

const font = new FontFace('MONOFONT', 'url(assets/MONOFONT.ttf)');
font.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
    document.body.style.fontFamily = 'MONOFONT, sans-serif';
}).catch((error) => {
    console.error('Font failed to load', error);
});