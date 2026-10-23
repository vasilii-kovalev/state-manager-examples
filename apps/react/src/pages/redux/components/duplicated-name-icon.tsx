import { type FC, type ReactNode } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { duplicateIcon, duplicatePlaceholder } from "./duplicated-name-icon.css";

interface DuplicatedNameIconProps {
	hasDuplicate: boolean;
	tooltipBodyText: ReactNode;
	tooltipIconId: string;
}

const DuplicatedNameIcon: FC<DuplicatedNameIconProps> = (props) => {
	const { hasDuplicate, tooltipBodyText, tooltipIconId } = props;

	if (!hasDuplicate) {
		// A placeholder to avoid layout shift.
		return <div className={duplicatePlaceholder} />;
	}

	return (
		<Tooltip<HTMLDivElement>
			renderBody={(): ReactNode => {
				return tooltipBodyText;
			}}
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<div
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={getClass([className, duplicateIcon])}
					>
						!
					</div>
				);
			}}
			targetId={tooltipIconId}
		/>
	);
};

export { DuplicatedNameIcon };
