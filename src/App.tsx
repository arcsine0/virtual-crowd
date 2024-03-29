import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";

import Dashboard from "./pages/Dashboard";
import CreateCrowd from "./pages/CreateCrowd";

export default function App() {
	return (
		<Router>
			<Navbar />
			<div className="w-screen h-screen p-10">
				<Route path="/" index element={<Dashboard />} />
				<Route path="/crowd/create" element={<CreateCrowd />} />
			</div>
		</Router>
	)
}