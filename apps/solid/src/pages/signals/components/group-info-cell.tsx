import { type JSX } from "solid-js";

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

const GroupInfoCell = (props: GroupInfoCellProps): JSX.Element => {
	return (
		<Cell class={infoColumn}>
			<FlexRow class={infoRow}>
				<FlexRow class={infoGroup}>
					<SelectGroupCheckbox groupId={props.group.id} />

					<GroupNameInput id={props.group.id} name={props.group.name} />

					<GroupReportedDurationOfNorm groupId={props.group.id} />
				</FlexRow>

				<FlexRow class={infoGroup}>
					<MoveWorklogsToGroupButton groupId={props.group.id} />

					<AddActivityButton groupId={props.group.id} />

					<RemoveGroupButton groupId={props.group.id} />
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export { GroupInfoCell };
