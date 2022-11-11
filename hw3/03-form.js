const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered


const server = http.createServer((req, res) => {

  if (req.url === '/form') {
    //generate html form
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(
      `<form method="post" action="/submit">
      <label for="username">Username (must be alphanumeric): </label>
      <input type="text" name="username" id="username" pattern="[a-zA-Z0-9]+" required>
      <label for="email">Email: </label>
      <input type="email" name="email" id="email" required>
      <input type="submit" value="Submit">
      </form>`
    );
    res.end();
  } else if (req.url === '/submit') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        console.log('hi');
        body += chunk;
      });
      req.on('end', () => {
        console.log('POST data: ' + body);
        //parse and reformat results
        let results = body.split('&');
        results[0] = results[0].replace('username=', 'Username: ');
        results[1] = results[1].replace('email=', 'Email: ');
        results[1] = results[1].replace('%40', '@');
        res.write('<p>' + results[0] + '</p>');
        res.write('<p>' + results[1]+ '</p>');
        res.end();
      });
    } else {
      //if /submit is navigated to without submitting a form
      res.write('<h1>Something went wrong! Try going back to /form.</h1>');
      res.end();
    }
  } else {
    //if a page other than /form or /submit is navigated to
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('<h1>404 - Page not Found (Hint: Try going to /form!)</h1>');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
