import { type Component } from "solid-js";

import { getClass } from "packages/shared/src/utilities/get-class";

import { FlexRow } from "../../../components/flex-row";
import { cell, infoColumn } from "./cell.css";
import { normLabel, reportedLabel, reportedNorm } from "./header-info-cell.css";

const HeaderInfoCell: Component = () => {
	return (
		<th class={getClass([cell, infoColumn])}>
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
