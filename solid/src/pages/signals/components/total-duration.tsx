import {
	type Component,
	mergeProps,
	Show,
} from "solid-js";

import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	formatDuration,
} from "@/features/dates-and-time/utilities/format-duration";

interface TotalDurationProps {
	class?: string;
	duration: Duration;
	shouldRenderZero?: boolean;
}

const TotalDuration: Component<TotalDurationProps> = (
	props,
) => {
	const mergedProps = mergeProps(
		{
			shouldRenderZero: false,
		},
		props,
	);

	return (
		<Show
			fallback={null}
			when={
				mergedProps.duration !== 0
				|| mergedProps.shouldRenderZero
			}
		>
			<span
				class={mergedProps.class}
			>
				{formatDuration(mergedProps.duration)}
			</span>
		</Show>
	);
};

export {
	TotalDuration,
};
