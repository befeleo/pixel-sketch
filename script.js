cell = document.querySelectorAll(".cell")
sketch = document.querySelector('.sketch')
sizeDisplay = document.querySelector('.size-display')
inputSize = document.getElementById('size')


// Hover
cell.forEach(e => {
    e.addEventListener(('mouseover'), () => {
        e.style.backgroundColor = 'pink'
    })
})

// Random Color
const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

// Size 

inputSize.addEventListener('input', () => {
    sizeDisplay.textContent = `${inputSize.value}X${inputSize.value}`
    sketch.innerHTML = ''

    let size = inputSize.value
    for (let i = 1; i <= size ** 2; i++) {
        const newCell = document.createElement('div')
        newCell.classList.add('cell')
        newCell.style.width = `${100 / size}%`
        newCell.style.height = `${100 / size}%`

        newCell.addEventListener('mouseover', () => {
            newCell.style.backgroundColor = randomColor()
        })
        sketch.appendChild(newCell)
    }
})


