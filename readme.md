# Xpresser XpressMongo Plugin

Xpress mongo is a light nodejs library for mongodb.

### Installation

Install **xpress-mongo** && **@xpresser/xpress-mongo** plugin

 ```shell script
npm i xpress-mongo @xpresser/xpress-mongo
# OR
yarn add xpress-mongo @xpresser/xpress-mongo
```

### Setup

Add `npm://@xpresser/xpress-mongo` to plugins array in your plugins.json file.

Note: if you don't have `plugins.json` file in your project create one in your **backend** folder.
**backend/plugins.json**

 ```json
{
  "npm://@xpresser/xpress-mongo": true
}
 ```

### Config

Add to your configuration using key `mongodb`, Example:

 ```javascript
const config = {
  /**
   * If Enabled, xjs make:model will generate Models
   * that requires you to define all data types.
   */
  useStrictTypescriptModels: true, // >=v1.0.0
  
  // Connection Config
  mongodb: {
    url: 'mongodb://127.0.0.1:27017',
    database: 'test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};
 ```

### Commands

```sh
npx xjs make:model <ModelName>
```

**NOTE:** This plugin modifies xpresser's default factory template for models.

## Migration

To activate migration commands, add `npm://@xpresser/xpress-mongo` to the `extensions` array in your `use-xjs-cli.json`
file.

Like so:

```json
{
  "extensions": [
    "npm://@xpresser/xpress-mongo"
  ]
}
```

This will add the following commands to xjs cli.

```sh
# Make migration file
npx xjs make:migration <filename>

# Do migration
npx xjs migrate

# Undo migration
npx xjs migrate undo
```

### Make migration file

To make a migration file, run the following command:

```sh
npx xjs make:migration <filename>

# Example
npx xjs make:migration add-users
```

This will create a migration file in your `jobs/migrations` folder. The file name will be **prefixed** with a timestamp.
E.g `1610000000000__add-users`, the timestamp is in milliseconds, it is used to order migrations.

The migration file should look like this:

```typescript
import {defineMigrationJob} from "@xpresser/xpress-mongo";

export = defineMigrationJob((m) => {
    /**
     * Do Migration
     */
    m.do(async () => {
        // do migration code
    });

    /**
     * Undo Migration
     */
    m.undo(async () => {
        // undo migration code
    });
});
```

### Do migration

To run the `do` function in your migration file, run the following command:

```sh
npx xjs migrate
```

This will run all migrations `do` functions that have not been run yet and save the migration to the database as a
batch.

### Undo migration

To run the `undo` function in your migration file, run the following command:

```sh
npx xjs migrate undo
```

This will run all migrations `undo` functions in the last batch and remove the batch from the database.

### Do or Undo if condition is met

There is a `doIf` and `undoIf` method that can be used to run the `do` or `undo` function if a condition is met.

if `doIf` returns `false` the `do` function will be **skipped** same goes for `undoIf` and `undo` function.

**Note:** if there is no `doIf` or `undoIf` function, the `do` or `undo` function will be called.

```typescript
import {defineMigrationJob} from "@xpresser/xpress-mongo";

export = defineMigrationJob((m) => {

    m.doIf(async () => {
        // return true to run `do` function
        // return false to skip `do` function
        return true;
    });


    m.undoIf(async () => {
        // return true to run `undo` function
        // return false to skip `undo` function
        return true;
    });

    /**
     * Do Migration
     */
    m.do(async () => {
        // do migration code
    });

    /**
     * Undo Migration
     */
    m.undo(async () => {
        // undo migration code
    });
});
```


### Do or Undo a  migration file.
In some cases you may want to run a migration file without relying on the database to keep track of migrations, you can call the `do` or `undo` function directly.

Since migration files are **jobs**, you can call them directly using the `xjs` cli.

```sh
# Do migration
npx xjs run migrations/<filename> do

# Undo migration
npx xjs run migrations/<filename> undo
```

