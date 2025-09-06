import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type ChangeEventHandler,
	type ReactNode,
} from "react";
import {
	type GenericSchema,
	safeParse,
} from "valibot";

import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	type UseLocalNameResult,
} from "@/hooks/use-local-name";
import {
	getClass,
} from "@/utilities/get-class";

interface NameInputProps<Name extends string> extends UseLocalNameResult {
	name: Name;
	onBlur: (nameNext: Name) => void;
	validationSchema: GenericSchema<string, Name>;
	className?: string;
}

const NameInput = <Name extends string>({
	className,
	name,
	nameLocal,
	onBlur,
	setNameLocal,
	validationSchema,
}: NameInputProps<Name>): ReactNode => {
	const isBusy = useIsBusy();

	const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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
			placeholder={name}
			type="text"
			value={nameLocal}
		/>
	);
};

export {
	NameInput,
};
