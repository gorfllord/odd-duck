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
let storedData;
let initData = localStorage.getItem('products');

// This will check it a file exists in local storage to pull data from
function checkStorage() {
  if (initData) {
    let storedProducts = localStorage.getItem('products');
    storedData = JSON.parse(storedProducts);
    for (let i = 0; i < productArr.length; i++) {
      productArr[i].name = storedData[i].name;
      productArr[i].views = storedData[i].views;
      productArr[i].votes = storedData[i].votes;
    }
  }
}
// Construction function, what's your function? Hookin' up keys with values and methods
// But actually, it takes in the name and filetype and intializes each product object
function Product(name, fileType = 'jpg') {
  this.name = name,
  this.fileType = fileType,
  this.src = `assets/${this.name}.${fileType}`;
  this.views = 0,
  this.votes = 0,
  productArr.push(this);
}
// Random number generator
function getRandom(arr) {
  let random = Math.floor(Math.random() * arr.length);
  return random;
}
// This will add images to the cue, then render the left-most three images in the cue array
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
// This will render the results and invoke the chart to use the data it passes to it
function renderResults() {
  for (let i = 0; i < productArr.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${productArr[i].name}: ${productArr[i].views} views and ${productArr[i].votes} votes`;
    results.appendChild(li);
  }
  let storedProducts = localStorage.getItem('products');
  storedData = JSON.parse(storedProducts);
  renderChart();
}
// This processes what to do in case the user clicks on an image, in this case add a vote to that product, then check the current round with the max rounds
// to then see if it's time to wrap things up and activate the view results button
function handleProductClick(event) {
  let clickedItem = event.target.alt;
  if (clickedItem) {
    currentRound++;
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
      let productString = JSON.stringify(productArr);
      localStorage.setItem('products', productString);
    } else {
      render(productArr);
    }
  }
}
// This will change the max rounds and reset everything for a new round. It will save the current progress as well.
function handleRoundSubmit(event) {
  event.preventDefault();
  let productString = JSON.stringify(productArr);
  localStorage.setItem('products', productString);
  maxRounds = parseInt(event.target.numRounds.value);
  currentRound = 0;
  images.addEventListener('click', handleProductClick);
  viewResults.removeEventListener('click', renderResults);
  viewResults.className = 'clicksNotAllowed';
  barChart.destroy();
  results.innerHTML = '';
  render(productArr);
}
// This function processes the productArr array to pull the names, votes, and views to then pass to the bar chart
function renderChart() {
  let productNames = [];
  let productViews = [];
  let productVotes = [];
  for (let i = 0; i < productArr.length; i++) {
    productNames.push(storedData[i].name);
    productViews.push(storedData[i].views);
    productVotes.push(storedData[i].votes);
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
// Adding event listeners for clicks or the submit button
images.addEventListener('click', handleProductClick);
roundsForm.addEventListener('submit', handleRoundSubmit);

// initializing products
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

// Invoking function to check if anything is in local storage, then it will overwrite the initialized data with the stored data
checkStorage();
// Invoking render to have images available when the page loads
render(productArr);
