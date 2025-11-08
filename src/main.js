import './reset.css'
import './style.css'

import rawData from "./db/game-list.csv?raw"

let gameList = document.getElementById("game-list")
let gameData = rawData.split("\n")

gameData.shift()
gameData.pop()
console.log(gameData)

gameData.forEach((line) => {
    let data = line.split(',')
    let gameInfo = {
        title: data[0],
        category: data[1],
        base_price: data[2],
        discount_percent: data[3],
        first_run: data[4]
    }
    let gameCard = `<div>${line}</div>`
    gameList.insertAdjacentHTML('beforeend', gameCard)
})