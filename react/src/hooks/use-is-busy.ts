import {
	useIsFetching,
	useIsMutating,
} from "@tanstack/react-query";

const useIsBusy = (): boolean => {
	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	return (
		isFetching > 0
		|| isMutating > 0
	);
};

export {
	useIsBusy,
};
