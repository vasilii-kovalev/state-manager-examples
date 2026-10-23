import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Navigation } from "../components/navigation";
import { content, header } from "../styles/shell.css";

const Route = createRootRoute({
	component: () => {
		return (
			<main>
				<header className={header}>
					<Navigation />
				</header>

				<section className={content}>
					<Outlet />
				</section>
			</main>
		);
	},
});

export { Route };
