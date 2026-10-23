import { For, type JSX } from "solid-js";

import { selectCalendar } from "../signals/page/derived";
import { HeaderDateCell } from "./header-date-cell";

const HeaderDateCells = (): JSX.Element => {
	return (
		<For each={selectCalendar()}>
			{(calendarDay) => {
				return <HeaderDateCell date={calendarDay.date} />;
			}}
		</For>
	);
};

export { HeaderDateCells };
