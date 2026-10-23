import { Link } from "@tanstack/solid-router";
import { For, type JSX } from "solid-js";

import { type FileRouteTypes } from "../routeTree.gen";
import { list } from "./navigation.css";

interface LibraryLink {
	to: FileRouteTypes["to"];
	label: string;
}

const libraryLinks: Array<LibraryLink> = [
	{
		label: "Solid",
		to: "/signals",
	},
];

const Navigation = (): JSX.Element => {
	return (
		<nav>
			<ul class={list}>
				<For each={libraryLinks}>
					{(libraryLink) => {
						return (
							<li>
								<Link to={libraryLink.to}>{libraryLink.label}</Link>
							</li>
						);
					}}
				</For>
			</ul>
		</nav>
	);
};

export { Navigation };
