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
		<span>
			<TotalDuration
				duration={reported}
				shouldRenderZero={true}
			/>

			{" / "}

			<TotalDuration
				duration={norm}
				shouldRenderZero={true}
			/>
		</span>
	);
};

export {
	ReportedDurationOfNorm,
};
