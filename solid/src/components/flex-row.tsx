import {
	type Component,
	type ComponentProps,
} from "solid-js";

import {
	getClass,
} from "@/utilities/get-class";

type FlexRowProps = ComponentProps<"div">;

const FlexRow: Component<FlexRowProps> = (
	props,
) => {
	return (
		<div
			{...props}
			class={
				getClass([
					props.class,
					"flex flex-items-center",
				])
			}
		/>
	);
};

export {
	FlexRow,
};
