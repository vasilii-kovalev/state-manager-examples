import { type ReactNode } from "react";

import { type DateString, type Duration } from "packages/shared/src/features/dates-and-time/types";
import { formatDuration } from "packages/shared/src/features/dates-and-time/utilities/format-duration";
import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { Cell } from "./cell";
import { tightCell } from "./cell.css";
import { TotalDuration } from "./total-duration";
import { totalDurationValue } from "./total-duration-cell.css";

interface TotalDurationCellProps {
	date: DateString;
	location: string;
	duration: Duration | undefined;
}

const TotalDurationCell = (props: TotalDurationCellProps): ReactNode => {
	const { date, location, duration = 0 } = props;

	const renderTotalDuration = (): ReactNode => {
		if (duration === 0) {
			return null;
		}

		return (
			<Tooltip<HTMLDivElement>
				renderBody={() => {
					return formatDuration(duration);
				}}
				renderTarget={(targetProps) => {
					const { className, ...otherTargetProps } = targetProps;

					return (
						<div {...otherTargetProps} className={buildClass(className, totalDurationValue)}>
							<TotalDuration duration={duration} />
						</div>
					);
				}}
				targetId={`total-duration-cell-${date}-${location}`}
			/>
		);
	};

	return (
		<Cell
			// Subtracting 1 padding, because the total duration container has 1 padding.
			className={tightCell}
			date={date}
		>
			{renderTotalDuration()}
		</Cell>
	);
};

export { TotalDurationCell };
