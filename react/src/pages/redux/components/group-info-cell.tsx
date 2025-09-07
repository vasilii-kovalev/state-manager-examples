import {
	type FC,
} from "react";

import {
	FlexRow,
} from "@/components/flex-row";
import {
	type Group,
} from "@/features/group/types";

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
	GroupReportedDurationOfNorm,
} from "./group-reported-duration-of-norm";
import {
	MoveWorklogsToGroupButton,
} from "./move-worklogs-to-group-button";
import {
	RemoveGroupButton,
} from "./remove-group-button";
import {
	SelectGroupCheckbox,
} from "./select-group-checkbox";

interface GroupInfoCellProps {
	group: Group;
}

const GroupInfoCell: FC<GroupInfoCellProps> = ({
	group,
}) => {
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
						groupId={group.id}
					/>

					<GroupNameInput
						id={group.id}
						name={group.name}
					/>

					<GroupReportedDurationOfNorm
						groupId={group.id}
					/>
				</FlexRow>

				<FlexRow
					className="gap-col-2"
				>
					<MoveWorklogsToGroupButton
						groupId={group.id}
					/>

					<AddActivityButton
						groupId={group.id}
					/>

					<RemoveGroupButton
						groupId={group.id}
					/>
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export {
	GroupInfoCell,
};
