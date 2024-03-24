import { spellRouter } from "./routers/spells";
import { router } from "./trpc";

export const appRouter = router({
    gpt: spellRouter,
});

export type AppRouter = typeof appRouter;
