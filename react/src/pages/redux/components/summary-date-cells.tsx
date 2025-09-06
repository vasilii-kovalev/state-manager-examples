import {
	type FC,
	Fragment,
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
	SummaryDateCell,
} from "./summary-date-cell";

const SummaryDateCells: FC = () => {
	const calendar = useSelector((state: RootState) => {
		return selectCalendar(state.page);
	});

	return (
		<Fragment>
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
		</Fragment>
	);
};

export {
	SummaryDateCells,
};
