import {
	type FC,
} from "react";

import {
	SaveChangesButton,
} from "./save-changes-button";

const PageActionsRow: FC = () => {
	return (
		<div>
			<SaveChangesButton/>
		</div>
	);
};

export {
	PageActionsRow,
};
