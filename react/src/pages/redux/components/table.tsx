import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type RootState,
} from "../store";
import {
	selectCalendar,
} from "../store/page/selectors";
import {
	HeaderRow,
} from "./header-row";
import {
	SummaryRow,
} from "./summary-row";
import {
	TaskRows,
} from "./task-rows";

const Table: FC = () => {
	const calendar = useSelector((state: RootState) => {
		return selectCalendar(state.page);
	});

	if (isEmpty(calendar)) {
		return null;
	}

	return (
		<table>
			<thead>
				<HeaderRow/>
			</thead>

			<tbody>
				<SummaryRow/>
				<TaskRows/>
			</tbody>
		</table>
	);
};

export {
	Table,
};
