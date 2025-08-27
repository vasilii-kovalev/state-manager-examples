import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type ChangeEventHandler,
	type FC,
	Fragment,
	useState,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";
import {
	safeParse,
} from "valibot";

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
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasSelectedWorklogs,
} from "../store/page/selectors";
import {
	updateActivityName,
} from "../store/page/slice";
import {
	DuplicatedActivityNameIcon,
} from "./duplicated-activity-name-icon";

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

	const hasSelectedWorklogs = useSelector((state: RootState) => {
		return selectHasSelectedWorklogs(state.page);
	});

	const [
		nameLocal,
		setNameLocal,
	] = useState<string>(name);

	const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setNameLocal(event.target.value);
	};

	const handleOnBlur = (): void => {
		if (isEmpty(nameLocal)) {
			setNameLocal(name);

			return;
		}

		const nameNextParseResult = safeParse(
			ActivityNameSchema,
			nameLocal,
		);

		if (!nameNextParseResult.success) {
			return;
		}

		const nameNext = nameNextParseResult.output;

		if (nameNext !== name) {
			dispatch(
				updateActivityName({
					id: activityId,
					name: nameNext,
				}),
			);
		}

		// The parsed name is trimmed, so we need to update the local state as well.
		setNameLocal(nameNext);
	};

	return (
		<Fragment>
			<input
				disabled={hasSelectedWorklogs}
				onBlur={handleOnBlur}
				onChange={handleNameChange}
				placeholder={name}
				type="text"
				value={nameLocal}
			/>

			<DuplicatedActivityNameIcon
				activityId={activityId}
				groupId={groupId}
				name={nameLocal}
			/>
		</Fragment>
	);
};

export {
	ActivityNameInput,
};
