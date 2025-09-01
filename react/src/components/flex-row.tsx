import {
	type DetailedHTMLProps,
	type FC,
	type HTMLAttributes,
} from "react";

import {
	getClass,
} from "@/utilities/get-class";

type FlexRowProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const FlexRow: FC<FlexRowProps> = (props) => {
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
