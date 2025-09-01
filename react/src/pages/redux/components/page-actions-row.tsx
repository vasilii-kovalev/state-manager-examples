import {
	type FC,
} from "react";

import {
	FlexRow,
} from "@/components/flex-row";

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
		<FlexRow
			className="gap-col-2"
		>
			<SaveChangesButton/>
			<AddEntitiesButton/>
			<RemoveEntitiesButton/>
		</FlexRow>
	);
};

export {
	PageActionsRow,
};
