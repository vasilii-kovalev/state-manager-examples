import {
	type ChangeEventHandler,
	type FC,
	useState,
} from "react";
import {
	safeParse,
} from "valibot";

import {
	type ActivityId,
} from "@/features/activity/types";
import {
	DurationSchema,
} from "@/features/dates-and-time/schemas";
import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type GroupId,
} from "@/features/group/types";
import {
	WorklogInputSchema,
} from "@/features/page/schemas";
import {
	getNewWorklog,
} from "@/features/page/utilities/get-new-worklog";
import {
	type WorklogId,
} from "@/features/worklog/types";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	useApplicationDispatch,
} from "../store";
import {
	addWorklog,
	removeWorklog,
	updateWorklogDuration,
} from "../store/page/slice";

const getInitialDurationLocalValue = (
	duration: Duration | undefined,
): string => {
	if (
		isUndefined(duration)
		|| duration === 0
	) {
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

const WorklogInput: FC<WorklogCellProps> = (
	props,
) => {
	const {
		activityId,
		date,
		duration,
		id,
		groupId,
	} = props;

	const dispatch = useApplicationDispatch();

	const isBusy = useIsBusy();

	const [
		durationLocal,
		setDurationLocal,
	] = useState<string>(() => {
		return getInitialDurationLocalValue(duration);
	});

	const handleDurationChange: ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const parsedInput = safeParse(
			WorklogInputSchema,
			event.target.value,
		);

		if (!parsedInput.success) {
			return;
		}

		setDurationLocal(parsedInput.output);
	};

	const handleBlur = (): void => {
		const numberDuration = Number(durationLocal);
		const durationNextParseResult = safeParse(
			DurationSchema,
			numberDuration,
		);

		if (!durationNextParseResult.success) {
			return;
		}

		const durationNext = durationNextParseResult.output;

		if (!isUndefined(id)) {
			if (durationNext === 0) {
				dispatch(removeWorklog(id));
			} else if (duration !== durationNext) {
				dispatch(
					updateWorklogDuration({
						duration: durationNext,
						id,
					}),
				);
			}
		} else if (durationNext > 0) {
			const newWorklog = getNewWorklog({
				activityId,
				date,
				duration: durationNext,
				groupId,
			});

			dispatch(addWorklog(newWorklog));
		}

		/*
			Sets the value with unnecessary parts stripped out.
			For example, if the user typed in "1.00", it will be set to "1".
		*/
		setDurationLocal(getInitialDurationLocalValue(durationNext));
	};

	return (
		<input
			className="control h-full w-full b-0 text-center"
			disabled={isBusy}
			inputMode="numeric"
			onBlur={handleBlur}
			onChange={handleDurationChange}
			type="text"
			value={durationLocal}
		/>
	);
};

export {
	WorklogInput,
};
