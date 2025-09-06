import {
	type FC,
} from "react";

import {
	Row,
} from "./row";
import {
	SummaryDateCells,
} from "./summary-date-cells";
import {
	SummaryInfoCell,
} from "./summary-info-cell";

const SummaryRow: FC = () => {
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
