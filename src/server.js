const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const { save } = require("./save.js");
let { userData } = require("./data/store.js");
const pug = require("pug");
var ReactDOMServer = require("react-dom/server");

const app = express();
const port = process.env.PORT || 8080;

app.set("view engine", "pug");


var React = require("react");
// Our bundle expects React to be a global
global.React = React;
var hCardComponent = require("../public/main.js").default;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//serving up files in public
app.use(express.static("public"));

//serving get requests 
app.get("*", function (req, res) {
    //working 1 SSR using PUG
    // const compiledFunction = pug.compileFile("./views/index.pug");
    // let test = compiledFunction({
    //     hCard: hCardComponent,
    //     data: JSON.stringify(userData),
    // });

    // let test2 = ReactDOMServer.renderToString(
    //     React.createElement(hCardComponent, userData)
    // );
    // let final = test.replace('<div class="HcardApp">', test2);
    // console.log("test2", test2);
    // res.send(final);

    // working 2 no SSR
    res.render("index.pug", {
        data: JSON.stringify(userData),
    });

    //working 3 SSR using HTML 
    // let appData = ReactDOMServer.renderToString(
    //     React.createElement(hCardComponent, userData)
    // );

    // fs.readFile('index.html', 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Something went wrong:', err);
    //       return res.status(500).send('Oops, better luck next time!');
    //     }

    //     return res.send(
    //       data.replace('<div class="HcardApp" />', `<div id="root">${appData}</div>`)
    //     );
    //   });
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
