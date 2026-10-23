import { type ComponentProps, type ReactNode } from "react";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { flexRow } from "./flex-row.css";

type FlexRowProps = ComponentProps<"div">;

const FlexRow = (props: FlexRowProps): ReactNode => {
	const { className } = props;

	return <div {...props} className={buildClass(className, flexRow)} />;
};

export { FlexRow };
