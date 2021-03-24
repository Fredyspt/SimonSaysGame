const blue = document.getElementById('blue')
const purple = document.getElementById('purple')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const startButton = document.getElementById('startButton')
const LEVELS = 4

class Game{
    constructor(){
        this.initialize = this.initialize.bind(this)
        this.initialize()
        this.generateSequence()
        setTimeout(this.nextLevel, 1000)
    }

    initialize(){
        // Must bind event 'this.chooseColor' to 'this' (game object) to prevent
        // losing the reference to this Game class. Otherwise, the 'this' of the event
        // created will now be the button itself, instead of the game
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.toggleStartButton()
        this.level = 1
        this.colors = {
            // This equals to blue: blue (const variable at the beginning)
            blue, 
            purple, 
            orange,
            green
        }
    }

    toggleStartButton(){
        if(startButton.classList.contains('hide')){
            // Removes CSS class 
            startButton.classList.remove('hide')    
        } else {
            // Adds CSS class 
            startButton.classList.add('hide')
        }
    }

    generateSequence(){
        // arguments of Array() is the number of elements inside the array 
        // we must fil the array with 0's, otherwise the map function won't work.
        // Math.random()*4 will only return a number from 0 to 3.9, and math floor will
        // cap the value to the lower nearest integer 
        this.sequence = new Array(LEVELS).fill(0).map(n => Math.floor(Math.random()*4))
    }

    nextLevel(){
        this.sequencePos = 0
        this.lightSequence()
        // Until sequence lighting is finished, click events are activated
        this.addClickEvents()
    }

    numberToColor(number){
        switch(number){
            case 0:
                return 'blue'
            case 1:
                return 'purple'
            case 2:
                return 'orange'
            case 3:
                return 'green'
        }
    }

    colorToNumber(color){
        switch(color){
            case 'blue':
                return 0
            case 'purple':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3
        }
    }

    lightSequence(){
        // Level is the number of elements that will be iterated on the array
        // if level = 3, then it will iterate through the first 3 elements of the array
        // must declare variables with let and const, otherwise, the value will be overrided for 
        // the setTimeout each iteration, and it'll light the last color of the sequence
        for(let i = 0; i< this.level; i++){
            const color = this.numberToColor(this.sequence[i])
            setTimeout(()=>this.lightColor(color), 1000*i)
        }
    }

    lightColor(color){
        this.colors[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350)
    }

    turnOffColor(color){
        this.colors[color].classList.remove('light')
    }

    
    addClickEvents(){
        // addEventListener represents an HTML element, instead of a Game() element, so 
        // we must bind the event to Game().
        this.colors.blue.addEventListener('click', this.chooseColor)
        this.colors.green.addEventListener('click', this.chooseColor)
        this.colors.purple.addEventListener('click', this.chooseColor)
        this.colors.orange.addEventListener('click', this.chooseColor)
        // addEventListener will pass an event as a parameter to this.chooseColor
    }

    removeClickEvents(){
        this.colors.blue.removeEventListener('click', this.chooseColor)
        this.colors.green.removeEventListener('click', this.chooseColor)
        this.colors.purple.removeEventListener('click', this.chooseColor)
        this.colors.orange.removeEventListener('click', this.chooseColor)
    }


    chooseColor(ev){
        const colorButton = ev.target.dataset.color
        const colorNumber = this.colorToNumber(colorButton)
        this.lightColor(colorButton)

        console.log(colorNumber)
        console.log(this.sequence[this.sequencePos])
        if(colorNumber === this.sequence[this.sequencePos]){
            this.sequencePos++

            if(this.sequencePos === this.level){
                this.level++
                this.removeClickEvents()
                
                if(this.level === (LEVELS + 1)){
                    this.winner()
                } else {
                    // this.nextLevel is referenced, not invoked, otherwise it'll
                    // be executed right away, ignoring the timeout
                    setTimeout(this.nextLevel,1000)
                }
            }
        } else {
            this.gameOver()
        }
    }

    winner(){
        swal('Congrats!', 'You won the game! Try increasing the difficulty!', 'success')
            // .then(() => {
            //     this.initialize()
            // })
            .then(this.initialize)
    }

    gameOver(){
        swal('Oops!', 'You missed the sequence, try again!', 'error')
            .then(() => {
                this.removeClickEvents()
                this.initialize()
            })
    }
}

function startGame(){
    window.game = new Game()
}