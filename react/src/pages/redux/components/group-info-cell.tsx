import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	FlexRow,
} from "@/components/flex-row";
import {
	type GroupId,
	type GroupName,
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
	groupId: GroupId;
	groupName: GroupName;
}

const GroupInfoCell: FC<GroupInfoCellProps> = ({
	groupId,
	groupName,
}) => {
	const reportingStatisticsSummary = useSelector((state: RootState) => {
		return selectReportingStatisticsSummaryForGroup(
			state.page,
			groupId,
		);
	});

	return (
		<Cell
			className="info-column"
		>
			<FlexRow
				className="justify-between gap-col-4"
			>
				<FlexRow
					className="gap-col-2"
				>
					<SelectGroupCheckbox
						groupId={groupId}
					/>

					<GroupNameInput
						id={groupId}
						name={groupName}
					/>

					<ReportedDurationOfNorm
						location={`group-info-cell-${groupId}`}
						norm={reportingStatisticsSummary.norm}
						reported={reportingStatisticsSummary.reported}
					/>
				</FlexRow>

				<FlexRow
					className="gap-col-2"
				>
					<MoveWorklogsToGroupButton
						groupId={groupId}
					/>

					<AddActivityButton
						groupId={groupId}
					/>

					<RemoveGroupButton
						groupId={groupId}
					/>
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export {
	GroupInfoCell,
};
