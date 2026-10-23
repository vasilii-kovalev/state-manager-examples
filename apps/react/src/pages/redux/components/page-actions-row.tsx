import { type FC } from "react";

import { FlexRow } from "../../../components/flex-row";
import { pageActions } from "./page-actions-row.css";
import { SaveChangesButton } from "./save-changes-button";

const PageActionsRow: FC = () => {
	return (
		<FlexRow className={pageActions}>
			<SaveChangesButton />
		</FlexRow>
	);
};

export { PageActionsRow };
