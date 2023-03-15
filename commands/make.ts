// @ts-ignore
import JobHelper = require("xpresser/dist/src/Console/JobHelper");
import type IJobHelper from "xpresser/src/Console/JobHelper";
import MigratorFunctions from "../lib/MigratorFunctions";


export = async (args: string[], {helper}: { helper: IJobHelper }) => {
    const $ = helper.$;
    let fileName = args[0];

    if (!fileName) {
        return $.logErrorAndExit("Please provide a file name");
    }


    // get xpresser instance
    const time: number = Date.now();

    // check if file name already exists
    const exists = MigratorFunctions.migrationExists($, fileName);
    if (exists) {
        $.logError(`Migration file with name [${fileName}] already exists.`);
        return;
    }

    // add time in front of file name
    fileName = `${time}__${fileName}`;
    $.logInfo(`Creating Migration File: [${fileName}]`);

    // create migration file
    const MigrationFolder = MigratorFunctions.migrationFolder($)
    const MigrationStub = MigratorFunctions.migrationStub()
    const fileExtension = $.isTypescript() ? ".ts" : ".js";

    // make directory if not exists
    $.file.makeDirIfNotExist(MigrationFolder);

    // copy stub to migration folder
    $.file.fs().copyFileSync(MigrationStub, MigrationFolder + "/" + fileName + fileExtension);

    $.logSuccess(`Migration file created at ${MigrationFolder}/${fileName}`);

    return $.exit();
};


