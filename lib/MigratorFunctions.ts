import type {DollarSign} from "xpresser/types";
import path from "node:path";


class MigratorFunctions {

    static migrationFolder($: DollarSign) {
        return $.path.backend("jobs/migrations");
    }

    static migrationStub() {
        let stub = path.resolve(__dirname.replace("dist", ""), "../Factory/migration.txt");

        // if stub has `dist` remove it
        // if(stub.includes("dist")) stub = stub.replace("dist", "");

        return stub;
    }

    /**
     * Check if a filePath is a migration file
     * @param filePath
     */
    static isMigrationFile(filePath: string): boolean {
        return filePath.includes("__");
    }

    /**
     * Remove file extension
     * @param filePath
     */
    static removeFileExtension(filePath: string): string {
        // get file nam
        // remove file extension
        if (filePath.endsWith(".ts")) filePath = filePath.replace(".ts", "");
        if (filePath.endsWith(".js")) filePath = filePath.replace(".js", "");

        return filePath;
    }


    /**
     * Check if a migration file exists
     * @param $
     * @param filePath
     */
    static migrationExists($: DollarSign, filePath: string): boolean {
        const MigrationFolder = this.migrationFolder($)

        // const file = path.resolve(MigrationFolder, filePath);
        const folder = path.dirname(path.resolve(MigrationFolder, filePath));

        // get all files in folder
        const files = $.file.readDirectory(folder);
        if (!files) return false;

        // loop through all files and check if file exists
        for (const f of files as string[]) {
            if (!this.isMigrationFile(f)) continue;
            if (this.getMigrationName(f) === filePath) return true;
        }

        return false;
    }


    /**
     * Get DbMigration Name
     * @param filePath
     */
    static getMigrationName(filePath: string): string {
        // get file name
        let name = filePath.split("__")[1];
        return this.removeFileExtension(name);
    }
}

export default MigratorFunctions;