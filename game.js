export default function newGame (tela) {

    const snake = {
        parts: {
            'part1': { x: 2, y:2, move: null },
            'part2': { x: 2, y:3 },
            'part3': { x: 2, y:4 }
        }
    }

    //acontecer algum erro na rederização e por isso não consegui deixar apenas como um objeto com x e y
    const fruits = {
        'fruit': { x:5, y:6 }
    }

    const state = {
        intervalMove: null,
        intervalVerify: null,
        valuePart: 1,
        valueFruit: 1
    }

    //regras de negócio e movendo a cobra
    function moveSnake (command) {
        
        const moves = {
            ArrowUp (part) {
                part.y = part.y - 1 < 0 ? tela.height - 1 : part.y - 1
                part.move = 'ArrowUp'
            },

            ArrowDown (part) {
                part.y = part.y + 1 >= tela.height ? 0 : part.y + 1
                part.move = 'ArrowDown'
            },

            ArrowLeft (part) {
                part.x = part.x - 1 < 0 ? tela.width - 1 : part.x - 1
                part.move = 'ArrowLeft'
            },

            ArrowRight (part) {
                part.x = part.x + 1 >= tela.width ? 0 : part.x + 1
                part.move = 'ArrowRight'
            },
        }

        function verifyColision (command) {
            if (command.y === fruits['fruit'].y && command.x === fruits['fruit'].x) {
                moveFruit()
                state.valuePart ++
            }
        }

        
        const move = moves[command.tecla]
        const part = snake.parts['part1']
        
        if (move && command.tecla !== part.move) {
            move(part)
            verifyColision(part)

            clearInterval(state.intervalMove)
            clearInterval(state.intervalVerify)
            state.intervalMove = setInterval(move, 500, part)
            state.intervalVerify = setInterval(verifyColision, 500, part)

        }
        

    }



    function moveFruit () {
        fruits['fruit'] = {
            x: Math.floor( Math.random() * 20 ),
            y: Math.floor( Math.random() * 20 )
        }
    }

    return {
        moveSnake,
        snake,
        fruits
    }

}