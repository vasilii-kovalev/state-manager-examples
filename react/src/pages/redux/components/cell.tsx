import {
	type FC,
	type PropsWithChildren,
} from "react";

const Cell: FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<td>
			{children}
		</td>
	);
};

export {
	Cell,
};
