import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shared/dialog";
import { trpc } from "@/server/client";
import { useState } from "react";
import { Input } from "./shared/input";
import { Button } from "./shared/button";

export default function Spellbook() {
    const spellbook = trpc.spellbook.get.useQuery();
    const addSpellbook = trpc.spellbook.create.useMutation();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const addNewSpellbook = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addSpellbook.mutate({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <div className="grid grid-cols-4 gap-4">
            {spellbook.data?.map((spellbook) => (
                <Card key={spellbook.id}>
                    <CardHeader>
                        <CardTitle>{spellbook.title}</CardTitle>
                        <CardDescription>{spellbook.description}</CardDescription>
                    </CardHeader>
                    <CardContent>spells</CardContent>
                </Card>
            ))}
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="flex justify-center items-center group cursor-pointer transition-all duration-200 hover:border-indigo-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 text-gray-400 group-hover:text-indigo-600 transition-all duration-200"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={addNewSpellbook} className="space-y-4">
                        <DialogHeader className="space-y-2">
                            <DialogTitle>Create Your Spellbook</DialogTitle>
                            <DialogDescription>Create your collections of spells.</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-y-4">
                            <div className="space-y-2">
                                <p className="font-medium">Title: </p>
                                <Input onChange={(e) => setTitle(e.target.value as string)} />
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium">Description: </p>
                                <Input onChange={(e) => setDescription(e.target.value as string)} />
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="submit">Create</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
