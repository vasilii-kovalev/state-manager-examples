import {
	type FC,
	Fragment,
} from "react";

import {
	useApplicationSelector,
} from "../store";
import {
	selectCalendar,
} from "../store/page/selectors";
import {
	HeaderDateCell,
} from "./header-date-cell";

const HeaderDateCells: FC = () => {
	const calendar = useApplicationSelector((state) => {
		return selectCalendar(state.page);
	});

	return (
		<Fragment>
			{
				calendar.map((calendarDay) => {
					return (
						<HeaderDateCell
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
	HeaderDateCells,
};
