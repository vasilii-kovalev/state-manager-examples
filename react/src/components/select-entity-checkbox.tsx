import {
	isNull,
} from "es-toolkit";
import {
	type FC,
	useEffect,
	useRef,
} from "react";

import {
	ENTITY_SELECTION_STATE,
} from "@/features/page/constants";
import {
	type EntitySelectionState,
} from "@/features/page/types";

interface SelectEntityCheckboxProps {
	isDisabled: boolean;
	onSelectionChange: (isSelectedNext: boolean) => void;
	selectionState: EntitySelectionState;
}

const SelectEntityCheckbox: FC<SelectEntityCheckboxProps> = ({
	isDisabled,
	selectionState,
	onSelectionChange,
}) => {
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(
		() => {
			if (!isNull(ref.current)) {
				ref.current.indeterminate = selectionState === ENTITY_SELECTION_STATE.INDETERMINATE;
			}
		},
		[
			selectionState,
		],
	);

	return (
		<input
			checked={selectionState === ENTITY_SELECTION_STATE.SELECTED}
			className="control"
			disabled={isDisabled}
			onChange={(event) => {
				onSelectionChange(event.target.checked);
			}}
			ref={ref}
			type="checkbox"
		/>
	);
};

export {
	SelectEntityCheckbox,
};
