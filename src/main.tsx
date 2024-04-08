import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";

import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard.tsx";
import AllCrowds from "@/pages/AllCrowds";
import CrowdBuilder from "@/pages/CrowdBuilder";

import "./index.css";

const router = createBrowserRouter([{
	path: "/",
	element: <Layout />,
	children: [
		{
			path: "/",
			element: <Dashboard />
		},
		{
			path: "/crowds/all",
			element: <AllCrowds />
		},
		{
			path: "/crowds/build",
			element: <CrowdBuilder />
		},
		{
			path: "/crowds/build/:id",
			element: <CrowdBuilder />
		}
	]
}]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
		<RouterProvider router={router} />
	</ThemeProvider>
)
