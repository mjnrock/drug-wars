import { lookup } from "dns";
import { hostname } from "os";
import express from "express";
import expressWs from "express-ws";
import Server from "@lespantsfancy/agency/lib/modules/websocket/Server";
import QRCode from "@lespantsfancy/agency/lib/modules/qrcode/QRCode";

console.clear();
console.warn("------------ NEW EXECUTION CONTEXT ------------");

const app = express();
const port = 3001;
const wss = Server.QuickSetup(expressWs(app), {
    [ Server.Signal.CONNECTION ]: (msg, { network }) => {
        network.emit("bounce", 1);
    },
    bounce: function(msg, { server, network }) {
        console.log(msg.type, msg.data)

        msg.data[ 0 ] = +msg.data[ 0 ] + 1;

        if(Math.random() > 0.5) {
            network.emit("test", Math.random());
        }

        setTimeout(() => {
            server.sendToAll(msg);
            // server.sendToAll(msg.type, ...msg.data);
        }, 250);
    },
    test: function(msg, { server }) {
        server.sendToAll(msg);
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
app.listen(port, () => {
    console.log(`WebSocket server is listening on port ${ port }!`);
    
    
    lookup(hostname(), (err, ip) => {
        QRCode.Generator.toString(`http://${ ip }:${ 3000 }`, { type: "terminal" }).then(data => {
            console.log(`Link to:   http://${ ip }:${ 3000 }`);
            console.log(data);
        });
    });
});