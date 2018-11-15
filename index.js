const express = require("express"); //syntax for importinf modules in  node? check if its still curr
const app = express(); //init a single application in express. That handles http request

app.get("/", (req, res) => {
  //app create a route handler
  //.get is method that watches incoming request for that method
  // forward represents the root. could be anything like "/greeting" or "/firstpage"
  //the => argument that calls the function send everytime that route is accessed.
  res.send({ hi: "there" });
});

//HEROKU
// app.listen(5000); //5000 is the port. if using 3rd party server lik horku must use the port that that give like following
const PORT = process.env.PORT || 5000; // this code tells express to look for a enviornment variable given by horoku(in production)
//if in devellopment use 5000 indicated by ||
app.listen(PORT);

//next step to setup hokue go to package.json and add:
/* "engines": {
  "node": "8.1.1" // update my version tho.
  "npm": "5.0.3"
},
This tells horkue to use specific version of node, cuz by default haroku will use a no up to date version

next tell horku how to start app. go to package and add "start": "node index.js" in "scripts"
tells heroku how to start app

Lastly we must create a .gitignore file to ignore dependencies cuz heroku will add them for us. like the
exress node modules files. This file tell which files and folders not to commit when using version control
*/
