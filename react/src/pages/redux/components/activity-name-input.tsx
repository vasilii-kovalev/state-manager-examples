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
			className="gap-col-1"
		>
			<DuplicatedActivityNameIcon
				activityId={activityId}
				groupId={groupId}
				name={name}
			/>

			<NameInput
				className="w-36"
				name={name}
				nameLocal={nameLocal}
				onBlur={handleBlur}
				setNameLocal={setNameLocal}
				validationSchema={ActivityNameSchema}
			/>
		</FlexRow>
	);
};

export {
	ActivityNameInput,
};
