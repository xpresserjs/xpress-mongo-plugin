# Xpresser XpressMongo Plugin
Xpress mongo is a light nodejs library for mongodb.
 
 
 ### Setup
 1. Install `@xpresser/xpress-mongo` in your project
 2. Add `npm://@xpresser/xpress-mongo` to plugins array in your plugins.json file.
 
 Note: if you don't have `plugins.json` file in your project create one in your **backend** folder.
 **backend/plugins.json**
 ```json
 [
   "npm://@xpresser/xpress-mongo"
 ]
 ```
 
 ### Config
 Add to your configuration using key `mongodb`
 ```javascript
 {
   mongodb: {
     url: 'mongodb://127.0.0.1:27017',
     database: 'test',
     options: {
         useNewUrlParser: true,
         useUnifiedTopology: true
     }
   }
 }
 ```

### Commands
```sh
xjs make:model [ModelName]
```
**NOTE:** This plugin modifies the factory template for models