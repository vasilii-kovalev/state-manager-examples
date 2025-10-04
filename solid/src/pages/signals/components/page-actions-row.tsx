import {
	type Component,
} from "solid-js";

import {
	FlexRow,
} from "@/components/flex-row";

import {
	SaveChangesButton,
} from "./save-changes-button";

const PageActionsRow: Component = () => {
	return (
		<FlexRow
			class="gap-col-2"
		>
			<SaveChangesButton/>
		</FlexRow>
	);
};

export {
	PageActionsRow,
};
