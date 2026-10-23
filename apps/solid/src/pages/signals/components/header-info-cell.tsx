import { type JSX } from "solid-js";

import { buildClass } from "packages/shared/src/utilities/build-class";

import { FlexRow } from "../../../components/flex-row";
import { cell, infoColumn } from "./cell.css";
import { normLabel, reportedLabel, reportedNorm } from "./header-info-cell.css";

const HeaderInfoCell = (): JSX.Element => {
	return (
		<th class={buildClass(cell, infoColumn)}>
			<FlexRow>
				<div class={reportedNorm}>
					<span class={reportedLabel}>Reported</span>
					{" / "}
					<span class={normLabel}>Norm</span>
				</div>
			</FlexRow>
		</th>
	);
};

export { HeaderInfoCell };
