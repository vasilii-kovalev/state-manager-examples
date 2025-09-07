import {
	type FC,
	Fragment,
	type ReactNode,
} from "react";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	getClass,
} from "@/utilities/get-class";

interface DuplicatedNameIconProps {
	hasDuplicate: boolean;
	tooltipBodyText: ReactNode;
	tooltipIconId: string;
}

const DuplicatedNameIcon: FC<DuplicatedNameIconProps> = ({
	hasDuplicate,
	tooltipBodyText,
	tooltipIconId,
}) => {
	if (!hasDuplicate) {
		// A placeholder to avoid layout shift.
		return (
			<div
				className="w-5"
			/>
		);
	}

	return (
		<Tooltip<HTMLDivElement>
			renderBody={() => {
				return (
					<Fragment>
						{tooltipBodyText}
					</Fragment>
				);
			}}
			renderTarget={({
				className,
				tooltipId,
				...targetProps
			}) => {
				return (
					<div
						{...targetProps}
						aria-describedby={tooltipId}
						className={
							getClass([
								className,
								"h-5 w-3 flex-inline justify-center p-1",
							])
						}
					>
						!
					</div>
				);
			}}
			targetId={tooltipIconId}
		/>
	);
};

export {
	DuplicatedNameIcon,
};
