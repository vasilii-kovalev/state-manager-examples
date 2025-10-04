import {
	type Accessor,
	type Component,
	Show,
} from "solid-js";

import {
	type ActivityId,
} from "@/features/activity/types";
import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type GroupId,
} from "@/features/group/types";
import {
	type Worklog,
} from "@/features/worklog/types";

import {
	selectWorklogsForActivityForDate,
} from "../signals/page/derived";
import {
	Cell,
} from "./cell";
import {
	TotalDurationCell,
} from "./total-duration-cell";
import {
	WorklogInput,
} from "./worklog-input";

interface WorklogCellProps {
	activityId: ActivityId;
	date: DateString;
	groupId: GroupId;
	norm: Duration;
}

const WorklogCell: Component<WorklogCellProps> = (
	props,
) => {
	const worklog: Accessor<Worklog | undefined> = () => {
		return selectWorklogsForActivityForDate(
			props.activityId,
			props.date,
		);
	};

	return (
		<Show
			fallback={(
				<TotalDurationCell
					date={props.date}
					duration={worklog()?.duration}
					location={`worklog-cell-${props.activityId}`}
				/>
			)}
			when={props.norm !== 0}
		>
			<Cell
				class="p-0"
			>
				<WorklogInput
					activityId={props.activityId}
					date={props.date}
					duration={worklog()?.duration}
					groupId={props.groupId}
					id={worklog()?.id}
				/>
			</Cell>
		</Show>
	);
};

export {
	WorklogCell,
};
