import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AgencyModules from "@lespantsfancy/agency/lib/modules/package";
import { QuickSetup as SetupWSClient } from "@lespantsfancy/agency/lib/modules/websocket/BrowserClient";

import Routes from "./routes/package";


export const Context = React.createContext();

const network = new AgencyModules.React.ReactNetwork({
    ws: SetupWSClient({
        connect: true,
    
        protocol: `ws`,
        host: `localhost`,
        port: 3001,
    }, {
        bounce: function(msg, { client }) {
            console.log(msg)
            
            setTimeout(() => {
                client.send("bounce", Date.now());
            }, 1000);
        },
    })
});

function App() {
    return (
        <Context.Provider value={{ network }}>
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