import {
	type FC,
	type ReactNode,
} from "react";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";
import {
	formatDuration,
} from "@/features/dates-and-time/utilities/format-duration";
import {
	getIsWeekend,
} from "@/features/dates-and-time/utilities/get-is-weekend";
import {
	getClass,
} from "@/utilities/get-class";

import {
	Cell,
} from "./cell";
import {
	TotalDuration,
} from "./total-duration";

interface TotalDurationCellProps {
	date: DateString;
	location: string;
	duration: Duration;
}

const TotalDurationCell: FC<TotalDurationCellProps> = ({
	date,
	location,
	duration,
}) => {
	const renderTotalDuration = (): ReactNode => {
		if (duration === 0) {
			return null;
		}

		return (
			<Tooltip<HTMLDivElement>
				renderBody={() => {
					return formatDuration(duration);
				}}
				renderTarget={({
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					tooltipId,
					className,
					...targetProps
				}) => {
					return (
						<div
							{...targetProps}
							className={
								getClass([
									className,
									"max-w-12 truncate p-1",
								])
							}
							tabIndex={0}
						>
							<TotalDuration
								duration={duration}
							/>
						</div>
					);
				}}
				targetId={`total-duration-cell-${date}-${location}`}
			/>
		);
	};

	return (
		<Cell
			className={
				getClass([
					// Subtracting 1 padding, because the total duration container has 1 padding.
					"bg-gray-50 p-1",
					[
						getIsWeekend(date),
						/*
							`!important` is required, because shortcuts have less specificity.
							If a higher specificity is set in the UnoCSS config in `layers`,
							the default classes won't be able to override shortcuts in other places.
							So this is a lesser evil.
						*/
						"!bg-weekend",
					],
				])
			}
		>
			{renderTotalDuration()}
		</Cell>
	);
};

export {
	TotalDurationCell,
};
