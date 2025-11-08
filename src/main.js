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
    let gameCard = `
    <div class="card">
        <div class="photo">
          <img src="src/asset/Duckov.png" alt="Dockkov">
        </div>
        <div class="card-info">
          <div class="category">${gameInfo.category}</div>
          <div class="title">${gameInfo.title}</div>
        
          <div class="boxmarked">
              <span class="marked"></span>
              <span>${gameInfo.first_run}</span>
            </div>  

          <div class="price-info">
            <div class="bluebox">
              <span>${gameInfo.discount_percent}</span>
            </div>
            <div class="price">
              <div class="price-real">${gameInfo.base_price}</div>
              <div class="price-discount">THB 362.70 </div>
            </div>
          </div>
        </div>
      </div>
      `
    gameList.insertAdjacentHTML('beforeend', gameCard)
})