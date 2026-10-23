import { type JSX, mergeProps, Show } from "solid-js";

import { type Duration } from "packages/shared/src/features/dates-and-time/types";
import { formatDuration } from "packages/shared/src/features/dates-and-time/utilities/format-duration";

interface TotalDurationProps {
	class?: string;
	duration: Duration;
	shouldRenderZero?: boolean;
}

const TotalDuration = (props: TotalDurationProps): JSX.Element => {
	const mergedProps = mergeProps(
		{
			shouldRenderZero: false,
		},
		props,
	);

	return (
		<Show fallback={null} when={mergedProps.duration !== 0 || mergedProps.shouldRenderZero}>
			<span class={mergedProps.class}>{formatDuration(mergedProps.duration)}</span>
		</Show>
	);
};

export { TotalDuration };
