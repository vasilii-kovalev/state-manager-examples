import {
	type Component,
} from "solid-js";

import {
	FlexRow,
} from "@/components/flex-row";

import {
	AddGroupButton,
} from "./add-group-button";
import {
	AddGroupsButton,
} from "./add-groups-button";
import {
	Cell,
} from "./cell";
import {
	RemoveGroupsButton,
} from "./remove-groups-button";
import {
	SelectGroupsCheckbox,
} from "./select-groups-checkbox";
import {
	SummaryReportedDurationOfNorm,
} from "./summary-reported-duration-of-norm";

const SummaryInfoCell: Component = () => {
	return (
		<Cell
			class="info-column"
		>
			<FlexRow
				class="justify-between gap-col-4"
			>
				<FlexRow
					class="gap-col-2"
				>
					<SelectGroupsCheckbox/>

					{/* Placeholder for alignment among the rows. */}
					<div
						class="w-48"
						// TODO: check why UnoCSS doesn't generate this class.
						style={{
							width: "12rem",
						}}
					/>

					<SummaryReportedDurationOfNorm/>
				</FlexRow>

				<FlexRow
					class="gap-col-2"
				>
					<AddGroupsButton/>
					<AddGroupButton/>
					<RemoveGroupsButton/>
				</FlexRow>
			</FlexRow>
		</Cell>
	);
};

export {
	SummaryInfoCell,
};
