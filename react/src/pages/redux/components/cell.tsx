import {
	isUndefined,
} from "es-toolkit";
import {
	type DetailedHTMLProps,
	type FC,
	type HTMLAttributes,
} from "react";

import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	getIsWeekend,
} from "@/features/dates-and-time/utilities/get-is-weekend";
import {
	getClass,
} from "@/utilities/get-class";

interface CellProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
	date?: DateString;
}

const Cell: FC<CellProps> = (
	props,
) => {
	const {
		className,
		date,
	} = props;

	const isDateCell = !isUndefined(date);

	return (
		<td
			{...props}
			className={
				getClass([
					"cell",
					[
						isDateCell,
						"bg-gray-50",
					],
					[
						(
							isDateCell
							&& getIsWeekend(date)
						),
						"bg-weekend",
					],
					className,
				])
			}
		/>
	);
};

export {
	Cell,
};
