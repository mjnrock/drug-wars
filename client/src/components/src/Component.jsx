import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";

import { parseSize } from "./Screen";

export function Component(props) {
	const ref = React.createRef();

	let { children, id, x = 0, y = 0, z = 0, w = "100%", h = "100%", size: parentSize, pos = [], tile = [ 1, 1 ], mergeStyle = true, style = {}, classes = [] } = props;
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

	return (
		<div
			id={ id || uuidv4() }
			className={ [ `agency-component`, ...classes ].join(" ") }
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
		>
			{ children }
		</div>
	);
};

export default Component;