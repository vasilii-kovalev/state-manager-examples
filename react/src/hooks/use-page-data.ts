import {
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	isUndefined,
} from "es-toolkit";
import {
	useEffect,
} from "react";

import {
	QUERY_KEYS,
} from "@/constants";
import {
	type PageData,
} from "@/features/pages/types";
import {
	getPageData,
} from "@/features/pages/utilities/get-page-data";

interface UsePageDataParams {
	onSuccess: (pageData: PageData) => void;
}

const usePageData = ({
	onSuccess,
}: UsePageDataParams): void => {
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

	useEffect(
		() => {
			if (!isUndefined(pageData)) {
				onSuccess(pageData);
			}
		},
		[
			pageData,
			onSuccess,
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
