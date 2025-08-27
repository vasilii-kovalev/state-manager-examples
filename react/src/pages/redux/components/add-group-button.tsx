import {
	type FC,
} from "react";
import {
	useDispatch,
} from "react-redux";

import {
	type Dispatch,
} from "../store";
import {
	addGroup,
} from "../utilities/add-group";

const AddGroupButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const handleAddGroup = (): void => {
		dispatch(addGroup());
	};

	return (
		<button
			onClick={handleAddGroup}
			type="button"
		>
			Add group
		</button>
	);
};

export {
	AddGroupButton,
};
