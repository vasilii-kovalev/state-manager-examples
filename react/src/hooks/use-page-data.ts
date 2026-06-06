import {
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	useEffect,
	useEffectEvent,
} from "react";

import {
	QUERY_KEYS,
} from "@/constants";
import {
	type PageData,
} from "@/features/page/types";
import {
	getPageData,
} from "@/features/page/utilities/get-page-data";
import {
	isUndefined,
} from "@/utilities/is-undefined";

interface UsePageDataParams {
	onSuccess: (
		pageData: PageData,
	) => void;
}

const usePageData = (
	params: UsePageDataParams,
): void => {
	const {
		onSuccess,
	} = params;

	const queryClient = useQueryClient();

	const {
		data: pageData,
	} = useQuery({
		queryFn: async () => {
			return await getPageData();
		},
		queryKey: [
			QUERY_KEYS.PAGE_DATA,
		],
	});

	const onSuccessEvent = useEffectEvent(onSuccess);

	useEffect(
		() => {
			if (!isUndefined(pageData)) {
				onSuccessEvent(pageData);
			}
		},
		[
			pageData,
		],
	);

	useEffect(
		() => {
			return () => {
				queryClient.clear();
			};
		},
		[],
	);
};

export {
	usePageData,
};
