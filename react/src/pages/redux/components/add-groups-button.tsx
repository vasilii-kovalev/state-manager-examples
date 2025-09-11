import {
	type FC,
	Fragment,
} from "react";

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
	useApplicationDispatch,
} from "../store";
import {
	addGroups,
} from "../utilities/add-groups";

const GROUPS_COUNT = 30;
const ACTIVITIES_PER_GROUP_COUNT = 2;
const WORKLOG_DURATION = 8;

const AddGroupsButton: FC = () => {
	const dispatch = useApplicationDispatch();

	const isBusy = useIsBusy();

	const handleAddGroups = (): void => {
		dispatch(
			addGroups({
				activitiesPerGroupCount: ACTIVITIES_PER_GROUP_COUNT,
				groupsCount: GROUPS_COUNT,
				worklogDuration: WORKLOG_DURATION,
			}),
		);
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return (
					<Fragment>
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
					</Fragment>
				);
			}}
			renderTarget={({
				className,
				tooltipId,
				...targetProps
			}) => {
				return (
					<button
						{...targetProps}
						aria-describedby={tooltipId}
						className={
							getClass([
								className,
								"control icon-button p-1",
							])
						}
						disabled={isBusy}
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
