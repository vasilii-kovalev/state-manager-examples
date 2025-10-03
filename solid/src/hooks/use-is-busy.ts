import {
	useIsFetching,
	useIsMutating,
} from "@tanstack/solid-query";
import {
	type Accessor,
} from "solid-js";

const useIsBusy = (): Accessor<boolean> => {
	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	const isBusy: Accessor<boolean> = () => {
		return (
			isFetching() > 0
			|| isMutating() > 0
		);
	};

	return isBusy;
};

export {
	useIsBusy,
};
