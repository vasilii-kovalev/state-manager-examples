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
		const target = targetRef();

		/*
			A disabled form control does not activate. The browser does not dispatch `click`, the control is not
			focusable, and `popovertarget` does not toggle its popover. The native hover popover (`interestfor`) is
			specified not to open on a disabled control. Current Chrome still dispatches `mouseenter`, `mouseleave`,
			`mouseover`, and the pointer boundary events to that control, and the control still matches `:hover`.

			React never calls `onMouseEnter` when `props.disabled` is set on a `button`, `input`, `select`, or
			`textarea`. The same filter covers `onClick`, `onMouseDown`, `onMouseMove`, and `onMouseUp`. Solid
			attaches `mouseenter` with `addEventListener`. That event is not delegated, in 1.9 or in 2.0.0-rc.18, so
			the `!node.disabled` skip inside Solid's delegated dispatcher never runs for it. `mouseover` is delegated
			and would be skipped on a disabled node, but it fires again whenever the pointer moves between a target
			and one of its descendants. Targets such as the reported-duration cell contain children, so `mouseenter`
			and `mouseleave` are the pair that crosses the boundary once.

			`:disabled` is the platform check: the control's own `disabled` attribute, and a control inside a disabled
			`fieldset`. The `div` targets do not match, so those tooltips still open.
		*/
		if (
			!isUndefined(target)
			&& target.matches(":disabled")
		) {
			return;
		}

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
				ref={(tooltipElement) => {
					setTooltipRef(tooltipElement);
				}}
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
