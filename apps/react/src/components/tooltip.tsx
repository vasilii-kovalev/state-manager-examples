import { type CSSProperties, type ReactNode, type RefObject, useLayoutEffect, useRef } from "react";

import { isNull } from "packages/shared/src/utilities/is-null";

import { tooltip, tooltipTarget } from "./tooltip.css";

interface RenderTargetProps<TargetElement extends HTMLElement> {
	className: string | undefined;
	id: string;
	onBlur: () => void;
	onFocus: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	popoverTarget: string;
	ref: RefObject<TargetElement | null>;
	tabIndex: number;
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

	useLayoutEffect(() => {
		if (!isNull(targetRef.current)) {
			targetRef.current.setAttribute("style", `--anchor-name: --${targetId}`);
		}
	}, [targetId]);

	return (
		<>
			{renderTarget({
				className: tooltipTarget,
				id: targetId,
				onBlur: hideTooltip,
				onFocus: showTooltip,
				onMouseEnter: showTooltip,
				onMouseLeave: hideTooltip,
				popoverTarget: tooltipId,
				ref: targetRef,
				tabIndex: 0,
			})}

			<div
				className={tooltip}
				id={tooltipId}
				popover="auto"
				ref={tooltipRef}
				role="tooltip"
				style={
					{
						"--anchor-name": `--${targetId}`,
					} as CSSProperties
				}
			>
				{renderBody()}
			</div>
		</>
	);
};

export { Tooltip };
