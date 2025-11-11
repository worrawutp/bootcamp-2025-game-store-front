import './reset.css'
import './style.css'
import rawData from "./db/game-list.csv?raw";
import JSZip from "jszip";

document.querySelectorAll('.card').forEach((card) => {
    const price = parseFloat(card.dataset.price);
    const discount = parseFloat(card.dataset.discount);

    if (!isNaN(price) && !isNaN(discount)) {
        const discountedPrice = price - (price * discount / 100);
        const newPriceElement = card.querySelector('.price-discounted');
        newPriceElement.textContent = `THB ${discountedPrice.toFixed(2)}`;
    }
});

const photoMap = {
  "Grand Theft Auto V Enhanced": "GTAV_CHARM_Epic_FirstParty_PortraitFOB_1200x1600_R02_1200x1600-a5528b33df876e64f5dee728830c80a3 (1).avif",
  "Surgeon Simulator 2": "standard-key-art_OUT-NOW-1200x1600-21cc285767add349c9cc123d8e36ea9d.avif",
  "Cyberpunk 2077": "EGS_Cyberpunk2077_CDPROJEKTRED_S2_03_1200x1600-b1847981214ac013383111fc457eb9c5.webp",
  "ARC Raiders": "arc-raiders-hrxqv.webp",
  "Bread and Fred": "bread-and-fred-pr4o2.avif",
  "EA SPORTS FC™ 26 Ultimate Edition": "EGS_EASPORTSFC26StandardEdition_EACANADA_S2_1200x1600-effee280c00b9890a0c5249d4b0e5c97.avif",
  "Train Sim World ® 6: Standard Edition": "EGS_TrainSimWorld6StandardEdition_DovetailGames_S2_1200x1600-096a2218ec51b71eaf8ef00b0a4cf315.avif",
  "Super Fantasy Kingdom": "super-fantasy-kingdom-uqvh0.avif",
  "Doki Doki Literature Club Plus!": "EGS_DokiDokiLiteratureClubPlus_TeamSalvato_S2_1200x1600-9c6fa6ac4b26e9ad4fb0d3e35797dcac.avif",
  "SEASON PASS 1": "f4c6fe51-fe57-4a99-a6d8-ed60ea2786c2_1200x1600-44dd345ef8cce0f350d502b4b32f4457.avif",
  "SEASON PASS 2": "f4c6fe51-fe57-4a99-a6d8-ed60ea2786c2_1200x1600-44dd345ef8cce0f350d502b4b32f4457.avif",
  "Tacoma": "EGS_Tacoma_Fullbright_S2-1200x1600-d0a63ac709b709823a601d845bc2c74b.avif",
  "SILENT HILL 2": "silent-hill-2-19wjd.avif",
  "Super Miaoyin": "super-miaoyin-19qj6.avif",
  "Out of Time": "out-of-time-1rrd9.avif",
  "Bendy and the Ink Machine": "bendy-and-the-ink-machine-1lsmb.avif",
  "VALORANT": "EGS_VALORANT_RiotGames_S2_1200x1600-4c5338a8b14b8da8d45bd57298128673.avif",
  "Path of Exile": "EGS_PathofExile_GrindingGearGames_S2_1200x1600-b016644a2813b76854475e0cff8c87c1.avif"
};

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
         photo: photoMap[data[0]] || 'https://placehold.co/300x400/1a1a1a/white?text=No+Image'
    }

    const discountedPrice = gameInfo.base_price - (gameInfo.base_price * gameInfo.discount_percent / 100);
    console.log(gameInfo);

    let cardHTML = `
    <div class="card">
      <div class="photo">
        <img src="game-list-covers/${gameInfo.photo}" alt="${gameInfo.title}">
      </div>
      <div class="card-info">
        <div class="category">${gameInfo.category}</div>
        <div class="title">${gameInfo.title}</div>
        ${gameInfo.first_run === "Yes" ? `
          <div class="tag">
            <img src="src/asset/crown.png" alt="crown">
            <span>First Run</span>
          </div>` : ""}
        ${gameInfo.discount_percent > 0 ? `<span class="discount">-${gameInfo.discount_percent}%</span>` : ""}
        <div class="price">
          ${gameInfo.discount_percent > 0
            ? `<span class="price-base">THB ${gameInfo.base_price.toFixed(2)}</span>
               <span class="price-discounted">THB ${discountedPrice.toFixed(2)}</span>`
            : `<span>THB ${gameInfo.base_price.toFixed(2)}</span>`
          }
        </div> 
      </div>
    </div>
  `;

    gamelist.insertAdjacentHTML('beforeend', cardHTML);
   
})