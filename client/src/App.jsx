import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import AgencyReact from "@lespantsfancy/agency/lib/modules/react/package";
import ReactNetwork from "./agency/ReactNetwork";
import BrowserClient from "@lespantsfancy/agency/lib/modules/websocket/BrowserClient";

import Routes from "./routes/package";


export const Context = React.createContext();

// TODO: The WebSocket Network should ALWAYS be a connection to the main network and pass messages via broadcast

// const network = new AgencyReact.ReactNetwork({
const client = BrowserClient.QuickSetup({
    connect: true,

    protocol: `ws`,
    host: `localhost`,
    port: 3001,
}, {
    // "*": (msg) => console.log(msg.type),
    bounce: function(msg, { client, network }) {
        console.log(network.state);

        setTimeout(() => {
            client.send(msg);
        }, 1000);
    },
    test: function(msg, { client, network }) {
        console.log(1234);
    },
}, {
    state: {
        cats: 534543,
    }
});


// const network = new ReactNetwork({
//     ws: SetupWSClient({
//         connect: true,
    
//         protocol: `ws`,
//         host: `localhost`,
//         port: 3001,
//     }, {
//         bounce: function(msg, { client, network }) {
//             console.log(msg.type, msg.data)

//             let current = +msg.data[ 0 ] + 1;
//             network.state = {
//                 ...network.state,
//                 count: current,
//             };
//             msg.data[ 0 ] = current;

//             console.log(network.state)
            
//             setTimeout(() => {
//                 client.send(msg);
//                 // client.send(msg.type, ...msg.data);
//             }, 1000);
//         },
//     })
// });

function App() {
    return (
        <Context.Provider value={{ network: client.network }}>
            <Router>
                <Switch>
                    <Route path={ `/` }>
                        <Routes.Default />
                    </Route>
                </Switch>
            </Router>
        </Context.Provider>
    );
};

export default App;