import {
	type FC,
} from "react";

import {
	type TaskId,
} from "@/features/task/types";

interface AddActivityButtonProps {
	taskId: TaskId;
}

const AddActivityButton: FC<AddActivityButtonProps> = () => {
	return (
		<button
			type="button"
		>
			Add activity
		</button>
	);
};

export {
	AddActivityButton,
};
