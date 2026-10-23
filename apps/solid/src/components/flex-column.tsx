import { type ComponentProps, type JSX } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { flexColumn } from "./flex-column.css";

type FlexColumnProps = ComponentProps<"div">;

const FlexColumn = (props: FlexColumnProps): JSX.Element => {
	return <div {...props} class={getClass([props.class, flexColumn])} />;
};

export { FlexColumn };
