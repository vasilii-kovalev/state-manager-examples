import { type ComponentProps, type ReactNode } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { flexColumn } from "./flex-column.css";

type FlexColumnProps = ComponentProps<"div">;

const FlexColumn = (props: FlexColumnProps): ReactNode => {
	const { className } = props;

	return <div {...props} className={getClass([className, flexColumn])} />;
};

export { FlexColumn };
