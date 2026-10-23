import { type Component } from "solid-js";

import { FlexRow } from "../../../components/flex-row";
import { AddGroupButton } from "./add-group-button";
import { AddGroupsButton } from "./add-groups-button";
import { Cell } from "./cell";
import { infoColumn } from "./cell.css";
import { infoGroup, infoRow } from "./info-cell.css";
import { RemoveGroupsButton } from "./remove-groups-button";
import { SelectGroupsCheckbox } from "./select-groups-checkbox";
import { summaryPlaceholder } from "./summary-info-cell.css";
import { SummaryReportedDurationOfNorm } from "./summary-reported-duration-of-norm";

const SummaryInfoCell: Component = () => {
	return (
		<Cell class={infoColumn}>
			<FlexRow class={infoRow}>
				<FlexRow class={infoGroup}>
					<SelectGroupsCheckbox />

					{/* Placeholder for alignment among the rows. */}
					<div class={summaryPlaceholder} />

					<SummaryReportedDurationOfNorm />
				</FlexRow>

				<FlexRow class={infoGroup}>
					<AddGroupsButton />
					<AddGroupButton />
					<RemoveGroupsButton />
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export { SummaryInfoCell };
