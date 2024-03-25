"use client";
import { trpc } from "@/server/client";

export default function Home() {
    const spells = trpc.spells.get.useQuery();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {JSON.stringify(spells.data, null, 2)}
        </main>
    );
}
