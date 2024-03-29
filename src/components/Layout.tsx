import { Outlet } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

export default function Layout() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="w-screen h-screen flex flex-col">
                <Navbar />
                <div className="w-full h-full p-10">
                    <Outlet />
                </div>
            </div>
        </ThemeProvider>
    )
}