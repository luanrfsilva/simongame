let order = []
let player_order = []
let power = false
let strict = false
let noise = true
let win = false
let intervalId = 0
let turn = 1
let flash = 0
let good = true
let compTurn = true

const green_button = document.querySelector('#green')
const red_button = document.querySelector('#red')
const yellow_button = document.querySelector('#yellow')
const blue_button = document.querySelector('#blue')
const counter = document.querySelector('#counter')
const power_button = document.querySelector('#power')
const strict_button = document.querySelector('#strict')
const start_button = document.querySelector('#start-game')

strict_button.addEventListener('click', () => (strict = strict_button.checked))

power_button.addEventListener('click', () => {
  power = power_button.checked
  if (power) counter.innerHTML = '-'
  else {
    counter.innerHTML = ''
    clearColor()
    clearInterval()
  }
})

start_button.addEventListener('click', () => {
  if (power || win) play()
})

function play() {
  win = false
  order = []
  player_order = []
  intervalId = 0
  turn = 1
  counter.innerHTML = 1
  flash = 0
  good = true
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1)
  }
  compTurn = true

  intervalId = setInterval(gameTurn, 800)
}

function gameTurn() {
  power = true
  if (flash === turn) {
    clearInterval(intervalId)
    compTurn = false
    clearColor()
    power = true
  }
  if (compTurn) {
    clearColor()
    setTimeout(() => {
      if (order[flash] === 1) one()
      if (order[flash] === 2) two()
      if (order[flash] === 3) three()
      if (order[flash] === 4) four()
      flash++
    }, 200)
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById('clip1')
    audio.play()
  }
  noise = true
  green_button.classList.add('active')
}

function two() {
  if (noise) {
    let audio = document.getElementById('clip2')
    audio.play()
  }
  noise = true
  red_button.classList.add('active')
}

function three() {
  if (noise) {
    let audio = document.getElementById('clip3')
    audio.play()
  }
  noise = true
  yellow_button.classList.add('active')
}

function four() {
  if (noise) {
    let audio = document.getElementById('clip4')
    audio.play()
  }
  noise = true
  blue_button.classList.add('active')
}

function clearColor() {
  green_button.classList.remove('active')
  red_button.classList.remove('active')
  yellow_button.classList.remove('active')
  blue_button.classList.remove('active')
}

function flashColor() {
  green_button.classList.add('active')
  red_button.classList.add('active')
  yellow_button.classList.add('active')
  blue_button.classList.add('active')
}

green_button.addEventListener('click', () => {
  if (power) {
    player_order.push(1)
    check()
    one()
    if (!win) {
      setTimeout(() => clearColor(), 300)
    }
  }
})

red_button.addEventListener('click', () => {
  if (power) {
    player_order.push(2)
    check()
    two()
    if (!win) {
      setTimeout(() => clearColor(), 300)
    }
  }
})

yellow_button.addEventListener('click', () => {
  if (power) {
    player_order.push(3)
    check()
    three()
    if (!win) {
      setTimeout(() => clearColor(), 300)
    }
  }
})

blue_button.addEventListener('click', () => {
  if (power) {
    player_order.push(4)
    check()
    four()
    if (!win) {
      setTimeout(() => clearColor(), 300)
    }
  }
})

function check() {
  if (player_order[player_order.length - 1] !== order[player_order.length - 1]) good = false
  if (player_order.length === 20 && good) winGame()
  if (!good) {
    flashColor()
    counter.innerHTML = 'NO!'
    setTimeout(() => {
      counter.innerHTML = turn
      clearColor()
      if (strict) play()
      else {
        compTurn = true
        flash = 0
        player_order = []
        good = true
        intervalId = setInterval(gameTurn, 800)
      }
    }, 800)
    noise = false
  }
  if (turn === player_order.length && good && !win) {
    turn++
    player_order = []
    compTurn = true
    flash = 0
    counter.innerHTML = turn
    intervalId = setInterval(gameTurn, 800)
  }
}

function winGame() {
  flashColor()
  counter.innerHTML = 'WIN!'
  power = false
  win = true
}
