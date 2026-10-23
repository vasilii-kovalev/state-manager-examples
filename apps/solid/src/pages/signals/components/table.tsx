import { type ComponentProps, type JSX, Show } from "solid-js";

import { buildClass } from "packages/shared/src/utilities/build-class";
import { isEmpty } from "packages/shared/src/utilities/is-empty";

import { selectCalendar } from "../signals/page/derived";
import { GroupRows } from "./group-rows";
import { HeaderRow } from "./header-row";
import { SummaryRow } from "./summary-row";
import { table } from "./table.css";

const isCalendarEmpty = (): boolean => {
	return isEmpty(selectCalendar());
};

type TableProps = ComponentProps<"table">;

const Table = (props: TableProps): JSX.Element => {
	return (
		<Show fallback={null} when={!isCalendarEmpty()}>
			<table class={buildClass(props.class, table)}>
				<thead>
					<HeaderRow />
				</thead>

				<tbody>
					<SummaryRow />
					<GroupRows />
				</tbody>
			</table>
		</Show>
	);
};

export { Table };
