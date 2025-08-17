import {
	isWeekend,
} from "date-fns";
import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type PageWorklog,
} from "@/features/page/types";

import {
	type RootState,
} from "../store";
import {
	selectHasSelectedWorklogs,
} from "../store/page/selectors";
import {
	Cell,
} from "./cell";
import {
	TotalDuration,
} from "./total-duration";
import {
	WorklogInput,
} from "./worklog-input";

interface WorklogCellProps {
	worklog: PageWorklog;
}

const WorklogCell: FC<WorklogCellProps> = ({
	worklog,
}) => {
	const hasSelectedWorklogs = useSelector((state: RootState) => {
		return selectHasSelectedWorklogs(state.page);
	});

	const isWeekendDay = isWeekend(worklog.date);

	if (
		hasSelectedWorklogs
		|| isWeekendDay
	) {
		return (
			<Cell>
				<TotalDuration
					duration={worklog.duration}
				/>
			</Cell>
		);
	}

	return (
		<Cell>
			<WorklogInput
				duration={worklog.duration}
			/>
		</Cell>
	);
};

export {
	WorklogCell,
};
