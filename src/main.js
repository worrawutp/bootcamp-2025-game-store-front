import './reset.css'
import './style.css'

document.querySelectorAll('.card').forEach((card) => {
    const price = parseFloat(card.dataset.price);
    const discount = parseFloat(card.dataset.discount);

    if (!isNaN(price) && !isNaN(discount)) {
        const discountedPrice = price - (price * discount / 100);
        const newPriceElement = card.querySelector('.price-discounted');
        newPriceElement.textContent = `THB ${discountedPrice.toFixed(2)}`;
    }
});