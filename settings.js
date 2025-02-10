//wip

export const drawSettings = () => {
    const settingsBox = document.createElement('div');
    const settingsClose = document.createElement('button');
    const settingsToggle = document.createElement('button');
    const settingsReset = document.createElement('button');
    //
    settingsBox.style.width = '20%';
    settingsBox.style.height = '20%';
    settingsBox.style.backgroundColor = 'white';
    settingsBox.style.position = 'absolute';
    settingsBox.style.left = '50%';
    settingsBox.style.top = '50%';
    settingsBox.style.transform = "translate(-50%, -50%)";
    settingsBox.style.zIndex = 200;
    document.body.appendChild(settingsBox);
};