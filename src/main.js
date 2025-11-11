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

let gamelist = document.getElementById('game-list'); 
let gameData = rawData.split("\n")
gameData.shift(); 

gameData.forEach((line) => {
    let data = line.split(",")
    let gameInfo = {
        title: data[0],
        category: data[1],
        base_price: parseFloat(data[2]),
        discount_percent: parseFloat(data[3]),
        first_run : data[4],
        photo: data[5]?.trim() || 'default.jpg'
    }

    const discountedPrice = gameInfo.base_price - (gameInfo.base_price * gameInfo.discount_percent / 100);
    console.log(gameInfo);

    let cardHTML = `
    <div class="card">
      <div class="photo">
        <img src="/game-list-covers/${gameInfo.photo}" alt="${gameInfo.title}">
      </div>
      <div class="card-info">
        <div class="category">${gameInfo.category}</div>
        <div class="title">${gameInfo.title}</div>
        ${gameInfo.discount_percent > 0 ? `<span class="discount">-${gameInfo.discount_percent}%</span>` : ""}
        <div class="price">
          ${gameInfo.discount_percent > 0
            ? `<span class="price-base">THB ${gameInfo.base_price.toFixed(2)}</span>
               <span class="price-discounted">THB ${discountedPrice.toFixed(2)}</span>`
            : `<span>THB ${gameInfo.base_price.toFixed(2)}</span>`
          }
        </div>
        ${gameInfo.first_run === "Yes" ? `
          <div class="tag">
            <img src="src/asset/crown.png" alt="crown">
            <span>First Run</span>
          </div>` : ""}
      </div>
    </div>
  `;

    gamelist.insertAdjacentHTML('beforeend', cardHTML);
   
})