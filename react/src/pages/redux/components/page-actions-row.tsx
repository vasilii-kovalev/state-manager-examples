import {
	type FC,
} from "react";

import {
	FlexRow,
} from "@/components/flex-row";

import {
	SaveChangesButton,
} from "./save-changes-button";

const PageActionsRow: FC = () => {
	return (
		<FlexRow
			className="gap-col-2"
		>
			<SaveChangesButton/>
		</FlexRow>
	);
};

export {
	PageActionsRow,
};
