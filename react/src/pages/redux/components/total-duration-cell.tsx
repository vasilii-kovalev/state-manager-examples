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
	duration: Duration | undefined;
}

const TotalDurationCell: FC<TotalDurationCellProps> = ({
	date,
	location,
	duration = 0,
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
					// Excluding this property from `targetProps`.
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
			// Subtracting 1 padding, because the total duration container has 1 padding.
			className="p-1"
			date={date}
		>
			{renderTotalDuration()}
		</Cell>
	);
};

export {
	TotalDurationCell,
};
