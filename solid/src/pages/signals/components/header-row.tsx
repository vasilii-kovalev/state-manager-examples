import {
	type Component,
} from "solid-js";

import {
	HeaderDateCells,
} from "./header-date-cells";
import {
	HeaderInfoCell,
} from "./header-info-cell";
import {
	Row,
} from "./row";

const HeaderRow: Component = () => {
	return (
		<Row>
			<HeaderInfoCell/>
			<HeaderDateCells/>
		</Row>
	);
};

export {
	HeaderRow,
};
