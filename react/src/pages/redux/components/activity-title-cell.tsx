import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type PageActivity,
} from "@/features/page/types";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsSummaryForActivity,
} from "../store/page/selectors";
import {
	Cell,
} from "./cell";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

interface ActivityTitleCellProps {
	activity: PageActivity;
}

const ActivityTitleCell: FC<ActivityTitleCellProps> = ({
	activity,
}) => {
	const reportingStatisticsSummary = useSelector((state: RootState) => {
		return selectReportingStatisticsSummaryForActivity(
			state.page,
			activity.id,
		);
	});

	return (
		<Cell>
			<ReportedDurationOfNorm
				norm={reportingStatisticsSummary.norm}
				reported={reportingStatisticsSummary.reported}
			/>
		</Cell>
	);
};

export {
	ActivityTitleCell,
};
