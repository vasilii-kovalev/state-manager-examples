import {
	type ChangeEventHandler,
	type FC,
	useState,
} from "react";

import {
	type Duration,
} from "@/features/dates-and-time/types";

interface WorklogCellProps {
	duration: Duration;
}

const WorklogInput: FC<WorklogCellProps> = ({
	duration,
}) => {
	const [
		durationLocal,
		setDurationLocal,
	] = useState<string>(() => {
		return duration.toString();
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
