import { type JSX } from "solid-js";

import { FlexRow } from "../../../components/flex-row";
import { pageActions } from "./page-actions-row.css";
import { SaveChangesButton } from "./save-changes-button";

const PageActionsRow = (): JSX.Element => {
	return (
		<FlexRow class={pageActions}>
			<SaveChangesButton />
		</FlexRow>
	);
};

export { PageActionsRow };
