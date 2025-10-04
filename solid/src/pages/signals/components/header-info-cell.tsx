import {
	type Component,
} from "solid-js";

import {
	FlexRow,
} from "@/components/flex-row";

const HeaderInfoCell: Component = () => {
	return (
		<th
			class="cell info-column"
		>
			<FlexRow>
				<div
					class="m-is-54 flex-inline shrink-0"
				>
					<span
						class="w-18 text-end"
					>
						Reported
					</span>

					{" / "}

					<span
						class="w-18 text-start"
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
