export function submitDeleteGameCard(event) {
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
      deletedCard.addEventListener('animationend', function(){
        deletedCard.remove()
      })

      deletedCard.classList.add('removing')
    })
  }
}

