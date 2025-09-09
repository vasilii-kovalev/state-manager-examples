import {
	type FC,
	Fragment,
} from "react";

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
	useApplicationSelector,
} from "../store";
import {
	selectNormTotal,
} from "../store/page/selectors";
import {
	TotalDuration,
} from "./total-duration";

interface ReportedDurationOfNormProps {
	location: string;
	reported: Duration;
}

const ReportedDurationOfNorm: FC<ReportedDurationOfNormProps> = ({
	location,
	reported,
}) => {
	const normTotal = useApplicationSelector((state) => {
		return selectNormTotal(
			state.page,
		);
	});

	return (
		<Tooltip<HTMLDivElement>
			renderBody={() => {
				const percent = normTotal === 0
					? 0
					: (reported / normTotal) * 100;

				return (
					<Fragment>
						{formatDuration(reported)}
						/
						{formatDuration(normTotal)}
						{" "}
						(
						{formatDuration(percent)}
						%)
					</Fragment>
				);
			}}
			renderTarget={({
				className,
				// Excluding this property from `targetProps`.
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				tooltipId,
				...targetProps
			}) => {
				return (
					<div
						{...targetProps}
						className={
							getClass([
								className,
								"flex-inline shrink-0 p-block-1",
							])
						}
					>
						<TotalDuration
							className="w-14 truncate text-end"
							duration={reported}
							shouldRenderZero={true}
						/>

						/

						<TotalDuration
							className="w-14 truncate text-start"
							duration={normTotal}
							shouldRenderZero={true}
						/>
					</div>
				);
			}}
			targetId={`reported-duration-of-norm-${location}`}
		/>
	);
};

export {
	ReportedDurationOfNorm,
};
