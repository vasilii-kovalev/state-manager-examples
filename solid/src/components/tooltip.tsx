import {
	createEffect,
	createSignal,
	type JSX,
	type Setter,
} from "solid-js";

import {
	getClass,
} from "@/utilities/get-class";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import css from "./tooltip.module.css";

interface RenderTargetProps<TargetElement extends HTMLElement> {
	class: string | undefined;
	id: string;
	onBlur: () => void;
	onFocus: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	popoverTarget: string;
	ref: Setter<TargetElement | undefined>;
	tabIndex: number;
}

interface TooltipProps<TargetElement extends HTMLElement> {
	renderBody: () => JSX.Element;
	renderTarget: (
		props: RenderTargetProps<TargetElement>,
	) => JSX.Element;
	targetId: string;
}

const Tooltip = <TargetElement extends HTMLElement>(
	props: TooltipProps<TargetElement>,
): JSX.Element => {
	const [
		targetRef,
		setTargetRef,
	] = createSignal<TargetElement | undefined>();
	const [
		tooltipRef,
		setTooltipRef,
	] = createSignal<HTMLDivElement | undefined>();

	const showTooltip = (): void => {
		tooltipRef()?.showPopover();
	};

	const hideTooltip = (): void => {
		tooltipRef()?.hidePopover();
	};

	const tooltipId = (): string => {
		return `${props.targetId}-tooltip`;
	};

	createEffect(() => {
		const target = targetRef();

		if (!isUndefined(target)) {
			target.setAttribute(
				"style",
				`--anchor-name: --${props.targetId}`,
			);
		}
	});

	return (
		<>
			{
				props.renderTarget({
					class: css.target,
					id: props.targetId,
					onBlur: hideTooltip,
					onFocus: showTooltip,
					onMouseEnter: showTooltip,
					onMouseLeave: hideTooltip,
					popoverTarget: tooltipId(),
					ref: setTargetRef,
					tabIndex: 0,
				})
			}

			<div
				class={
					getClass([
						css.tooltip,
						"m-0 m-block-1 max-w-64 b-1px b-solid p-2",
					])
				}
				id={tooltipId()}
				popover="auto"
				ref={setTooltipRef}
				role="tooltip"
				style={{
					"--anchor-name": `--${props.targetId}`,
				}}
			>
				{props.renderBody()}
			</div>
		</>
	);
};

export {
	Tooltip,
};
