import {
	type Component,
} from "solid-js";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	addGroups,
} from "../utilities/add-groups";

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
						Add
						{" "}
						{GROUPS_COUNT}
						{" "}
						groups, each with
						{" "}
						{ACTIVITIES_PER_GROUP_COUNT}
						{" "}
						activities and a worklog of
						{" "}
						{WORKLOG_DURATION}
						h for each activity on each working day
					</>
				);
			}}
			renderTarget={(
				targetProps,
			) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={
							getClass([
								targetProps.class,
								"control icon-button p-1",
							])
						}
						disabled={isBusy()}
						onClick={handleAddGroups}
						type="button"
					>
						+
						{}

						<sup>
							+
						</sup>
					</button>
				);
			}}
			targetId="add-groups-button"
		/>
	);
};

export {
	AddGroupsButton,
};
