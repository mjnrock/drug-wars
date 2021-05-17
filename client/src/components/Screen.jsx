import React, { useEffect, useState } from "react";

export function Screen({ children }) {
	const [ size, setSize ] = useState([ window.screen.width, window.screen.height ]);

	useEffect(() => {
		window.addEventListener("resize", e => {
			setSize([ window.screen.width, window.screen.height ]);
		});
	}, []);

	return (
		<div style={{
			width: size[ 0 ],
			height: size[ 1 ],
		}}>
			{ children }
		</div>
	);
};

export default Screen;