canvas = document.querySelectorAll(".canvas")
parent = document.querySelector('.sketch')
btn = document.querySelector('.btn')

// Hover
canvas.forEach(e => {
    e.addEventListener(('mouseover'), () => {
        e.style.backgroundColor = 'pink'
    })
})

// Size 
let size
btn.addEventListener('click', () => {

    size = +prompt('Enter size', '')
    parent.innerHTML = ''

    for (let i = 1; i <= size ** 2; i++) {
        const newCanvas = document.createElement('div')
        newCanvas.classList.add('canvas')
        newCanvas.style.width = `${100 / size}%`
        newCanvas.style.height = `${100 / size}%`

        newCanvas.addEventListener('mouseover', () => {
            newCanvas.style.backgroundColor = 'pink'
        })

        parent.appendChild(newCanvas)
    }
})
