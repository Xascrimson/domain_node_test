const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { save } = require("./save");

let { userData } = require("./store");

const pug = require("pug");

var ReactDOMServer = require('react-dom/server');


// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// const __dirname = path.resolve();

// var React = require('react');
// // Our bundle expects React to be a global
// global.React = React;
// var hCardComponent = require('./public/main.js').default;

const app = express();
const port = process.env.PORT || 8080;

app.set("view engine", "pug");

var React = require("react");
// Our bundle expects React to be a global
global.React = React;
var hCardComponent = require("./public/main.js").default;

// const save = (props) => {
//     console.log('hello',props);
// };

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//serving up files in public
app.use(express.static("public"));

// sendFile will go here
app.get("*", function (req, res) {
    const compiledFunction = pug.compileFile("./views/index.pug");
    let test = compiledFunction({
        hCard: hCardComponent,
        data: JSON.stringify(userData),
    });
    let test2 = ReactDOMServer.renderToString(React.createElement(
      hCardComponent,userData
    ));
    console.log('test2',test2)
    // res.send(test2);
    res.render("index.pug", {
        dataTest2: JSON.stringify(test2),
    });
    // ReactDOM.render(
    //     React.createElement(hCardComponent, userData),
    //     test.querySelector(".HcardApp")
    // );
    //     console.log("line48", test);
    //     // res.set('Content-Type', 'text/html');
    // res.send(Buffer.from(test));
    // res.send(test);



    // res.render("index.pug", {
    //     // hCard: hCardComponent,
    //     data: JSON.stringify(userData),
    // });
});

//POST update, updating userData based on input selection
app.post("/update", (request, response) => {
    userData = save(request, userData);
    response.send("POST request update success");
});

//POST submit, update hcard with new user data, + future can send to parameter store etc, so all servers update with new data.
app.post("/submit", (request, response) => {
    response.redirect("/");
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
