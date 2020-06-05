<p align="center">
  <img width="100" height="60" src="/sdjs-logo.jpg">
</p>

## SDJSchema(Self Description JSON Schema)

SDJSchema is a tool that validates JSON members matched with the descriptions of data presence, type, and constraint.

SDJSchema includes a group of rules and notations which describe data presence, data type and data constraints to a JSON data, the rules and notations don't change any key-value pairs in JSON, they are some extra members to JSON.

The URL of SDJSchema on npm is https://www.npmjs.com/package/sdjschema

SDJS-Web is a version of SDJSchema specified for web browsers. To access [SDJS-Web repository](https://github.com/w3plan/sdjs-web "SDJS-Web") for the details.


## Documentation

To see [Self Description JSON Schema](https://www.w3plan.net/pfsdjs/ "SDJSchema documentation")


## Installation

  ` $ npm install sdjschema `


## Usage

```javascript
  const { valiSdjs } = require('sdjschema');
  
  // supposing that sdjsObj is a JSON object with Self Description JSON Schema
  if ( valiSdjs(sdjsObj) ) {
    console.log("validation succeeded.");
  } else {
    console.log("validation failed.");
  }  
```


## Tests

Runs the following commands from your project.

` $ cd ./node_modules/sdjschema ` <br>
` $ npm test `


## License

MIT


## Keywords

> presence, type, constraint, schema, sdjs, sdjschema, sdjs-web, json

