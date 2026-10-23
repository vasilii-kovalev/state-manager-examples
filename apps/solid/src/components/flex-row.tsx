import { type ComponentProps, type JSX } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { flexRow } from "./flex-row.css";

type FlexRowProps = ComponentProps<"div">;

const FlexRow = (props: FlexRowProps): JSX.Element => {
	return <div {...props} class={getClass([props.class, flexRow])} />;
};

export { FlexRow };
