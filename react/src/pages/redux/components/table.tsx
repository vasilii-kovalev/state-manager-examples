import {
	type ComponentProps,
	type FC,
} from "react";

import {
	getClass,
} from "@/utilities/get-class";
import {
	isEmpty,
} from "@/utilities/is-empty";

import {
	useApplicationSelector,
} from "../store";
import {
	selectCalendar,
} from "../store/page/selectors";
import {
	GroupRows,
} from "./group-rows";
import {
	HeaderRow,
} from "./header-row";
import {
	SummaryRow,
} from "./summary-row";

type TableProps = ComponentProps<"table">;

const Table: FC<TableProps> = (
	props,
) => {
	const {
		className,
	} = props;

	const calendar = useApplicationSelector((
		state,
	) => {
		return selectCalendar(state.page);
	});

	if (isEmpty(calendar)) {
		return null;
	}

	return (
		<table
			className={
				getClass([
					className,
					"w-full b-collapse",
				])
			}
		>
			<thead>
				<HeaderRow/>
			</thead>

			<tbody>
				<SummaryRow/>
				<GroupRows/>
			</tbody>
		</table>
	);
};

export {
	Table,
};
