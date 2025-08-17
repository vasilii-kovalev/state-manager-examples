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
	Row,
} from "./row";
import {
	SummaryDateCell,
} from "./summary-date-cell";
import {
	SummaryInfoCell,
} from "./summary-info-cell";

const SummaryRow: FC = () => {
	const calendar = useSelector((state: RootState) => {
		return selectCalendar(state.page);
	});

	return (
		<Row>
			<SummaryInfoCell/>

			{
				calendar.map((calendarDay) => {
					return (
						<SummaryDateCell
							date={calendarDay.date}
							key={calendarDay.date}
						/>
					);
				})
			}
		</Row>
	);
};

export {
	SummaryRow,
};
