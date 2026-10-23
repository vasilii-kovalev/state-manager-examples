import { type ComponentProps, type JSX } from "solid-js";

import { type DateString } from "packages/shared/src/features/dates-and-time/types";
import { getIsWeekend } from "packages/shared/src/features/dates-and-time/utilities/get-is-weekend";
import { buildClass } from "packages/shared/src/utilities/build-class";
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
			class={buildClass(
				cell,
				{
					[dateCell]: isDateCell(),
					[weekendCell]:
						isDateCell()
						// @ts-expect-error `undefined` is checked in `isDateCell`.
						&& getIsWeekend(props.date),
				},
				props.class,
			)}
		/>
	);
};

export { Cell };
