import { type ReactNode } from "react";

import { getClass } from "packages/shared/src/utilities/get-class";

import { FlexRow } from "../../../components/flex-row";
import { cell, infoColumn } from "./cell.css";
import { normLabel, reportedLabel, reportedNorm } from "./header-info-cell.css";

const HeaderInfoCell = (): ReactNode => {
	return (
		<th className={getClass([cell, infoColumn])}>
			<FlexRow>
				<div className={reportedNorm}>
					<span className={reportedLabel}>Reported</span>
					{" / "}
					<span className={normLabel}>Norm</span>
				</div>
			</FlexRow>
		</th>
	);
};

export { HeaderInfoCell };
