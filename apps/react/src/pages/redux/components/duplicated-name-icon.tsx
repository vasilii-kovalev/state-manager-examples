import { type ReactNode } from "react";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { duplicateIcon, duplicatePlaceholder } from "./duplicated-name-icon.css";

interface DuplicatedNameIconProps {
	hasDuplicate: boolean;
	tooltipBodyText: ReactNode;
	tooltipIconId: string;
}

const DuplicatedNameIcon = (props: DuplicatedNameIconProps): ReactNode => {
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
						className={buildClass(className, duplicateIcon)}
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
