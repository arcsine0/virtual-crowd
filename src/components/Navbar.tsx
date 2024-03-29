import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@/components/theme-provider";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Switch } from "@/components/ui/switch";

import ListItem from "@/components/ListItem";

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
                            <NavigationMenuContent className="md:w-[200px] lg:w-[300px]">
                                <ul className="gap-2 p-2">
                                    <li>
                                        <Link to={"/crowds/all"}>
                                            <ListItem title="View Crowds" desc="See all your created crowds!" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/crowds/create"}>
                                            <ListItem title="Create Crowds" desc="Setup and configure your crowds here!" />
                                        </Link>
                                    </li>
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