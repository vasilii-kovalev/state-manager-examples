import { type FC, type ReactNode } from "react";

import { type DateString, type Duration } from "packages/shared/src/features/dates-and-time/types";
import { formatDuration } from "packages/shared/src/features/dates-and-time/utilities/format-duration";
import { getClass } from "packages/shared/src/utilities/get-class";

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

const TotalDurationCell: FC<TotalDurationCellProps> = (props) => {
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
						<div {...otherTargetProps} className={getClass([className, totalDurationValue])}>
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
