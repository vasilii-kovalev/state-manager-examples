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
	Tooltip,
} from "@/components/tooltip";
import {
	QUERY_KEYS,
} from "@/constants";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

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

	const isBusy = useIsBusy();

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Save changes to Local Storage";
			}}
			renderTarget={({
				className,
				tooltipId,
				...targetProps
			}) => {
				return (
					<button
						{...targetProps}
						aria-describedby={tooltipId}
						className={
							getClass([
								className,
								"control",
							])
						}
						disabled={
							!hasChanges
							|| isBusy
						}
						onClick={() => {
							handleSaveChanges();
						}}
						type="button"
					>
						Save changes
					</button>
				);
			}}
			targetId="save-changes-button"
		/>
	);
};

export {
	SaveChangesButton,
};
