import { type JSX, mergeProps } from "solid-js";

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

const TotalDurationCell = (props: TotalDurationCellProps): JSX.Element => {
	const mergedProps = mergeProps(
		{
			duration: 0,
		},
		props,
	);

	const renderTotalDuration = (): JSX.Element => {
		if (mergedProps.duration === 0) {
			return null;
		}

		return (
			<Tooltip<HTMLDivElement>
				renderBody={() => {
					return formatDuration(mergedProps.duration);
				}}
				renderTarget={(targetProps) => {
					return (
						<div {...targetProps} class={buildClass(targetProps.class, totalDurationValue)}>
							<TotalDuration duration={mergedProps.duration} />
						</div>
					);
				}}
				targetId={`total-duration-cell-${mergedProps.date}-${mergedProps.location}`}
			/>
		);
	};

	return (
		<Cell
			// Subtracting 1 padding, because the total duration container has 1 padding.
			class={tightCell}
			date={mergedProps.date}
		>
			{renderTotalDuration()}
		</Cell>
	);
};

export { TotalDurationCell };
