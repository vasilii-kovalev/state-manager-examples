import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	QUERY_KEYS,
} from "@/constants";

import {
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasChanges,
} from "../store/page/selectors";
import {
	savePageState,
} from "../utilities/save-page-state";

const SaveChangesButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const hasChanges = useSelector((state: RootState) => {
		return selectHasChanges(state.page);
	});

	const queryClient = useQueryClient();

	const {
		mutate: handleSaveChanges,
	} = useMutation({
		mutationFn: async () => {
			await dispatch(savePageState());
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [
					QUERY_KEYS.PAGE_DATA,
				],
			});
		},
	});

	return (
		<button
			className="control"
			disabled={!hasChanges}
			onClick={() => {
				handleSaveChanges();
			}}
			type="button"
		>
			Save changes
		</button>
	);
};

export {
	SaveChangesButton,
};
