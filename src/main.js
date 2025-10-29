import './reset.css'
import './style.css'

// const price =  412.17;
// const discount = 12 ;

// const discount_sale = price * (discount /100);
// const sale = price - discount_sale;

// console.log(sale)

const pricedisplay = document.getElementById('price');
const dicountdisplay = document.getElementById('discount');
const sale  = document.getElementById('discount_sale');

const price = parseFloat(pricedisplay.textContent);
const discount = parseInt(dicountdisplay.textContent)

const totalPrice = price *(discount /100);
const finalPrice =  price - totalPrice;
sale.textContent = finalPrice.toFixed(2);