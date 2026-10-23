import { type Component } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton, iconButtonCompact } from "../../../styles/control.css";
import { addGroups } from "../utilities/add-groups";

const GROUPS_COUNT = 30;
const ACTIVITIES_PER_GROUP_COUNT = 2;
const WORKLOG_DURATION = 8;

const handleAddGroups = (): void => {
	addGroups({
		activitiesPerGroupCount: ACTIVITIES_PER_GROUP_COUNT,
		groupsCount: GROUPS_COUNT,
		worklogDuration: WORKLOG_DURATION,
	});
};

const AddGroupsButton: Component = () => {
	const isBusy = useIsBusy();

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return (
					<>
						Add {GROUPS_COUNT} groups, each with {ACTIVITIES_PER_GROUP_COUNT} activities and a worklog of{" "}
						{WORKLOG_DURATION}
						h for each activity on each working day
					</>
				);
			}}
			renderTarget={(targetProps) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={getClass([targetProps.class, control, iconButton, iconButtonCompact])}
						disabled={isBusy()}
						onClick={handleAddGroups}
						type="button"
					>
						+<sup>+</sup>
					</button>
				);
			}}
			targetId="add-groups-button"
		/>
	);
};

export { AddGroupsButton };
