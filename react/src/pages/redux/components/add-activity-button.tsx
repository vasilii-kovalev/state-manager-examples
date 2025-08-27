import {
	type FC,
} from "react";
import {
	useDispatch,
} from "react-redux";

import {
	type GroupId,
} from "@/features/group/types";

import {
	type Dispatch,
} from "../store";
import {
	addActivity,
} from "../utilities/add-activity";

interface AddActivityButtonProps {
	groupId: GroupId;
}

const AddActivityButton: FC<AddActivityButtonProps> = ({
	groupId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const handleAddActivity = (): void => {
		dispatch(addActivity(groupId));
	};

	return (
		<button
			onClick={handleAddActivity}
			type="button"
		>
			Add activity
		</button>
	);
};

export {
	AddActivityButton,
};
