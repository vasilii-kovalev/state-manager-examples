import {
	type JSX,
	type Setter,
} from "solid-js";
import {
	type GenericSchema,
	safeParse,
} from "valibot";

import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";
import {
	isEmpty,
} from "@/utilities/is-empty";

interface NameInputProps<Name extends string> {
	class?: string;
	name: Name;
	nameLocal: string;
	onBlur: (
		nameNext: Name,
	) => void;
	placeholder: string;
	setNameLocal: Setter<string>;
	validationSchema: GenericSchema<string, Name>;
}

const NameInput = <Name extends string>(
	props: NameInputProps<Name>,
): JSX.Element => {
	const isBusy = useIsBusy();

	const handleNameChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (
		event,
	) => {
		props.setNameLocal(event.target.value);
	};

	const handleBlur: JSX.EventHandler<HTMLInputElement, FocusEvent> = () => {
		if (isEmpty(props.nameLocal)) {
			// @ts-expect-error The type is correct.
			props.setNameLocal(props.name);

			return;
		}

		const nameNextParseResult = safeParse(
			props.validationSchema,
			props.nameLocal,
		);

		if (!nameNextParseResult.success) {
			return;
		}

		const nameNext = nameNextParseResult.output;

		if (nameNext !== props.name) {
			props.onBlur(nameNext);
		}

		/*
			Sync with local values is necessary because
			the validation schema may contain transformations.
		*/
		// @ts-expect-error The type is correct.
		props.setNameLocal(nameNext);
	};

	return (
		<input
			class={
				getClass([
					"control",
					props.class,
				])
			}
			disabled={isBusy()}
			onBlur={handleBlur}
			onChange={handleNameChange}
			placeholder={props.placeholder}
			type="text"
			value={props.nameLocal}
		/>
	);
};

export {
	NameInput,
};
