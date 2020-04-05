export default function newRenderGame (tela, game) {
    const context = tela.getContext('2d')

    context.clearRect(0, 0, 20, 20)

    const parts = game.snake.parts
    const fruit = game.fruit

    for (const partId in parts) {
        const part = parts[partId]
        context.fillStyle = 'blue'
        context.fillRect(part.x, part.y, 1, 1)
    }

   
    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)


    requestAnimationFrame(() => {
        newRenderGame(tela, game)
    })
}