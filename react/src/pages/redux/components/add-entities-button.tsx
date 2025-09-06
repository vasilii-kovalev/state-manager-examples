import {
	type FC,
	Fragment,
} from "react";
import {
	useDispatch,
} from "react-redux";

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
	type Dispatch,
} from "../store";
import {
	addEntities,
} from "../utilities/add-entities";

const GROUPS_COUNT = 2;
const ACTIVITIES_PER_GROUP_COUNT = 2;
const WORKLOG_DURATION = 8;

const AddEntitiesButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const isBusy = useIsBusy();

	const handleAddEntities = (): void => {
		dispatch(
			addEntities({
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
								"control",
							])
						}
						disabled={isBusy}
						onClick={handleAddEntities}
						type="button"
					>
						Add entities
					</button>
				);
			}}
			targetId="add-entities-button"
		/>
	);
};

export {
	AddEntitiesButton,
};
