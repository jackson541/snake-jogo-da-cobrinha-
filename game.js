export default function newGame (tela) {

    const snake = {
        parts: {
            'part0': { name:'part0', x: 2, y:2, move: 'ArrowUp' },
            'part1': { name:'part1', x: 2, y:3, move: 'ArrowUp' },
            'part2': { name:'part2', x: 2, y:4, move: 'ArrowUp' },
            'part3': { name:'part3', x: 2, y:5, move: 'ArrowUp' },
        }
    }

    //acontecer algum erro na rederização e por isso não consegui deixar apenas como um objeto com x e y
    const fruits = {
        'fruit': { x:5, y:6 }
    }

    const state = {
        intervalMove: null,
        intervalVerify: null,
        valuePart: 3,
        score: 0,
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

        function verifyColisionFruit (command) {
            if (command.y === fruits['fruit'].y && command.x === fruits['fruit'].x) {
                moveFruit()
                addPart()
                state.score ++
                console.log(state.score)
            }
        }

        //função para chamar o movimento de cada parte do corpo
        function setMove (command) {
            let nextMove 
            let currentMove = command.part.move 
            command.move(command.part) 

            for (let index = 1; index <= state.valuePart; index++) {
                const partId = 'part'.concat(index)
                const part = snake.parts[partId]
                nextMove = part.move 
                part.move = currentMove
                const move = moves[part.move]
                move(part)
                currentMove = nextMove
            }

        }

        
        const move = moves[command.tecla]
        const part = snake.parts['part0']
        
        if (move) {

            setMove({move, part})
            verifyColisionFruit(part)

            clearInterval(state.intervalMove)
            clearInterval(state.intervalVerify)
            state.intervalMove = setInterval(setMove, 500, {move, part})
            state.intervalVerify = setInterval(verifyColisionFruit, 500, part)

        }
        

    }


    function moveFruit () {
        fruits['fruit'] = {
            x: Math.floor( Math.random() * 20 ),
            y: Math.floor( Math.random() * 20 )
        }
    }

    function addPart () {

        const positions = {
            ArrowUp(command, name) {
                let aux = {
                    name,
                    x: command.x,
                    y: command.y + 1,
                    move: 'ArrowUp'
                }
                return aux
            },

            ArrowDown(command, name) {
                let aux = {
                    name,
                    x: command.x,
                    y: command.y - 1,
                    move: 'ArrowDown'
                }
                return aux
            },

            ArrowLeft(command, name) {
                let aux = {
                    name,
                    x: command.x + 1,
                    y: command.y,
                    move: 'ArrowLeft'
                }
                return aux
            },

            ArrowRight(command, name) {
                let aux = {
                    name,
                    x: command.x - 1,
                    y: command.y,
                    move: 'ArrowRight'
                }
                return aux
            },
        }

        const lastPartId = 'part'.concat(state.valuePart)
        const lastPart = snake.parts[lastPartId]
        const partId = 'part'.concat(state.valuePart + 1)

        const func = positions[lastPart.move]

        const part = func(lastPart, partId)

        snake.parts[partId] = part

        state.valuePart ++

        console.log(snake.parts)
        
    }

    return {
        moveSnake,
        snake,
        fruits
    }

}