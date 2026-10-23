import { createEffect, createSignal, type JSX } from "solid-js";
import { safeParse } from "valibot";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { DurationSchema } from "packages/shared/src/features/dates-and-time/schemas";
import { type DateString, type Duration } from "packages/shared/src/features/dates-and-time/types";
import { type GroupId } from "packages/shared/src/features/group/types";
import { WorklogInputSchema } from "packages/shared/src/features/page/schemas";
import { getNewWorklog } from "packages/shared/src/features/page/utilities/get-new-worklog";
import { type WorklogId } from "packages/shared/src/features/worklog/types";
import { buildClass } from "packages/shared/src/utilities/build-class";
import { isUndefined } from "packages/shared/src/utilities/is-undefined";

import { useIsBusy } from "../../../hooks/use-is-busy";
import { borderlessControl, control } from "../../../styles/control.css";
import { addWorklog } from "../utilities/add-worklog";
import { removeWorklog } from "../utilities/remove-worklog";
import { updateWorklogDuration } from "../utilities/update-worklog-duration";
import { worklogInput } from "./worklog-input.css";

const getInitialDurationLocalValue = (duration?: Duration): string => {
	if (isUndefined(duration) || duration === 0) {
		return "";
	}

	return duration.toString();
};

interface WorklogCellProps {
	activityId: ActivityId;
	date: DateString;
	duration: Duration | undefined;
	id: WorklogId | undefined;
	groupId: GroupId;
}

const WorklogInput = (props: WorklogCellProps): JSX.Element => {
	const isBusy = useIsBusy();

	const [durationLocal, setDurationLocal] = createSignal<string>(getInitialDurationLocalValue());

	createEffect(() => {
		setDurationLocal(getInitialDurationLocalValue(props.duration));
	});

	const handleDurationChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (event) => {
		const parsedInput = safeParse(WorklogInputSchema, event.target.value);

		if (!parsedInput.success) {
			return;
		}

		setDurationLocal(parsedInput.output);
	};

	const handleBlur = (): void => {
		const numberDuration = Number(durationLocal());
		const durationNextParseResult = safeParse(DurationSchema, numberDuration);

		if (!durationNextParseResult.success) {
			return;
		}

		const durationNext = durationNextParseResult.output;

		if (!isUndefined(props.id)) {
			if (durationNext === 0) {
				removeWorklog(props.id);
			} else if (props.duration !== durationNext) {
				updateWorklogDuration({
					duration: durationNext,
					id: props.id,
				});
			}
		} else if (durationNext > 0) {
			const worklogNew = getNewWorklog({
				activityId: props.activityId,
				date: props.date,
				duration: durationNext,
				groupId: props.groupId,
			});

			addWorklog(worklogNew);
		}

		/*
			Sets the value with unnecessary parts stripped out.
			For example, if the user typed in "1.00", it will be set to "1".
		*/
		setDurationLocal(getInitialDurationLocalValue(durationNext));
	};

	return (
		<input
			class={buildClass(control, borderlessControl, worklogInput)}
			disabled={isBusy()}
			inputMode="numeric"
			onBlur={handleBlur}
			onChange={handleDurationChange}
			type="text"
			value={durationLocal()}
		/>
	);
};

export { WorklogInput };
