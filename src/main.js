import './reset.css'
import './style.css'

import getGames from "./gameDataService.js"

let gameListDom = document.getElementById("game-list")
let rawData = await getGames()

rawData.forEach(gameInfo => {
  // TODO:
  // need resolve photoName
  
  let gameCardDom = `
      <div class="card">
        <div class="photo">
          <img src="src/asset/${gameInfo.photoName}.jpeg" alt="Quartet">
        </div>
        <div class="card-info">
          <div class="category">${gameInfo.category}</div>
          <div class="title">${gameInfo.title}</div>
          <div class="price">THB ${gameInfo.base_price}</div>
        </div>
      </div> <!-- card-->
  `
  gameListDom.insertAdjacentHTML('beforeend', gameCardDom)
})

