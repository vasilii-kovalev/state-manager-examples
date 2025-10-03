import {
	useMutation,
	useQueryClient,
} from "@tanstack/solid-query";
import {
	type Component,
	splitProps,
} from "solid-js";

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
	hasChanges,
} from "../signals/signals/page/derived";
import {
	savePageState,
} from "../utilities/save-page-state";

const SaveChangesButton: Component = () => {
	const queryClient = useQueryClient();

	const saveChangesMutation = useMutation(() => {
		return {
			mutationFn: async () => {
				await savePageState();
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						QUERY_KEYS.PAGE_DATA,
					],
				});
			},
		};
	});

	const isBusy = useIsBusy();

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Save changes to Local Storage";
			}}
			renderTarget={(
				targetProps,
			) => {
				const [
					props,
					otherTargetProps,
				] = splitProps(
					targetProps,
					[
						"class",
						"tooltipId",
					],
				);

				return (
					<button
						{...otherTargetProps}
						aria-describedby={props.tooltipId}
						class={
							getClass([
								props.class,
								"control",
							])
						}
						disabled={
							!hasChanges()
							|| isBusy()
						}
						onClick={() => {
							saveChangesMutation.mutate();
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
