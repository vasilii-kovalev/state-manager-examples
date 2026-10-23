import { type Component, type ComponentProps } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { flexColumn } from "./flex-column.css";

type FlexColumnProps = ComponentProps<"div">;

const FlexColumn: Component<FlexColumnProps> = (props) => {
	return <div {...props} class={getClass([props.class, flexColumn])} />;
};

export { FlexColumn };
