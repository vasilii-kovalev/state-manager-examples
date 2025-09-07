import {
	type FC,
} from "react";

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

const GroupRow: FC<GroupRowProps> = ({
	group,
}) => {
	return (
		<Row>
			<GroupInfoCell
				group={group}
			/>

			<GroupDateCells
				groupId={group.id}
			/>
		</Row>
	);
};

export {
	GroupRow,
};
