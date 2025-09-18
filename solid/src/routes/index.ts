import {
	createFileRoute,
	redirect,
} from "@tanstack/solid-router";

const Route = createFileRoute("/")({
	loader: () => {
		redirect({
			throw: true,
			to: "/signals",
		});
	},
});

export {
	Route,
};
