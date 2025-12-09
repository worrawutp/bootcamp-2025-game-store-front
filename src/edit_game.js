export function editGameCard(event) {
  // TODO
  // 1. Show modal edit game card form
  const gameForm = document.querySelector("#edit-game-form")
  const editBtn = event.currentTarget
  editBtn.popoverTargetElement = gameForm
  editBtn.popoverTargetAction = "toggle"

  // 2. Each input attributes in the form should have value of the selected card
  const card = editBtn.parentElement
  const gameInfo = JSON.parse(card.dataset.gameInfo)
  const inputTitle = gameForm.querySelector("#edit-game-title")
  inputTitle.value = gameInfo.title

  const inputBasePrice = gameForm.querySelector("#edit-game-base-price")
  inputBasePrice.value = gameInfo.base_price

  const inputDiscount = gameForm.querySelector("#edit-game-discount-percent")
  inputDiscount.value = gameInfo.discount_percent

  const inputCategory = gameForm.querySelector("#edit-game-category")
  inputCategory.value = gameInfo.category

  const radioFirstRuns = gameForm.querySelectorAll("input[type='radio'][name='first_run']")
  radioFirstRuns.forEach(radio => {
    radio.checked = false
    if(radio.id == `edit-first-run-${gameInfo.first_run.toLowerCase()}`) {
      radio.checked = true
    }
  })

  // 3. When user click submit(update), it should send request to game-store-api to update the game card with form values
  const btnSubmit = gameForm.querySelector("input[type='submit']")
  btnSubmit.addEventListener("click", () => submitUpdateGameInfo(gameInfo))
}

export function submitUpdateGameInfo(gameInfo) {
  event.preventDefault()

  const gameForm = document.querySelector("#edit-game-form")
  const inputTitle = gameForm.querySelector("#edit-game-title").value
  const inputBasePrice = gameForm.querySelector("#edit-game-base-price").value
  const inputDiscount = gameForm.querySelector("#edit-game-discount-percent").value
  const inputCategory = gameForm.querySelector("#edit-game-category").value
  const inputFirstRun = (new FormData(gameForm)).get("first_run")
  let gameData = {
    title: inputTitle,
    base_price: inputBasePrice,
    discount_percent: inputDiscount,
    category: inputCategory,
    first_run: inputFirstRun
  }

  const url = `http://localhost:3000/games/${gameInfo.id}`
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData)
  })
  .then(resp => resp.json())
  .then(data => {
    let gameCard = document.getElementById(`card-${gameInfo.id}`)
    updateGameCard(gameCard, data)

    gameForm.hidePopover()
  })
}

function updateGameCard(gameCard, data) {
  let title = gameCard.querySelector(".card-info .title")
  title.textContent = data.title

  let category = gameCard.querySelector(".card-info .category")
  category.textContent = data.category

  let basePrice = gameCard.querySelector(".card-info .price")
  basePrice.textContent = `THB ${data.base_price}`

  gameCard.dataset.gameInfo = JSON.stringify(data)
}
