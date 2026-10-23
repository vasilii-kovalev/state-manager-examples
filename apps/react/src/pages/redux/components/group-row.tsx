import { type ReactNode } from "react";

import { type Group } from "packages/shared/src/features/group/types";

import { GroupDateCells } from "./group-date-cells";
import { GroupInfoCell } from "./group-info-cell";
import { Row } from "./row";

interface GroupRowProps {
	group: Group;
}

const GroupRow = (props: GroupRowProps): ReactNode => {
	const { group } = props;

	return (
		<Row>
			<GroupInfoCell group={group} />

			<GroupDateCells groupId={group.id} />
		</Row>
	);
};

export { GroupRow };
