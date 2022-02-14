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
let audioEnd = false

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
      if (order[flash] === 1) soundEffect('clip1', 'green')
      if (order[flash] === 2) soundEffect('clip2', 'red')
      if (order[flash] === 3) soundEffect('clip3', 'yellow')
      if (order[flash] === 4) soundEffect('clip4', 'blue')
      flash++
    }, 200)
  }
}

let AudioContext = window.AudioContext || window.webkitAudioContext

async function soundEffect(audioId, elemId) {
  const audioSrc = {
    clip1: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    clip2: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    clip3: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    clip4: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  }
  let audio = new Audio(audioSrc[audioId])
  audio.addEventListener('canplay', async () => {
    await audio.play()
  })
  elem = document.getElementById(elemId)
  elem.classList.add('active')
  audioEnd = true
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
  if (power && !compTurn && audioEnd) {
    audioEnd = false
    player_order.push(1)
    check()
    soundEffect('clip1', 'green')
    if (!win) {
      setTimeout(() => clearColor(), 300)
    }
  }
})

red_button.addEventListener('click', () => {
  if (power && !compTurn && audioEnd) {
    audioEnd = false
    player_order.push(2)
    check()
    soundEffect('clip2', 'red')
    if (!win) {
      setTimeout(() => clearColor(), 300)
    }
  }
})

yellow_button.addEventListener('click', () => {
  if (power && !compTurn && audioEnd) {
    audioEnd = false
    player_order.push(3)
    check()
    soundEffect('clip3', 'yellow')
    if (!win) {
      setTimeout(() => clearColor(), 300)
    }
  }
})

blue_button.addEventListener('click', () => {
  if (power && !compTurn && audioEnd) {
    audioEnd = false
    player_order.push(4)
    check()
    soundEffect('clip4', 'blue')
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
