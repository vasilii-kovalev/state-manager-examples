import {
	createFileRoute,
	redirect,
} from "@tanstack/react-router";

const Route = createFileRoute("/")({
	loader: () => {
		redirect({
			throw: true,
			to: "/redux",
		});
	},
});

export {
	Route,
};
