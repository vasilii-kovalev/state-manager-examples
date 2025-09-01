import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type Group,
} from "@/features/group/types";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsSummaryForGroup,
} from "../store/page/selectors";
import {
	AddActivityButton,
} from "./add-activity-button";
import {
	Cell,
} from "./cell";
import {
	GroupNameInput,
} from "./group-name-input";
import {
	MoveWorklogsToGroupButton,
} from "./move-worklogs-to-group-button";
import {
	RemoveGroupButton,
} from "./remove-group-button";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";
import {
	SelectGroupCheckbox,
} from "./select-group-checkbox";

interface GroupInfoCellProps {
	group: Group;
}

const GroupInfoCell: FC<GroupInfoCellProps> = ({
	group,
}) => {
	const reportingStatisticsSummary = useSelector((state: RootState) => {
		return selectReportingStatisticsSummaryForGroup(
			state.page,
			group.id,
		);
	});

	return (
		<Cell>
			<SelectGroupCheckbox
				groupId={group.id}
			/>

			<GroupNameInput
				id={group.id}
				name={group.name}
			/>

			<ReportedDurationOfNorm
				norm={reportingStatisticsSummary.norm}
				reported={reportingStatisticsSummary.reported}
			/>

			<AddActivityButton
				groupId={group.id}
			/>

			<RemoveGroupButton
				groupId={group.id}
			/>

			<MoveWorklogsToGroupButton
				groupId={group.id}
			/>
		</Cell>
	);
};

export {
	GroupInfoCell,
};
