import { player, updatepoints, updateHealth } from "./stats.js";
import { canvas, ctx, startGame } from "./main.js";

const skills = [ 
    {name: "Health", costtype: "Red points", cost: 10, value: 1, max: 12, locked: false, timesbought: 0, description: "Increases your health by 1"},
    {name: "Speed", costtype: "Red points", cost: 15, value: 1, max: 10, locked: false, timesbought: 0, description: "Increases your speed by 1"},
    {name: "-Size", costtype: "Red points", cost: 50, value: 1, max: 3, locked: false, timesbought: 0, description: "Decreases your size by 1"},
    {name: "x2 Redpoints", costtype: "Red points", cost: 100, value: 1, max: 1, locked: false, timesbought: 0, description: "Doubles the amount of redpoints you get"},
    {name: "Passive regen", costtype: "Blue points", cost: 10, value: 0.01, max: 10, locked: false, timesbought: 0, description: "Regenerates 0.01 health per second"},
    {name: "placeholder", costtype: "", cost: 0, value: 0, max: 0, locked: true, timesbought: 0, description: "Locked"},
];

let canbuyred = false;
let canbuyblue = false;

export const drawSkills = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#181C14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.querySelectorAll('.skilltree-button').forEach(button => button.remove());


    skills.forEach((skill, i) => {
        const button = document.createElement("button");
        button.style.width = "100px";
        button.style.height = "100px";
        button.style.backgroundColor = "#3C3D37";
        button.style.border = "2px solid";
        if (skill.locked) {
            button.style.display = "none";
        }
        if (skill.timesbought < skill.max) {
            if (player.redpoints >= skill.cost || player.bluepoints >= skill.cost)
            button.style.borderColor = "green";
        } 
        if (skill.timesbought >= skill.max) {
            button.style.borderColor = "gold";
        } else {
            button.style.borderColor = "white";
        }
        button.style.borderRadius = "20px";
        button.style.color = "white";
        button.style.fontSize = "16px";
        button.style.fontFamily = "MONOFONT";
        button.innerText = skill.name;

        button.onmouseover = () => {
            button.style.fontSize = "12px";
            button.style.backgroundColor = "#697565";
            button.innerText = `${skill.cost} ${skill.costtype}\n${skill.description}\n${skill.timesbought}/${skill.max}`;
        }
        button.onmouseout = () => {
            button.style.fontSize = "16px";
            button.style.backgroundColor = "#3C3D37";
            button.innerText = skill.name;
        }
        button.onclick = () => purchaseSkill(skill);
        button.style.position = "absolute";
        button.style.top = `${100 + Math.floor(i / 5) * 120}px`;
        button.style.left = `calc(50% - 300px + ${(i % 5) * 120}px)`;
        button.style.margin = "10px";
        button.className = "skilltree-button";
        document.body.appendChild(button);

    });
    const play = document.createElement("button");
        play.innerText = "Play";
        play.onclick = () => startGame();
        play.style.position = "absolute";
        play.style.left = "400px";
        play.style.top = `500px`;
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
        play.className = "skilltree-button";
        document.body.appendChild(play);

};

export function purchaseSkill(skill) {
    if (skill.timesbought < skill.max) {

    if (skill.costtype === "Red points" && player.redpoints >= skill.cost) {
        canbuyred = true;
    } else if (skill.costtype === "Blue points" && player.bluepoints >= skill.cost) {
        canbuyblue = true;}

    if (canbuyred) {
        switch (skill.name) {
            case "Health":
                player.maxhealth += skill.value;
                break;
            case "Speed":
                player.speed += skill.value;
                break;
            case "-Size":
                player.width -= skill.value * 5;
                player.height -= skill.value * 5;
                break;
            case "x2 Redpoints":
                player.redpointsmult += 1;
                break;
            default:
                break;
        }
        player.redpoints -= skill.cost;
        canbuyred = false;
        skill.cost = Math.ceil(skill.cost * 1.15);
        skill.timesbought++;
        updateHealth();
        drawSkills();
        updatepoints();
    }

    if (canbuyblue) {
        if (skill.name === "Passive regen") {
            player.regen = true;
            player.regenvalue += skill.value;
        }
        player.bluepoints -= skill.cost;
        canbuyblue = false;
        skill.cost = Math.ceil(skill.cost * 1.15);
        skill.timesbought++;
        updateHealth();
        drawSkills();
        updatepoints();
    }
}
}
