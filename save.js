import { player } from "./stats.js";
import { skills } from "./skilltree.js";
import { traits } from "./evolve.js";


export function save() {
    //*save player
    localStorage.setItem("player", JSON.stringify(player));
    //*save skills
    localStorage.setItem("skills", JSON.stringify(skills));
    //*save traits
    localStorage.setItem("traits", JSON.stringify(traits));
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
        const loadedSkills = JSON.parse(savedSkills);
        
        console.log("Loaded Skills from Storage:", loadedSkills);
        console.log("Existing Skills in Memory:", skills);

        loadedSkills.forEach((loadedSkill) => {
            const skillIndex = skills.findIndex((s) => s.name === loadedSkill.name);
            if (skillIndex !== -1) {
                skills[skillIndex] = { ...skills[skillIndex], ...loadedSkill };
            } else {
                console.warn(`Skill ${loadedSkill.name} not found!`);
            }
        });
    }

    //* Load traits data
    const savedTraits = localStorage.getItem("traits");
    if (savedTraits) {
        const loadedTraits = JSON.parse(savedTraits);
        
        loadedTraits.forEach((loadedTrait) => {
            const traitIndex = traits.findIndex((t) => t.name === loadedTrait.name);
            if (traitIndex !== -1) {
                traits[traitIndex] = { ...traits[traitIndex], ...loadedTrait };
            } else {
                console.warn(`Trait ${loadedTrait.name} not found!`);
            }
        });
    }
}
