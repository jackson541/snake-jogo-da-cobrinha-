export default function newRenderGame (tela, game, score, bestScore, paragraph) {
    const context = tela.getContext('2d')

    score.innerHTML = 'Score: ' + game.score.current
    bestScore.innerHTML = 'Best score: ' + game.score.best

    if (game.modes.mode === 'hardcore') {
        paragraph.innerHTML = 'Modo Hard Core: o teletransporte pela parede <br> não funcionará'
    } else {
        paragraph.innerHTML = ''
    }

    context.clearRect(0, 0, 20, 20)

    const parts = game.snake.parts
    const fruit = game.fruits['fruit']

    for (const partId in parts) {
        const part = parts[partId]
        context.fillStyle = 'blue'
        context.fillRect(part.x, part.y, 1, 1)
    }
   
    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)

    requestAnimationFrame(() => {
        newRenderGame(tela, game, score, bestScore, paragraph)
    })
}