import { type Component, type ComponentProps } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { flexRow } from "./flex-row.css";

type FlexRowProps = ComponentProps<"div">;

const FlexRow: Component<FlexRowProps> = (props) => {
	return <div {...props} class={getClass([props.class, flexRow])} />;
};

export { FlexRow };
