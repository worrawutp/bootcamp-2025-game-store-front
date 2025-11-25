const btnSubmit = document.getElementById("btn-submit")
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
      console.log(gameInfo)

      // TODO
      // Read values from data 
      // and then add a new game card to the dashboard with this data
      let gameListDom = document.getElementById("game-list")
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
})
