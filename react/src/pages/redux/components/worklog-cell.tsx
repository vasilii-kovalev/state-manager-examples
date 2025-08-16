import {
	isWeekend,
} from "date-fns";
import {
	type FC,
} from "react";

import {
	type PageWorklog,
} from "@/features/page/types";

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
	if (isWeekend(worklog.date)) {
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
