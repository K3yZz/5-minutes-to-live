import { canvas, ctx } from './main.js';
import { player } from './stats.js';
import { enemies } from './enemiessetup.js';

export const keys = {};

export const drawPlayer = () => {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = .5;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
};

const movePlayer = (dx, dy) => {
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x + dx));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y + dy));
};

export const handleMovement = () => {
    if (keys['w'] || keys['ArrowUp']) movePlayer(0, player.speed * -1);
    if (keys['s'] || keys['ArrowDown']) movePlayer(0, player.speed);
    if (keys['a'] || keys['ArrowLeft']) movePlayer(player.speed * -1, 0);
    if (keys['d'] || keys['ArrowRight']) movePlayer(player.speed, 0);
};

export const checkCollision = () => {
    for (let enemy of enemies) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            player.health -= enemy.damage;
            enemies.splice(enemies.indexOf(enemy), 1);
            return true;
        }
    }
    return false;
};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});