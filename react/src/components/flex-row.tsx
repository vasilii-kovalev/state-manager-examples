import {
	type ComponentProps,
	type FC,
} from "react";

import {
	getClass,
} from "@/utilities/get-class";

type FlexRowProps = ComponentProps<"div">;

const FlexRow: FC<FlexRowProps> = (
	props,
) => {
	const {
		className,
	} = props;

	return (
		<div
			{...props}
			className={
				getClass([
					className,
					"flex flex-items-center",
				])
			}
		/>
	);
};

export {
	FlexRow,
};
