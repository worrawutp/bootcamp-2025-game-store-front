import "./reset.css";
import "./style.css";
import list from "./data/game-list.csv?raw";

let images = import.meta.glob("./asset/*", { eager: true });

let daiscover = document.getElementById("gamelist");

let game = list.split("\n");
game.shift();
game.pop();

game.forEach((line) => {
  let data = line.split(",");
  let gameInfo = {
    title: data[0],
    category: data[1],
    base_price: data[2],
    discount_percent: data[3],
    firstrun: data[4],
    pictures: images,
  };

  const normalize = (str) => str.toLowerCase().replace(/[^a-z]+/g, '');
  const slug = normalize(gameInfo.title);
  const photo = Object.entries(images).find(([key]) =>
    normalize(key).includes(slug)
  );

  gameInfo.pictures = photo
    ? `<img src="${photo[1].default}" alt="${gameInfo.title}">`
    : console.log(slug);

  let tag = gameInfo.firstrun;
  if (tag == "Yes" || tag == "yes") {
    tag = `<div class="tag"><i class="fa-solid fa-crown" style="color: #FFD43B;"></i> First Run </div>`;
  } else {
    tag = "";
  }

  let discount = gameInfo.discount_percent;
  if (discount >= 25) {
    discount = `<span class="discount-class">-${gameInfo.discount_percent}%</span>`;
  } else {
    discount = "";
  }

  let discount_price = gameInfo.discount_percent;
  if (discount_price >= 25) {
    let price = gameInfo.base_price;
    let discounts = gameInfo.discount_percent;
    const totalPrice = price * (discounts / 100);
    const finalPrice = price - totalPrice;
    discount_price = `<span class="price-discount">THB ${
      gameInfo.base_price
    }</span> <span>THB ${finalPrice.toFixed(2)}</span>`;
  } 
  else if (discount_price == gameInfo.base_price ) {
    discount_price = "Free";
  } else {
    discount_price = `<span>THB ${gameInfo.base_price}</span>`;
  }
console.log(discount_price)

  let gameCard = ` 
      <div class="card">
        <div class="photo">
         ${gameInfo.pictures}
        </div>
        <div class="card-info">
          <div class="category">${gameInfo.category}</div>
          <div class="title">${gameInfo.title}</div>
          <div>
          <span>${tag}</span> 
          </div>
          <div class="price">
        ${discount} ${discount_price}</div>      
        </div>
    `;
  daiscover.insertAdjacentHTML("beforeend", gameCard);
});
