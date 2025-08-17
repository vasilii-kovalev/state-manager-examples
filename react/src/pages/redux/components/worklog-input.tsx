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
	type Duration,
} from "@/features/dates-and-time/types";

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
		setDurationLocal(event.target.value);
	};

	return (
		<input
			onChange={handleDurationChange}
			type="text"
			value={durationLocal}
		/>
	);
};

export {
	WorklogInput,
};
