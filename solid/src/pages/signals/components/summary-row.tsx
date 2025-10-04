import {
	type Component,
} from "solid-js";

import {
	Row,
} from "./row";
import {
	SummaryDateCells,
} from "./summary-date-cells";
import {
	SummaryInfoCell,
} from "./summary-info-cell";

const SummaryRow: Component = () => {
	return (
		<Row>
			<SummaryInfoCell/>
			<SummaryDateCells/>
		</Row>
	);
};

export {
	SummaryRow,
};
