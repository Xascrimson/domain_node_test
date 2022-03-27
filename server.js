const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;


// var React = require('react');
// // Our bundle expects React to be a global
// global.React = React;
// var hCardComponent = require('./public/main.js').default;


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//serving up files in public 
app.use(express.static("public"));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/update',(request,response) => {
    console.log('updated data',request.body);
    response.send('POST request update success');
})

app.post('/submit',(request,response) => {
    console.log('submitted data',request.body);
    response.send('User Successfully updated');
})

app.listen(port);
console.log('Server started at http://localhost:' + port);