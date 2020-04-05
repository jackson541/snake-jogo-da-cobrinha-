export default function newEscutarTeclado (document) {
    document.addEventListener('keydown', pegarTeclado)

    const observers = []

    function subscribe (observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll (command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function pegarTeclado (event) {
        const tecla = event.key
        
        const command = {
            tecla
        }

        notifyAll(command)

    }

    return {
        subscribe
    }

}