import {is, joi, ObjectId, XMongoModel, XMongoSchema} from "xpress-mongo";
import {UseCollection} from "../util";


/**
 * Interface for Model's `this.data`. (For Typescript)
 * Optional if accessing data using model helper functions
 *
 * @example
 * this.data.updatedAt? // type Date
 * this.data.createdAt // type Date
 */
export interface MigrationDataType {
    files: Array<{ path: string }>;
    updatedAt?: Date;
    createdAt: Date;
}

class Migration extends XMongoModel {
    /**
     * Model Schema
     */
    static schema: XMongoSchema<MigrationDataType> = {
        files: joi.array().items(
            <Record<keyof MigrationDataType["files"][number], any>>{
                path: joi.string().required()
            }
        ),
        updatedAt: is.Date(),
        createdAt: is.Date().required()
    };

    // SET Type of this.data.
    public data!: MigrationDataType;

    // Find Migration by name
    static has(path: string) {
        return this.exists({"files.path": path});
    }

    /**
     * Add Batch of files to migration
     * @param files
     */
    static async addBatch(files: MigrationDataType["files"]) {
        const migration = this.make(<Partial<MigrationDataType>>{files});

        await migration.save();

        return migration;
    }

    /**
     * Get last batch of migrations
     */
    static lastBatch() {
        return this.findOne({}, {sort: {createdAt: -1}});
    }

    /**
     * Remove file from batch
     */
    static async removeFileFromBatch(batchId: ObjectId, fileIndex: number) {
        return this.native().updateOne(
            {_id: batchId},
            {$unset: {[`files.${fileIndex}`]: ""}}
        );
    }
}

/**
 * Map Model to Collection: `migrations`
 * .native() will be made available for use.
 */
UseCollection(Migration, "db-migrations");

Migration.native().createIndex({"file.name": 1}).catch(console.error);

// Export Model as Default
export default Migration;
