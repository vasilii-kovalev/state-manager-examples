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
	shouldRenderZero?: boolean;
}

const TotalDuration: FC<TotalDurationProps> = ({
	duration,
	shouldRenderZero = false,
}) => {
	if (
		isUndefined(duration)
		|| (
			duration === 0
			&& !shouldRenderZero
		)
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
