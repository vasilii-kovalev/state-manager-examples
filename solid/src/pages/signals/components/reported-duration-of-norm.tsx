import {
	type Component,
	createMemo,
} from "solid-js";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	type Duration,
} from "@/features/dates-and-time/types";
import {
	formatDuration,
} from "@/features/dates-and-time/utilities/format-duration";
import {
	getClass,
} from "@/utilities/get-class";

import {
	selectNormTotal,
} from "../signals/page/derived";
import {
	TotalDuration,
} from "./total-duration";

interface ReportedDurationOfNormProps {
	location: string;
	reported: Duration;
}

const ReportedDurationOfNorm: Component<ReportedDurationOfNormProps> = (
	props,
) => {
	const normTotal = createMemo(() => {
		return selectNormTotal();
	});

	return (
		<Tooltip<HTMLDivElement>
			renderBody={() => {
				const percent = normTotal() === 0
					? 0
					: (props.reported / normTotal()) * 100;

				return (
					<>
						{formatDuration(props.reported)}
						/
						{formatDuration(normTotal())}
						{" "}
						(
						{formatDuration(percent)}
						%)
					</>
				);
			}}
			renderTarget={(
				targetProps,
			) => {
				return (
					<div
						{...targetProps}
						class={
							getClass([
								targetProps.class,
								"flex-inline shrink-0 p-block-1",
							])
						}
					>
						<TotalDuration
							class="w-14 truncate text-end"
							duration={props.reported}
							shouldRenderZero={true}
						/>

						/

						<TotalDuration
							class="w-14 truncate text-start"
							duration={normTotal()}
							shouldRenderZero={true}
						/>
					</div>
				);
			}}
			targetId={`reported-duration-of-norm-${props.location}`}
		/>
	);
};

export {
	ReportedDurationOfNorm,
};
