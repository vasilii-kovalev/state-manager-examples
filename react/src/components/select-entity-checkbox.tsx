import {
	type FC,
	useLayoutEffect,
	useRef,
} from "react";

import {
	ENTITY_SELECTION_STATE,
} from "@/features/page/constants";
import {
	type EntitySelectionState,
} from "@/features/page/types";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	isNull,
} from "@/utilities/is-null";

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

	const isBusy = useIsBusy();

	useLayoutEffect(
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
			disabled={
				isDisabled
				|| isBusy
			}
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
