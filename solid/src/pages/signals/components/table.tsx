import {
	type Accessor,
	type Component,
	type ComponentProps,
	Show,
} from "solid-js";

import {
	getClass,
} from "@/utilities/get-class";
import {
	isEmpty,
} from "@/utilities/is-empty";

import {
	selectCalendar,
} from "../signals/page/derived";
import {
	GroupRows,
} from "./group-rows";
import {
	HeaderRow,
} from "./header-row";
import {
	SummaryRow,
} from "./summary-row";

const isCalendarEmpty: Accessor<boolean> = () => {
	return isEmpty(selectCalendar());
};

type TableProps = ComponentProps<"table">;

const Table: Component<TableProps> = (
	props,
) => {
	return (
		<Show
			fallback={null}
			when={!isCalendarEmpty()}
		>
			<table
				class={
					getClass([
						props.class,
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
		</Show>
	);
};

export {
	Table,
};
