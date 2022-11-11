const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5001;

// Add your code here

// Use the express-session module
app.use(
  session({
    secret: 'woweee secret',
    cookie: {},
  })
);

app.get('/favicon.ico', (req, res) => {});

app.get('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Currently on route: ' + req.path);
  if (req.session.visited) {
    res.write('<ul>Previously visited:');
    for (let el of req.session.visited) {
      res.write('<li>' + el + '</li>');
    }
    if (!req.session.visited.includes(req.path))
      req.session.visited.push(req.path);
  } else {
    req.session.visited = [];
    req.session.visited.push(req.path);
    res.write('<p>sup</p>');
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
