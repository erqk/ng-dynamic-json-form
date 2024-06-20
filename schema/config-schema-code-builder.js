// https://ajv.js.org/standalone.html

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const standaloneCode = require("ajv/dist/standalone").default;
const schemaConditions = require("./config-conditions.schema.json");
const schemaLayout = require("./config-layout.schema.json");
const schemaOptions = require("./config-options.schema.json");
const schemaValidators = require("./config-validators.schema.json");
const schemaMain = require("./config-main.schema.json");

// For ESM, the export name needs to be a valid export name, it can not be `export const #/definitions/Foo = ...;` so we
// need to provide a mapping between a valid name and the $id field. Below will generate
// `export const Foo = ...;export const Bar = ...;`
// This mapping would not have been needed if the `$ids` was just `Bar` and `Foo` instead of `#/definitions/Foo`
// and `#/definitions/Bar` respectfully
const ajv = new Ajv({
  schemas: [
    schemaConditions,
    schemaLayout,
    schemaOptions,
    schemaValidators,
    schemaMain,
  ],
  code: { source: true, esm: true },
});
let moduleCode = standaloneCode(ajv);

// Now you can write the module code to file
fs.writeFileSync(
  path.join(__dirname, "../lib/core/utilities/schema-validator.js"),
  moduleCode
);
