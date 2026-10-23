import { type ReactNode } from "react";

import { type Duration } from "packages/shared/src/features/dates-and-time/types";
import { formatDuration } from "packages/shared/src/features/dates-and-time/utilities/format-duration";

interface TotalDurationProps {
	className?: string;
	duration: Duration;
	shouldRenderZero?: boolean;
}

const TotalDuration = (props: TotalDurationProps): ReactNode => {
	const { className, duration, shouldRenderZero = false } = props;

	if (duration === 0 && !shouldRenderZero) {
		return null;
	}

	return <span className={className}>{formatDuration(duration)}</span>;
};

export { TotalDuration };
