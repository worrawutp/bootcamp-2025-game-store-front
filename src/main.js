import './reset.css'
import './style.css'
import rawData from "./db/game-list.csv?raw";

document.querySelectorAll('.card').forEach((card) => {
    const price = parseFloat(card.dataset.price);
    const discount = parseFloat(card.dataset.discount);

    if (!isNaN(price) && !isNaN(discount)) {
        const discountedPrice = price - (price * discount / 100);
        const newPriceElement = card.querySelector('.price-discounted');
        newPriceElement.textContent = `THB ${discountedPrice.toFixed(2)}`;
    }
});

let gamelist = document.getElementById('game-list'); // create <div = "game-list">
let gameData = rawData.split("\n")
gameData.shift(); 

gameData.forEach((line) => {
    let data = line.split(",")
    let gameInfo = {
        title: data[0],
        category: data[1],
        base_price: data[2],
        discount_percent: data[3],
        first_run : data[4],
    }
    console.log(gameInfo);
    let gamecared = `<div>${line}</div>`
    gamelist.insertAdjacentHTML('beforeend', gamecared);
})