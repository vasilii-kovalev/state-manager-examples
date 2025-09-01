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
	removeEntities,
} from "../store/page/slice";

const RemoveEntitiesButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const handleRemoveEntities = (): void => {
		dispatch(removeEntities());
	};

	return (
		<button
			className="control"
			onClick={handleRemoveEntities}
			type="button"
		>
			Remove entities
		</button>
	);
};

export {
	RemoveEntitiesButton,
};
