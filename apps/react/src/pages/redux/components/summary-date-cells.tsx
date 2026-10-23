import { type ReactNode } from "react";

import { useApplicationSelector } from "../store";
import { selectCalendar } from "../store/page/selectors";
import { SummaryDateCell } from "./summary-date-cell";

const SummaryDateCells = (): ReactNode => {
	const calendar = useApplicationSelector((state) => {
		return selectCalendar(state.page);
	});

	return (
		<>
			{calendar.map((calendarDay) => {
				return <SummaryDateCell date={calendarDay.date} key={calendarDay.date} />;
			})}
		</>
	);
};

export { SummaryDateCells };
