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
	TaskNameSchema,
} from "@/features/task/schemas";
import {
	type TaskId,
	type TaskName,
} from "@/features/task/types";

import {
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasSelectedWorklogs,
} from "../store/page/selectors";
import {
	updateTaskName,
} from "../store/page/slice";

interface TaskNameInputProps {
	id: TaskId;
	name: TaskName;
}

const TaskNameInput: FC<TaskNameInputProps> = ({
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
			TaskNameSchema,
			nameLocal,
		);

		if (!nameNextParseResult.success) {
			return;
		}

		const nameNext = nameNextParseResult.output;

		if (nameNext !== name) {
			dispatch(
				updateTaskName({
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
	TaskNameInput,
};
