import {
	type Component,
} from "solid-js";

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

const GroupInfoCell: Component<GroupInfoCellProps> = (
	props,
) => {
	return (
		<Cell
			class="info-column"
		>
			<FlexRow
				class="justify-between gap-col-4"
			>
				<FlexRow
					class="gap-col-2"
				>
					<SelectGroupCheckbox
						groupId={props.group.id}
					/>

					<GroupNameInput
						id={props.group.id}
						name={props.group.name}
					/>

					<GroupReportedDurationOfNorm
						groupId={props.group.id}
					/>
				</FlexRow>

				<FlexRow
					class="gap-col-2"
				>
					<MoveWorklogsToGroupButton
						groupId={props.group.id}
					/>

					<AddActivityButton
						groupId={props.group.id}
					/>

					<RemoveGroupButton
						groupId={props.group.id}
					/>
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export {
	GroupInfoCell,
};
