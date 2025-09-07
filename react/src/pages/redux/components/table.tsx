import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type DetailedHTMLProps,
	type FC,
	type HTMLAttributes,
} from "react";

import {
	getClass,
} from "@/utilities/get-class";

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

type TableProps = DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>;

const Table: FC<TableProps> = ({
	className,
}) => {
	const calendar = useApplicationSelector((state) => {
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
