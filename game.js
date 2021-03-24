const blue = document.getElementById('blue')
const purple = document.getElementById('purple')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const startButton = document.getElementById('startButton')

class Game{
    constructor(){
        this.initialize()
        this.generateSequence()
        this.nextLevel()
    }

    initialize(){
        // Adds CSS class 
        startButton.classList.add('hide')
        this.level = 5
        this.colors = {
            // This equals to blue: blue (const variable at the beginning)
            blue, 
            purple, 
            orange,
            green
        }
    }

    generateSequence(){
        // arguments of Array() is the number of elements inside the array 
        // we must fil the array with 0's, otherwise the map function won't work.
        // Math.random()*4 will only return a number from 0 to 3.9, and math floor will
        // cap the value to the lower nearest integer 
        this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))
    }

    nextLevel(){
        this.lightSequence()
        this.addClickEvents()
    }

    setColor(number){
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

    lightSequence(){
        // Level is the number of elements that will be iterated on the array
        // if level = 3, then it will iterate through the first 3 elements of the array
        // must declare variables with let and const, otherwise, the value will be overrided for 
        // the setTimeout each iteration, and it'll light the last color of the sequence
        for(let i = 0; i< this.level; i++){
            const color = this.setColor(this.sequence[i])
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

    // addEventListener represents an HTML element, instead of a Game() element, so 
    // we must bind the event to Game().
    addClickEvents(){
        // Must bind event 'this.chooseColor' to 'this' (game object) to prevent
        // losing the reference to this Game class. Otherwise, the 'this' of the event
        // created will now be the button itself, instead of the game
        this.colors.blue.addEventListener('click', this.chooseColor.bind(this))
        this.colors.green.addEventListener('click', this.chooseColor.bind(this))
        this.colors.purple.addEventListener('click', this.chooseColor.bind(this))
        this.colors.orange.addEventListener('click', this.chooseColor.bind(this))
    }

    chooseColor(ev){
        console.log(this)
    }
}

function startGame(){
    window.game = new Game()
}