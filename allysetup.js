import { ctx } from './main.js';
import { player } from './stats.js';
import { enemies } from './enemiessetup.js';

// Ally array
export const friends = [];

// Spawn allies
export const spawnAllies = (num, type) => {
    for (let i = 0; i < num; i++) {
        let x, y;
        x = player.x;
        y = player.y;

        let speed = 1;
        let width = 20;
        let height = 20;

        friends.push({
            x: x,
            y: y,
            width: width,
            height: height,
            color: type,
            speed: speed,
        });
    }
};

// Draw all allies
export const drawAllies = () => {
    friends.forEach(friend => {
        ctx.fillStyle = friend.color;
        ctx.beginPath();
        ctx.arc(friend.x + friend.width / 2, friend.y + friend.height / 2, friend.width / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    });
};

// Move all allies
export const moveAllies = () => {
    friends.forEach(friend => {
        let closestEnemy = enemies.reduce((closest, enemy) => {
            const distance = Math.sqrt((enemy.x - friend.x) ** 2 + (enemy.y - friend.y) ** 2);
            return distance < closest.distance ? { enemy, distance } : closest;
        }, { enemy: null, distance: Infinity }).enemy;

        if (closestEnemy) {
            friend.x += closestEnemy.x < friend.x ? -friend.speed : friend.speed;
            friend.y += closestEnemy.y < friend.y ? -friend.speed : friend.speed;
        }
    });
};
