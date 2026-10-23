import { type ComponentProps, type ReactNode } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { flexRow } from "./flex-row.css";

type FlexRowProps = ComponentProps<"div">;

const FlexRow = (props: FlexRowProps): ReactNode => {
	const { className } = props;

	return <div {...props} className={getClass([className, flexRow])} />;
};

export { FlexRow };
