import { updateHealth, player, updatepoints } from "./stats.js";
import { canvas, ctx, startGame } from "./main.js";

const traits = [
    { name: "2x income", costtype: "evolve point", cost: 1, value: 1, max: 1, timesbought: 0, description: "2x blue and red points" },
];

export let incomebonus = 1;

export const drawEvolve = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#181C14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const backdrop = document.getElementById('backdrop');
    backdrop.style.backgroundColor = 'black';

    //fix later
    //backdrop.style.backgroundImage = `
    //radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
    //radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
    //radial-gradient(white, rgba(10, 8, 8, 0.15) transparent 40px),
   //radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px)`;
    //backdrop.style.backgroundSize = '550px 550px, 350px 350px, 250px 250px, 150px 150px';
    //backdrop.style.backgroundPosition = '0 0, 40px 60px, 130px 270px, 70px 100px';

    document.querySelectorAll('.evolvetree-button').forEach(button => button.remove());

    traits.forEach((trait, i) => {
        const button = document.createElement("button");
        button.style.width = "100px";
        button.style.height = "100px";
        button.style.backgroundColor = "#3C3D37";
        button.style.border = "2px solid";
        button.style.borderRadius = "20px";
        button.style.color = "white";
        button.style.fontSize = "16px";
        button.style.fontFamily = "MONOFONT";
        button.innerText = trait.name;

        if (trait.timesbought >= trait.max) {
            button.style.borderColor = "gold";
        } else {
            button.style.borderColor = "white";
        }

        button.onmouseover = () => {
            button.style.fontSize = "12px";
            button.style.backgroundColor = "#697565";
            button.innerText = `${trait.cost} ${trait.costtype}\n${trait.description}\n${trait.timesbought}/${trait.max}`;
        };

        button.onmouseout = () => {
            button.style.fontSize = "16px";
            button.style.backgroundColor = "#3C3D37";
            button.innerText = trait.name;
        };

        button.onclick = () => purchaseTrait(trait);

        button.style.position = "absolute";
        button.style.top = `${100 + Math.floor(i / 5) * 120}px`;
        button.style.left = `calc(50% - 300px + ${(i % 5) * 120}px)`;
        button.style.margin = "10px";
        button.className = "evolvetree-button";

        document.body.appendChild(button);
    });
    const play = document.createElement("button");
            play.innerText = "Play";
            play.onclick = () => startGame("evolve");
            play.style.position = "absolute";
            play.style.left = "50%";
            play.style.top = "75%";
            play.style.transform = "translate(-50%, -50%)";
            play.style.width = "100px";
            play.style.height = "50px";
            play.style.border = "2px solid white";
            play.style.borderRadius = "20px";
            play.style.color = "white";
            play.style.fontSize = "24px";
            play.style.fontFamily = "MONOFONT";
            play.style.backgroundColor = "#3C3D37";
            play.onmouseover = () => {
                play.style.backgroundColor = "#697565";
            };
            play.onmouseout = () => {
                play.style.backgroundColor = "#3C3D37";
            };
            play.className = "evolvetree-button";
            document.body.appendChild(play);
};

export function purchaseTrait(trait) {
    if (trait.timesbought < trait.max && trait.cost <= player.evolvepoints) {

        switch (trait.name) {
            case "2x income":
                incomebonus = 2;
                player.redpointsmult *= incomebonus;
                player.bluepointsmult *= incomebonus;
                break;
            default:
                break;
        }
        player.evolvepoints -= trait.cost;
        trait.cost = Math.ceil(trait.cost * 1.15);
        trait.timesbought++;
        updateHealth();
        updatepoints();
        drawEvolve();
    }
}
