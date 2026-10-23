import { createEffect, type JSX } from "solid-js";

import { ENTITY_SELECTION_STATE } from "packages/shared/src/features/page/constants";
import { type EntitySelectionState } from "packages/shared/src/features/page/types";
import { isUndefined } from "packages/shared/src/utilities/is-undefined";

import { useIsBusy } from "../hooks/use-is-busy";
import { control } from "../styles/control.css";

interface SelectEntityCheckboxProps {
	isDisabled: boolean;
	onSelectionChange: (isSelectedNext: boolean) => void;
	selectionState: EntitySelectionState;
}

const SelectEntityCheckbox = (props: SelectEntityCheckboxProps): JSX.Element => {
	// `ref` should be modifiable.
	// eslint-disable-next-line prefer-const
	let ref = undefined as HTMLInputElement | undefined;

	const isBusy = useIsBusy();

	const handleSelectionChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (event) => {
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
			class={control}
			disabled={props.isDisabled || isBusy()}
			onChange={handleSelectionChange}
			ref={ref}
			type="checkbox"
		/>
	);
};

export { SelectEntityCheckbox };
