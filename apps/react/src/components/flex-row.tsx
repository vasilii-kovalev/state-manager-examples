import { type ComponentProps, type FC } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { flexRow } from "./flex-row.css";

type FlexRowProps = ComponentProps<"div">;

const FlexRow: FC<FlexRowProps> = (props) => {
	const { className } = props;

	return <div {...props} className={getClass([className, flexRow])} />;
};

export { FlexRow };
