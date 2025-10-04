import {
	type Component,
	type JSX,
	mergeProps,
} from "solid-js";

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

const TotalDurationCell: Component<TotalDurationCellProps> = (
	props,
) => {
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
				renderTarget={(
					targetProps,
				) => {
					return (
						<div
							{...targetProps}
							class={
								getClass([
									targetProps.class,
									"max-w-12 truncate p-1",
								])
							}
						>
							<TotalDuration
								duration={mergedProps.duration}
							/>
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
			class="p-1"
			date={mergedProps.date}
		>
			{renderTotalDuration()}
		</Cell>
	);
};

export {
	TotalDurationCell,
};
