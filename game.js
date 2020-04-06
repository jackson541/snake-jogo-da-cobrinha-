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
        nextMove: null,
        currentMove: null
    }

    //regras de negócio e movendo a cobra
    function moveSnake (command) {
        
        const moves = {
            ArrowUp (part) {
                part.y = part.y - 1 < 0 ? tela.height - 1 : part.y - 1

                const partNumber =  parseInt(part.name.substr(part.name.length - 1)) + 1 

                /**
                 * Se o movimento for da baceça, irá receber o valor de move dela.
                 * Se não, irá receber o movimento salvo em nextMove
                 */
                state.currentMove = partNumber === 1 ? part.move : state.nextMove  

                if (partNumber !== state.valuePart + 1) {

                    /**
                     * 1 - pega a proxima parte do corp
                     * 2 - salva o movimento dela para ser repassado para a próxima
                     * 3 - define o seu movimento como sendo o da parte anterior
                     * 4 - salva o move da parte atual como ArrowUp
                     * 5 - pega a função do movimento da próxima parte do corpo
                     * 6 - realiza o movimento
                     */
                    const nextPart = snake.parts['part'.concat(partNumber)]
                    state.nextMove = nextPart.move 
                    nextPart.move = state.currentMove 
                    part.move = 'ArrowUp'
                    const move = moves[nextPart.move] 

                    move(nextPart)
                }

                

            },

            ArrowDown (part) {
                part.y = part.y + 1 >= tela.height ? 0 : part.y + 1

                const partNumber =  parseInt(part.name.substr(part.name.length - 1)) + 1
                
                state.currentMove = partNumber === 1 ? part.move : state.nextMove  

                if (partNumber !== state.valuePart + 1) {
                    const nextPart = snake.parts['part'.concat(partNumber)]
                    state.nextMove = nextPart.move 
                    nextPart.move = state.currentMove 
                    part.move = 'ArrowDown'
                    const move = moves[nextPart.move] 

                    move(nextPart)
                }


                
            },

            ArrowLeft (part) {
                part.x = part.x - 1 < 0 ? tela.width - 1 : part.x - 1  

                const partNumber =  parseInt(part.name.substr(part.name.length - 1)) + 1 //1

                state.currentMove = partNumber === 1 ? part.move : state.nextMove  

                if (partNumber !== state.valuePart + 1) {
                    const nextPart = snake.parts['part'.concat(partNumber)]
                    state.nextMove = nextPart.move 
                    nextPart.move = state.currentMove 
                    part.move = 'ArrowLeft'
                    const move = moves[nextPart.move] 

                    move(nextPart)
                }


                
            },

            ArrowRight (part) {
                part.x = part.x + 1 >= tela.width ? 0 : part.x + 1

                const partNumber =  parseInt(part.name.substr(part.name.length - 1)) + 1 

                state.currentMove = partNumber === 1 ? part.move : state.nextMove  

                if (partNumber !== state.valuePart + 1) {
                    const nextPart = snake.parts['part'.concat(partNumber)]
                    state.nextMove = nextPart.move 
                    nextPart.move = state.currentMove 
                    part.move = 'ArrowRight'
                    const move = moves[nextPart.move] 

                    move(nextPart)
                }

                
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

        
        const move = moves[command.tecla]
        const part = snake.parts['part0']
        
        if (move) {

            move(part)
            verifyColisionFruit(part)

            clearInterval(state.intervalMove)
            clearInterval(state.intervalVerify)
            state.intervalMove = setInterval(move, 500, part)
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
                    y: command.y1,
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