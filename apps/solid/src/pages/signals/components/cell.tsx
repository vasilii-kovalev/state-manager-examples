import { type ComponentProps, type JSX } from "solid-js";

import { type DateString } from "packages/shared/src/features/dates-and-time/types";
import { getIsWeekend } from "packages/shared/src/features/dates-and-time/utilities/get-is-weekend";
import { getClass } from "packages/shared/src/utilities/get-class";
import { isUndefined } from "packages/shared/src/utilities/is-undefined";

import { cell, dateCell, weekendCell } from "./cell.css";

interface CellProps extends ComponentProps<"td"> {
	date?: DateString;
}

const Cell = (props: CellProps): JSX.Element => {
	const isDateCell = (): boolean => {
		return !isUndefined(props.date);
	};

	return (
		<td
			{...props}
			class={getClass([
				cell,
				[isDateCell(), dateCell],
				[
					isDateCell()
						// @ts-expect-error `undefined` is checked in `isDateCell`.
						&& getIsWeekend(props.date),
					weekendCell,
				],
				props.class,
			])}
		/>
	);
};

export { Cell };
