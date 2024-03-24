import { spellsRouter } from "./routers/spells";
import { router } from "./trpc";

export const appRouter = router({
    spells: spellsRouter,
});

export type AppRouter = typeof appRouter;
