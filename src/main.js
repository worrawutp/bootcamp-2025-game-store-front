import './reset.css'
import './style.css'

import rawData from "./db/game-list.csv?raw"

let gameList = document.getElementById("game-list")
let gameData = rawData.split("\n")

gameData.shift()
gameData.pop()
console.log(gameData)

gameData.forEach((line) => {
    let gameCard = `<div>${line}</div>`
    gameList.insertAdjacentHTML('beforeend', gameCard)
})