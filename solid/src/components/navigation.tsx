import {
	Link,
} from "@tanstack/solid-router";
import {
	type Component,
	For,
} from "solid-js";

import {
	type FileRouteTypes,
} from "@/routeTree.gen";

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

const Navigation: Component = () => {
	return (
		<nav>
			<ul
				class="m-0 flex gap-col-4 p-0 list-none"
			>
				<For
					each={libraryLinks}
				>
					{
						(
							libraryLink,
						) => {
							return (
								<li>
									<Link
										to={libraryLink.to}
									>
										{libraryLink.label}
									</Link>
								</li>
							);
						}
					}
				</For>
			</ul>
		</nav>
	);
};

export {
	Navigation,
};
