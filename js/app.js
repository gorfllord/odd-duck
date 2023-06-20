'use strict';
let images = document.getElementById('images');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let results = document.querySelector('ul');
let viewResults = document.getElementById('viewResults');
let roundsForm = document.querySelector('form');
let maxRounds = 25;
let currentRound = 0;
let productArr = [];

function Product(name, fileType = 'jpg') {
  this.name = name,
  this.fileType = fileType,
  this.src = `${this.name}.${fileType}`;
  this.views = 0,
  this.votes = 0,
  productArr.push(this);
}
function getRandom(arr) {
  let random = Math.floor(Math.random() * arr.length);
  return random;
}
function render(arr) {
  let index1 = getRandom(arr);
  let index2 = getRandom(arr);
  let index3 = getRandom(arr);
  image1.src = arr[index1].src;
  image1.alt = arr[index1].name;
  arr[index1].views++;
  while (index1 === index2) {
    index2 = getRandom(arr);
  }
  image2.src = arr[index2].src;
  image2.alt = arr[index2].name;
  arr[index2].views++;
  while (index3 === index1 || index3 === index2) {
    index3 = getRandom(arr);
  }
  image3.src = arr[index3].src;
  image3.alt = arr[index3].name;
  arr[index3].views++;
}
function renderResults() {
  results.innerHTML = '';
  for (let i = 0; i < productArr.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${productArr[i].name}: ${productArr[i].views} views and ${productArr[i].votes} votes`;
    results.appendChild(li);
  }
}
function handleProductClick(event) {
  currentRound++;
  let clickedItem = event.target.alt;
  for (let i = 0; i < productArr.length; i++) {
    if (clickedItem === productArr[i].name) {
      productArr[i].votes++;
      console.log(productArr[i]);
      break;
    }
  }
  console.log(maxRounds);
  if (maxRounds === currentRound) {
    images.removeEventListener('click', handleProductClick);
    viewResults.addEventListener('click', renderResults);
    viewResults.className = 'clicksAllowed';
  } else {
    render(productArr);
  }
}
function handleRoundSubmit(event) {
  event.preventDefault();
  maxRounds = parseInt(event.target.numRounds.value);
  console.log(typeof maxRounds);
  for (let i = 0; i < productArr.length; i++) {
    productArr[i].views = 0;
    productArr[i].votes = 0;
  }
  currentRound = 0;
  images.addEventListener('click', handleProductClick);
  viewResults.removeEventListener('click', renderResults);
  viewResults.className = '';
  render(productArr);
}
images.addEventListener('click', handleProductClick);
roundsForm.addEventListener('submit', handleRoundSubmit);

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

render(productArr);
