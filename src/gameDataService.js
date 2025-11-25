async function getGames() {
  let url = "http://localhost:3000/games"

  try {
    let resp = await fetch(url)
    let result = await resp.json()
    return result

  } catch(error) {
    console.log(error)
    return false
  }
}

export default getGames
