import {
	type FC,
	useState,
} from "react";

import {
	FlexRow,
} from "@/components/flex-row";
import {
	ActivityNameSchema,
} from "@/features/activity/schemas";
import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	useApplicationDispatch,
} from "../store";
import {
	updateActivityName,
} from "../store/page/slice";
import {
	DuplicatedActivityNameIcon,
} from "./duplicated-activity-name-icon";
import {
	NameInput,
} from "./name-input";

interface ActivityNameInputProps {
	activityId: ActivityId;
	groupId: GroupId;
	name: ActivityName;
}

const ActivityNameInput: FC<ActivityNameInputProps> = (
	props,
) => {
	const {
		activityId,
		groupId,
		name,
	} = props;

	const dispatch = useApplicationDispatch();

	const [
		nameLocal,
		setNameLocal,
	] = useState<string>(name);

	const handleBlur = (
		nameNext: ActivityName,
	): void => {
		dispatch(
			updateActivityName({
				id: activityId,
				name: nameNext,
			}),
		);
	};

	return (
		<FlexRow
			className="m-is-3 gap-col-1"
		>
			<NameInput
				className="w-39"
				name={name}
				nameLocal={nameLocal}
				onBlur={handleBlur}
				placeholder="Activity name"
				setNameLocal={setNameLocal}
				validationSchema={ActivityNameSchema}
			/>

			<DuplicatedActivityNameIcon
				activityId={activityId}
				groupId={groupId}
				name={name}
			/>
		</FlexRow>
	);
};

export {
	ActivityNameInput,
};
