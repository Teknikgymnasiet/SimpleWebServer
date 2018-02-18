// express lets you serve web content with node.
const express = require("express");
// path adds helper functions for localizing paths to files in your project. For instance it lets us serve index.html regardless where our project is located.
const path = require('path');
// Init the express instance.
const app = express();
// Setup a port we want our server to respond on.
const port = 10101;

// Create a class to contain our website server
export class WebServer {
    constructor( ) {
      console.log("Created WebServer")
    }

    // This method tells node to serve index.html when someone visits our website without any parameters.
    // It allows us to use the Assets folder in our index.html as well.
    public serveIndexHtmlFile() {
      app.use(express.static('assets'));
      // The / indicates that nothing is appended to our URL.
      app.route('/').get(function(req:any,res:any){
        // __dirname is a global variable refering to our current location on the filesystem.
        res.sendFile( path.join( __dirname + '/index.html' ) );
      });

    }

    // start the webserver
    public startServer() {
      // app.get( string path, callback );
      app.get('/pathExample', this.onWebsiteVisited.bind(this));
      // Serve our index.html file as well
      this.serveIndexHtmlFile();
      // Finally tell express that we want to Listen for traffic on our specified Port.
      app.listen(port, () => console.log('WebServer running at: http://localhost:'+port+"/pathExample"));
    }

    // When someone visits localhost:port/pathExample this function is triggered.
    private onWebsiteVisited(req:any,res:any) {
      console.log("Someone visited our website! Here's some info about him:", req);
      // res.send sends a response back to the client, you can send any kind of information back to him. In our example we send HTML as a string.
      res.send("<H1>Hello World from an API!</H1><br/>");
    }
}

// Create a new instance of our WebServer class
let localServer = new WebServer();
// Start the server
localServer.startServer();
