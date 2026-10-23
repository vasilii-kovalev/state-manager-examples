import { useQuery, useQueryClient } from "@tanstack/solid-query";
import { createEffect, onCleanup } from "solid-js";

import { QUERY_KEYS } from "packages/shared/src/constants";
import { type PageData } from "packages/shared/src/features/page/types";
import { getPageData } from "packages/shared/src/features/page/utilities/get-page-data";
import { isUndefined } from "packages/shared/src/utilities/is-undefined";

interface UsePageDataParams {
	onSuccess: (pageData: PageData) => void;
}

const usePageData = (params: UsePageDataParams): void => {
	const { onSuccess } = params;

	const queryClient = useQueryClient();

	const getPageDataQuery = useQuery(() => {
		return {
			queryFn: async (): Promise<PageData> => {
				const pageDataResult = await getPageData();

				return pageDataResult;
			},
			queryKey: [QUERY_KEYS.PAGE_DATA],
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

export { usePageData };
