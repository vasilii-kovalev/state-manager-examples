import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useEffectEvent } from "react";

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

	const { data: pageData } = useQuery({
		queryFn: async (): Promise<PageData> => {
			const pageDataResult = await getPageData();

			return pageDataResult;
		},
		queryKey: [QUERY_KEYS.PAGE_DATA],
	});

	const onSuccessEvent = useEffectEvent(onSuccess);

	useEffect(() => {
		if (!isUndefined(pageData)) {
			onSuccessEvent(pageData);
		}
	}, [pageData]);

	useEffect(() => {
		return (): void => {
			queryClient.clear();
		};
	}, []);
};

export { usePageData };
