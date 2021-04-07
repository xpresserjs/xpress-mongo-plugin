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
  useStrictTypescriptModels: false, // >=v1.0.0
  
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
xjs make:model [ModelName]
```

**NOTE:** This plugin modifies xpresser's default factory template for models.