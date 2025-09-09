import {
	type ComponentProps,
	type FC,
} from "react";

import {
	getClass,
} from "@/utilities/get-class";

type FlexColumnProps = ComponentProps<"div">;

const FlexColumn: FC<FlexColumnProps> = (props) => {
	const {
		className,
	} = props;

	return (
		<div
			{...props}
			className={
				getClass([
					className,
					"flex flex-col",
				])
			}
		/>
	);
};

export {
	FlexColumn,
};
