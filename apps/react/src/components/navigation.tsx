import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

import { type FileRouteTypes } from "../routeTree.gen";
import { list } from "./navigation.css";

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

const Navigation = (): ReactNode => {
	return (
		<nav>
			<ul className={list}>
				{libraryLinks.map((libraryLink) => {
					return (
						<li key={libraryLink.to}>
							<Link to={libraryLink.to}>{libraryLink.label}</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export { Navigation };
