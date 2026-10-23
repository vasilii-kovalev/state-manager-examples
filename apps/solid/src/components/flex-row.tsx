import { type ComponentProps, type JSX } from "solid-js";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { flexRow } from "./flex-row.css";

type FlexRowProps = ComponentProps<"div">;

const FlexRow = (props: FlexRowProps): JSX.Element => {
	return <div {...props} class={buildClass(props.class, flexRow)} />;
};

export { FlexRow };
