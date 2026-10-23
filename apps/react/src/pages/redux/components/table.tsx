import { type ComponentProps, type ReactNode } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";
import { isEmpty } from "packages/shared/src/utilities/is-empty";

import { useApplicationSelector } from "../store";
import { selectCalendar } from "../store/page/selectors";
import { GroupRows } from "./group-rows";
import { HeaderRow } from "./header-row";
import { SummaryRow } from "./summary-row";
import { table } from "./table.css";

type TableProps = ComponentProps<"table">;

const Table = (props: TableProps): ReactNode => {
	const { className } = props;

	const calendar = useApplicationSelector((state) => {
		return selectCalendar(state.page);
	});

	if (isEmpty(calendar)) {
		return null;
	}

	return (
		<table className={getClass([className, table])}>
			<thead>
				<HeaderRow />
			</thead>

			<tbody>
				<SummaryRow />
				<GroupRows />
			</tbody>
		</table>
	);
};

export { Table };
