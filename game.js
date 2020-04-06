export default function newGame (tela) {

    const snake = {
        parts: {
            'part0': { name:'part0', x: 2, y:2, move: 'ArrowUp' },
            'part1': { name:'part1', x: 2, y:3, move: null },
            'part2': { name:'part2', x: 2, y:4, move: null },
            'part3': { name:'part3', x: 2, y:5, move: null },
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
        valueFruit: 1
    }

    //regras de negócio e movendo a cobra
    function moveSnake (command) {
        
        const moves = {
            ArrowUp (part) {
                part.y = part.y - 1 < 0 ? tela.height - 1 : part.y - 1

                console.log(part.name)

                const partNumber =  parseInt(part.name.substr(part.name.length - 1)) + 1 

                if (partNumber !== state.valuePart + 1) {
                    const nextPart = snake.parts['part'.concat(partNumber)] 
                    nextPart.move = part.move 
                    part.move = 'ArrowUp'
                    console.log(nextPart.name + ' - ' + nextPart.move)
                    const move = moves[nextPart.move]
                    move(nextPart)
                }

                

            },

            ArrowDown (part) {
                part.y = part.y + 1 >= tela.height ? 0 : part.y + 1

                const partNumber =  parseInt(part.name.substr(part.name.length - 1)) + 1

                if (partNumber !== state.valuePart + 1) {
                    const nextPart = snake.parts['part'.concat(partNumber)]
                    nextPart.move = part.move
                    part.move = 'ArrowDown'
                    const move = moves[nextPart.move]
                    move(nextPart)
                } else {
                    part.move = 'ArrowDown'
                }

                
            },

            ArrowLeft (part) {
                part.x = part.x - 1 < 0 ? tela.width - 1 : part.x - 1  

                const partNumber =  parseInt(part.name.substr(part.name.length - 1)) + 1 //1

                
                if (partNumber !== state.valuePart + 1) {
                    const nextPart = snake.parts['part'.concat(partNumber)] 
                    nextPart.move = part.move 
                    part.move = 'ArrowLeft'
                    const move = moves[nextPart.move]

                    move(nextPart)
                } else {
                    part.move = 'ArrowLeft'
                }

                
            },

            ArrowRight (part) {
                part.x = part.x + 1 >= tela.width ? 0 : part.x + 1 // esquerda

                console.log(part.name)

                const partNumber =  parseInt(part.name.substr(part.name.length - 1)) + 1 //1 2

                if (partNumber !== state.valuePart + 1) {
                    const nextPart = snake.parts['part'.concat(partNumber)] //part1 part2
                    nextPart.move = part.move //cima
                    console.log(nextPart.name + ' - ' + nextPart.move)
                    part.move = 'ArrowRight' //part0 - esquerda
                    const move = moves[nextPart.move] //part1 - cima
                    move(nextPart)
                } else {
                    part.move = 'ArrowRight'
                }

                
            },
        }

        function verifyColision (command) {
            if (command.y === fruits['fruit'].y && command.x === fruits['fruit'].x) {
                moveFruit()
                state.valuePart ++
            }
        }

        
        const move = moves[command.tecla]
        const part = snake.parts['part0']
        
        if (move) {

            move(part)
            verifyColision(part)

            /*clearInterval(state.intervalMove)
            clearInterval(state.intervalVerify)
            state.intervalMove = setInterval(move, 500, part)
            state.intervalVerify = setInterval(verifyColision, 500, part)*/

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