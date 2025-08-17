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
	HeaderDateCell,
} from "./header-date-cell";
import {
	HeaderInfoCell,
} from "./header-info-cell";
import {
	Row,
} from "./row";

const HeaderRow: FC = () => {
	const calendar = useSelector((state: RootState) => {
		return selectCalendar(state.page);
	});

	return (
		<Row>
			<HeaderInfoCell/>

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
		</Row>
	);
};

export {
	HeaderRow,
};
