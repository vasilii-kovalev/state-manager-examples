import { type ComponentProps, type JSX } from "solid-js";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { flexColumn } from "./flex-column.css";

type FlexColumnProps = ComponentProps<"div">;

const FlexColumn = (props: FlexColumnProps): JSX.Element => {
	return <div {...props} class={buildClass(props.class, flexColumn)} />;
};

export { FlexColumn };
