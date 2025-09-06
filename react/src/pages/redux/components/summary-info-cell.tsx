import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	FlexRow,
} from "@/components/flex-row";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsSummary,
} from "../store/page/selectors";
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
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";
import {
	SelectGroupsCheckbox,
} from "./select-groups-checkbox";

const SummaryInfoCell: FC = () => {
	const reportingStatisticsSummary = useSelector((state: RootState) => {
		return selectReportingStatisticsSummary(state.page);
	});

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

					<ReportedDurationOfNorm
						location="summary-info-cell"
						norm={reportingStatisticsSummary.norm}
						reported={reportingStatisticsSummary.reported}
					/>
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
