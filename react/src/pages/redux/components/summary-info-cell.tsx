import {
	type FC,
} from "react";

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

const SummaryInfoCell: FC = () => {
	return (
		<Cell
			className="info-column"
		>
			<FlexRow
				className="justify-between gap-col-4"
			>
				<FlexRow
					className="gap-col-2"
				>
					<SelectGroupsCheckbox/>

					{/* Placeholder for alignment among the rows. */}
					<div
						className="w-48"
					/>

					<SummaryReportedDurationOfNorm/>
				</FlexRow>

				<FlexRow
					className="gap-col-2"
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
