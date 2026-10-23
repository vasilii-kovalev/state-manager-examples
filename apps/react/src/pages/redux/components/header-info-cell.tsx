import { type ReactNode } from "react";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { FlexRow } from "../../../components/flex-row";
import { cell, infoColumn } from "./cell.css";
import { normLabel, reportedLabel, reportedNorm } from "./header-info-cell.css";

const HeaderInfoCell = (): ReactNode => {
	return (
		<th className={buildClass(cell, infoColumn)}>
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
