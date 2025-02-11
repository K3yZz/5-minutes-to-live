import { player, updateHealth, updatepoints } from "./stats.js";
import { skills } from "./skilltree.js";
import { traits } from "./evolve.js";

export function save() {
    //Save player
    localStorage.setItem("player", JSON.stringify(player));
    //save skills
    localStorage.setItem("skills", JSON.stringify(skills));
    //save traits
    localStorage.setItem("traits", JSON.stringify(traits));
}

export function load() {
    //player
    const savedPlayer = localStorage.getItem("player");
    if (savedPlayer) {
        Object.assign(player, JSON.parse(savedPlayer));
        updatepoints();
        updateHealth();
    }
    //skills
    const savedSkills = localStorage.getItem("skills");
    if (savedSkills) {
        skills.splice(0, skills.length, ...JSON.parse(savedSkills));
    }
    //traits
    const savedTraits = localStorage.getItem("traits");
    if (savedTraits) {
        traits.splice(0, traits.length, ...JSON.parse(savedTraits));
    }
}

export function resetGame() {
    localStorage.removeItem("player");
    localStorage.removeItem("skills");
    localStorage.removeItem("traits");
}