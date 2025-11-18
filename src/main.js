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
        base_price: parseFloat(data[2]),
        discount_percent: parseInt(data[3]),
        first_run: data[4]
    }
    
  const imageName = `${gameInfo.title}.png`
  const imageUrl = new URL(`./asset/${imageName}`, import.meta.url).href

  let finalPrice = gameInfo.base_price * (1 - (gameInfo.discount_percent / 100))

  let firstRunHtml = ''
  if (gameInfo.first_run === 'yes') {
    firstRunHtml = `
      <div class="boxmarked">
        <span class="marked"></span>
        <span>FristRun</span>
      </div>`
  }

  let discountHtml = ''
  let priceHtml = ''

  if (gameInfo.discount_percent > 0) {
    discountHtml = `<div class="bluebox"><span>-${gameInfo.discount_percent}%</span></div>`
    priceHtml = `
      <div class="price">
        <div class="price-real">THB ${gameInfo.base_price.toFixed(2)}</div>
        <div class="price-discount">THB ${finalPrice.toFixed(2)}</div>
      </div>`
  } else {
    priceHtml = `
      <div class="price">
        <div class=price-discount">THB ${gameInfo.base_price.toFixed(2)}</div>
      </div>`
  }

  let gameCard = `
    <div class="card">
        <div class="photo">
          <img src="${imageUrl}" alt="${gameInfo.title}">
        </div>
        <div class="card-info">
          <div class="category">${gameInfo.category}</div>   
          <div class="title">${gameInfo.title}</div>

          ${firstRunHtml}

          <div class="price-info">
              ${discountHtml}
              ${priceHtml}
          </div>
      </div>
  </div>`
  gameList.insertAdjacentHTML('beforeend', gameCard)
})