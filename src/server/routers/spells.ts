import { publicProcedure, router } from "../trpc";

export const spellsRouter = router({
    get: publicProcedure.query(() => {
        return ["dupa"];
    }),
});
