<p align="center">
  <img width="100" height="60" src="/sdjs-logo.jpg">
</p>

## SDJS(Self Description JSON Schema)

SDJS is a tool that validates JSON members matched with the descriptions of data presence, type, and constraint.

SDJS includes a group of rules and notations which describe data presence, data type and data constraints to a JSON data, the rules and notations don't change any key-value pairs in JSON, they are some extra members to JSON.

The URL of SDJS on npm is https://npmjs.com/package/sdjs

SDJS-Web is a version of SDJS specified for web browsers. To access [SDJS-Web repository](https://github.com/w3plan/sdjs-web "SDJS-Web") for the details.


## Documentation

To see [Self Description JSON Schema](https://www.w3plan.net/pfsdjs/ "SDJS documentation")


## Installation

  ` $ npm install sdjs `


## Usage

```javascript
  const { valiSdjs } = require('sdjs');
  
  // supposing that sdjsObj is a JSON object with Self Description JSON Schema
  if ( valiSdjs(sdjsObj) ) {
    console.log("validation failed");
  } else {
    console.log("validation succeeded");
  }  
  
```


## Tests

Runs the following commands from your project.

` $ cd ./node_modules/sdjs ` <br>
` $ npm test `


## License

MIT


## Keywords

> presence, type, constraint, schema, sdjs, sdjs-web, json

