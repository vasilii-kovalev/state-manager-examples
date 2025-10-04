import {
	type Component,
	type ComponentProps,
} from "solid-js";

import {
	getClass,
} from "@/utilities/get-class";

type FlexColumnProps = ComponentProps<"div">;

const FlexColumn: Component<FlexColumnProps> = (
	props,
) => {
	return (
		<div
			{...props}
			class={
				getClass([
					props.class,
					"flex flex-col",
				])
			}
		/>
	);
};

export {
	FlexColumn,
};
