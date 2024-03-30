import { useState, useEffect, ChangeEvent } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AgeCard() {
    type AgeData = {
        v1: number;
        v2: number;
    }

    const [age, setAge] = useState("");
    const [valueType, setValueType] = useState("age");

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

export function SexAndGenderCard() {
    const formSchema = z.object({
        sex: z.enum(["Male", "Female", "Both"], {
            required_error: "You need to select the crowd's sex",
        }),
        includeGender: z.boolean().default(false),
        gender: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sex: "Both",
            includeGender: false,
            gender: "All"
        },
    });

    // for testing
    // const getData = () => {
    //     console.log(form.getValues("sex"));
    // }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Sex and Gender</CardTitle>
                <CardDescription>Define your crowds sex and/or gender</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="sex"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">Sex</FormLabel>
                                    <FormControl>
                                        <RadioGroup 
                                            className="flex flex-col gap-1"
                                            value={field.value} 
                                            onValueChange={field.onChange}
                                        >
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <RadioGroupItem value="Male" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Male</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <RadioGroupItem value="Female" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Female</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <RadioGroupItem value="Both" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Both</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="includeGender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">Gender</FormLabel>
                                    <div className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox 
                                                checked={field.value} 
                                                onCheckedChange={field.onChange} 
                                            />
                                        </FormControl>
                                        <FormLabel>Include Gender?</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {form.getValues("includeGender") === true ? 
                            <h1>Test</h1>
                        : <></>}
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}