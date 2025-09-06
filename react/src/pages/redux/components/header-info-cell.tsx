import {
	type FC,
} from "react";

import {
	FlexRow,
} from "@/components/flex-row";

const HeaderInfoCell: FC = () => {
	return (
		<th
			className="cell info-column"
		>
			<FlexRow>
				<div
					className="m-is-54 flex-inline shrink-0"
				>
					<span
						className="w-18 text-end"
					>
						Reported
					</span>

					{" / "}

					<span
						className="w-18 text-start"
					>
						Norm
					</span>
				</div>
			</FlexRow>
		</th>
	);
};

export {
	HeaderInfoCell,
};
