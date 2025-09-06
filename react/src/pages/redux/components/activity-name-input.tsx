import {
	type FC,
} from "react";
import {
	useDispatch,
} from "react-redux";

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
	useLocalName,
} from "@/hooks/use-local-name";

import {
	type Dispatch,
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

const ActivityNameInput: FC<ActivityNameInputProps> = ({
	activityId,
	groupId,
	name,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const {
		nameLocal,
		setNameLocal,
	} = useLocalName(name);

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
