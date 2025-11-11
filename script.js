const sketch = document.querySelector('.sketch')
const inputSize = document.getElementById('size')
const sizeDisplay = document.querySelector('.size-display')
const colorDisplay = document.querySelector('.color-display')
// colorDisplay.textContent = 'black'

// Buttons
const colorPaletteBtn = document.getElementById('color-palette')
const randomColorBtn = document.getElementById('random-color')
const eraseBtn = document.getElementById('erase')
const gridBtn = document.getElementById('grid')
const clearBtn = document.getElementById('clear')
const saveBtn = document.getElementById('save')

// Color
const colors = document.querySelectorAll('.color')

// Conditions
let colorPaletteEnabled = false
let randomColorEnabled = false
let eraseEnabled = false
let gridEnabled = false

// Default Size
let defaultSize = 16
inputSize.value = defaultSize
sizeDisplay.textContent = `${defaultSize}X${defaultSize}`
for (let i = 1; i <= defaultSize ** 2; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.width = `${100 / defaultSize}%`
    cell.style.height = `${100 / defaultSize}%`
    sketch.appendChild(cell)
}

// New Cells
const createCell = () => {
    sketch.innerHTML = ''
    let size = inputSize.value
    sizeDisplay.textContent = `${size}X${size}`
    for (let i = 1; i <= size ** 2; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.style.width = `${100 / size}%`
        cell.style.height = `${100 / size}%`
        cell.style.border = gridEnabled ? '1px solid #ddd' : 'none'
        sketch.appendChild(cell)
    }
}

// Update the button appearance
const updateButtonStates = () => {
    randomColorBtn.style.backgroundColor = randomColorEnabled ? '#000' : '#fff'
    randomColorBtn.style.color = randomColorEnabled ? '#fff' : '#000'

    eraseBtn.style.backgroundColor = eraseEnabled ? '#000' : '#fff'
    eraseBtn.style.color = eraseEnabled ? '#fff' : '#000'

    gridBtn.style.backgroundColor = gridEnabled ? '#000' : '#fff'
    gridBtn.style.color = gridEnabled ? '#fff' : '#000'
}
// Add default color 
const getColorPalette = (color) => {
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
        displayColor(color)
        cell.addEventListener('mouseover', () => {
            if (colorPaletteEnabled) {
                cell.style.backgroundColor = `${color}`
            }
        })
    })
    randomColorEnabled = false
    eraseEnabled = false
}

// Add color from input
const colorInput = () => {
    colorPaletteEnabled = true
    randomColorEnabled = false
    eraseEnabled = false

    const colorPicker = document.createElement('input')
    colorPicker.type = 'color'
    colorPicker.style.display = 'none'
    document.body.appendChild(colorPicker)

    colorPicker.addEventListener('input', (color) => {
        const selectedColor = color.target.value
        displayColor(selectedColor)
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            cell.addEventListener('mouseover', () => {
                if (colorPaletteEnabled)
                    cell.style.backgroundColor = selectedColor
            })
        })
    })
    colorPicker.click()

}


// Add random Color
const randomColorGenerate = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
    return hex
}

const displayColor = (color) => {
    colorDisplay.innerHTML = ''
    const p = document.createElement('p')
    p.textContent = color
    colorDisplay.appendChild(p)
}

const getRandomColor = () => {
    colorDisplay.innerHTML = ''
    const p = document.createElement('p')
    randomColorEnabled = !randomColorEnabled
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            if (randomColorEnabled) {
                const randomColor = randomColorGenerate()
                cell.style.backgroundColor = randomColor
                displayColor(randomColor)
            }
        })
    })
    colorDisplay.appendChild(p)
    colorPaletteEnabled = false
    eraseEnabled = false

    updateButtonStates()
}

// Display Grid
const displayGrid = () => {
    gridEnabled = !gridEnabled
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => cell.style.border = gridEnabled ? '1px solid #ddd' : 'none')

    updateButtonStates()
}

// Clear
const clearGrid = () => {
    colorDisplay.innerHTML = ''
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => cell.style.backgroundColor = '#fff')
    colorPaletteEnabled = false
    randomColorEnabled = false
    eraseEnabled = false

    updateButtonStates()
}

// Erase
const eraseGrid = () => {
    colorDisplay.innerHTML = ''
    eraseEnabled = !eraseEnabled
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            if (eraseEnabled)
                cell.style.backgroundColor = '#fff'
        })
    })
    colorPaletteEnabled = false
    randomColorEnabled = false

    updateButtonStates()
}

// Save
const save = () => {
    html2canvas(sketch).then(canvas => {
        const link = document.createElement('a')
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        link.download = `sketch_${timestamp}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
    })
}


// Event listeners
colors.forEach(color => {
    color.addEventListener('click', () => {
        colorPaletteEnabled = true
        const colorId = `#${color.id}`
        console.log(colorId)
        getColorPalette(colorId)
    })
})

colorPaletteBtn.addEventListener('click', () => colorInput())
randomColorBtn.addEventListener('click', () => getRandomColor())
eraseBtn.addEventListener('click', () => eraseGrid())
gridBtn.addEventListener('click', () => displayGrid())
clearBtn.addEventListener('click', () => clearGrid())
saveBtn.addEventListener('click', () => save())
inputSize.addEventListener('input', () => createCell())

