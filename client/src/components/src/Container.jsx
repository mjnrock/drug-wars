import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";

import { parseSize } from "./Screen";

export function Container(props) {
	const ref = React.createRef();
	
	let { children, scope = {}, id, x, y, z = 0, w, h, size: parentSize, pos = [], tile = [ 1, 1 ], mergeStyle = true, style = {}, classes = [] } = props;
	const [ size, setSize ] = useState(parentSize);

	if(pos.length) {
		[ x, y, w, h, z ] = pos;
	}
	
	x = parseSize(x, parentSize[ 0 ], tile[ 0 ]);
	y = parseSize(y, parentSize[ 1 ], tile[ 1 ]);
	w = parseSize(w, parentSize[ 0 ], tile[ 0 ]);
	h = parseSize(h, parentSize[ 1 ], tile[ 1 ]);	

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
	}, [ ref, size, parentSize ]);

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

	return (
		<div
			id={ id || uuidv4() }
			className={ [ `agency-container`, ...classes ].join(" ") }
			style={ mergeStyle ? {
				position: "absolute",
				overflow: "hidden",
				top: y,
				left: x,
				width: w,
				height: h,
				zIndex: z,
				...style,
			} : style}
			ref={ ref }
		>
			{ childs }
		</div>
	);
};

export default Container;