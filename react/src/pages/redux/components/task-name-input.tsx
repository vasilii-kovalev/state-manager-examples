import {
	type ChangeEventHandler,
	type FC,
	useState,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type TaskName,
} from "@/features/task/types";

import {
	type RootState,
} from "../store";
import {
	selectHasSelectedWorklogs,
} from "../store/page/selectors";

interface TaskNameInputProps {
	name: TaskName;
}

const TaskNameInput: FC<TaskNameInputProps> = ({
	name,
}) => {
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

	return (
		<input
			disabled={hasSelectedWorklogs}
			onChange={handleNameChange}
			type="text"
			value={nameLocal}
		/>
	);
};

export {
	TaskNameInput,
};
