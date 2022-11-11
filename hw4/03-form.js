const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post('/submit', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  let form = {
    username: req.body.username,
    email: req.body.email,
  };
  if (req.body.comments) form.comments = req.body.comments;
  else form.comments = 'n/a';
  if (req.body.newsletter) form.newsletter = 'newsletter me up';
  else form.newsletter = 'no newsletter :(';

  res.write('<p>Username: ' + form.username + '</p>');
  res.write('<p>Email: ' + form.email + '</p>');
  res.write('<p>Comments: ' + form.comments + '</p>');
  res.write('<p>Newsletter: ' + form.newsletter + '</p>');
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
