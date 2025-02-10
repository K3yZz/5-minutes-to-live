import { player } from "./stats.js";
import { skills } from "./skilltree.js";
import { traits } from "./evolve.js";


export function save() {
    //*save player
    localStorage.setItem("player", JSON.stringify(player));
    //*save skills
    const savedSkills = skills.map(skill => ({
        name: skill.name,
        cost: skill.cost,
        timesbought: skill.timesbought,
        locked: skill.locked
    }));
    localStorage.setItem("skills", JSON.stringify(savedSkills));
    //*save traits
    const savedTraits = traits.map(trait => ({
        name: trait.name,
        cost: trait.cost,
        timesbought: trait.timesbought
    }));
    localStorage.setItem("traits", JSON.stringify(savedTraits));
}

export function load() {
    //* Load player data
    const savedPlayer = localStorage.getItem("player");
    if (savedPlayer) {
        Object.assign(player, JSON.parse(savedPlayer));
        updatepoints();
        updateHealth();
    }

    //* Load skills data
    const savedSkills = localStorage.getItem("skills");
    if (savedSkills) {
        const parsedSkills = JSON.parse(savedSkills);
        parsedSkills.forEach(savedSkill => {
            const skill = skills.find(s => s.name === savedSkill.name);
            if (skill) {
                skill.cost = savedSkill.cost;
                skill.timesbought = savedSkill.timesbought;
                skill.locked = savedSkill.locked;
            }
        });
    }


    //* Load traits data
    const savedTraits = localStorage.getItem("traits");
    if (savedTraits) {
        const parsedTraits = JSON.parse(savedTraits);
        parsedTraits.forEach(savedTrait => {
            const trait = traits.find(s => s.name === savedTrait.name);
            if (trait) {
                trait.cost = savedTrait.cost;
                trait.timesbought = savedTrait.timesbought;
            }
        });
    }

}

export function reset() {
    localStorage.removeItem("player");
    localStorage.removeItem("skills");
    localStorage.removeItem("traits");
}