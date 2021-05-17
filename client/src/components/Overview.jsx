import React from "react";
import { Table } from "semantic-ui-react";

import Util from "./src/package";

export function Overview() {
	return (
		<Util.Screen
			tile={[ 5, 5 ]}
		>
			<Util.Container
				pos={[ 0, 0, "100%", "100%", 0 ]}
			>
				<Util.Component>
					<Table>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>
									Drug
								</Table.HeaderCell>
								<Table.HeaderCell>
									Qty
								</Table.HeaderCell>
								<Table.HeaderCell>
									NW
								</Table.HeaderCell>
								<Table.HeaderCell>
									NE
								</Table.HeaderCell>
								<Table.HeaderCell>
									SE
								</Table.HeaderCell>
								<Table.HeaderCell>
									SW
								</Table.HeaderCell>
								<Table.HeaderCell colSpan={ 2 }>
									Actions
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell>Weed</Table.Cell>
								<Table.Cell>50</Table.Cell>
								<Table.Cell>$50</Table.Cell>
								<Table.Cell>$50</Table.Cell>
								<Table.Cell>$50</Table.Cell>
								<Table.Cell>$0</Table.Cell>
								<Table.Cell>0</Table.Cell>
								<Table.Cell>0</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Meth</Table.Cell>
								<Table.Cell>50</Table.Cell>
								<Table.Cell>$50</Table.Cell>
								<Table.Cell>$50</Table.Cell>
								<Table.Cell>$50</Table.Cell>
								<Table.Cell>$0</Table.Cell>
								<Table.Cell>0</Table.Cell>
								<Table.Cell>0</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Util.Component>
			</Util.Container>
		</Util.Screen>
	)
};

export default Overview;