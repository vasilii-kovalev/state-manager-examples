import { type ReactNode } from "react";

import { FlexRow } from "../../../components/flex-row";
import { pageActions } from "./page-actions-row.css";
import { SaveChangesButton } from "./save-changes-button";

const PageActionsRow = (): ReactNode => {
	return (
		<FlexRow className={pageActions}>
			<SaveChangesButton />
		</FlexRow>
	);
};

export { PageActionsRow };
