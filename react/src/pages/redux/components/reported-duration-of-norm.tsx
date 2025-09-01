import {
	type FC,
} from "react";

import {
	type Duration,
} from "@/features/dates-and-time/types";

import {
	TotalDuration,
} from "./total-duration";

interface ReportedDurationOfNormProps {
	norm: Duration;
	reported: Duration;
}

const ReportedDurationOfNorm: FC<ReportedDurationOfNormProps> = ({
	norm,
	reported,
}) => {
	return (
		<div
			className="flex-inline shrink-0"
		>
			<TotalDuration
				className="w-14 text-end"
				duration={reported}
				shouldRenderZero={true}
			/>

			{" / "}

			<TotalDuration
				className="w-14 text-start"
				duration={norm}
				shouldRenderZero={true}
			/>
		</div>
	);
};

export {
	ReportedDurationOfNorm,
};
