const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other',
  ];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }
  else if (req.url === '/welcome') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome welcome welcome</h1>');
    res.end();
  } else if (req.url === '/redirect') {
    res.writeHead(302, { 'Content-Type': 'text/html', 'Location': '/redirected'});
    res.end();
  } else if (req.url === '/redirected') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Epic redirect</h1>');
    res.end();
  } else if (req.url === '/cache') {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'max-age=86400'});
    res.write('<h1>this resource was cached</h1>');
    res.end();
  } else if (req.url === '/cookie') {
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Set-Cookie': 'hello=world'});
    res.write(`cookies... yummm`);
    res.end();
  } else if (req.url === '/check-cookies') {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    if (req.headers.cookie) {
      let cook = req.headers.cookie.split(';');
      let helloCookieExists = false;
      for(let i = 0; i < cook.length; i += 1) {
        if (cook[i].indexOf('hello=') === 0) helloCookieExists = true;
      }
      if (helloCookieExists === true) res.write('yes');
      else res.write('no');
    } else res.write('no');
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 - Page Not Found</h1>');
    res.end();
  }

  // Add your code here
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
