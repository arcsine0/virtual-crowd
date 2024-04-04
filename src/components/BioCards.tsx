import { useState, useEffect, useRef, FC } from "react";

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";

export const builderSchema = z.object({
    data: z.array(z.object({
        type: z.string(),
        value: z.object({
            mainValue: z.string(),
            subValue: z.string().optional(),
            groupValue: z.array(z.string()),
            type: z.string().optional(),
            specify: z.boolean().default(false).optional(),
        }),
        element: z.string(),
    }))
});

export function CardLoader(props: { element: string, index: number, control: Control<z.infer<typeof builderSchema>>, data: object }) {
    const cards: { [key: string]: FC<any> } = {
        AgeCard,
        SexCard,
        GenderCard,
        EducationCard,
    }

    const Card = cards[props.element];
    return <Card index={props.index} control={props.control} data={props.data} />
}

export function AgeCard(props: { index: number, control: Control<z.infer<typeof builderSchema>>, data: object }) {
    const data = JSON.parse(JSON.stringify(props.data));

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Age</CardTitle>
                <CardDescription>Define your crowds age or age range</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <FormField
                    name={`data.${props.index}.value.type`}
                    control={props.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-large font-semibold">Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the age type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Age">Age</SelectItem>
                                    <SelectItem value="Age-Range">Age Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    name={`data.${props.index}.value`}
                    control={props.control}
                    render={() => (
                        <FormItem>
                            {data.type === "Age"
                                ? <FormField
                                    control={props.control}
                                    name={`data.${props.index}.value.mainValue`}
                                    render={({ field }) => (
                                        <div className="w-full">
                                            <FormLabel className="text-large font-semibold">Value</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="18" />
                                            </FormControl>
                                        </div>

                                    )}
                                />
                                : <div className="w-full flex items-center gap-2">
                                    <FormField
                                        control={props.control}
                                        name={`data.${props.index}.value.mainValue`}
                                        render={({ field }) => (
                                            <div className="w-full">
                                                <FormLabel className="text-large font-semibold">From</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} placeholder="18" />
                                                </FormControl>
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={props.control}
                                        name={`data.${props.index}.value.subValue`}
                                        render={({ field }) => (
                                            <div className="w-full">
                                                <FormLabel className="text-large font-semibold">To</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} placeholder="18" />
                                                </FormControl>
                                            </div>
                                        )}
                                    />
                                </div>
                            }
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}

export function SexCard(props: { index: number, control: Control<z.infer<typeof builderSchema>>, data: object }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Sex</CardTitle>
                <CardDescription>Define your crowds' sex</CardDescription>
            </CardHeader>
            <CardContent>
                <FormField
                    control={props.control}
                    name={`data.${props.index}.value.mainValue`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-large font-semibold">Options</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the crowd's sex" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Both">Both</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}

export function GenderCard(props: { index: number, control: Control<z.infer<typeof builderSchema>>, data: object }) {
    const data = JSON.parse(JSON.stringify(props.data));

    const genders = [
        { id: "lesbian", label: "Lesbian" },
        { id: "gay", label: "Gay" },
        { id: "bisexual", label: "Bisexual" },
        { id: "transgender", label: "Transgender" },
        { id: "queer", label: "Queer" },
        { id: "questioning", label: "Questioning" },
        { id: "intersex", label: "Intersex" },
        { id: "asexual", label: "Asexual" }
    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Gender</CardTitle>
                <CardDescription>Define your crowds' gender</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <FormField
                    control={props.control}
                    name={`data.${props.index}.value.specify`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-large font-semibold">Options</FormLabel>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Specify Gender? <span className="text-gray-400">(leave unchecked if all are included)</span></FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                {data.specify === true ?
                    <FormField
                        control={props.control}
                        name={`data.${props.index}.value.groupValue`}
                        render={({ field }) => (
                            <FormItem>
                                {genders.map((gender) => (
                                    <FormItem key={gender.id}>
                                        <div className="flex items-center gap-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(gender.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, gender.id])
                                                            : field.onChange(
                                                                field.value?.filter((value) => value !== gender.id)
                                                            );
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel>{gender.label}</FormLabel>
                                        </div>
                                    </FormItem>
                                ))}
                            </FormItem>
                        )}
                    />
                    : <></>}
            </CardContent>
        </Card>
    )
}

export function EducationCard(props: { trigger: number, passData: (data: string) => void }) {
    const formSchema = z.object({
        course: z.array(z.string()),
        years: z.object({
            total: z.number(),
            specifyRange: z.boolean(),
            rangeFrom: z.number(),
            rangeTo: z.number()
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            course: [""],
            years: {
                total: 4,
                specifyRange: false,
                rangeFrom: 1,
                rangeTo: 4
            }
        },
    });

    // temporary solution to global saving
    const refSubmitButton = useRef<HTMLButtonElement>(null);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const temp = {
            course: data.course,
            totalYears: data.years.total,
            includedYears: data.years.specifyRange === false ? "All" : `${data.years.rangeFrom} to ${data.years.rangeTo}`
        }

        props.passData(JSON.stringify(temp));
    }

    useEffect(() => {
        if (props.trigger) {
            refSubmitButton?.current?.click();
        }
    }, [props.trigger])

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Define your crowds' education details</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="course"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-large font-semibold">Course</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Enter course names, comma separated if multiple"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="years.total"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-large font-semibold">Total Years</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Enter average amount of years to complete the courses"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="years.specifyRange"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Specify Year Range? <span className="text-gray-400">(leave unchecked if all are included)</span></FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {form.getValues("years.specifyRange") === true ?
                            <div className="w-full flex items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="years.rangeFrom"
                                    render={({ field }) => (
                                        <div className="w-full">
                                            <FormLabel>From</FormLabel>
                                            <FormControl>
                                                <Input type="number" value={field.value} onChange={field.onChange} placeholder="1" />
                                            </FormControl>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="years.rangeTo"
                                    render={({ field }) => (
                                        <div className="w-full">
                                            <FormLabel>To</FormLabel>
                                            <FormControl>
                                                <Input type="number" value={field.value} onChange={field.onChange} placeholder="4" />
                                            </FormControl>
                                        </div>
                                    )}
                                />
                            </div>
                            : <></>}
                        <Button className="hidden" ref={refSubmitButton} type="submit"></Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}