import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const spellsRouter = router({
    get: publicProcedure.query(async () => {
        return prisma.spell.findMany();
    }),
    create: publicProcedure
        .input(
            z.object({
                spellbookId: z.number(),
                title: z.string(),
                description: z.string(),
                image: z.string(),
            })
        )
        .mutation(async (opts) => {
            const { input } = opts;
            return prisma.spell.create({
                data: {
                    title: input.title,
                    description: input.description,
                    image: input.image,
                    spellbookId: input.spellbookId,
                },
            });
        }),
    delete: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async (opts) => {
            const { input } = opts;
            return prisma.spell.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
