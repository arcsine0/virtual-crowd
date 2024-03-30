import { useState } from "react";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AgeCard, SexAndGenderCard } from "@/components/BioCards";

export default function CreateCrowd() {
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Crowds Builder</h1>
            <div className="w-1/3 flex flex-col gap-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Crowd No.1</CardTitle>
                        <CardDescription>This is a test Crowd template</CardDescription>
                    </CardHeader>
                </Card>
                <AgeCard />
                <SexAndGenderCard />
            </div>
        </div>
    )
}