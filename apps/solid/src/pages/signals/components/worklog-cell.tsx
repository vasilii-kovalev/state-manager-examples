import { createMemo, type JSX, Show } from "solid-js";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { type DateString, type Duration } from "packages/shared/src/features/dates-and-time/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { selectWorklogsForActivityForDate } from "../signals/page/derived";
import { Cell } from "./cell";
import { flushCell } from "./cell.css";
import { TotalDurationCell } from "./total-duration-cell";
import { WorklogInput } from "./worklog-input";

interface WorklogCellProps {
	activityId: ActivityId;
	date: DateString;
	groupId: GroupId;
	norm: Duration;
}

const WorklogCell = (props: WorklogCellProps): JSX.Element => {
	const worklog = createMemo(() => {
		return selectWorklogsForActivityForDate(props.activityId, props.date);
	});

	return (
		<Show
			fallback={
				<TotalDurationCell
					date={props.date}
					duration={worklog()?.duration}
					location={`worklog-cell-${props.activityId}`}
				/>
			}
			when={props.norm !== 0}
		>
			<Cell class={flushCell}>
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

export { WorklogCell };
