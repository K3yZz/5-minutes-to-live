//wip

export const drawSettings = () => {
    const settingsBox = document.createElement('div');
    //const settingsClose = document.createElement('button');
    //const settingsToggle = document.createElement('button');
    //const settingsReset = document.createElement('button');
    //
    settingsBox.style.width = '250px';
    settingsBox.style.height = '150px';
    settingsBox.style.backgroundColor = 'white';
    settingsBox.style.position = 'absolute';
    settingsBox.style.left = '50%';
    settingsBox.style.top = '50%';
    settingsBox.style.transform = "translate(-50%, -50%)";
    settingsBox.style.zIndex = '200';
    settingsBox.style.padding = '10px';
    settingsBox.style.border = '1px solid #ccc';
    settingsBox.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    settingsBox.style.display = 'flex';
    settingsBox.style.flexDirection = 'column';
    settingsBox.style.alignItems = 'center';
    settingsBox.style.gap = '10px';
    document.body.appendChild(settingsBox);
};