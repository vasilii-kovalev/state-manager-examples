import { type FC } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton, iconButtonCompact } from "../../../styles/control.css";
import { useApplicationDispatch } from "../store";
import { addGroups } from "../utilities/add-groups";

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
					<>
						Add {GROUPS_COUNT} groups, each with {ACTIVITIES_PER_GROUP_COUNT} activities and a worklog of{" "}
						{WORKLOG_DURATION}
						h for each activity on each working day
					</>
				);
			}}
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={getClass([className, control, iconButton, iconButtonCompact])}
						disabled={isBusy}
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
