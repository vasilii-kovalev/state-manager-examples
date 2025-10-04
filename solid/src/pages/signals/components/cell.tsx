import {
	type Accessor,
	type Component,
	type ComponentProps,
} from "solid-js";

import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	getIsWeekend,
} from "@/features/dates-and-time/utilities/get-is-weekend";
import {
	getClass,
} from "@/utilities/get-class";
import {
	isUndefined,
} from "@/utilities/is-undefined";

interface CellProps extends ComponentProps<"td"> {
	date?: DateString;
}

const Cell: Component<CellProps> = (
	props,
) => {
	const isDateCell: Accessor<boolean> = () => {
		return !isUndefined(props.date);
	};

	return (
		<td
			{...props}
			class={
				getClass([
					"cell",
					[
						isDateCell(),
						"bg-gray-50",
					],
					[
						(
							isDateCell()
							// @ts-expect-error `undefined` is checked in `isDateCell`.
							&& getIsWeekend(props.date)
						),
						"bg-weekend",
					],
					props.class,
				])
			}
		/>
	);
};

export {
	Cell,
};
