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
        switch (type) {
            case "red":
                speed = .5;
                break;
            case "blue":
                speed = 2;
                damage = 0.5;
                break;
            case "yellow":
                speed = 2.5;
                width = 35;
                height = 35;
                damage = 0.25; 
                break;
            case "orange":
                speed = .3;
                width = 50;
                height = 50;
                damage = 2;
                break;
            case "green":
                speed = 0.1;
                width = 70;
                height = 70;
                damage = 3;
            }

        enemies.push({
            x: x,
            y: y,
            width: width * player.enemysizedebuff,
            height: height * player.enemysizedebuff,
            color: type,
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