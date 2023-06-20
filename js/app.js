'use strict';
let images = document.getElementById('images');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let results = document.querySelector('ul');
let viewResults = document.getElementById('viewResults');
let roundsForm = document.querySelector('form');
let resultsChart = document.getElementById('chart');
let barChart; // This will become the chart object, need it to be global for reset functionality
let maxRounds = 25;
let currentRound = 0;
let productArr = [];
let indexArr = [];

function Product(name, fileType = 'jpg') {
  this.name = name,
  this.fileType = fileType,
  this.src = `assets/${this.name}.${fileType}`;
  this.views = 0,
  this.votes = 0,
  productArr.push(this);
}
function getRandom(arr) {
  let random = Math.floor(Math.random() * arr.length);
  return random;
}
function render(arr) {
  while (indexArr.length < 6) {
    let indexFill = getRandom(arr);
    if (!indexArr.includes(indexFill)) {
      indexArr.push(indexFill);
    }
  }
  let index1 = indexArr.shift();
  let index2 = indexArr.shift();
  let index3 = indexArr.shift();
  image1.src = productArr[index1].src;
  image1.alt = productArr[index1].name;
  productArr[index1].views++;
  image2.src = productArr[index2].src;
  image2.alt = productArr[index2].name;
  productArr[index2].views++;
  image3.src = productArr[index3].src;
  image3.alt = productArr[index3].name;
  productArr[index3].views++;
}
function renderResults() {
  for (let i = 0; i < productArr.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${productArr[i].name}: ${productArr[i].views} views and ${productArr[i].votes} votes`;
    results.appendChild(li);
  }
  renderChart();
}
function handleProductClick(event) {
  currentRound++;
  let clickedItem = event.target.alt;
  for (let i = 0; i < productArr.length; i++) {
    if (clickedItem === productArr[i].name) {
      productArr[i].votes++;
      break;
    }
  }
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
  for (let i = 0; i < productArr.length; i++) {
    productArr[i].views = 0;
    productArr[i].votes = 0;
  }
  currentRound = 0;
  images.addEventListener('click', handleProductClick);
  viewResults.removeEventListener('click', renderResults);
  viewResults.className = 'clicksNotAllowed';
  barChart.destroy();
  results.innerHTML = '';
  render(productArr);
}
function renderChart() {
  let productNames = [];
  let productViews = [];
  let productVotes = [];
  for (let i = 0; i < productArr.length; i++) {
    productNames.push(productArr[i].name);
    productViews.push(productArr[i].views);
    productVotes.push(productArr[i].votes);
  }
  Chart.defaults.color = '#000';
  barChart = new Chart(resultsChart, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 2,
        backgroundColor: '#0147AB',
        borderColor: '#000080'
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 2,
        backgroundColor: '#A45EE9',
        borderColor: '#4B0076'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
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
