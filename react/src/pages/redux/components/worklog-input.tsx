import {
	isUndefined,
} from "es-toolkit";
import {
	type ChangeEventHandler,
	type FC,
	useCallback,
	useState,
} from "react";
import {
	safeParse,
} from "valibot";

import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	WorklogInputSchema,
} from "@/pages/schemas";

interface WorklogCellProps {
	duration: Duration | undefined;
}

const WorklogInput: FC<WorklogCellProps> = ({
	duration,
}) => {
	const getInitialDurationLocalValue = useCallback(
		(): string => {
			if (
				isUndefined(duration)
				|| duration === 0
			) {
				return "";
			}

			return duration.toString();
		},
		[
			duration,
		],
	);

	const [
		durationLocal,
		setDurationLocal,
	] = useState<string>(() => {
		return getInitialDurationLocalValue();
	});

	const handleDurationChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const {
			value,
		} = event.target;

		const parsedInput = safeParse(
			WorklogInputSchema,
			value,
		);

		if (!parsedInput.success) {
			return;
		}

		setDurationLocal(parsedInput.output);
	};

	return (
		<input
			inputMode="numeric"
			onChange={handleDurationChange}
			type="text"
			value={durationLocal}
		/>
	);
};

export {
	WorklogInput,
};
