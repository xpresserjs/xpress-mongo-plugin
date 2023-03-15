// @ts-ignore
import JobHelper = require("xpresser/dist/src/Console/JobHelper");
import type IJobHelper from "xpresser/src/Console/JobHelper";
import {DollarSign} from "xpresser/types";
import Migration, {MigrationDataType} from "../models/Migration";
import MigratorFunctions from "../lib/MigratorFunctions";


export = async (args: string[], {helper}: { helper: IJobHelper }) => {
    const $ = helper.$;

    const isUndo = args[0] === "undo";
    // const isVerbose = args.includes("verbose");

    // get xpresser instance
    $.logInfo(`${isUndo ? "UNDO" : "DO"} -- Migration`);

    if (isUndo) {
        await undoMigration($);
    } else {
        await doMigration($);
    }

    return $.exit();
};

async function doMigration($: DollarSign) {
    const MigrationFolder = MigratorFunctions.migrationFolder($)

    // get all files in folder
    const files = $.file.readDirectory(MigrationFolder);
    if (!files) return $.logError("No DbMigration Files Found.");

    const batch: MigrationDataType["files"] = [];

    // loop through all files and check if file exists
    for (const f of files as string[]) {
        // remove files that don't have __
        if (!MigratorFunctions.isMigrationFile(f)) continue;

        // get file name
        const path = MigratorFunctions.removeFileExtension(f);

        // check if migration exists
        const migration = await Migration.has(path);
        if (migration) continue;

        let job: { handler?: Function } | undefined;

        try {
            job = require(MigrationFolder + "/" + path);

            // check if job has handler
            if (!job || (job && !job.handler)) {
                $.logError(`Migration file [${path}] has no handler.`);
                continue;
            }
        } catch (e) {
            $.logError(`Error while importing [${path}]`);
            $.logError(e);
            continue;
        }

        // const jobPath = "migrations/" + pat
        $.logInfo(`Start: [${path}]`);

        try {
            await job!.handler!(["do"], new JobHelper(path));
        } catch (e) {
            $.logError(`Error while running [${path}]`);
            $.logError(e);
            continue;
        }

        batch.push({path});

        // save migration
        $.logSuccess(`Completed: [${path}]`);
    }

    // save batch
    if (batch.length > 0) {
        await Migration.addBatch(batch);
    } else {
        $.logInfo("No new Migration found");
    }
}

async function undoMigration($: DollarSign) {
    const MigrationFolder = MigratorFunctions.migrationFolder($)

    // get last batch
    const lastBatch = await Migration.lastBatch();

    if (!lastBatch) {
        $.logInfo("No Migration to undo");
        return;
    }

    // loop through all files and run
    let index = 0;
    let completed = 0;
    for (const f of lastBatch.data.files) {
        let job: { handler?: Function } | undefined;

        try {
            job = require(MigrationFolder + "/" + f.path);

            // check if job has handler
            if (!job || (job && !job.handler)) {
                $.logError(`Migration file [${f.path}] has no handler.`);
                continue;
            }
        } catch (e) {
            $.logError(`Error while importing [${f.path}]`);
            $.logError(e);
            continue;
        }

        $.logInfo(`Start: [${f.path}]`);

        try {
            await job!.handler!(["undo"], new JobHelper(f.path));

            // remove file from batch
            await Migration.removeFileFromBatch(lastBatch.id(), index);
            completed++;
        } catch (e) {
            $.logError(`Error while running [${f.path}]`);
            $.logError(e);
            continue;
        }

        index++;

        $.logSuccess(`Completed: [${f.path}]`);
    }

    if (completed === lastBatch.data.files.length) {
        await lastBatch.delete();
        $.logSuccess("Undo Migration Completed");
    } else {
        $.logError("Undo Migration Completed with errors");
    }
}
