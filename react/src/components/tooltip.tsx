import {
	isNull,
} from "es-toolkit";
import {
	type CSSProperties,
	Fragment,
	type ReactNode,
	type RefObject,
	useEffect,
	useRef,
} from "react";

import {
	getClass,
} from "@/utilities/get-class";

import css from "./tooltip.module.css";

interface RenderTargetProps<TargetElement extends HTMLElement> {
	className: string | undefined;
	id: string;
	onBlur: () => void;
	onFocus: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	popoverTarget: string;
	ref: RefObject<TargetElement | null>;
	tooltipId: string;
}

interface TooltipProps<TargetElement extends HTMLElement> {
	renderBody: () => ReactNode;
	renderTarget: (props: RenderTargetProps<TargetElement>) => ReactNode;
	targetId: string;
}

const Tooltip = <TargetElement extends HTMLElement>({
	renderBody,
	renderTarget,
	targetId,
}: TooltipProps<TargetElement>): ReactNode => {
	const targetRef = useRef<TargetElement | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	const showTooltip = (): void => {
		tooltipRef.current?.showPopover();
	};

	const hideTooltip = (): void => {
		tooltipRef.current?.hidePopover();
	};

	const tooltipId = `${targetId}-tooltip`;

	useEffect(
		() => {
			if (!isNull(targetRef.current)) {
				targetRef.current.setAttribute(
					"style",
					`--anchor-name: --${targetId}`,
				);
			}
		},
		[
			targetId,
		],
	);

	return (
		<Fragment>
			{
				renderTarget({
					className: css.target,
					id: targetId,
					onBlur: hideTooltip,
					onFocus: showTooltip,
					onMouseEnter: showTooltip,
					onMouseLeave: hideTooltip,
					popoverTarget: tooltipId,
					ref: targetRef,
					tooltipId,
				})
			}

			<div
				className={
					getClass([
						css.tooltip,
						"m-0 m-block-1 b-1px b-solid p-2 max-w-64",
					])
				}
				id={tooltipId}
				popover="auto"
				ref={tooltipRef}
				style={{
					"--anchor-name": `--${targetId}`,
				} as CSSProperties}
			>
				{renderBody()}
			</div>
		</Fragment>
	);
};

export {
	Tooltip,
};
