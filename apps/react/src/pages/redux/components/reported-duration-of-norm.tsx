import { type FC } from "react";

import { type Duration } from "packages/shared/src/features/dates-and-time/types";
import { formatDuration } from "packages/shared/src/features/dates-and-time/utilities/format-duration";
import { REPORTED_TO_NORM_PERCENT_SCALE } from "packages/shared/src/features/page/constants";
import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useApplicationSelector } from "../store";
import { selectNormTotal } from "../store/page/selectors";
import { normValue, reportedDuration, reportedValue } from "./reported-duration-of-norm.css";
import { TotalDuration } from "./total-duration";

interface ReportedDurationOfNormProps {
	location: string;
	reported: Duration;
}

const ReportedDurationOfNorm: FC<ReportedDurationOfNormProps> = (props) => {
	const { location, reported } = props;

	const normTotal = useApplicationSelector((state) => {
		return selectNormTotal(state.page);
	});

	return (
		<Tooltip<HTMLDivElement>
			renderBody={() => {
				const percent = normTotal === 0 ? 0 : (reported / normTotal) * REPORTED_TO_NORM_PERCENT_SCALE;

				return (
					<>
						{formatDuration(reported)}/{formatDuration(normTotal)} ({formatDuration(percent)}%)
					</>
				);
			}}
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<div {...otherTargetProps} className={getClass([className, reportedDuration])}>
						<TotalDuration className={reportedValue} duration={reported} shouldRenderZero />
						/
						<TotalDuration className={normValue} duration={normTotal} shouldRenderZero />
					</div>
				);
			}}
			targetId={`reported-duration-of-norm-${location}`}
		/>
	);
};

export { ReportedDurationOfNorm };
