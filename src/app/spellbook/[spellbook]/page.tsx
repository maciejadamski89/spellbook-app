"use client";
import { trpc } from "@/server/client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/table";
import Image from "next/image";
import { Button } from "@/components/shared/button";
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
import { useRef, useState } from "react";
import { Input } from "@/components/shared/input";
import { useToast } from "@/components/shared/use-toast";
import { useRouter } from "next/navigation";

type TSpellbookPage = {
    params: {
        spellbook: number;
    };
};

export default function SpellbookPage({ params }: TSpellbookPage) {
    const spellbook = trpc.spellbook.getById.useQuery({
        id: +params.spellbook,
    });
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const fileRef = useRef<HTMLInputElement>(null);
    const addSpell = trpc.spells.create.useMutation();
    const deleteSpell = trpc.spells.delete.useMutation();
    const deleteSpellbook = trpc.spellbook.delete.useMutation();
    const router = useRouter();
    const handleAddNewSpell = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!spellbook.data?.id) return;
        if (fileRef.current?.files) {
            const formData = new FormData();
            const file = fileRef.current.files[0];
            formData.append("files", file);
            const request = { method: "POST", body: formData };
            fetch("/api/file", request);
            addSpell.mutate(
                { title, description, spellbookId: spellbook.data?.id, image: `/${file.name}` },
                { onSettled: () => spellbook.refetch() }
            );
        }
        setTitle("");
        setDescription("");
        router.refresh();
        toast({
            variant: "success",
            title: title,
            description: `${title} spell has been added`,
        });
    };
    const handleDeleteSpell = (id: number, spell: string) => {
        toast({
            variant: "destructive",
            title: spell,
            description: `${spell} spell has been deleted`,
        });
        deleteSpell.mutate({ id }, { onSettled: () => spellbook.refetch() });
    };
    const handleDeleteSpellbook = () => {
        toast({
            variant: "destructive",
            title: spellbook.data?.title,
            description: `${spellbook.data?.title} spellbook has been deleted`,
        });
        if (spellbook?.data?.id) {
            deleteSpellbook.mutate({ id: spellbook.data.id });
        } else {
            console.error("Spellbook or spellbook data is undefined");
        }
        router.push("/");
    };
    const { toast } = useToast();
    return (
        <div className="w-full space-y-4">
            <div className="flex gap-x-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add new spell</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleAddNewSpell} className="space-y-4">
                            <DialogHeader className="space-y-2">
                                <DialogTitle>Create your spell</DialogTitle>
                                <DialogDescription>
                                    Add some powerfull magic to your{" "}
                                    <span className="text-indigo-600">{spellbook?.data?.title}</span>
                                </DialogDescription>
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
                                <div className="space-y-2">
                                    <p className="font-medium">Image: </p>
                                    <Input type="file" ref={fileRef} />
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="submit">Save</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={() => router.push("/")}>
                    Back to spellbooks
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteSpellbook()}>
                    Delete spellbook: {spellbook?.data?.title}
                </Button>
            </div>
            <Table>
                <TableCaption>Spell from {spellbook?.data?.title}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {spellbook.data?.spells.map((spell) => (
                        <TableRow key={spell.id}>
                            <TableCell>{spell.title}</TableCell>
                            <TableCell>{spell.description}</TableCell>
                            <TableCell>
                                {spell.image && <Image src={spell.image} width={50} height={50} alt={spell.title} />}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeleteSpell(spell.id, spell.title)} variant="destructive">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
