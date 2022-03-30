
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {save} = require('./save');

// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// const __dirname = path.resolve();



// var React = require('react');
// // Our bundle expects React to be a global
// global.React = React;
// var hCardComponent = require('../main.js').default;



const app = express();
const port = process.env.PORT || 8080;





var React = require('react');
// Our bundle expects React to be a global
global.React = React;
var hCardComponent = require('./main.js').default;

// const save = (props) => {
//     console.log('hello',props);
// };

var hCardProps = {
  givenName: "Sam",
  surname: "Fairfax",
  email: "sam.fairfax@fairfaxmedia.com.au",
  phone: "0292822833",
  houseNumber: "100",
  street: "Harris Street",
  suburb: "Pyrmont",
  state: "NSW",
  postcode: "2009",
  country: "Australia"
};


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//serving up files in public 
app.use(express.static("public"));

//passing to html
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// sendFile will go here
app.get('*', function(req, res) {
  // res.sendFile(path.join(__dirname, '/index.html'));
  res.render(path.join(__dirname, 'index'),{
    hCardProps : hCardProps
  });
});

app.post('/update',(request,response) => {
    console.log('updated data',request.body);
    save(request);
    response.send('POST request update success');
})

app.post('/submit',(request,response) => {
    console.log('submitted data',request.body);
    response.send('User Successfully updated');
})

app.listen(port);
console.log('Server started at http://localhost:' + port);