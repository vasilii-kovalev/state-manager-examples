import "./theme.css";

import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import {
	ReactQueryDevtools,
} from "@tanstack/react-query-devtools";
import {
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import {
	TanStackRouterDevtools,
} from "@tanstack/react-router-devtools";
import {
	isNull,
} from "es-toolkit";
import {
	StrictMode,
} from "react";
import {
	createRoot,
} from "react-dom/client";

import {
	routeTree,
} from "./routeTree.gen";

const router = createRouter({
	routeTree,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const rootElement = document.getElementById("root");

if (!isNull(rootElement)) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<QueryClientProvider
				client={queryClient}
			>
				<RouterProvider
					router={router}
				/>
			</QueryClientProvider>

			<TanStackRouterDevtools
				router={router}
			/>

			<ReactQueryDevtools
				client={queryClient}
			/>
		</StrictMode>,
	);
}
