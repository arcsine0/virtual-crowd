import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";

import { useTheme } from "@/components/theme-provider";

import { Switch } from "@/components/ui/switch";

export default function Navbar() {
    const [mode, setMode] = useState(false);
    const { setTheme } = useTheme();

    useEffect(() => {
        if (mode === true) { setTheme("dark"); } else { setTheme("light"); }
    }, [mode])

    return (
        <div className="w-screen flex px-10 py-5">
            <div className="order-first">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to={"/"}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-large">Crowds</NavigationMenuTrigger>
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
                        <NavigationMenuItem>
                            <Switch checked={mode} onCheckedChange={() => setMode(!mode)} />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}