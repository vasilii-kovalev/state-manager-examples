import {
	type Component,
	createEffect,
	type JSX,
} from "solid-js";

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
	isUndefined,
} from "@/utilities/is-undefined";

interface SelectEntityCheckboxProps {
	isDisabled: boolean;
	onSelectionChange: (
		isSelectedNext: boolean,
	) => void;
	selectionState: EntitySelectionState;
}

const SelectEntityCheckbox: Component<SelectEntityCheckboxProps> = (
	props,
) => {
	// `ref` should be modifiable.
	// eslint-disable-next-line prefer-const
	let ref = undefined as HTMLInputElement | undefined;

	const isBusy = useIsBusy();

	const handleSelectionChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (
		event,
	) => {
		props.onSelectionChange(event.target.checked);
	};

	createEffect(() => {
		if (!isUndefined(ref)) {
			ref.indeterminate = props.selectionState === ENTITY_SELECTION_STATE.INDETERMINATE;
		}
	});

	return (
		<input
			checked={props.selectionState === ENTITY_SELECTION_STATE.SELECTED}
			class="control"
			disabled={
				props.isDisabled
				|| isBusy()
			}
			onChange={handleSelectionChange}
			ref={ref}
			type="checkbox"
		/>
	);
};

export {
	SelectEntityCheckbox,
};
