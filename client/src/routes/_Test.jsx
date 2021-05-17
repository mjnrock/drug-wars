import React from "react";

import Screen from "../components/Screen";
import Container from "../components/Container";
import Component from "../components/Component";

export function Default() {
	const tile = [ 15, 15 ];

    return (
		<>
			<Screen z={ 0 }>
				<Container
					pos={[ 1, 1, 13, 5, 0 ]}
					tile={ tile }
					style={{
						border: "1px solid #000",
						borderRadius: "4px",
						background: `rgb(255, 0, 0)`,
					}}
					classes={[ ]}
				>
					<Component
						pos={[ 0, 0, 2, 2, 0 ]}
						tile={ tile }
						style={{
							border: "1px solid #000",
						}}
					/>
					<Component
						pos={[ 10, 0, 2, 2, 0 ]}
						tile={ tile }
						style={{
							border: "1px solid #000",
						}}
					/>
				</Container>
				
				<Container
					pos={[ 2, 2, "50%", 12, 1 ]}
					tile={ tile }
					style={{
						position: "fixed",
						border: "1px solid #000",
						borderRadius: "4px",
						background: `rgb(0, 255, 0)`,
					}}
					classes={[ ]}
				>
					<Component
						pos={[ 0, 0, 2, 2, 0 ]}
						tile={ tile }
						style={{
							border: "1px solid #000",
						}}
					/>
					<Component
						pos={[ 0, 10, 2, 2, 0 ]}
						tile={ tile }
						style={{
							border: "1px solid #000",
						}}
					/>
				</Container>
				
				<Container
					pos={[ 3, 3, 7, 7, 2 ]}
					tile={ tile }
					style={{
						border: "1px solid #000",
						borderRadius: "4px",
						background: `rgb(0, 0, 255)`,
					}}
					classes={[ ]}
				>
					<Component
						mergeStyle={ false }
						style={{
							border: "1px solid #000",
						}}
					/>
					<Component
						mergeStyle={ false }
						style={{
							border: "1px solid #000",
						}}
					/>
				</Container>
			</Screen>		
		</>
    );
};

export default Default;