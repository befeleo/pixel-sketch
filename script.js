sketch = document.querySelector('.sketch')
cellSizeDisplay = document.querySelector('.size-display')
inputSize = document.getElementById('size')

// Buttons
randomColorBtn = document.getElementById('random-color')
gridBtn = document.getElementById('grid')

// Default size
const defaultSize = 16

cellSizeDisplay.textContent = `${defaultSize}X${defaultSize}`
inputSize.value = defaultSize

for (let i = 1; i <= defaultSize ** 2; i++) {
    const defaults = document.createElement('div')
    defaults.classList.add('cell')
    defaults.style.width = `${100 / defaultSize}%`
    defaults.style.height = `${100 / defaultSize}%`

    defaults.addEventListener('mouseover', () => {
        if (userRandomColor)
            defaults.style.backgroundColor = randomColorGenerate()
    })
    sketch.appendChild(defaults)
}



// Random Color
const randomColorGenerate = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

let userRandomColor = false
randomColorBtn.addEventListener('click', () => {
    userRandomColor = !userRandomColor
})

// Modify Size 

const createCell = () => {
    cellSizeDisplay.textContent = `${inputSize.value}X${inputSize.value}`
    sketch.innerHTML = ''

    let size = inputSize.value
    for (let i = 1; i <= size ** 2; i++) {
        const newCell = document.createElement('div')
        newCell.classList.add('cell')
        newCell.style.width = `${100 / size}%`
        newCell.style.height = `${100 / size}%`

        newCell.addEventListener('mouseover', () => {
            if (userRandomColor)
                newCell.style.backgroundColor = randomColorGenerate()
        })
        sketch.appendChild(newCell)

    }
}

inputSize.addEventListener('input', () => createCell())

// Grid
let gridEnabled = true;

gridBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    gridEnabled = !gridEnabled;

    cells.forEach(cell => {

        cell.style.border = gridEnabled ? '1px solid #ddd' : 'none';
    });

    // gridBtn.textContent = gridEnabled ? 'Grid ON' : 'Grid OFF';
});
