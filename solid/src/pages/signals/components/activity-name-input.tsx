import {
	type Component,
	createEffect,
	createSignal,
} from "solid-js";

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
	updateActivityName,
} from "../utilities/update-activity-name";
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

const ActivityNameInput: Component<ActivityNameInputProps> = (
	props,
) => {
	const [
		nameLocal,
		setNameLocal,
	] = createSignal<string>("");

	createEffect(() => {
		setNameLocal(props.name);
	});

	const handleBlur = (
		nameNext: ActivityName,
	): void => {
		updateActivityName({
			id: props.activityId,
			name: nameNext,
		});
	};

	return (
		<FlexRow
			class="m-is-3 gap-col-1"
		>
			<NameInput
				class="w-39"
				name={props.name}
				nameLocal={nameLocal()}
				onBlur={handleBlur}
				placeholder="Activity name"
				setNameLocal={setNameLocal}
				validationSchema={ActivityNameSchema}
			/>

			<DuplicatedActivityNameIcon
				activityId={props.activityId}
				groupId={props.groupId}
				name={props.name}
			/>
		</FlexRow>
	);
};

export {
	ActivityNameInput,
};
