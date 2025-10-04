import {
	type Component,
	For,
} from "solid-js";

import {
	selectCalendar,
} from "../signals/page/derived";
import {
	SummaryDateCell,
} from "./summary-date-cell";

const SummaryDateCells: Component = () => {
	return (
		<For
			each={selectCalendar()}
		>
			{
				(
					calendarDay,
				) => {
					return (
						<SummaryDateCell
							date={calendarDay.date}
						/>
					);
				}
			}
		</For>
	);
};

export {
	SummaryDateCells,
};
