import React from "react";
import { Button, Segment, Message, Table, Header } from "semantic-ui-react";
import { Context } from "../App";

import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

export function App() {
    const { state, dispatch } = useContextNetwork(Context, "network");
    
    if(!state) {
        return (
            <Segment color="red" textAlign="center" vertical="middle">
                ...Waiting for state
            </Segment>
        )
    }

    return (
        <Segment>
            <Button
                onClick={ e => {
                    dispatch("click", e.clientX, e.clientY, Date.now())
                } }
            >Click Me</Button>

            {
                state.error ? (
                    <Message error>
                        <Header as="h4">Error</Header>
                        { JSON.stringify(state.error) }
                    </Message>
                ) : null
            }

            <Table celled striped selectable textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3">History</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>X</Table.HeaderCell>
                        <Table.HeaderCell>Y</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        (state.history || []).map(([ x, y, time ]) => (
                            <Table.Row key={ `${ x }:${ y }:${ time }` }>
                                <Table.Cell>{ x }</Table.Cell>
                                <Table.Cell>{ y }</Table.Cell>
                                <Table.Cell>{ time }</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>

            <Message info>
                <Header as="h4">State</Header>
				<pre>
					{
						JSON.stringify(state, null, 2)
					}
				</pre>
            </Message>
        </Segment>
    );
};

export default App;