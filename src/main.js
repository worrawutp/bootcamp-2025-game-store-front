import './reset.css'
import './style.css'

import getGames from "./gameDataService.js"

let gameListDom = document.getElementById("game-list")
let rawData = await getGames()
console.log(rawData)

if (rawData) {
  rawData.forEach(gameInfo => {
      let gameCardDom = `
        <div class="card" id="card-${gameInfo.id}">
            <div class="photo">
              <img src="src/asset/${gameInfo.photoName}.jpeg" alt="Quartet">
            </div>
            <div class="card-info">
              <div class="category">${gameInfo.category}</div>
              <div class="title">${gameInfo.title}</div>
              <div class="price">THB ${gameInfo.base_price}</div>
            </div>
            <button data-game-id="${gameInfo.id}">
              <?xml version="1.0" encoding="utf-8"?>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div> <!-- card-->
      `
      gameListDom.insertAdjacentHTML('beforeend', gameCardDom)

      // Add event listener for delete card button
      let newCard = gameListDom.lastElementChild
      let newCardDeleteBtn = newCard.querySelector("button")
      newCardDeleteBtn.addEventListener("click", submitDeleteGameCard)
    })

} else {
  let errorElement = document.getElementById("error") 
  errorElement.insertAdjacentHTML(`beforeend`, `<p>Cannot connect to Game Store database</p>`)
}

function submitDeleteGameCard(event) {
  const userConfirmed = confirm("Are you sure?")

  if(userConfirmed) {
    let trashBtn = event.currentTarget
    let gameId = trashBtn.dataset.gameId
    let url = `http://localhost:3000/games/${gameId}`

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    }).then(resp => {
      if(resp.ok) {
        return resp.json()
      }
    }).then(data => {
      const gameId = data.id
      const deletedCard = document.getElementById(`card-${gameId}`)
      deletedCard.remove()
    })
  }
}
