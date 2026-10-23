import { createMemo, type JSX } from "solid-js";

import { type Duration } from "packages/shared/src/features/dates-and-time/types";
import { formatDuration } from "packages/shared/src/features/dates-and-time/utilities/format-duration";
import { REPORTED_TO_NORM_PERCENT_SCALE } from "packages/shared/src/features/page/constants";
import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { selectNormTotal } from "../signals/page/derived";
import { normValue, reportedDuration, reportedValue } from "./reported-duration-of-norm.css";
import { TotalDuration } from "./total-duration";

interface ReportedDurationOfNormProps {
	location: string;
	reported: Duration;
}

const ReportedDurationOfNorm = (props: ReportedDurationOfNormProps): JSX.Element => {
	const normTotal = createMemo(() => {
		return selectNormTotal();
	});

	return (
		<Tooltip<HTMLDivElement>
			renderBody={() => {
				const percent = normTotal() === 0 ? 0 : (props.reported / normTotal()) * REPORTED_TO_NORM_PERCENT_SCALE;

				return (
					<>
						{formatDuration(props.reported)}/{formatDuration(normTotal())} ({formatDuration(percent)}%)
					</>
				);
			}}
			renderTarget={(targetProps) => {
				return (
					<div {...targetProps} class={buildClass(targetProps.class, reportedDuration)}>
						<TotalDuration class={reportedValue} duration={props.reported} shouldRenderZero={true} />
						/
						<TotalDuration class={normValue} duration={normTotal()} shouldRenderZero={true} />
					</div>
				);
			}}
			targetId={`reported-duration-of-norm-${props.location}`}
		/>
	);
};

export { ReportedDurationOfNorm };
