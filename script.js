canvas = document.querySelectorAll(".canvas")
parent = document.querySelector('.sketch')
btn = document.querySelector('.btn')

// Hover
canvas.forEach(e => {
    e.addEventListener(('mouseover'), () => {
        e.style.backgroundColor = 'pink'
    })
})
const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

// Size 
sizeDisplay = document.querySelector('.size-display')
inputSize = document.querySelector('#size')

inputSize.addEventListener('input', () => {
    sizeDisplay.textContent = `${inputSize.value}X${inputSize.value}`
    parent.innerHTML = ''

    let size = inputSize.value
    for (let i = 1; i <= size ** 2; i++) {
        const newCanvas = document.createElement('div')
        newCanvas.classList.add('canvas')
        newCanvas.style.width = `${100 / size}%`
        newCanvas.style.height = `${100 / size}%`

        newCanvas.addEventListener('mouseover', () => {
            newCanvas.style.backgroundColor = randomColor()
        })

        parent.appendChild(newCanvas)
    }

})


