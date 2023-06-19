'use strict';
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let maxRounds = 25;
let productArr = [];

function Product(name, fileType = 'jpg') {
  this.name = name,
  this.fileType = fileType,
  this.src = `../assets/${this.name}.${fileType}`;
  this.views = 0,
  this.votes = 0,
  productArr.push(this);
}
function getRandom(arr) {
  let random = Math.floor(Math.random * arr.length);
  return random;
}
function render(arr) {
  let index1 = getRandom(arr);
  let index2 = getRandom(arr);
  let index3 = getRandom(arr);
  image1.src = arr[index1].src;
  image1.alt = arr[index1].name;
  while (index1 === index2) {
    index2 = getRandom(arr);
  }
  image2.src = arr[index2].src;
  image1.alt = arr[index2].name;
  while (index3 === index1 || index3 === index2) {
    index3 = getRandom(arr);
  }
  image3.src = arr[index3].src;
  image1.alt = arr[index3].name;
}
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulu = new Product('cthulu');
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
console.log(productArr);
render(productArr);
