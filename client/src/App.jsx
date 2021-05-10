import React from "react";
import { Segment } from "semantic-ui-react";

import ReactNetwork from "./agency/ReactNetwork";
import { useNetwork, } from "./agency/useNetwork"

export const Context = React.createContext();

const network = new ReactNetwork({
    cats: 54,
});

function App() {
    const { state, dispatch } = useNetwork(network);

    return (
        <Context.Provider value={{ network }}>
            <Segment>
                {
                    JSON.stringify(state)
                }
            </Segment>
        </Context.Provider>
    );
};

export default App;