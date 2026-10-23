import { type ReactNode, useState } from "react";

import { ActivityNameSchema } from "packages/shared/src/features/activity/schemas";
import { type ActivityId, type ActivityName } from "packages/shared/src/features/activity/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { FlexRow } from "../../../components/flex-row";
import { useApplicationDispatch } from "../store";
import { updateActivityName } from "../store/page/slice";
import { activityNameField, activityNameRow } from "./activity-name-input.css";
import { DuplicatedActivityNameIcon } from "./duplicated-activity-name-icon";
import { NameInput } from "./name-input";

interface ActivityNameInputProps {
	activityId: ActivityId;
	groupId: GroupId;
	name: ActivityName;
}

const ActivityNameInput = (props: ActivityNameInputProps): ReactNode => {
	const { activityId, groupId, name } = props;

	const dispatch = useApplicationDispatch();

	const [nameLocal, setNameLocal] = useState<string>(name);

	const handleBlur = (nameNext: ActivityName): void => {
		dispatch(
			updateActivityName({
				id: activityId,
				name: nameNext,
			}),
		);
	};

	return (
		<FlexRow className={activityNameRow}>
			<NameInput
				className={activityNameField}
				name={name}
				nameLocal={nameLocal}
				onBlur={handleBlur}
				placeholder="Activity name"
				setNameLocal={setNameLocal}
				validationSchema={ActivityNameSchema}
			/>

			<DuplicatedActivityNameIcon activityId={activityId} groupId={groupId} name={name} />
		</FlexRow>
	);
};

export { ActivityNameInput };
