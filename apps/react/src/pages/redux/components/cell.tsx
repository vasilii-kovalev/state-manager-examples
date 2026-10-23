import { type ComponentProps, type ReactNode } from "react";

import { type DateString } from "packages/shared/src/features/dates-and-time/types";
import { getIsWeekend } from "packages/shared/src/features/dates-and-time/utilities/get-is-weekend";
import { buildClass } from "packages/shared/src/utilities/build-class";
import { isUndefined } from "packages/shared/src/utilities/is-undefined";

import { cell, dateCell, weekendCell } from "./cell.css";

interface CellProps extends ComponentProps<"td"> {
	date?: DateString;
}

const Cell = (props: CellProps): ReactNode => {
	const { className, date } = props;

	const isDateCell = !isUndefined(date);

	return (
		<td
			{...props}
			className={buildClass(
				cell,
				{
					[dateCell]: isDateCell,
					[weekendCell]: isDateCell && getIsWeekend(date),
				},
				className,
			)}
		/>
	);
};

export { Cell };
