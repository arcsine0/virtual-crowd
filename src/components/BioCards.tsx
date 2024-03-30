import { useState, useEffect, ChangeEvent } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input"

export function AgeCard() {
    type AgeData = {
        v1: number;
        v2: number;
    }

    const [valueType, setValueType] = useState("age");
    const [age, setAge] = useState("");

    const [ageData, setAgeData] = useState<AgeData>({ v1: 0, v2: 0 });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const val = e.target.value;

        setAgeData(prev => ({
            ...prev,
            [name]: val
        }));
    }

    useEffect(() => {
        if (valueType === "age") { setAge(ageData.v1.toString()); }
        else { setAge(`${ageData.v1} to ${ageData.v2}`); }
    }, [ageData, valueType])

    // testing
    // useEffect(() => {
    //     console.log(age);
    // }, [age])

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Age</CardTitle>
                <CardDescription>Define your crowds age or age range</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <RadioGroup defaultValue="age" value={valueType} onValueChange={(e) => setValueType(e)}>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="age" id="r1" />
                        <Label htmlFor="r1">Age</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="age-range" id="r2" />
                        <Label htmlFor="r2">Age Range</Label>
                    </div>
                </RadioGroup>
                {valueType === "age" ?
                    <div className="w-full">
                        <Label htmlFor="v1">Value</Label>
                        <Input id="v1" name="v1" type="number" placeholder="18" value={ageData.v1} onChange={handleInputChange} />
                    </div>
                :
                    <div className="w-full">
                        <div className="flex gap-2 items-center">
                            <Label htmlFor="v1">From</Label>
                            <Input id="v1" name="v1" type="number" placeholder="18" value={ageData.v1} onChange={handleInputChange} />

                            <Label htmlFor="v2">To</Label>
                            <Input id="v2" name="v2" type="number" placeholder="24" value={ageData.v2} onChange={handleInputChange} />
                        </div>
                    </div>
                }
            </CardContent>
        </Card>
    )
}