import { For, type JSX } from "solid-js";

import { selectGroups } from "../signals/page/derived";
import { ActivityRows } from "./activity-rows";
import { GroupRow } from "./group-row";

const GroupRows = (): JSX.Element => {
	return (
		<For each={selectGroups()}>
			{(group) => {
				return (
					<>
						<GroupRow group={group} />

						<ActivityRows groupId={group.id} />
					</>
				);
			}}
		</For>
	);
};

export { GroupRows };
