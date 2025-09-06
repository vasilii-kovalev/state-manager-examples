import {
	type FC,
	Fragment,
} from "react";

import {
	type Group,
} from "@/features/group/types";

import {
	ActivityRows,
} from "./activity-rows";
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
		<Fragment>
			<Row>
				<GroupInfoCell
					groupId={group.id}
					groupName={group.name}
				/>

				<GroupDateCells
					groupId={group.id}
				/>
			</Row>

			<ActivityRows
				groupId={group.id}
			/>
		</Fragment>
	);
};

export {
	GroupRow,
};
