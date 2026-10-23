import { type ComponentProps, type FC } from "react";

import { type DateString } from "packages/shared/src/features/dates-and-time/types";
import { getIsWeekend } from "packages/shared/src/features/dates-and-time/utilities/get-is-weekend";
import { getClass } from "packages/shared/src/utilities/get-class";
import { isUndefined } from "packages/shared/src/utilities/is-undefined";

import { cell, dateCell, weekendCell } from "./cell.css";

interface CellProps extends ComponentProps<"td"> {
	date?: DateString;
}

const Cell: FC<CellProps> = (props) => {
	const { className, date } = props;

	const isDateCell = !isUndefined(date);

	return (
		<td
			{...props}
			className={getClass([cell, [isDateCell, dateCell], [isDateCell && getIsWeekend(date), weekendCell], className])}
		/>
	);
};

export { Cell };
