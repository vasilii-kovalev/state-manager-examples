import { type ReactNode } from "react";

import { Row } from "./row";
import { SummaryDateCells } from "./summary-date-cells";
import { SummaryInfoCell } from "./summary-info-cell";

const SummaryRow = (): ReactNode => {
	return (
		<Row>
			<SummaryInfoCell />
			<SummaryDateCells />
		</Row>
	);
};

export { SummaryRow };
