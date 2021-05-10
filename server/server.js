import express from "express";
import expressWs from "express-ws";
import Server, { QuickSetup as SetupWSServer } from "@lespantsfancy/agency/lib/modules/websocket/Server";

const app = express();
const port = 3001;
const wss = SetupWSServer(expressWs(app), {
    // [ Server.Signal.CONNECTION ]: (msg, { network }) => {
    //     network.emit("bounce", Date.now());
    // },
    bounce: function(msg, { server }) {
        console.log(msg);
        
        setTimeout(() => {
            server.sendToAll("bounce", Date.now());
        }, 1000);
    },
});

/**
 * This is a newer way to do the work commonly seen with `bodyParser`
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

/**
 * This activates CORS
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //? Whatever middleware work .next() is doing is ESSENTIAL to actually making this work
    return next();
});
    
/**
 * A basic middleware example
 */
app.use(function (req, res, next) {
    console.log("middleware");
    req.testing = "testing";

    return next();
});

/**
 * A basic routing example
 */
app.get("/", function(req, res, next){
    console.log("get route", req.testing);
    res.end();
});

/**
 * Start the server
 */
app.listen(port, () =>
    console.log(`WebSocket server is listening on port ${ port }!`),
);