import { type ReactNode } from "react";

import { type Group } from "packages/shared/src/features/group/types";

import { FlexRow } from "../../../components/flex-row";
import { AddActivityButton } from "./add-activity-button";
import { Cell } from "./cell";
import { infoColumn } from "./cell.css";
import { GroupNameInput } from "./group-name-input";
import { GroupReportedDurationOfNorm } from "./group-reported-duration-of-norm";
import { infoGroup, infoRow } from "./info-cell.css";
import { MoveWorklogsToGroupButton } from "./move-worklogs-to-group-button";
import { RemoveGroupButton } from "./remove-group-button";
import { SelectGroupCheckbox } from "./select-group-checkbox";

interface GroupInfoCellProps {
	group: Group;
}

const GroupInfoCell = (props: GroupInfoCellProps): ReactNode => {
	const { group } = props;

	return (
		<Cell className={infoColumn}>
			<FlexRow className={infoRow}>
				<FlexRow className={infoGroup}>
					<SelectGroupCheckbox groupId={group.id} />

					<GroupNameInput id={group.id} name={group.name} />

					<GroupReportedDurationOfNorm groupId={group.id} />
				</FlexRow>

				<FlexRow className={infoGroup}>
					<MoveWorklogsToGroupButton groupId={group.id} />

					<AddActivityButton groupId={group.id} />

					<RemoveGroupButton groupId={group.id} />
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export { GroupInfoCell };
