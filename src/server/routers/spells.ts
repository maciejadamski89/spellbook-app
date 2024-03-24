import { publicProcedure, router } from "../trpc";

export const spellRouter = router({
    get: publicProcedure.query(() => {
        return [];
    }),
});
