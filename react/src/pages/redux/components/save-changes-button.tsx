import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type RootState,
} from "../store";
import {
	selectHasUnSavedChanges,
} from "../store/page/selectors";

const SaveChangesButton: FC = () => {
	const hasUnsavedChanges = useSelector((state: RootState) => {
		return selectHasUnSavedChanges(state.page);
	});

	if (!hasUnsavedChanges) {
		return null;
	}

	return (
		<button
			type="button"
		>
			Save changes
		</button>
	);
};

export {
	SaveChangesButton,
};
