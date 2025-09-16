import {
	Link,
} from "@tanstack/react-router";
import {
	type FC,
} from "react";

import {
	type FileRouteTypes,
} from "@/routeTree.gen";

interface LibraryLink {
	to: FileRouteTypes["to"];
	label: string;
}

const libraryLinks: Array<LibraryLink> = [
	{
		label: "Redux",
		to: "/redux",
	},
];

const Navigation: FC = () => {
	return (
		<nav>
			<ul
				className="m-0 flex gap-col-4 p-0 list-none"
			>
				{
					libraryLinks.map((
						libraryLink,
					) => {
						return (
							<li
								key={libraryLink.to}
							>
								<Link
									to={libraryLink.to}
								>
									{libraryLink.label}
								</Link>
							</li>
						);
					})
				}
			</ul>
		</nav>
	);
};

export {
	Navigation,
};
