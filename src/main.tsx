import React from 'react';
import ReactDOM from 'react-dom/client';

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CreateCrowd from './pages/CreateCrowd.tsx';

import './index.css';

const Layout = () => {
	return (
		<div className="w-screen h-screen flex flex-col">
			<Navbar />
			<Outlet />
		</div>
	)
}

const router = createBrowserRouter([{
	path: "/",
	element: <Layout />,
	children: [
		{
			path: "/",
			element: <Dashboard />
		},
		{
			path: "/crowd/create",
			element: <CreateCrowd />
		}
	]
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />
)
