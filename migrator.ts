import type JobHelper from "xpresser/src/Console/JobHelper";
import type {DollarSign} from "xpresser/types";

type MigrationFileAction = "do" | "undo" | undefined;

function parseMigrationArgs(args: string[]) {
    let action: MigrationFileAction = args[0] as MigrationFileAction;
    if (action !== "do" && action !== "undo") action = undefined;
    return {action, args: args.slice(1)};
}

function requireAction(job: JobHelper, action: MigrationFileAction) {
    if (!action) {
        job.$.logError("Error: Please provide an action [do|undo]");
        return job.$.exit()
    }
}

type DbMigrationFunctions = {
    do?: () => void;
    undo?: () => void;
    doIf?: () => boolean | Promise<boolean>;
    undoIf?: () => boolean | Promise<boolean>;
};

class DbMigration {
    // job args
    public args: string[];
    // migration action
    public action: "do" | "undo";

    // private function that stores do and undo functions
    #functions: DbMigrationFunctions = {};

    constructor(args: string[], private job: JobHelper) {
        const {action, args: $args} = parseMigrationArgs(args);
        requireAction(job, action);

        this.action = action as "do" | "undo";
        this.args = $args;
    }

    #stopIfFunctionAlreadyExists(fn: keyof DbMigrationFunctions) {
        if (this.#functions[fn]) {
            this.job.$.logError(`${fn} function already exists.`);
            return this.job.end(true);
        }
    }

    do(fn: () => void) {
        // check if you do function already exists
        this.#stopIfFunctionAlreadyExists("do");

        this.#functions.do = fn;

        return this;
    }

    undo(fn: () => void) {
        // check if undo function already exists
        this.#stopIfFunctionAlreadyExists("undo");

        this.#functions.undo = fn;

        return this;
    }

    doIf(fn: () => boolean | Promise<boolean>) {
        // check if doIf function already exists
        this.#stopIfFunctionAlreadyExists("doIf");

        this.#functions.doIf = fn;

        return this;
    }

    undoIf(fn: () => boolean | Promise<boolean>) {
        // check if undoIf function already exists
        this.#stopIfFunctionAlreadyExists("undoIf");

        this.#functions.undoIf = fn;

        return this;
    }

    async run() {
        if (!this.#functions[this.action]) {
            this.job.$.logError(`No ${this.action} function found.`);
            return;
        }

        if (this.action === "do") {
            if (this.#functions.doIf && !(await this.#functions.doIf())) {
                this.job.$.logCalmly("Skipping do function.");
                return;
            }
        } else {
            if (this.#functions.undoIf && !(await this.#functions.undoIf())) {
                this.job.$.logInfo("Skipping undo function.");
                return;
            }
        }

        await this.#functions[this.action]!();

        // end process if undo
        if (this.action === "undo") {
            this.job.end(true);
        }
    }
}

/**
 * Define Migration Job
 * @param fn
 */
export function defineMigrationJob(fn: (m: DbMigration, $: DollarSign) => void) {
    return {
        async handler(args: string[], job: JobHelper) {
            // init migration
            const m = new DbMigration(args, job);

            // call migration function
            await fn(m, job.$);

            // run migration
            await m.run();
        }
    };
}
