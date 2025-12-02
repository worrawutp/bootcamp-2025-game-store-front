import './reset.css'
import './style.css'

import getGames from "./gameDataService.js"

let gameListDom = document.getElementById("game-list")
let rawData = await getGames()
console.log(rawData)

if (rawData) {
  rawData.forEach(gameInfo => {
      let gameCardDom = `
          <div class="card" id="card-${gameInfo.id}" data-game-info='${JSON.stringify(gameInfo)}'>
            <div class="photo">
              <img src="src/asset/${gameInfo.photoName}.jpeg" alt="${gameInfo.title}">
            </div>
            <div class="card-info">
              <div class="category">${gameInfo.category}</div>
              <div class="title">${gameInfo.title}</div>
              <div class="price">THB ${gameInfo.base_price}</div>
            </div>

            <button id="btn-delete" data-game-id="${gameInfo.id}" class="btn-delete">
              <?xml version="1.0" encoding="utf-8"?>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button id="btn-edit-${gameInfo.id}" data-game-id="${gameInfo.id}" class="btn-edit">
              Edit
            </button> 
          </div> <!-- card-->
      `
      gameListDom.insertAdjacentHTML('beforeend', gameCardDom)

      // Add event listener for delete card button
      let cardDeleteBtn = document.getElementById("btn-delete")
      cardDeleteBtn.addEventListener("click", submitDeleteGameCard)

      let cardEditBtn = document.getElementById(`btn-edit-${gameInfo.id}`)
      cardEditBtn.addEventListener("click", editGameCard)
    })

} else {
  let errorElement = document.getElementById("error") 
  errorElement.insertAdjacentHTML(`beforeend`, `<p>Cannot connect to Game Store database</p>`)
}

function editGameCard(event) {
  // TODO
  // 1. Show modal edit game card form
  const gameForm = document.getElementById("game-form")
  const editBtn = event.currentTarget
  editBtn.popoverTargetElement = gameForm
  editBtn.popoverTargetAction = "toggle"

  gameForm.querySelector("h2").textContent = "Edit Game"

  // 2. Each input attributes in the form should have value of the selected card
  const card = editBtn.parentElement
  const gameInfo = JSON.parse(card.dataset.gameInfo)
  const inputTitle = gameForm.querySelector("#game-title")
  inputTitle.value = gameInfo.title

  const inputBasePrice = gameForm.querySelector("#game-base-price")
  inputBasePrice.value = gameInfo.base_price

  const inputDiscount = gameForm.querySelector("#game-discount-percent")
  inputDiscount.value = gameInfo.discount_percent

  const inputCategory = gameForm.querySelector("#game-category")
  inputCategory.value = gameInfo.category

  const radioFirstRuns = gameForm.querySelectorAll("input[type='radio'][name='first_run']")
  radioFirstRuns.forEach(radio => {
    radio.checked = false
    if(radio.id == `first-run-${gameInfo.first_run.toLowerCase()}`) {
      radio.checked = true
    }
  })

  const btnSubmit = gameForm.querySelector("input[type='submit']")
  btnSubmit.value = "Update"

  // 3. When user click submit(update), it should send request to game-store-api to update the game card with form values
  // 4. Close modal
  // 5. Update new value that we just edit on the game card
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
