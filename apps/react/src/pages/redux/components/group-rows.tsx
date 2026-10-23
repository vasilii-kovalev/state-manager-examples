import { Fragment, type ReactNode } from "react";

import { useApplicationSelector } from "../store";
import { selectGroups } from "../store/page/selectors";
import { ActivityRows } from "./activity-rows";
import { GroupRow } from "./group-row";

const GroupRows = (): ReactNode => {
	const groups = useApplicationSelector((state) => {
		return selectGroups(state.page);
	});

	return (
		<>
			{groups.map((group) => {
				return (
					<Fragment key={group.id}>
						<GroupRow group={group} />

						<ActivityRows groupId={group.id} />
					</Fragment>
				);
			})}
		</>
	);
};

export { GroupRows };
