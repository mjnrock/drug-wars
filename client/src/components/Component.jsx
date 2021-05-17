import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";

function parseSize(value, parentSize, tileSize) {
	if(typeof value === "string") {
		if(value.includes("%")) {
			value = +(value.replace(/[^0-9.]/i, ""));
			value /= 100;
			value *= parentSize;
			
			return ~~value;
		} else {
			//	Assume it's pixels
			return ~~(+(value.replace(/[^0-9.]/i, "")));
		}
	}

	return value * parentSize / tileSize;
};

export function Component(props) {
	const ref = React.createRef();

	let { children, scope = {}, id, x, y, z, w, h, size: parentSize, pos = [], tile = [ 1, 1 ], mergeStyle = true, style = {}, classes = [] } = props;
	const [ size, setSize ] = useState(parentSize);

	if(pos.length) {
		[ x, y, w, h, z ] = pos;
	}
	
	x = parseSize(x, parentSize[ 0 ], tile[ 0 ]);
	y = parseSize(y, parentSize[ 1 ], tile[ 1 ]);
	w = parseSize(w, parentSize[ 0 ], tile[ 0 ]);
	h = parseSize(h, parentSize[ 1 ], tile[ 1 ]);	

	const childs = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				scope: scope,
				size: size,
				tile: tile,
				// Add props here
			});
		}
		return child;
	});

	useEffect(() => {
		if(!ref.current) {
			return;
		}

		let { width, height } = ref.current.getBoundingClientRect();

		width = ~~width;
		height = ~~height;

		if(size[ 0 ] !== width || size[ 1 ] !== height) {
			setSize([
				width,
				height,
			]);
		}
	}, [ parentSize ]);

	return (
		<div
			id={ id || uuidv4() }
			className={ [ `agency-component`, ...classes ].join(" ") }
			style={ mergeStyle ? {
				position: "absolute",
				overflow: "hidden",
				top: y * (parentSize[ 1 ] / tile[ 0 ]),
				left: x * (parentSize[ 0 ] / tile[ 0 ]),
				width: w * (parentSize[ 0 ] / tile[ 0 ]),
				height: h * (parentSize[ 1 ] / tile[ 0 ]),
				zIndex: z,
				...style,
			} : style}
		>
			<pre>
				{
					JSON.stringify(scope, null, 2)
				}
			</pre>
			{ childs }
		</div>
	);
};

export default Component;