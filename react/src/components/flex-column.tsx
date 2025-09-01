import {
	type DetailedHTMLProps,
	type FC,
	type HTMLAttributes,
} from "react";

import {
	getClass,
} from "@/utilities/get-class";

type FlexColumnProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

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
