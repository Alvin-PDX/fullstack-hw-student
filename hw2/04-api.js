/** Exercise 04 - API **/

const url = 'https://restcountries.com/v3.1/all';

// Add your code here

// getData(url);

results = document.getElementById('results');

fetch(url).then((response) => {
  console.log('HTTP Status: ' + response.status);
  if (!response.ok) console.log('Request failed');
  else
    response.json().then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        let newItem = document.createElement('li');
        newItem.innerHTML =
          data[i].name.common +
          ' - ' +
          data[i].population.toLocaleString('en-US');
        results.appendChild(newItem);
      }
    });
});
