import React from "react";
import { Button, Segment, Message, Table, Header } from "semantic-ui-react";
import { Context } from "./../App";

import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

import Screen from "./../components/Screen";

export function App() {
    const { state, dispatch } = useContextNetwork(Context, "network");

    return (
		<Screen></Screen>
    );
};

export default App;