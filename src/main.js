import './reset.css'
import './style.css'

import rawData from "./db/game-list.csv?raw"

let gameListDom = document.getElementById("game-list")
let list = rawData.split("\n")

list.shift()
list.forEach(line => {
  let values = line.split(",")
  let gameInfo = {
    title: values[0],
    category: values[1],
    base_price: values[2],
    discount_percent: values[3],
    first_run: values[4],
  }

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

