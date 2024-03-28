import { spellBookRouter } from "./routers/spellbooks";
import { spellsRouter } from "./routers/spells";
import { router } from "./trpc";

export const appRouter = router({
    spells: spellsRouter,
    spellbook: spellBookRouter,
});

export type AppRouter = typeof appRouter;
