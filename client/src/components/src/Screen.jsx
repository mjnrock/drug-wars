import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

import { Context } from "../../App";

export function parseSize(value, parentSize, tileSize) {
	if(typeof value === "string") {
		return `calc(${ value })`;
	}

	return value * parentSize / tileSize;
};

export function Screen(props) {
    const { state, dispatch } = useContextNetwork(Context, "network");

	let { children, id, z = 0, tile = [ 1, 1 ], style = {}, classes = [] } = props;

	const [ size, setSize ] = useState([ window.innerWidth, window.innerHeight ]);

	useEffect(() => {
		window.addEventListener("resize", e => {
			setSize([ ~~window.innerWidth, ~~window.innerHeight ]);
		});
	}, []);

	const childs = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				scope: state,
				size,
				tile,
				// Add props here
			});
		}
		return child;
	});

	return (
		<div
			id={ id || uuidv4() }
			className={ [ `agency-screen`, ...classes ].join(" ") }
			style={{
				position: "absolute",
				overflow: "hidden",
				top: 0,
				left: 0,
				width: size[ 0 ],
				height: size[ 1 ],
				zIndex: z,
				...style,
			}}
		>
			{ childs }
		</div>
	);
};

export default Screen;