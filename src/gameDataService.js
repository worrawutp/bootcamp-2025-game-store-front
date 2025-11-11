async function getGames() {
  let url = "http://localhost:3000/games"

  let resp = await fetch(url)
  let result = await resp.json()

  return result
}

export default getGames
