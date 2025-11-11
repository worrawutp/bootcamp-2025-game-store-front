import './reset.css'
import './style.css'

function calculateDiscountedPrice(price) {
  if (price <= 0) return "Free";
  return "THB " + (price % 1 === 0 ? price : price.toFixed(2));
}

function num(value){
  const num = parseFloat(value);
  return insNaN(num) ? 0 : num;
}



