import {
	type ChangeEventHandler,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";
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
	className?: string;
	name: Name;
	nameLocal: string;
	onBlur: (
		nameNext: Name,
	) => void;
	placeholder: string;
	setNameLocal: Dispatch<SetStateAction<string>>;
	validationSchema: GenericSchema<string, Name>;
}

const NameInput = <Name extends string>({
	className,
	name,
	nameLocal,
	onBlur,
	placeholder,
	setNameLocal,
	validationSchema,
}: NameInputProps<Name>): ReactNode => {
	const isBusy = useIsBusy();

	const handleNameChange: ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		setNameLocal(event.target.value);
	};

	const handleBlur = (): void => {
		if (isEmpty(nameLocal)) {
			setNameLocal(name);

			return;
		}

		const nameNextParseResult = safeParse(
			validationSchema,
			nameLocal,
		);

		if (!nameNextParseResult.success) {
			return;
		}

		const nameNext = nameNextParseResult.output;

		if (nameNext !== name) {
			onBlur(nameNext);
		}

		/*
			Sync with local values is necessary because
			the validation schema may contain transformations.
		*/
		setNameLocal(nameNext);
	};

	return (
		<input
			className={
				getClass([
					"control",
					className,
				])
			}
			disabled={isBusy}
			onBlur={handleBlur}
			onChange={handleNameChange}
			placeholder={placeholder}
			type="text"
			value={nameLocal}
		/>
	);
};

export {
	NameInput,
};
