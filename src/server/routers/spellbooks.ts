import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const spellBookRouter = router({
    get: publicProcedure.query(async () => {
        return prisma.spellbook.findMany();
    }),
    create: publicProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        )
        .mutation(async (opts) => {
            const { input } = opts;
            return prisma.spellbook.create({
                data: {
                    title: input.title,
                    description: input.description,
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
            return prisma.spellbook.delete({
                where: {
                    id: input.id,
                },
            });
        }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async (opts) => {
        const { input } = opts;
        return await prisma.spellbook.findFirst({
            where: {
                id: input.id,
            },
            include: {
                spells: true,
            },
        });
    }),
});
