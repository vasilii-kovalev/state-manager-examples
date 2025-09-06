import {
	type FC,
} from "react";

import {
	HeaderDateCells,
} from "./header-date-cells";
import {
	HeaderInfoCell,
} from "./header-info-cell";
import {
	Row,
} from "./row";

const HeaderRow: FC = () => {
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
