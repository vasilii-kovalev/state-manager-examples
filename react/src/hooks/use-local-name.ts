import {
	type Dispatch,
	type SetStateAction,
	useState,
} from "react";

interface UseLocalNameResult {
	nameLocal: string;
	setNameLocal: Dispatch<SetStateAction<string>>;
}

const useLocalName = (
	name: string,
): UseLocalNameResult => {
	const [
		nameLocal,
		setNameLocal,
	] = useState<string>(name);

	return {
		nameLocal,
		setNameLocal,
	};
};

export {
	useLocalName,
	type UseLocalNameResult,
};
