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
	addEntities,
} from "../utilities/add-entities";

const AddEntitiesButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const handleAddEntities = (): void => {
		dispatch(addEntities());
	};

	return (
		<button
			onClick={handleAddEntities}
			type="button"
		>
			Add entities
		</button>
	);
};

export {
	AddEntitiesButton,
};
