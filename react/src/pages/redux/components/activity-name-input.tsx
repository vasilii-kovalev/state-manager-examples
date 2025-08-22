import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type ChangeEventHandler,
	type FC,
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
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasSelectedWorklogs,
} from "../store/page/selectors";
import {
	updateActivityName,
} from "../store/page/slice";

interface ActivityNameInputProps {
	id: ActivityId;
	name: ActivityName;
}

const ActivityNameInput: FC<ActivityNameInputProps> = ({
	id,
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
					id,
					name: nameNext,
				}),
			);
		}

		// The parsed name is trimmed, so we need to update the local state as well.
		setNameLocal(nameNext);
	};

	return (
		<input
			disabled={hasSelectedWorklogs}
			onBlur={handleOnBlur}
			onChange={handleNameChange}
			placeholder={name}
			type="text"
			value={nameLocal}
		/>
	);
};

export {
	ActivityNameInput,
};
