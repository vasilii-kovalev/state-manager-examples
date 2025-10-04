import {
	type Component,
	For,
} from "solid-js";

import {
	selectCalendar,
} from "../signals/page/derived";
import {
	HeaderDateCell,
} from "./header-date-cell";

const HeaderDateCells: Component = () => {
	return (
		<For
			each={selectCalendar()}
		>
			{
				(
					calendarDay,
				) => {
					return (
						<HeaderDateCell
							date={calendarDay.date}
						/>
					);
				}
			}
		</For>
	);
};

export {
	HeaderDateCells,
};
