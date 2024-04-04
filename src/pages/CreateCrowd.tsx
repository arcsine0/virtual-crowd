import { useState, useEffect } from "react";

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
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { builderSchema, CardLoader } from "@/components/BioCards";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";

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

export default function CreateCrowd() {
    const [builderData, setBuilderData] = useState([
        { type: "age", value: "", element: "AgeCard" },
        { type: "sex", value: "", element: "SexCard" },
    ]);

    const [submitTrigger, setSubmitTrigger] = useState(0);

    const [typeOpen, setTypeOpen] = useState<boolean>(false);
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

    const [typeValue, setTypeValue] = useState<string>("");
    const [detailsValue, setDetailsValue] = useState<string>("");

    const builderForm = useForm<z.infer<typeof builderSchema>>({
        resolver: zodResolver(builderSchema),
        defaultValues: {
            data: [
                {
                    type: "age", value: {
                        v1: "18",
                        type: "Age"
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

    const currentDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })}`;

    const handleAddingCards = () => {
        if (detailsValue !== "") {
            const card = bioTypes.find((tp) => tp.value === typeValue)?.details.find((dt) => dt.value === detailsValue)?.element;

            if (card) {
                if (!builderForm.getValues("data").map((data) => data.type).includes(detailsValue)) {
                    // setBuilderData((prev) => [
                    //     ...prev,
                    //     {
                    //         type: detailsValue,
                    //         value: "",
                    //         element: card
                    //     }
                    // ])
                    append({
                        type: detailsValue,
                        value: { v1: "" },
                        element: card
                    })
                }
            }
        }
    }

    const onSubmit = (data: z.infer<typeof builderSchema>) => {
        console.log(data.data);
    }

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <h1 className="order-first shrink text-3xl font-bold">Crowds Builder</h1>
            <div className="w-1/3 grow flex flex-col gap-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Crowd No.1</CardTitle>
                        <CardDescription>This is a test Crowd template</CardDescription>
                    </CardHeader>
                </Card>
                <Form {...builderForm}>
                    <form onSubmit={builderForm.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                        {fields.map((field, index) => (
                            <CardLoader key={field.id} element={field.element} index={index} control={builderForm.control} data={builderForm.getValues("data")[index].value} />
                        ))}
                    </form>
                </Form>
                {/* {builderData.map((data) => {
                    return (<CardLoader key={data.element} name={data.element} trigger={submitTrigger} passData={(dt) => handleSubmittedData(data.type, dt)} />)
                })} */}
            </div>
            <div className="order-last shrink w-full p-5 flex items-center gap-2 rounded-lg shadow-lg">
                <p className="order-first shrinktext-normal text-gray-400">Last Saved {currentDate}</p>
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
                            <Popover open={typeOpen} onOpenChange={setTypeOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={typeOpen}
                                        className="justify-between"
                                    >
                                        {typeValue
                                            ? bioTypes.find((bio) => bio.value === typeValue)?.label
                                            : "Select bio type..."
                                        }
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput placeholder="Search bio type..." />
                                        <CommandEmpty>No Bio Type found.</CommandEmpty>
                                        <CommandList>
                                            {bioTypes.map((bio) => (
                                                <CommandItem
                                                    key={bio.value}
                                                    value={bio.value}
                                                    onSelect={(val) => {
                                                        setTypeValue(val === typeValue ? "" : val);
                                                        setTypeOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            typeValue === bio.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {bio.label}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <Label className="text-large font-semibold">Specifics</Label>
                            <Popover open={detailsOpen} onOpenChange={setDetailsOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={detailsOpen}
                                        className="justify-between"
                                    >
                                        {detailsValue
                                            ? bioTypes.find((bio) => bio.value === typeValue)?.details.find((dt) => dt.value === detailsValue)?.label
                                            : "Select details type..."
                                        }
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput placeholder="Search details type..." />
                                        <CommandEmpty>No Details Type found.</CommandEmpty>
                                        <CommandList>
                                            {bioTypes.find((bio) => bio.value === typeValue)?.details.map((dt) => (
                                                <CommandItem
                                                    key={dt.value}
                                                    value={dt.value}
                                                    onSelect={(val) => {
                                                        setDetailsValue(val === detailsValue ? "" : val);
                                                        setDetailsOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            detailsValue === dt.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {dt.label}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
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
                    <Button type="submit">Save</Button>
                </div>

            </div>
        </div>
    )
}