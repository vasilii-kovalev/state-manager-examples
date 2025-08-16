import {
	type FC,
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
	return (
		<span>
			{duration}
		</span>
	);
};

export {
	WorklogInput,
};
