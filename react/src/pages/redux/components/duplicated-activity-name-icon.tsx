import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";
import {
	getClass,
} from "@/utilities/get-class";

import {
	type RootState,
} from "../store";
import {
	selectActivityNamesInGroup,
} from "../store/page/selectors";

interface DuplicatedActivityNameIconProps {
	activityId: ActivityId;
	name: ActivityName;
	groupId: GroupId;
}

const DuplicatedActivityNameIcon: FC<DuplicatedActivityNameIconProps> = ({
	activityId,
	name,
	groupId,
}) => {
	const existingActivityNames = useSelector((state: RootState) => {
		return selectActivityNamesInGroup(
			state.page,
			groupId,
			activityId,
		);
	});

	return (
		<Tooltip<HTMLDivElement>
			renderBody={() => {
				return "There are multiple activities with this name in the group";
			}}
			renderTarget={({
				className,
				tooltipId,
				...targetProps
			}) => {
				const hasDuplicate = existingActivityNames.includes(name);

				return (
					<div
						{...targetProps}
						aria-describedby={tooltipId}
						className={
							getClass([
								className,
								"h-5 w-3 flex-inline justify-center p-1",
							])
						}
						tabIndex={
							hasDuplicate
								? 0
								: undefined
						}
					>
						{
							hasDuplicate
								? "!"
								: null
						}
					</div>
				);
			}}
			targetId={`duplicated-activity-name-${activityId}`}
		/>
	);
};

export {
	DuplicatedActivityNameIcon,
};
