const slider = document.getElementsByClassName('grid_size')[0];
const  output = document.getElementsByClassName('grid_range')[0];
const container = document.getElementsByClassName('container')[0];
const set = document.getElementsByClassName('set')[0];
const colorpicker = document.getElementById('colorpicker');
const grid = document.getElementsByClassName('grid')[0];
const rainbow = document.getElementsByClassName('rainbow')[0];
const eraser = document.getElementsByClassName('eraser')[0];
const clear = document.getElementsByClassName('clear')[0];
const gridLines = document.getElementsByClassName('set_grid')[0];
var n = 50;
var color = colorpicker.value;
var isRainbowMode = false;
var isEraser = false;
var isGrid = false;

function randomColor() {
    let s = Math.floor(Math.random() * 256);
    let t = Math.floor(Math.random() * 256);
    let u = Math.floor(Math.random() * 256);
    let randomCol = "rgb(" + s + ",  " + t + "," + u + ")";
    return randomCol;
}

function colorGrid() {
    
    if (isEraser) {
        this.style.backgroundColor =  'rgb(255, 255, 255)';
    } else if(isRainbowMode) {
        color = randomColor();
        this.style.backgroundColor = color;
        
    } else {
        color = colorpicker.value;
        this.style.backgroundColor = color;
    }
    
}


function setSize(m) {
    container.lastElementChild.remove();
    let grid =  document.createElement("div");
    grid.classList.add('grid');
    container.appendChild(grid);
    for(let i=1; i<=m; i++) {
        let row = document.createElement("div");
        row.classList.add('row');
        grid.appendChild(row);
        for(let j=1; j<=m ; j++) {
            let cell = document.createElement("div");
            cell.className += "cell";
            row.appendChild(cell);
            cell.addEventListener('mouseover', colorGrid);
            if(isGrid) {
                cell.classList.add('border');
            }
            
            
        }
    }
}

function showValue() {
    output.textContent = "Size: " + n + "x"  + n;
    n = this.value;
    output.textContent = "Size: " + n + "x"  + n;
    setSize(n);
}

function rainbowMode() {
    isRainbowMode = true;
    rainbow.textContent = "Classic Mode";
    rainbow.addEventListener('click', (e) => {
        isRainbowMode = false;
        rainbow.textContent =  'Rainbow Mode';
        rainbow.addEventListener('click', (e) => {
            rainbowMode();
        });
    });
}

function erase() {
    isEraser = true;
    eraser.style.backgroundColor='#e5e5e5';
    eraser.style.color = '#03010b';
    eraser.addEventListener('click', (e) => {
        isEraser = false;
        eraser.style.backgroundColor='#03010b';
        eraser.style.color = '#e5e5e5';
        eraser.addEventListener('click', (e) => {
            erase();
        });
    });
}

function toggleGridlines() {
    isGrid = true;
    gridLines.textContent = "Hide Gridlines";
    setSize(n);
    gridLines.addEventListener('click',  ()=>{
        isGrid=false;
        gridLines.textContent = "Show Gridlines";
        setSize(n);
        gridLines.addEventListener('click', () => {
            toggleGridlines();
        });
    });
}

slider.addEventListener("input", showValue);
/*
set.addEventListener('click', function() {
    setSize(n);
});
*/
rainbow.addEventListener('click', (e) => {
    rainbowMode();
});

eraser.addEventListener('click', (e) => {
    erase();
});

clear.addEventListener('click', () => {
    for(let i=0; i <= n*n; i++){
        let cell = document.getElementsByClassName('cell');
        cell[i].style.backgroundColor = "white";
    }
});

gridLines.addEventListener('click', () => {
    toggleGridlines();
});
