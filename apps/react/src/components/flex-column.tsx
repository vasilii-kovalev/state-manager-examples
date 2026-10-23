import { type ComponentProps, type ReactNode } from "react";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { flexColumn } from "./flex-column.css";

type FlexColumnProps = ComponentProps<"div">;

const FlexColumn = (props: FlexColumnProps): ReactNode => {
	const { className } = props;

	return <div {...props} className={buildClass(className, flexColumn)} />;
};

export { FlexColumn };
