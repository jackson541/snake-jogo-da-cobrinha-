export default function newGame () {

    const snake = {
        parts: {
            'part1': { x: 2, y:2, move: null },
            'part2': { x: 2, y:3 },
            'part3': { x: 2, y:4 }
        }
    }

    const fruit = { x:5, y:6 }

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
                part.y --
                part.move = 'ArrowUp'
            },

            ArrowDown (part) {
                part.y ++
                part.move = 'ArrowDown'
            },

            ArrowLeft (part) {
                part.x --
                part.move = 'ArrowLeft'
            },

            ArrowRight (part) {
                part.x ++
                part.move = 'ArrowRight'
            },
        }

        function verifyColision (command) {
            if (command.y === fruit.y && command.x === fruit.x) {
                console.log('colidiu')
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
        fruit = {
            x: Math.floor( Math.random * 20 ),
            x: Math.floor( Math.random * 20 )
        }
    }

    return {
        moveSnake,
        snake,
        fruit
    }

}