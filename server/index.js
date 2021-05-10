import express from "express";
import expressWs from "express-ws";

const app = express();
const port = 3001;
// const wss = SetupWSServer(expressWs(app), {
//     test: function(data) {
//         console.log("Test")
//         // console.log(this)
//         console.log(...data)
//     },
//     bounce: function(data, { server }) {
//         setTimeout(() => {
//             server.sendToAll("bounce", ...data);
//         }, 1000);
//     },
// });

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