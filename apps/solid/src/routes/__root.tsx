import { createRootRoute, Outlet } from "@tanstack/solid-router";

import { Navigation } from "../components/navigation";
import { content, header } from "../styles/shell.css";

const Route = createRootRoute({
	component: () => {
		return (
			<main>
				<header class={header}>
					<Navigation />
				</header>

				<section class={content}>
					<Outlet />
				</section>
			</main>
		);
	},
});

export { Route };
