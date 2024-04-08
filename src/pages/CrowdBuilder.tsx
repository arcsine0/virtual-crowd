import { useState, useEffect, useRef } from "react";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Form,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/components/ui/use-toast"

import { builderSchema, CardLoader } from "@/components/BioCards";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const bioTypes = [
    {
        value: "demographics", label: "Demographics", details: [
            { value: "age", label: "Age", element: "AgeCard" },
            { value: "sex", label: "Sex", element: "SexCard" },
            { value: "gender", label: "Gender", element: "GenderCard" },
            { value: "location", label: "Location", element: "LocationCard" },
        ]
    },
    {
        value: "education", label: "Education", details: [
            { value: "education", label: "Education", element: "EducationCard" },
            { value: "degree", label: "Degree", element: "CollegeDegreeCard" },
        ]
    },
    {
        value: "financial", label: "Financial", details: [
            { value: "income", label: "Income Level", element: "IncomeLevelCard" },
            { value: "investments", label: "Investments", element: "InvestmentsCard" },
        ]
    },
    {
        value: "profession", label: "Profession", details: [
            { value: "industry", label: "Industry", element: "IndustryCard" },
            { value: "position", label: "Job Position", element: "JobPositionCard" },
        ]
    },
    {
        value: "personality", label: "Personality", details: [
            { value: "test", label: "Test", element: "TestCard" },
        ]
    },
];

const getCurrentDate = () => {
    return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })}`;
}

export default function CrowdBuilder() {
    const [typeValue, setTypeValue] = useState<string>("");
    const [detailsValue, setDetailsValue] = useState<string>("");

    const [savedDate, setSavedDate] = useState<string>(getCurrentDate());

    const submitRef = useRef<HTMLButtonElement>(null);

    const { toast } = useToast();

    const builderForm = useForm<z.infer<typeof builderSchema>>({
        resolver: zodResolver(builderSchema),
        defaultValues: {
            data: [
                {
                    type: "age", value: {
                        groupValue: [""],
                    }, element: "AgeCard"
                },
                // { type: "sex", value: {}, element: "SexCard" },
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: builderForm.control,
        name: "data",
    });

    const handleAddingCards = () => {
        if (detailsValue !== "") {
            const card = bioTypes.find((tp) => tp.value === typeValue)?.details.find((dt) => dt.value === detailsValue)?.element;

            if (card) {
                if (!builderForm.getValues("data").map((data) => data.type).includes(detailsValue)) {
                    append({
                        type: detailsValue,
                        value: { mainValue: "", groupValue: [""] },
                        element: card
                    });

                    toast({
                        title: `Successfully added ${card}`,
                        duration: 1000,
                    });
                }
            } else {
                toast({
                    title: `Error: ${card} already exists!`,
                    variant: "destructive",
                    duration: 1000,
                });
            }
        }
    }

    const handleDataSaving = () => {
        submitRef.current?.click();
        setSavedDate(getCurrentDate());
    }

    const handleRemoveCard = (index: number) => {
        // remove(index);
        // console.log(index)
        
    }

    const onSubmit = (data: z.infer<typeof builderSchema>) => {
        console.log(data.data);

        // temporary prompt builder
        const prompts = data.data.map((field) => {
            let fieldPrompt = `${field.type?.toUpperCase()}: `;
            switch(field.type) {
                case "age":
                    fieldPrompt += `${field.value.type === "Age" ? field.value.mainValue : (`${field.value.rangeFromValue} to ${field.value.rangeToValue}`)}`;
                    break;
                case "sex":
                    fieldPrompt += `${field.value.mainValue}`;
                    break;
                case "gender":
                    fieldPrompt += `${field.value.specify === (false || undefined) ? "All" : `${field.value.groupValue}`}`;
                    break;
                case "education":
                    fieldPrompt += `COURSE: ${field.value.mainValue}, TOTAL YEARS: ${field.value.subValue}, INCLUDED YEARS: ${field.value.specify === (false || undefined) ? "All" : (`${field.value.rangeFromValue} to ${field.value.rangeToValue}`)}`;
                    break;
                default:
                    break;
            }
            return fieldPrompt;
        });

        const prompt = `This is your details as an individuals:\n ${prompts.join("\n")}\n`;
        console.log(prompt);

        toast({
            title: "Data saved successfully",
            duration: 1000,
        });
    }

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <h1 className="order-first shrink text-3xl font-bold">Crowds Builder</h1>
            <div className="w-full grow flex flex-col gap-2">
                <Card className="w-1/3">
                    <CardHeader>
                        <CardTitle>Crowd No.1</CardTitle>
                        <CardDescription>This is a test Crowd template</CardDescription>
                    </CardHeader>
                </Card>
                <Form {...builderForm}>
                    <form onSubmit={builderForm.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                        {fields.map((field, index) => (
                            <CardLoader 
                                key={field.id} 
                                element={field.element} 
                                index={index} 
                                control={builderForm.control} 
                                data={builderForm.getValues("data")[index].value} 
                                remove={handleRemoveCard(index)} 
                            />
                        ))}
                        <Button className="hidden" ref={submitRef} type="submit"></Button>
                    </form>
                </Form>
                <Toaster />
            </div>
            <div className="order-last shrink w-full p-5 flex items-center gap-2 rounded-lg shadow-lg">
                <p className="order-first shrinktext-normal text-gray-400">Last Saved {savedDate}</p>
                <div className="grow"></div>
                <div className="order-last shrink flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Add Bio</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Add a Bio Card</DialogTitle>
                                <DialogDescription>Add any bio card that would serve as extra detail for your crowd. Simply select its type first, then select the specifc sub-type you want to add</DialogDescription>
                            </DialogHeader>
                            <Label className="text-large font-semibold">Type</Label>
                            <Select
                                onValueChange={setTypeValue}
                                defaultValue={typeValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select card type..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {bioTypes.map((bio) => (
                                        <SelectItem value={bio.value}>{bio.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Label className="text-large font-semibold">Sub-Type</Label>
                            <Select
                                onValueChange={setDetailsValue}
                                defaultValue={detailsValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select card sub-type..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {bioTypes.find((bio) => bio.value === typeValue)?.details.map((dt) => (
                                        <SelectItem value={dt.value}>{dt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button onClick={() => handleAddingCards()} variant="outline">Add</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button onClick={() => handleDataSaving()}>Save</Button>
                </div>

            </div>
        </div>
    )
}