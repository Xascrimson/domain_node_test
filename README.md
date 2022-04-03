To start the app, run 'yarn start' at root. Application is served on localhost:8080

SSR and CSR is seperated out in server.js, This is due to "var hCardComponent = require("./public/main.js").default;" only contains the /submit function rather than including /update function. I've spent hours debugging this SSR issue only to see that the HTML generated from ReactDOMServer.renderToString did not render the action for /update.

As such, please uncomment 'working 1' or 'working 2' for SSR and CSR respectively. 'Working 3' represents my trial to see if this was a PUG issue that can be fixed via HTML.

we use PUG to inject userData easily into HTML. By using this injection we can now change userData in the save() function. For simplicity, we save userData in a seperate file and export it to server.js. However, Ideally I would use either useContext or useReducer(redux) to deal with saving user data. 

Connecting to AWS, we can use an RDS to store userData, with each row representing a specific user. Everytime update/submit is called, it sends a SET SQL to update specifics of that user. 
To scale this application, we need to ensure client is always up to date with database. We can either use websockets, poll database and update periodically, or pull database right before submission and notify user that there has been a change.

The application runs on Node.js express + PUG.
