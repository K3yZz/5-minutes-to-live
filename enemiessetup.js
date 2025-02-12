import { canvas, ctx } from './main.js';
import { player } from './stats.js';

// Enemy array
export const enemies = [];

// Spawn multiple enemies
export const spawnEnemies = (num, type) => {
    for (let i = 0; i < num; i++) {
        const side = Math.floor(Math.random() * 4);
        let x, y;

        switch (side) {
            case 0: // Top
                x = Math.random() * canvas.width;
                y = -25;
                break;
            case 1: // Right
                x = canvas.width;
                y = Math.random() * canvas.height;
                break;
            case 2: // Bottom
                x = Math.random() * canvas.width;
                y = canvas.height;
                break;
            case 3: // Left
                x = -25;
                y = Math.random() * canvas.height;
                break;
        }

        let speed = 0;
        let width = 25;
        let height = 25;
        let damage = 1;
        let color = "";
        switch (type) {
            case "1":
                speed = .5;
                color = "#f54242";
                break;
            case "2":
                speed = 2;
                damage = 0.5;
                color = "#f58a42";
                break;
            case "3":
                speed = 2.5;
                width = 35;
                height = 35;
                damage = 0.25; 
                color = "#eff542";
                break;
            case "4":
                speed = .3;
                width = 50;
                height = 50;
                damage = 2;
                color = "#42f581";
                break;
            case "5":
                speed = 0.1;
                width = 70;
                height = 70;
                damage = 3;
                color = "#5142f5";
                break;
            case "6":
                speed = 6;
                width = 20;
                height = 20;
                damage = 0.01;
                color = "#e342f5";
            }

        enemies.push({
            x: x,
            y: y,
            width: width * player.enemysizedebuff,
            height: height * player.enemysizedebuff,
            color: color,
            speed: speed,
            damage: damage
        });
    }
};

// Draw all enemies
export const drawEnemies = () => {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = .5;
        ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
};

// Move all enemies
export const moveEnemies = () => {
    enemies.forEach(enemy => {
        enemy.x += player.x < enemy.x ? -enemy.speed : enemy.speed;
        enemy.y += player.y < enemy.y ? -enemy.speed : enemy.speed;
    });
};