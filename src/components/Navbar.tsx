import { Link } from "react-router-dom"

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

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

export default function Navbar() {
    return (
        <div className="w-screen flex px-10 py-5">
            <div className="order-first">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                <Link to={"/"}>Home</Link>
                            </NavigationMenuTrigger>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Crowds</NavigationMenuTrigger>
                            <NavigationMenuContent className="w-200">
                                <ul className="gap-2">
                                    <Card>
                                        <Link to={"/crowd/create"}>
                                            <CardContent>
                                                <CardTitle>Create Crowds</CardTitle>
                                                <CardDescription>Setup and Configure your Virtual Crowds for your surveys!</CardDescription>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}