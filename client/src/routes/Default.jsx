import React from "react";
import { Segment } from "semantic-ui-react";
import { Context } from "./../App";

import { useContextNetwork } from "./../agency/useNetwork";

export function App() {
    const { state, dispatch } = useContextNetwork(Context, "network");

    return (
        <Segment>
            {
                JSON.stringify(state)
            }
        </Segment>
    );
};

export default App;