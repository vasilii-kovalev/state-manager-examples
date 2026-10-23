import { createEffect, createSignal, type JSX } from "solid-js";

import { ActivityNameSchema } from "packages/shared/src/features/activity/schemas";
import { type ActivityId, type ActivityName } from "packages/shared/src/features/activity/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { FlexRow } from "../../../components/flex-row";
import { updateActivityName } from "../utilities/update-activity-name";
import { activityNameField, activityNameRow } from "./activity-name-input.css";
import { DuplicatedActivityNameIcon } from "./duplicated-activity-name-icon";
import { NameInput } from "./name-input";

interface ActivityNameInputProps {
	activityId: ActivityId;
	groupId: GroupId;
	name: ActivityName;
}

const ActivityNameInput = (props: ActivityNameInputProps): JSX.Element => {
	const [nameLocal, setNameLocal] = createSignal<string>("");

	createEffect(() => {
		setNameLocal(props.name);
	});

	const handleBlur = (nameNext: ActivityName): void => {
		updateActivityName({
			id: props.activityId,
			name: nameNext,
		});
	};

	return (
		<FlexRow class={activityNameRow}>
			<NameInput
				class={activityNameField}
				name={props.name}
				nameLocal={nameLocal()}
				onBlur={handleBlur}
				placeholder="Activity name"
				setNameLocal={setNameLocal}
				validationSchema={ActivityNameSchema}
			/>

			<DuplicatedActivityNameIcon activityId={props.activityId} groupId={props.groupId} name={props.name} />
		</FlexRow>
	);
};

export { ActivityNameInput };
