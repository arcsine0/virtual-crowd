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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function CardLoader(props: { name: string, trigger: number, passData: (data: string) => void }) {
    const cards: { [key: string]: FC<any> } = {
        AgeCard,
        SexCard,
        GenderCard,
    }

    const Card = cards[props.name];
    return <Card trigger={props.trigger} passData={props.passData} />
}

export function AgeCard(props: { trigger: number, passData: (data: string) => void }) {
    const formSchema = z.object({
        valueType: z.enum(["age", "age-range"]),
        age: z.object({
            single: z.number(),
            rangeFrom: z.number(),
            rangeTo: z.number()
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            valueType: "age",
            age: { single: 18, rangeFrom: 18, rangeTo: 24 }
        },
    });

    // temporary solution to global saving
    const refSubmitButton = useRef<HTMLButtonElement>(null);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (data.valueType === "age") { props.passData(data.age.single.toString()); }
        else { props.passData(`${data.age.rangeFrom.toString()} to ${data.age.rangeTo.toString()}`); }
    }

    useEffect(() => {
        if (props.trigger) {
            refSubmitButton?.current?.click();
        }
    }, [props.trigger])

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Age</CardTitle>
                <CardDescription>Define your crowds age or age range</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="valueType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <RadioGroupItem value="age" />
                                                </FormControl>
                                                <FormLabel>Age</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <RadioGroupItem value="age-range" />
                                                </FormControl>
                                                <FormLabel>Age Range</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="age"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    {form.getValues("valueType") === "age"
                                        ? <FormField
                                            control={form.control}
                                            name="age.single"
                                            render={({ field }) => (
                                                <FormControl>
                                                    <Input type="number" value={field.value} onChange={field.onChange} placeholder="18" />
                                                </FormControl>
                                            )}
                                        />
                                        : <div className="w-full flex items-center gap-2">
                                            <FormField
                                                control={form.control}
                                                name="age.rangeFrom"
                                                render={({ field }) => (
                                                    <div className="w-full">
                                                        <FormLabel>From</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" value={field.value} onChange={field.onChange} placeholder="18" />
                                                        </FormControl>
                                                    </div>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="age.rangeTo"
                                                render={({ field }) => (
                                                    <div className="w-full">
                                                        <FormLabel>To</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" value={field.value} onChange={field.onChange} placeholder="18" />
                                                        </FormControl>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    }
                                </FormItem>
                            )}
                        />
                        <Button className="hidden" ref={refSubmitButton} type="submit"></Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export function SexCard(props: { trigger: number, passData: (data: string) => void }) {
    const formSchema = z.object({
        sex: z.enum(["Male", "Female", "Both"], {
            required_error: "You need to select the crowd's sex",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sex: "Both",
        },
    });

    // temporary solution to global saving
    const refSubmitButton = useRef<HTMLButtonElement>(null);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        props.passData(data.sex);
    }

    useEffect(() => {
        if (props.trigger) {
            refSubmitButton?.current?.click();
        }
    }, [props.trigger])

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Sex</CardTitle>
                <CardDescription>Define your crowds' sex</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="sex"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-large font-semibold">Options</FormLabel>
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
                        <Button className="hidden" ref={refSubmitButton} type="submit"></Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export function GenderCard(props: { trigger: number, passData: (data: string) => void }) {
    const genders = [
        { id: "lesbian", label: "Lesbian" },
        { id: "gay", label: "Gay" },
        { id: "bisexual", label: "Bisexual" },
        { id: "transgender", label: "Transgender" },
        { id: "queer", label: "Queer" },
        { id: "questioning", label: "Questioning" },
        { id: "intersex", label: "Intersex" },
        { id: "asexual", label: "Asexual" }
    ]

    const formSchema = z.object({
        specifyGender: z.boolean().default(false),
        gender: z.array(z.string()).refine((value) => value.some((gender) => gender))
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            specifyGender: false,
            gender: ["lesbian"]
        },
    });

    // temporary solution to global saving
    const refSubmitButton = useRef<HTMLButtonElement>(null);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (data.specifyGender === false) { props.passData("All"); }
        else { props.passData(`${data.gender}`); }
    }

    useEffect(() => {
        if (props.trigger) {
            refSubmitButton?.current?.click();
        }
    }, [props.trigger])

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Gender</CardTitle>
                <CardDescription>Define your crowds' gender</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="specifyGender"
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
                        {form.getValues("specifyGender") === true ?
                            <FormField
                                control={form.control}
                                name="gender"
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
                        <Button className="hidden" ref={refSubmitButton} type="submit"></Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}