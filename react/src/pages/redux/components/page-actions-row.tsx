import {
	type FC,
} from "react";

import {
	AddEntitiesButton,
} from "./add-entities-button";
import {
	RemoveEntitiesButton,
} from "./remove-entities-button";
import {
	SaveChangesButton,
} from "./save-changes-button";

const PageActionsRow: FC = () => {
	return (
		<div>
			<SaveChangesButton/>
			<AddEntitiesButton/>
			<RemoveEntitiesButton/>
		</div>
	);
};

export {
	PageActionsRow,
};
