const express = require('express');
const axios = require('axios');
const e = require('express');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

//Middleware to GET from API
app.use((req, res, next) => {
  if (req.path === '/') next();
  else
    axios
      .get(url)
      .then(function (response) {
        req.results = response.data;
        console.log('grabbed');
        next();
      })
      .catch(function (error) {
        req.error = error;
        console.log('something went wrong');
        console.log(error);
        next();
      });
});

app.get('/', (req, res) => {
  // render pug template for the index.html file
  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  let countries = [];
  //push formatted strings into final array
  for (let el of req.results) {
    countries.push(el.name.common + ' - ' + el.capital);
  }
  //sort by common name
  countries.sort((a, b) => a.localeCompare(b));

  res.render('page', {
    heading: 'Countries and Capitals',
    results: countries,
  });
});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  let populous = [];

  //filter countries down to the most populous
  let filteredResults = req.results.filter(
    (country) => country.population >= 50000000
  );
  //sort by population
  filteredResults.sort((a, b) => b.population - a.population);
  //add to final array
  for (let el of filteredResults) {
    populous.push(
      el.name.common + ' - ' + el.population.toLocaleString('en-US')
    );
  }

  res.render('page', {
    heading: 'Most Populous Countries',
    results: populous,
  });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  let regions = [];
  let ledger = {};

  //cycle through the countries and check their regions. If the region exists in the ledger object, increment its value by 1.
  //Else create a key for that region and set its value to 1.
  for (let el of req.results) {
    if (!ledger[el.region]) ledger[el.region] = 1;
    else ledger[el.region] += 1;
  }

  //push formatted results into the final array
  for (let el in ledger)
    regions.push(el + ' - ' + ledger[el].toLocaleString('en-US'));

  res.render('page', {
    heading: 'Regions of the World',
    results: regions,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
