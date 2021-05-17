import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Agency from "@lespantsfancy/agency";
import WS from "@lespantsfancy/agency/lib/modules/websocket/Client";

import Routes from "./routes/package";


export const Context = React.createContext();

const ws = WS.QuickSetup({
    connect: true,

    // url: `ws://localhost:3001`,
    protocol: `ws`,
    host: `localhost`,
    port: 3001,
});

const mainnet = new Agency.Event.Network({
    history: [
		Math.random(),
		Math.random(),
		Math.random(),
	],
}, {
    default: {
        // "*": msg => console.log(msg.type),
        [ WS.Signal.ERROR ]: (msg, { ws }) => {
            const [ error ] = msg.data;

            console.log(error)
            ws.state = {
                ...ws.state,
                error: msg.data,
            };
        },
        click: function(msg, { ws }) {
            ws.sendToServer(msg);
        },
        update: function(msg, { network }) {
            const [ state ] = msg.data;
            
            network.state = {
                ...network.state,
                history: state,
            };
        },
    },
});
// ws.addConnection(mainnet, { addToDefaultGlobal: "ws" });
// ws.addConnection(mainnet, { addSelfToDefaultGlobal: "ws" });
// mainnet.join(ws, { addSelfToDefaultGlobal: "ws" });
mainnet.join(ws, { addToDefaultGlobal: "ws" });

function App() {
    return (
        <Context.Provider value={{ network: mainnet }}>
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