import { type JSX } from "solid-js";

import { HeaderDateCells } from "./header-date-cells";
import { HeaderInfoCell } from "./header-info-cell";
import { Row } from "./row";

const HeaderRow = (): JSX.Element => {
	return (
		<Row>
			<HeaderInfoCell />
			<HeaderDateCells />
		</Row>
	);
};

export { HeaderRow };
