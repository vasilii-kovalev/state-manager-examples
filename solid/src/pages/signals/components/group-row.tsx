import {
	type Component,
} from "solid-js";

import {
	type Group,
} from "@/features/group/types";

import {
	GroupDateCells,
} from "./group-date-cells";
import {
	GroupInfoCell,
} from "./group-info-cell";
import {
	Row,
} from "./row";

interface GroupRowProps {
	group: Group;
}

const GroupRow: Component<GroupRowProps> = (
	props,
) => {
	return (
		<Row>
			<GroupInfoCell
				group={props.group}
			/>

			<GroupDateCells
				groupId={props.group.id}
			/>
		</Row>
	);
};

export {
	GroupRow,
};
