import {
	useQuery,
	useQueryClient,
} from "@tanstack/solid-query";
import {
	createEffect,
	onCleanup,
} from "solid-js";

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

	const getPageDataQuery = useQuery(() => {
		return {
			queryFn: async () => {
				return await getPageData();
			},
			queryKey: [
				QUERY_KEYS.PAGE_DATA,
			],
		};
	});

	createEffect(() => {
		if (!isUndefined(getPageDataQuery.data)) {
			onSuccess(getPageDataQuery.data);
		}
	});

	onCleanup(() => {
		queryClient.clear();
	});
};

export {
	usePageData,
};
