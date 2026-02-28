// Style Imports
import './style.css';

// Package Imports
import { toPng } from 'html-to-image';

// Access to HTML file
const gridArea = document.getElementById('grid-area');
const colourInput = document.getElementById('colourInput');

// Used for tracking pointer up/down state
let MOUSEDOWN = false;
window.addEventListener('mousedown', () => (MOUSEDOWN = true));
window.addEventListener('mouseup', () => (MOUSEDOWN = false));

/**
 * Creates an HTML div to be used as a grid item
 * @returns HTML div element
 */
function createGridItem() {
  const item = document.createElement('div');
  item.classList.add('grid-item');
  item.addEventListener('mousedown', draw);
  item.addEventListener('mouseenter', draw);
  return item;
}

/**
 * Draws the selected colour to the selected grid box
 * @param {object} event
 */
function draw(event) {
  if (!MOUSEDOWN && event.type !== 'mousedown') return;
  event.target.style.backgroundColor = colourInput.value;
}

// TOOLBAR
document
  .getElementById('eraserBtn')
  .addEventListener('click', () => (colourInput.value = '#ffffff'));

document.getElementById('applyDim').addEventListener('click', applyNewGrid);

/**
 * Gets the input value for desired grid dimensions,
 * changes the style of grid area to match the new dimensions,
 * removes old grid boxes,
 * runs a for-loop to create the right amount of new grid boxes,
 * and adds them to the grid area
 */
function applyNewGrid() {
  const DIM = parseInt(document.getElementById('dimInput').value);

  // Initialize grid dimensions using DIM
  gridArea.style.gridTemplateColumns = `repeat(${DIM}, 1fr)`;
  gridArea.style.gridTemplateRows = `repeat(${DIM}, 1fr)`;

  // Delete previous grid boxes (KILL THE CHILDREN)
  gridArea.innerHTML = '';

  // Append child divs to each grid box
  for (let i = 0; i < DIM * DIM; i++) 
  gridArea.appendChild(createGridItem());
}
applyNewGrid();

// SHOW HIDE GRID
document.getElementById('showHideGrid').addEventListener('click', () => {
  const numOfChildren = gridArea.childNodes.length;
  const childList = gridArea.childNodes;

  for(let i = 0; i < numOfChildren; i++){
    const currentChild = childList[i];
    if (currentChild.style.border === 'none'){
      currentChild.style.border = '1px solid black';
    } else {
      currentChild.style.border ='none';
    }
  }

//   gridArea.childNodes.forEach((child) => {
//   if (child.style.border === 'none') child.style.border = '1px solid black';
//    else child.style.border = 'none';
//   });
});

// FILL BUTTON
document.getElementById('fillBtn').addEventListener('click', () => {
  const numOfChildren = gridArea.childNodes.length;
  const childList = gridArea.childNodes;

  for (let i = 0; i < numOfChildren; i++) {
    const currentChild = childList[i];
    currentChild.style.backgroundColor = colourInput.value;
  }
});

// CLEAR BUTTON
document.getElementById('clearBtn').addEventListener('click', () => {
  const numOfChildren = gridArea.childNodes.length;
  const childList = gridArea.childNodes;

  for (let i = 0; i < numOfChildren; i++) {
    const currentChild = childList[i];
    currentChild.style.backgroundColor = 'white';
  }
});

// SAVE BUTTON
document.getElementById('saveBtn').addEventListener('click', () => {
  gridArea.childNodes.forEach((child) => (child.style.border = 'none'));
  toPng(gridArea)
  .then((dataUrl) => {
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = dataUrl;
    link.click();
  })
  .catch((e) => console.error('Oops, something went wrong!', e));
});