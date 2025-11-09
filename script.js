canvas = document.querySelectorAll(".canvas")
parent = document.querySelector('.sketch')

// Hover
canvas.forEach(e => {
    e.addEventListener(('mouseover'), () => {
        e.style.backgroundColor = 'pink'
    })
})

// Size 

let size = +prompt('Enter size', '')
console.log(size)
for (let i = 1; i <= size ** 2; i++) {
    newCanvas = document.createElement('div')
    canvas = ''
    newCanvas.classList.add('canvas')
    newCanvas.textContent = i
    newCanvas.style.width = `${100 / size}%`
    newCanvas.style.height = `${100 / size}%`
    parent.style.display = 'flex'
    parent.style.flexWrap = 'wrap'
    parent.appendChild(newCanvas)
}