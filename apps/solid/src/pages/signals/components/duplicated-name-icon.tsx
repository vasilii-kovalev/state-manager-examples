import { type Component, type JSX, Show } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { duplicateIcon, duplicatePlaceholder } from "./duplicated-name-icon.css";

interface DuplicatedNameIconProps {
	hasDuplicate: boolean;
	tooltipBodyText: JSX.Element;
	tooltipIconId: string;
}

const DuplicatedNameIcon: Component<DuplicatedNameIconProps> = (props) => {
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
							class={getClass([targetProps.class, duplicateIcon])}
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
