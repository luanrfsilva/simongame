let order = []
let player_order = []
let power = false
let strict = false
let noise = true
let win = false
let intervalId = 0
let turn = 1

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
}
