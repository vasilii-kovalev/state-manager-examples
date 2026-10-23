import { For, type JSX } from "solid-js";

import { selectCalendar } from "../signals/page/derived";
import { SummaryDateCell } from "./summary-date-cell";

const SummaryDateCells = (): JSX.Element => {
	return (
		<For each={selectCalendar()}>
			{(calendarDay) => {
				return <SummaryDateCell date={calendarDay.date} />;
			}}
		</For>
	);
};

export { SummaryDateCells };
