import {
	isUndefined,
} from "es-toolkit";
import {
	type FC,
} from "react";

import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	formatDuration,
} from "@/features/dates-and-time/utilities/format-duration";

interface TotalDurationProps {
	duration: Duration | undefined;
}

const TotalDuration: FC<TotalDurationProps> = ({
	duration,
}) => {
	if (
		isUndefined(duration)
		|| duration === 0
	) {
		return null;
	}

	return (
		<span>
			{formatDuration(duration)}
		</span>
	);
};

export {
	TotalDuration,
};
