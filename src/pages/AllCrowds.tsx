import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Crowd = {
    id: string;
    name: string;
    desc: string;
}

export default function AllCrowds() {
    const [crowds, setCrowds] = useState<Crowd[]>([])

    const navigate = useNavigate();

    useEffect(() => {
        setCrowds([]);
        getDocs(collection(db, "Accounts", "ytNVZtmae9e7a8cHzaob", "Crowds"))
            .then((snap) => {
                snap.docs.forEach((doc) => {
                    setCrowds((prev) => [
                        ...prev,
                        { 
                            id: doc.id, 
                            name: doc.data().name, 
                            desc: doc.data().desc,
                        }
                    ])
                });
            })
    }, [])

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <h1 className="text-3xl font-bold">All Crowds</h1>
            <div className="w-full flex flex-col gap-2">
                {crowds.map((crowd) => (
                    <Card className="w-1/3">
                        <CardHeader>
                            <CardTitle>{crowd.name}</CardTitle>
                            <CardDescription>{crowd.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-xl font-semibold">Status</h1>
                        </CardContent>
                        <CardFooter className="flex items-center gap-2">
                            <Button variant="outline">Generate</Button>
                            <Button onClick={() => navigate(`/crowds/build/${crowd.id}`)} variant="outline">Configure</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}