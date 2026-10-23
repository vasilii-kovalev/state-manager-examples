import { type JSX, Show } from "solid-js";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { duplicateIcon, duplicatePlaceholder } from "./duplicated-name-icon.css";

interface DuplicatedNameIconProps {
	hasDuplicate: boolean;
	tooltipBodyText: JSX.Element;
	tooltipIconId: string;
}

const DuplicatedNameIcon = (props: DuplicatedNameIconProps): JSX.Element => {
	return (
		<Show
			fallback={
				// A placeholder to avoid layout shift.
				<div class={duplicatePlaceholder} />
			}
			when={props.hasDuplicate}
		>
			<Tooltip<HTMLDivElement>
				renderBody={() => {
					return <>{props.tooltipBodyText}</>;
				}}
				renderTarget={(targetProps) => {
					return (
						<div
							{...targetProps}
							aria-describedby={targetProps.popoverTarget}
							class={buildClass(targetProps.class, duplicateIcon)}
						>
							!
						</div>
					);
				}}
				targetId={props.tooltipIconId}
			/>
		</Show>
	);
};

export { DuplicatedNameIcon };
