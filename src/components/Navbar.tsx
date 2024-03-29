import { Link, Outlet } from "react-router-dom"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
    return (
        <div className="w-screen flex px-10 py-5">
            <div className="order-first">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to={"/"}>Dashboard</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <Outlet />
        </div>
    )
}