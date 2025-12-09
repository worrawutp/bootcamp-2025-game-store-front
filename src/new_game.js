import { submitDeleteGameCard } from "./delete_game"

// submit new game
const btnSubmit = document.getElementById("btn-submit-new-game")
btnSubmit.addEventListener("click", function(event){
  event.preventDefault()

  const title = document.getElementById("new-game-title")
  const category = document.getElementById("new-game-category")
  const base_price = document.getElementById("new-game-base-price")
  const discount_percent = document.getElementById("new-game-discount-percent")

  const gameData = {
    title: title.value,
    category: category.value,
    base_price: base_price.value,
    discount_percent: discount_percent.value,
    first_run: "",
  }

  // Send HTTP request to localhost:3000/games with game data
  const url = "http://localhost:3000/games"
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData)
  }).then((resp) => {
      if(!resp.ok) {
        console.error("Bad response")
      } else {
        return resp.json()
      }
    })
    .then((gameInfo) => {
      let gameListDom = document.getElementById("game-list")
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

      const newGameForm = document.getElementById("new-game-form")
      if(newGameForm != undefined) {
        newGameForm.hidePopover()
      }

      // Clear form input values
      title.value = ""
      base_price.value = ""
      discount_percent.value = ""
    })
})

