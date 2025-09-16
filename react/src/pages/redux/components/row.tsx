import {
	type FC,
	type PropsWithChildren,
} from "react";

const Row: FC<PropsWithChildren> = (
	props,
) => {
	const {
		children,
	} = props;

	return (
		<tr>
			{children}
		</tr>
	);
};

export {
	Row,
};
