import {
	type Component,
	type JSX,
	Show,
} from "solid-js";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	getClass,
} from "@/utilities/get-class";

interface DuplicatedNameIconProps {
	hasDuplicate: boolean;
	tooltipBodyText: JSX.Element;
	tooltipIconId: string;
}

const DuplicatedNameIcon: Component<DuplicatedNameIconProps> = (
	props,
) => {
	return (
		<Show
			fallback={(
				// A placeholder to avoid layout shift.
				<div
					class="w-5"
					// TODO: check why UnoCSS doesn't generate this class.
					style={{
						width: "1.25rem",
					}}
				/>
			)}
			when={props.hasDuplicate}
		>
			<Tooltip<HTMLDivElement>
				renderBody={() => {
					return (
						<>
							{props.tooltipBodyText}
						</>
					);
				}}
				renderTarget={(
					targetProps,
				) => {
					return (
						<div
							{...targetProps}
							aria-describedby={targetProps.popoverTarget}
							class={
								getClass([
									targetProps.class,
									"h-5 w-3 flex-inline justify-center p-1",
								])
							}
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

export {
	DuplicatedNameIcon,
};
