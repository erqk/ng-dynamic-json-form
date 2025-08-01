"use strict";
export const ConfigConditionsSchema = validate10;
const schema11 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigConditionsSchema", "type": "object", "patternProperties": { "^.+$": { "$ref": "#/definitions/conditionGroupConfig" } }, "additionalProperties": false, "definitions": { "conditionIfConfig": { "type": "array", "minItems": 3, "maxItems": 3, "items": [{}, { "enum": ["===", "!==", ">=", ">", "<=", "<", "includes", "notIncludes"] }, {}] }, "conditionGroupItem": { "type": "array", "items": { "anyOf": [{ "$ref": "#/definitions/conditionIfConfig" }, { "$ref": "#/definitions/conditionGroupConfig" }] } }, "conditionGroupConfig": { "type": "object", "properties": { "&&": { "$ref": "#/definitions/conditionGroupItem" }, "||": { "$ref": "#/definitions/conditionGroupItem" } }, "additionalProperties": false }, "conditionConfig": { "type": "object", "patternProperties": { "^.+$": { "$ref": "#/definitions/conditionGroupConfig" } }, "additionalProperties": false } } };
const pattern0 = new RegExp("^.+$", "u");
const schema12 = { "type": "object", "properties": { "&&": { "$ref": "#/definitions/conditionGroupItem" }, "||": { "$ref": "#/definitions/conditionGroupItem" } }, "additionalProperties": false };
const schema13 = { "type": "array", "items": { "anyOf": [{ "$ref": "#/definitions/conditionIfConfig" }, { "$ref": "#/definitions/conditionGroupConfig" }] } };
const schema14 = { "type": "array", "minItems": 3, "maxItems": 3, "items": [{}, { "enum": ["===", "!==", ">=", ">", "<=", "<", "includes", "notIncludes"] }, {}] };
const wrapper0 = { validate: validate11 };
function validate12(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (errors === 0) {
    if (Array.isArray(data)) {
        var valid0 = true;
        const len0 = data.length;
        for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            const _errs2 = errors;
            let valid1 = false;
            const _errs3 = errors;
            const _errs4 = errors;
            if (errors === _errs4) {
                if (Array.isArray(data0)) {
                    if (data0.length > 3) {
                        const err0 = { instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/conditionIfConfig/maxItems", keyword: "maxItems", params: { limit: 3 }, message: "must NOT have more than 3 items" };
                        if (vErrors === null) {
                            vErrors = [err0];
                        }
                        else {
                            vErrors.push(err0);
                        }
                        errors++;
                    }
                    else {
                        if (data0.length < 3) {
                            const err1 = { instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/conditionIfConfig/minItems", keyword: "minItems", params: { limit: 3 }, message: "must NOT have fewer than 3 items" };
                            if (vErrors === null) {
                                vErrors = [err1];
                            }
                            else {
                                vErrors.push(err1);
                            }
                            errors++;
                        }
                        else {
                            const len1 = data0.length;
                            if (len1 > 1) {
                                let data1 = data0[1];
                                if (!((((((((data1 === "===") || (data1 === "!==")) || (data1 === ">=")) || (data1 === ">")) || (data1 === "<=")) || (data1 === "<")) || (data1 === "includes")) || (data1 === "notIncludes"))) {
                                    const err2 = { instancePath: instancePath + "/" + i0 + "/1", schemaPath: "#/definitions/conditionIfConfig/items/1/enum", keyword: "enum", params: { allowedValues: schema14.items[1].enum }, message: "must be equal to one of the allowed values" };
                                    if (vErrors === null) {
                                        vErrors = [err2];
                                    }
                                    else {
                                        vErrors.push(err2);
                                    }
                                    errors++;
                                }
                            }
                        }
                    }
                }
                else {
                    const err3 = { instancePath: instancePath + "/" + i0, schemaPath: "#/definitions/conditionIfConfig/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                    if (vErrors === null) {
                        vErrors = [err3];
                    }
                    else {
                        vErrors.push(err3);
                    }
                    errors++;
                }
            }
            var _valid0 = _errs3 === errors;
            valid1 = valid1 || _valid0;
            if (!valid1) {
                const _errs7 = errors;
                if (!(wrapper0.validate(data0, { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData }))) {
                    vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
                    errors = vErrors.length;
                }
                var _valid0 = _errs7 === errors;
                valid1 = valid1 || _valid0;
            }
            if (!valid1) {
                const err4 = { instancePath: instancePath + "/" + i0, schemaPath: "#/items/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                    vErrors = [err4];
                }
                else {
                    vErrors.push(err4);
                }
                errors++;
                validate12.errors = vErrors;
                return false;
            }
            else {
                errors = _errs2;
                if (vErrors !== null) {
                    if (_errs2) {
                        vErrors.length = _errs2;
                    }
                    else {
                        vErrors = null;
                    }
                }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
                break;
            }
        }
    }
    else {
        validate12.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
    }
} validate12.errors = vErrors; return errors === 0; }
function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        const _errs1 = errors;
        for (const key0 in data) {
            if (!((key0 === "&&") || (key0 === "||"))) {
                validate11.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
                return false;
                break;
            }
        }
        if (_errs1 === errors) {
            if (data["&&"] !== undefined) {
                const _errs2 = errors;
                if (!(validate12(data["&&"], { instancePath: instancePath + "/&&", parentData: data, parentDataProperty: "&&", rootData }))) {
                    vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                    errors = vErrors.length;
                }
                var valid0 = _errs2 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data["||"] !== undefined) {
                    const _errs3 = errors;
                    if (!(validate12(data["||"], { instancePath: instancePath + "/||", parentData: data, parentDataProperty: "||", rootData }))) {
                        vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                        errors = vErrors.length;
                    }
                    var valid0 = _errs3 === errors;
                }
                else {
                    var valid0 = true;
                }
            }
        }
    }
    else {
        validate11.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate11.errors = vErrors; return errors === 0; }
function validate10(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigConditionsSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        const _errs1 = errors;
        for (const key0 in data) {
            if (!(pattern0.test(key0))) {
                validate10.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
                return false;
                break;
            }
        }
        if (_errs1 === errors) {
            var valid0 = true;
            for (const key1 in data) {
                if (pattern0.test(key1)) {
                    const _errs2 = errors;
                    if (!(validate11(data[key1], { instancePath: instancePath + "/" + key1.replace(/~/g, "~0").replace(/\//g, "~1"), parentData: data, parentDataProperty: key1, rootData }))) {
                        vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);
                        errors = vErrors.length;
                    }
                    var valid0 = _errs2 === errors;
                    if (!valid0) {
                        break;
                    }
                }
            }
        }
    }
    else {
        validate10.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate10.errors = vErrors; return errors === 0; }
export const ConfigLayoutSchema = validate16;
const schema15 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigLayoutSchema", "type": "object", "properties": { "hostClass": { "type": "string" }, "hostStyles": { "type": "string" }, "labelClass": { "type": "string" }, "labelStyles": { "type": "string" }, "contentClass": { "type": "string" }, "contentStyles": { "type": "string" }, "formGroupClass": { "type": "string" }, "formGroupStyles": { "type": "string" }, "descriptionClass": { "type": "string" }, "descriptionStyles": { "type": "string" }, "inputAreaClass": { "type": "string" }, "inputAreaStyles": { "type": "string" }, "errorClass": { "type": "string" }, "errorStyles": { "type": "string" }, "descriptionPosition": { "enum": ["after", "before"] }, "hideLabel": { "type": "boolean" }, "contentCollapsible": { "enum": ["collapse", "expand"], "description": "Enable expand/collapse of content. The default state will be determined by value provided" }, "autoAddRequiredClass": { "type": "boolean", "description": "Add `required` class automatically to control if there's validator named `required`. Default is true." } } };
function validate16(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigLayoutSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.hostClass !== undefined) {
            const _errs1 = errors;
            if (typeof data.hostClass !== "string") {
                validate16.errors = [{ instancePath: instancePath + "/hostClass", schemaPath: "#/properties/hostClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
            }
            var valid0 = _errs1 === errors;
        }
        else {
            var valid0 = true;
        }
        if (valid0) {
            if (data.hostStyles !== undefined) {
                const _errs3 = errors;
                if (typeof data.hostStyles !== "string") {
                    validate16.errors = [{ instancePath: instancePath + "/hostStyles", schemaPath: "#/properties/hostStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                }
                var valid0 = _errs3 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data.labelClass !== undefined) {
                    const _errs5 = errors;
                    if (typeof data.labelClass !== "string") {
                        validate16.errors = [{ instancePath: instancePath + "/labelClass", schemaPath: "#/properties/labelClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                    }
                    var valid0 = _errs5 === errors;
                }
                else {
                    var valid0 = true;
                }
                if (valid0) {
                    if (data.labelStyles !== undefined) {
                        const _errs7 = errors;
                        if (typeof data.labelStyles !== "string") {
                            validate16.errors = [{ instancePath: instancePath + "/labelStyles", schemaPath: "#/properties/labelStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                        }
                        var valid0 = _errs7 === errors;
                    }
                    else {
                        var valid0 = true;
                    }
                    if (valid0) {
                        if (data.contentClass !== undefined) {
                            const _errs9 = errors;
                            if (typeof data.contentClass !== "string") {
                                validate16.errors = [{ instancePath: instancePath + "/contentClass", schemaPath: "#/properties/contentClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                            }
                            var valid0 = _errs9 === errors;
                        }
                        else {
                            var valid0 = true;
                        }
                        if (valid0) {
                            if (data.contentStyles !== undefined) {
                                const _errs11 = errors;
                                if (typeof data.contentStyles !== "string") {
                                    validate16.errors = [{ instancePath: instancePath + "/contentStyles", schemaPath: "#/properties/contentStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                }
                                var valid0 = _errs11 === errors;
                            }
                            else {
                                var valid0 = true;
                            }
                            if (valid0) {
                                if (data.formGroupClass !== undefined) {
                                    const _errs13 = errors;
                                    if (typeof data.formGroupClass !== "string") {
                                        validate16.errors = [{ instancePath: instancePath + "/formGroupClass", schemaPath: "#/properties/formGroupClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                    }
                                    var valid0 = _errs13 === errors;
                                }
                                else {
                                    var valid0 = true;
                                }
                                if (valid0) {
                                    if (data.formGroupStyles !== undefined) {
                                        const _errs15 = errors;
                                        if (typeof data.formGroupStyles !== "string") {
                                            validate16.errors = [{ instancePath: instancePath + "/formGroupStyles", schemaPath: "#/properties/formGroupStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                        }
                                        var valid0 = _errs15 === errors;
                                    }
                                    else {
                                        var valid0 = true;
                                    }
                                    if (valid0) {
                                        if (data.descriptionClass !== undefined) {
                                            const _errs17 = errors;
                                            if (typeof data.descriptionClass !== "string") {
                                                validate16.errors = [{ instancePath: instancePath + "/descriptionClass", schemaPath: "#/properties/descriptionClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                            }
                                            var valid0 = _errs17 === errors;
                                        }
                                        else {
                                            var valid0 = true;
                                        }
                                        if (valid0) {
                                            if (data.descriptionStyles !== undefined) {
                                                const _errs19 = errors;
                                                if (typeof data.descriptionStyles !== "string") {
                                                    validate16.errors = [{ instancePath: instancePath + "/descriptionStyles", schemaPath: "#/properties/descriptionStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                }
                                                var valid0 = _errs19 === errors;
                                            }
                                            else {
                                                var valid0 = true;
                                            }
                                            if (valid0) {
                                                if (data.inputAreaClass !== undefined) {
                                                    const _errs21 = errors;
                                                    if (typeof data.inputAreaClass !== "string") {
                                                        validate16.errors = [{ instancePath: instancePath + "/inputAreaClass", schemaPath: "#/properties/inputAreaClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                        return false;
                                                    }
                                                    var valid0 = _errs21 === errors;
                                                }
                                                else {
                                                    var valid0 = true;
                                                }
                                                if (valid0) {
                                                    if (data.inputAreaStyles !== undefined) {
                                                        const _errs23 = errors;
                                                        if (typeof data.inputAreaStyles !== "string") {
                                                            validate16.errors = [{ instancePath: instancePath + "/inputAreaStyles", schemaPath: "#/properties/inputAreaStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                        }
                                                        var valid0 = _errs23 === errors;
                                                    }
                                                    else {
                                                        var valid0 = true;
                                                    }
                                                    if (valid0) {
                                                        if (data.errorClass !== undefined) {
                                                            const _errs25 = errors;
                                                            if (typeof data.errorClass !== "string") {
                                                                validate16.errors = [{ instancePath: instancePath + "/errorClass", schemaPath: "#/properties/errorClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                            }
                                                            var valid0 = _errs25 === errors;
                                                        }
                                                        else {
                                                            var valid0 = true;
                                                        }
                                                        if (valid0) {
                                                            if (data.errorStyles !== undefined) {
                                                                const _errs27 = errors;
                                                                if (typeof data.errorStyles !== "string") {
                                                                    validate16.errors = [{ instancePath: instancePath + "/errorStyles", schemaPath: "#/properties/errorStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                    return false;
                                                                }
                                                                var valid0 = _errs27 === errors;
                                                            }
                                                            else {
                                                                var valid0 = true;
                                                            }
                                                            if (valid0) {
                                                                if (data.descriptionPosition !== undefined) {
                                                                    let data14 = data.descriptionPosition;
                                                                    const _errs29 = errors;
                                                                    if (!((data14 === "after") || (data14 === "before"))) {
                                                                        validate16.errors = [{ instancePath: instancePath + "/descriptionPosition", schemaPath: "#/properties/descriptionPosition/enum", keyword: "enum", params: { allowedValues: schema15.properties.descriptionPosition.enum }, message: "must be equal to one of the allowed values" }];
                                                                        return false;
                                                                    }
                                                                    var valid0 = _errs29 === errors;
                                                                }
                                                                else {
                                                                    var valid0 = true;
                                                                }
                                                                if (valid0) {
                                                                    if (data.hideLabel !== undefined) {
                                                                        const _errs30 = errors;
                                                                        if (typeof data.hideLabel !== "boolean") {
                                                                            validate16.errors = [{ instancePath: instancePath + "/hideLabel", schemaPath: "#/properties/hideLabel/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                            return false;
                                                                        }
                                                                        var valid0 = _errs30 === errors;
                                                                    }
                                                                    else {
                                                                        var valid0 = true;
                                                                    }
                                                                    if (valid0) {
                                                                        if (data.contentCollapsible !== undefined) {
                                                                            let data16 = data.contentCollapsible;
                                                                            const _errs32 = errors;
                                                                            if (!((data16 === "collapse") || (data16 === "expand"))) {
                                                                                validate16.errors = [{ instancePath: instancePath + "/contentCollapsible", schemaPath: "#/properties/contentCollapsible/enum", keyword: "enum", params: { allowedValues: schema15.properties.contentCollapsible.enum }, message: "must be equal to one of the allowed values" }];
                                                                                return false;
                                                                            }
                                                                            var valid0 = _errs32 === errors;
                                                                        }
                                                                        else {
                                                                            var valid0 = true;
                                                                        }
                                                                        if (valid0) {
                                                                            if (data.autoAddRequiredClass !== undefined) {
                                                                                const _errs33 = errors;
                                                                                if (typeof data.autoAddRequiredClass !== "boolean") {
                                                                                    validate16.errors = [{ instancePath: instancePath + "/autoAddRequiredClass", schemaPath: "#/properties/autoAddRequiredClass/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                    return false;
                                                                                }
                                                                                var valid0 = _errs33 === errors;
                                                                            }
                                                                            else {
                                                                                var valid0 = true;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        validate16.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate16.errors = vErrors; return errors === 0; }
export const ConfigOptionsSchema = validate17;
const schema16 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigOptionsSchema", "type": "object", "properties": { "data": { "type": "array", "items": { "type": "object", "properties": { "label": { "type": "string" }, "value": {} } } }, "src": { "oneOf": [{ "type": "string" }, { "$ref": "#/definitions/optionSourceConfig" }] }, "srcAppendPosition": { "type": "string", "enum": ["after", "before"] }, "autoSelectFirst": { "type": "boolean" }, "layout": { "type": "string", "enum": ["row", "column"] }, "labelPosition": { "type": "string", "enum": ["after", "before"] }, "containerClass": { "type": "string" }, "containerStyles": { "type": "string" } }, "definitions": { "optionSourceConfig": { "type": "object", "properties": { "url": { "type": "string" }, "method": { "type": "string", "enum": ["GET", "POST"] }, "headers": {}, "body": {}, "mapData": { "type": "object", "properties": { "labelKey": { "type": "string" }, "valueKeys": { "type": "array", "items": { "type": "string" } }, "contentPath": { "type": "string" }, "slice": { "type": "array", "items": [{ "type": "number" }, { "type": "number" }], "minItems": 2, "maxItems": 2 }, "appendPosition": { "type": "string", "enum": ["after", "before"] } } }, "trigger": { "type": "object", "properties": { "by": { "type": "string" }, "body": {}, "debounceTime": { "type": "number" } } }, "filter": { "type": "object", "properties": { "by": { "type": "string" }, "conditions": { "$ref": "ConfigConditionsSchema#/definitions/conditionGroupConfig" }, "debounceTime": { "type": "number" } } } } } } };
const schema17 = { "type": "object", "properties": { "url": { "type": "string" }, "method": { "type": "string", "enum": ["GET", "POST"] }, "headers": {}, "body": {}, "mapData": { "type": "object", "properties": { "labelKey": { "type": "string" }, "valueKeys": { "type": "array", "items": { "type": "string" } }, "contentPath": { "type": "string" }, "slice": { "type": "array", "items": [{ "type": "number" }, { "type": "number" }], "minItems": 2, "maxItems": 2 }, "appendPosition": { "type": "string", "enum": ["after", "before"] } } }, "trigger": { "type": "object", "properties": { "by": { "type": "string" }, "body": {}, "debounceTime": { "type": "number" } } }, "filter": { "type": "object", "properties": { "by": { "type": "string" }, "conditions": { "$ref": "ConfigConditionsSchema#/definitions/conditionGroupConfig" }, "debounceTime": { "type": "number" } } } } };
function validate19(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        const _errs1 = errors;
        for (const key0 in data) {
            if (!((key0 === "&&") || (key0 === "||"))) {
                validate19.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
                return false;
                break;
            }
        }
        if (_errs1 === errors) {
            if (data["&&"] !== undefined) {
                const _errs2 = errors;
                if (!(validate12(data["&&"], { instancePath: instancePath + "/&&", parentData: data, parentDataProperty: "&&", rootData }))) {
                    vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                    errors = vErrors.length;
                }
                var valid0 = _errs2 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data["||"] !== undefined) {
                    const _errs3 = errors;
                    if (!(validate12(data["||"], { instancePath: instancePath + "/||", parentData: data, parentDataProperty: "||", rootData }))) {
                        vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                        errors = vErrors.length;
                    }
                    var valid0 = _errs3 === errors;
                }
                else {
                    var valid0 = true;
                }
            }
        }
    }
    else {
        validate19.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate19.errors = vErrors; return errors === 0; }
function validate18(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.url !== undefined) {
            const _errs1 = errors;
            if (typeof data.url !== "string") {
                validate18.errors = [{ instancePath: instancePath + "/url", schemaPath: "#/properties/url/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
            }
            var valid0 = _errs1 === errors;
        }
        else {
            var valid0 = true;
        }
        if (valid0) {
            if (data.method !== undefined) {
                let data1 = data.method;
                const _errs3 = errors;
                if (typeof data1 !== "string") {
                    validate18.errors = [{ instancePath: instancePath + "/method", schemaPath: "#/properties/method/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                }
                if (!((data1 === "GET") || (data1 === "POST"))) {
                    validate18.errors = [{ instancePath: instancePath + "/method", schemaPath: "#/properties/method/enum", keyword: "enum", params: { allowedValues: schema17.properties.method.enum }, message: "must be equal to one of the allowed values" }];
                    return false;
                }
                var valid0 = _errs3 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data.mapData !== undefined) {
                    let data2 = data.mapData;
                    const _errs5 = errors;
                    if (errors === _errs5) {
                        if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                            if (data2.labelKey !== undefined) {
                                const _errs7 = errors;
                                if (typeof data2.labelKey !== "string") {
                                    validate18.errors = [{ instancePath: instancePath + "/mapData/labelKey", schemaPath: "#/properties/mapData/properties/labelKey/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                }
                                var valid1 = _errs7 === errors;
                            }
                            else {
                                var valid1 = true;
                            }
                            if (valid1) {
                                if (data2.valueKeys !== undefined) {
                                    let data4 = data2.valueKeys;
                                    const _errs9 = errors;
                                    if (errors === _errs9) {
                                        if (Array.isArray(data4)) {
                                            var valid2 = true;
                                            const len0 = data4.length;
                                            for (let i0 = 0; i0 < len0; i0++) {
                                                const _errs11 = errors;
                                                if (typeof data4[i0] !== "string") {
                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/valueKeys/" + i0, schemaPath: "#/properties/mapData/properties/valueKeys/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                }
                                                var valid2 = _errs11 === errors;
                                                if (!valid2) {
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            validate18.errors = [{ instancePath: instancePath + "/mapData/valueKeys", schemaPath: "#/properties/mapData/properties/valueKeys/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                            return false;
                                        }
                                    }
                                    var valid1 = _errs9 === errors;
                                }
                                else {
                                    var valid1 = true;
                                }
                                if (valid1) {
                                    if (data2.contentPath !== undefined) {
                                        const _errs13 = errors;
                                        if (typeof data2.contentPath !== "string") {
                                            validate18.errors = [{ instancePath: instancePath + "/mapData/contentPath", schemaPath: "#/properties/mapData/properties/contentPath/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                        }
                                        var valid1 = _errs13 === errors;
                                    }
                                    else {
                                        var valid1 = true;
                                    }
                                    if (valid1) {
                                        if (data2.slice !== undefined) {
                                            let data7 = data2.slice;
                                            const _errs15 = errors;
                                            if (errors === _errs15) {
                                                if (Array.isArray(data7)) {
                                                    if (data7.length > 2) {
                                                        validate18.errors = [{ instancePath: instancePath + "/mapData/slice", schemaPath: "#/properties/mapData/properties/slice/maxItems", keyword: "maxItems", params: { limit: 2 }, message: "must NOT have more than 2 items" }];
                                                        return false;
                                                    }
                                                    else {
                                                        if (data7.length < 2) {
                                                            validate18.errors = [{ instancePath: instancePath + "/mapData/slice", schemaPath: "#/properties/mapData/properties/slice/minItems", keyword: "minItems", params: { limit: 2 }, message: "must NOT have fewer than 2 items" }];
                                                            return false;
                                                        }
                                                        else {
                                                            const len1 = data7.length;
                                                            if (len1 > 0) {
                                                                let data8 = data7[0];
                                                                const _errs17 = errors;
                                                                if (!((typeof data8 == "number") && (isFinite(data8)))) {
                                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/slice/0", schemaPath: "#/properties/mapData/properties/slice/items/0/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                                                    return false;
                                                                }
                                                                var valid3 = _errs17 === errors;
                                                            }
                                                            if (valid3) {
                                                                if (len1 > 1) {
                                                                    let data9 = data7[1];
                                                                    const _errs19 = errors;
                                                                    if (!((typeof data9 == "number") && (isFinite(data9)))) {
                                                                        validate18.errors = [{ instancePath: instancePath + "/mapData/slice/1", schemaPath: "#/properties/mapData/properties/slice/items/1/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                                                        return false;
                                                                    }
                                                                    var valid3 = _errs19 === errors;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/slice", schemaPath: "#/properties/mapData/properties/slice/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                    return false;
                                                }
                                            }
                                            var valid1 = _errs15 === errors;
                                        }
                                        else {
                                            var valid1 = true;
                                        }
                                        if (valid1) {
                                            if (data2.appendPosition !== undefined) {
                                                let data10 = data2.appendPosition;
                                                const _errs21 = errors;
                                                if (typeof data10 !== "string") {
                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/appendPosition", schemaPath: "#/properties/mapData/properties/appendPosition/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                }
                                                if (!((data10 === "after") || (data10 === "before"))) {
                                                    validate18.errors = [{ instancePath: instancePath + "/mapData/appendPosition", schemaPath: "#/properties/mapData/properties/appendPosition/enum", keyword: "enum", params: { allowedValues: schema17.properties.mapData.properties.appendPosition.enum }, message: "must be equal to one of the allowed values" }];
                                                    return false;
                                                }
                                                var valid1 = _errs21 === errors;
                                            }
                                            else {
                                                var valid1 = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            validate18.errors = [{ instancePath: instancePath + "/mapData", schemaPath: "#/properties/mapData/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                            return false;
                        }
                    }
                    var valid0 = _errs5 === errors;
                }
                else {
                    var valid0 = true;
                }
                if (valid0) {
                    if (data.trigger !== undefined) {
                        let data11 = data.trigger;
                        const _errs23 = errors;
                        if (errors === _errs23) {
                            if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                                if (data11.by !== undefined) {
                                    const _errs25 = errors;
                                    if (typeof data11.by !== "string") {
                                        validate18.errors = [{ instancePath: instancePath + "/trigger/by", schemaPath: "#/properties/trigger/properties/by/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                    }
                                    var valid4 = _errs25 === errors;
                                }
                                else {
                                    var valid4 = true;
                                }
                                if (valid4) {
                                    if (data11.debounceTime !== undefined) {
                                        let data13 = data11.debounceTime;
                                        const _errs27 = errors;
                                        if (!((typeof data13 == "number") && (isFinite(data13)))) {
                                            validate18.errors = [{ instancePath: instancePath + "/trigger/debounceTime", schemaPath: "#/properties/trigger/properties/debounceTime/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                            return false;
                                        }
                                        var valid4 = _errs27 === errors;
                                    }
                                    else {
                                        var valid4 = true;
                                    }
                                }
                            }
                            else {
                                validate18.errors = [{ instancePath: instancePath + "/trigger", schemaPath: "#/properties/trigger/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                            }
                        }
                        var valid0 = _errs23 === errors;
                    }
                    else {
                        var valid0 = true;
                    }
                    if (valid0) {
                        if (data.filter !== undefined) {
                            let data14 = data.filter;
                            const _errs29 = errors;
                            if (errors === _errs29) {
                                if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                                    if (data14.by !== undefined) {
                                        const _errs31 = errors;
                                        if (typeof data14.by !== "string") {
                                            validate18.errors = [{ instancePath: instancePath + "/filter/by", schemaPath: "#/properties/filter/properties/by/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                        }
                                        var valid5 = _errs31 === errors;
                                    }
                                    else {
                                        var valid5 = true;
                                    }
                                    if (valid5) {
                                        if (data14.conditions !== undefined) {
                                            const _errs33 = errors;
                                            if (!(validate19(data14.conditions, { instancePath: instancePath + "/filter/conditions", parentData: data14, parentDataProperty: "conditions", rootData }))) {
                                                vErrors = vErrors === null ? validate19.errors : vErrors.concat(validate19.errors);
                                                errors = vErrors.length;
                                            }
                                            var valid5 = _errs33 === errors;
                                        }
                                        else {
                                            var valid5 = true;
                                        }
                                        if (valid5) {
                                            if (data14.debounceTime !== undefined) {
                                                let data17 = data14.debounceTime;
                                                const _errs34 = errors;
                                                if (!((typeof data17 == "number") && (isFinite(data17)))) {
                                                    validate18.errors = [{ instancePath: instancePath + "/filter/debounceTime", schemaPath: "#/properties/filter/properties/debounceTime/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                                    return false;
                                                }
                                                var valid5 = _errs34 === errors;
                                            }
                                            else {
                                                var valid5 = true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    validate18.errors = [{ instancePath: instancePath + "/filter", schemaPath: "#/properties/filter/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                    return false;
                                }
                            }
                            var valid0 = _errs29 === errors;
                        }
                        else {
                            var valid0 = true;
                        }
                    }
                }
            }
        }
    }
    else {
        validate18.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate18.errors = vErrors; return errors === 0; }
function validate17(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigOptionsSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.data !== undefined) {
            let data0 = data.data;
            const _errs1 = errors;
            if (errors === _errs1) {
                if (Array.isArray(data0)) {
                    var valid1 = true;
                    const len0 = data0.length;
                    for (let i0 = 0; i0 < len0; i0++) {
                        let data1 = data0[i0];
                        const _errs3 = errors;
                        if (errors === _errs3) {
                            if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
                                if (data1.label !== undefined) {
                                    if (typeof data1.label !== "string") {
                                        validate17.errors = [{ instancePath: instancePath + "/data/" + i0 + "/label", schemaPath: "#/properties/data/items/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                    }
                                }
                            }
                            else {
                                validate17.errors = [{ instancePath: instancePath + "/data/" + i0, schemaPath: "#/properties/data/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                            }
                        }
                        var valid1 = _errs3 === errors;
                        if (!valid1) {
                            break;
                        }
                    }
                }
                else {
                    validate17.errors = [{ instancePath: instancePath + "/data", schemaPath: "#/properties/data/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                }
            }
            var valid0 = _errs1 === errors;
        }
        else {
            var valid0 = true;
        }
        if (valid0) {
            if (data.src !== undefined) {
                let data3 = data.src;
                const _errs7 = errors;
                const _errs8 = errors;
                let valid3 = false;
                let passing0 = null;
                const _errs9 = errors;
                if (typeof data3 !== "string") {
                    const err0 = { instancePath: instancePath + "/src", schemaPath: "#/properties/src/oneOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                        vErrors = [err0];
                    }
                    else {
                        vErrors.push(err0);
                    }
                    errors++;
                }
                var _valid0 = _errs9 === errors;
                if (_valid0) {
                    valid3 = true;
                    passing0 = 0;
                }
                const _errs11 = errors;
                if (!(validate18(data3, { instancePath: instancePath + "/src", parentData: data, parentDataProperty: "src", rootData }))) {
                    vErrors = vErrors === null ? validate18.errors : vErrors.concat(validate18.errors);
                    errors = vErrors.length;
                }
                var _valid0 = _errs11 === errors;
                if (_valid0 && valid3) {
                    valid3 = false;
                    passing0 = [passing0, 1];
                }
                else {
                    if (_valid0) {
                        valid3 = true;
                        passing0 = 1;
                    }
                }
                if (!valid3) {
                    const err1 = { instancePath: instancePath + "/src", schemaPath: "#/properties/src/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                    if (vErrors === null) {
                        vErrors = [err1];
                    }
                    else {
                        vErrors.push(err1);
                    }
                    errors++;
                    validate17.errors = vErrors;
                    return false;
                }
                else {
                    errors = _errs8;
                    if (vErrors !== null) {
                        if (_errs8) {
                            vErrors.length = _errs8;
                        }
                        else {
                            vErrors = null;
                        }
                    }
                }
                var valid0 = _errs7 === errors;
            }
            else {
                var valid0 = true;
            }
            if (valid0) {
                if (data.srcAppendPosition !== undefined) {
                    let data4 = data.srcAppendPosition;
                    const _errs12 = errors;
                    if (typeof data4 !== "string") {
                        validate17.errors = [{ instancePath: instancePath + "/srcAppendPosition", schemaPath: "#/properties/srcAppendPosition/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                    }
                    if (!((data4 === "after") || (data4 === "before"))) {
                        validate17.errors = [{ instancePath: instancePath + "/srcAppendPosition", schemaPath: "#/properties/srcAppendPosition/enum", keyword: "enum", params: { allowedValues: schema16.properties.srcAppendPosition.enum }, message: "must be equal to one of the allowed values" }];
                        return false;
                    }
                    var valid0 = _errs12 === errors;
                }
                else {
                    var valid0 = true;
                }
                if (valid0) {
                    if (data.autoSelectFirst !== undefined) {
                        const _errs14 = errors;
                        if (typeof data.autoSelectFirst !== "boolean") {
                            validate17.errors = [{ instancePath: instancePath + "/autoSelectFirst", schemaPath: "#/properties/autoSelectFirst/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                            return false;
                        }
                        var valid0 = _errs14 === errors;
                    }
                    else {
                        var valid0 = true;
                    }
                    if (valid0) {
                        if (data.layout !== undefined) {
                            let data6 = data.layout;
                            const _errs16 = errors;
                            if (typeof data6 !== "string") {
                                validate17.errors = [{ instancePath: instancePath + "/layout", schemaPath: "#/properties/layout/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                            }
                            if (!((data6 === "row") || (data6 === "column"))) {
                                validate17.errors = [{ instancePath: instancePath + "/layout", schemaPath: "#/properties/layout/enum", keyword: "enum", params: { allowedValues: schema16.properties.layout.enum }, message: "must be equal to one of the allowed values" }];
                                return false;
                            }
                            var valid0 = _errs16 === errors;
                        }
                        else {
                            var valid0 = true;
                        }
                        if (valid0) {
                            if (data.labelPosition !== undefined) {
                                let data7 = data.labelPosition;
                                const _errs18 = errors;
                                if (typeof data7 !== "string") {
                                    validate17.errors = [{ instancePath: instancePath + "/labelPosition", schemaPath: "#/properties/labelPosition/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                }
                                if (!((data7 === "after") || (data7 === "before"))) {
                                    validate17.errors = [{ instancePath: instancePath + "/labelPosition", schemaPath: "#/properties/labelPosition/enum", keyword: "enum", params: { allowedValues: schema16.properties.labelPosition.enum }, message: "must be equal to one of the allowed values" }];
                                    return false;
                                }
                                var valid0 = _errs18 === errors;
                            }
                            else {
                                var valid0 = true;
                            }
                            if (valid0) {
                                if (data.containerClass !== undefined) {
                                    const _errs20 = errors;
                                    if (typeof data.containerClass !== "string") {
                                        validate17.errors = [{ instancePath: instancePath + "/containerClass", schemaPath: "#/properties/containerClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                    }
                                    var valid0 = _errs20 === errors;
                                }
                                else {
                                    var valid0 = true;
                                }
                                if (valid0) {
                                    if (data.containerStyles !== undefined) {
                                        const _errs22 = errors;
                                        if (typeof data.containerStyles !== "string") {
                                            validate17.errors = [{ instancePath: instancePath + "/containerStyles", schemaPath: "#/properties/containerStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                        }
                                        var valid0 = _errs22 === errors;
                                    }
                                    else {
                                        var valid0 = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        validate17.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
        return false;
    }
} validate17.errors = vErrors; return errors === 0; }
export const ConfigValidatorsSchema = validate24;
const schema19 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigValidatorsSchema", "type": "array", "items": { "type": "object", "properties": { "name": { "type": "string" }, "message": { "type": "string" }, "flags": { "type": "string" }, "value": {} } } };
function validate24(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigValidatorsSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (Array.isArray(data)) {
        var valid0 = true;
        const len0 = data.length;
        for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            if (errors === _errs1) {
                if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
                    if (data0.name !== undefined) {
                        const _errs3 = errors;
                        if (typeof data0.name !== "string") {
                            validate24.errors = [{ instancePath: instancePath + "/" + i0 + "/name", schemaPath: "#/items/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                        }
                        var valid1 = _errs3 === errors;
                    }
                    else {
                        var valid1 = true;
                    }
                    if (valid1) {
                        if (data0.message !== undefined) {
                            const _errs5 = errors;
                            if (typeof data0.message !== "string") {
                                validate24.errors = [{ instancePath: instancePath + "/" + i0 + "/message", schemaPath: "#/items/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                            }
                            var valid1 = _errs5 === errors;
                        }
                        else {
                            var valid1 = true;
                        }
                        if (valid1) {
                            if (data0.flags !== undefined) {
                                const _errs7 = errors;
                                if (typeof data0.flags !== "string") {
                                    validate24.errors = [{ instancePath: instancePath + "/" + i0 + "/flags", schemaPath: "#/items/properties/flags/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                }
                                var valid1 = _errs7 === errors;
                            }
                            else {
                                var valid1 = true;
                            }
                        }
                    }
                }
                else {
                    validate24.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                    return false;
                }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
                break;
            }
        }
    }
    else {
        validate24.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
    }
} validate24.errors = vErrors; return errors === 0; }
export const ConfigMainSchema = validate25;
const schema20 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "ConfigMainSchema", "type": "array", "items": { "type": "object", "properties": { "formControlName": { "type": "string" }, "asyncValidators": { "$ref": "ConfigValidatorsSchema" }, "conditions": { "$ref": "ConfigConditionsSchema" }, "children": { "$ref": "#" }, "description": { "type": "string" }, "props": {}, "hidden": { "type": "boolean" }, "label": { "type": "string" }, "layout": { "$ref": "ConfigLayoutSchema" }, "inputMask": {}, "options": { "$ref": "ConfigOptionsSchema" }, "readonly": { "type": "boolean" }, "type": { "type": "string" }, "value": {}, "validators": { "$ref": "ConfigValidatorsSchema" } }, "required": ["formControlName"] } };
function validate25(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) { /*# sourceURL="ConfigMainSchema" */ ; let vErrors = null; let errors = 0; if (errors === 0) {
    if (Array.isArray(data)) {
        var valid0 = true;
        const len0 = data.length;
        for (let i0 = 0; i0 < len0; i0++) {
            let data0 = data[i0];
            const _errs1 = errors;
            if (errors === _errs1) {
                if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
                    let missing0;
                    if ((data0.formControlName === undefined) && (missing0 = "formControlName")) {
                        validate25.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/items/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
                        return false;
                    }
                    else {
                        if (data0.formControlName !== undefined) {
                            const _errs3 = errors;
                            if (typeof data0.formControlName !== "string") {
                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/formControlName", schemaPath: "#/items/properties/formControlName/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                            }
                            var valid1 = _errs3 === errors;
                        }
                        else {
                            var valid1 = true;
                        }
                        if (valid1) {
                            if (data0.asyncValidators !== undefined) {
                                let data2 = data0.asyncValidators;
                                const _errs5 = errors;
                                const _errs6 = errors;
                                if (errors === _errs6) {
                                    if (Array.isArray(data2)) {
                                        var valid3 = true;
                                        const len1 = data2.length;
                                        for (let i1 = 0; i1 < len1; i1++) {
                                            let data3 = data2[i1];
                                            const _errs8 = errors;
                                            if (errors === _errs8) {
                                                if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                                                    if (data3.name !== undefined) {
                                                        const _errs10 = errors;
                                                        if (typeof data3.name !== "string") {
                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators/" + i1 + "/name", schemaPath: "ConfigValidatorsSchema/items/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                        }
                                                        var valid4 = _errs10 === errors;
                                                    }
                                                    else {
                                                        var valid4 = true;
                                                    }
                                                    if (valid4) {
                                                        if (data3.message !== undefined) {
                                                            const _errs12 = errors;
                                                            if (typeof data3.message !== "string") {
                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators/" + i1 + "/message", schemaPath: "ConfigValidatorsSchema/items/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                            }
                                                            var valid4 = _errs12 === errors;
                                                        }
                                                        else {
                                                            var valid4 = true;
                                                        }
                                                        if (valid4) {
                                                            if (data3.flags !== undefined) {
                                                                const _errs14 = errors;
                                                                if (typeof data3.flags !== "string") {
                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators/" + i1 + "/flags", schemaPath: "ConfigValidatorsSchema/items/properties/flags/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                    return false;
                                                                }
                                                                var valid4 = _errs14 === errors;
                                                            }
                                                            else {
                                                                var valid4 = true;
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators/" + i1, schemaPath: "ConfigValidatorsSchema/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                    return false;
                                                }
                                            }
                                            var valid3 = _errs8 === errors;
                                            if (!valid3) {
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/asyncValidators", schemaPath: "ConfigValidatorsSchema/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                    }
                                }
                                var valid1 = _errs5 === errors;
                            }
                            else {
                                var valid1 = true;
                            }
                            if (valid1) {
                                if (data0.conditions !== undefined) {
                                    const _errs16 = errors;
                                    if (!(validate10(data0.conditions, { instancePath: instancePath + "/" + i0 + "/conditions", parentData: data0, parentDataProperty: "conditions", rootData }))) {
                                        vErrors = vErrors === null ? validate10.errors : vErrors.concat(validate10.errors);
                                        errors = vErrors.length;
                                    }
                                    var valid1 = _errs16 === errors;
                                }
                                else {
                                    var valid1 = true;
                                }
                                if (valid1) {
                                    if (data0.children !== undefined) {
                                        const _errs17 = errors;
                                        if (!(validate25(data0.children, { instancePath: instancePath + "/" + i0 + "/children", parentData: data0, parentDataProperty: "children", rootData }))) {
                                            vErrors = vErrors === null ? validate25.errors : vErrors.concat(validate25.errors);
                                            errors = vErrors.length;
                                        }
                                        var valid1 = _errs17 === errors;
                                    }
                                    else {
                                        var valid1 = true;
                                    }
                                    if (valid1) {
                                        if (data0.description !== undefined) {
                                            const _errs18 = errors;
                                            if (typeof data0.description !== "string") {
                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/description", schemaPath: "#/items/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                            }
                                            var valid1 = _errs18 === errors;
                                        }
                                        else {
                                            var valid1 = true;
                                        }
                                        if (valid1) {
                                            if (data0.hidden !== undefined) {
                                                const _errs20 = errors;
                                                if (typeof data0.hidden !== "boolean") {
                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/hidden", schemaPath: "#/items/properties/hidden/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                    return false;
                                                }
                                                var valid1 = _errs20 === errors;
                                            }
                                            else {
                                                var valid1 = true;
                                            }
                                            if (valid1) {
                                                if (data0.label !== undefined) {
                                                    const _errs22 = errors;
                                                    if (typeof data0.label !== "string") {
                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/label", schemaPath: "#/items/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                        return false;
                                                    }
                                                    var valid1 = _errs22 === errors;
                                                }
                                                else {
                                                    var valid1 = true;
                                                }
                                                if (valid1) {
                                                    if (data0.layout !== undefined) {
                                                        let data12 = data0.layout;
                                                        const _errs24 = errors;
                                                        const _errs25 = errors;
                                                        if (errors === _errs25) {
                                                            if (data12 && typeof data12 == "object" && !Array.isArray(data12)) {
                                                                if (data12.hostClass !== undefined) {
                                                                    const _errs27 = errors;
                                                                    if (typeof data12.hostClass !== "string") {
                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/hostClass", schemaPath: "ConfigLayoutSchema/properties/hostClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                        return false;
                                                                    }
                                                                    var valid6 = _errs27 === errors;
                                                                }
                                                                else {
                                                                    var valid6 = true;
                                                                }
                                                                if (valid6) {
                                                                    if (data12.hostStyles !== undefined) {
                                                                        const _errs29 = errors;
                                                                        if (typeof data12.hostStyles !== "string") {
                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/hostStyles", schemaPath: "ConfigLayoutSchema/properties/hostStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                            return false;
                                                                        }
                                                                        var valid6 = _errs29 === errors;
                                                                    }
                                                                    else {
                                                                        var valid6 = true;
                                                                    }
                                                                    if (valid6) {
                                                                        if (data12.labelClass !== undefined) {
                                                                            const _errs31 = errors;
                                                                            if (typeof data12.labelClass !== "string") {
                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/labelClass", schemaPath: "ConfigLayoutSchema/properties/labelClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                return false;
                                                                            }
                                                                            var valid6 = _errs31 === errors;
                                                                        }
                                                                        else {
                                                                            var valid6 = true;
                                                                        }
                                                                        if (valid6) {
                                                                            if (data12.labelStyles !== undefined) {
                                                                                const _errs33 = errors;
                                                                                if (typeof data12.labelStyles !== "string") {
                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/labelStyles", schemaPath: "ConfigLayoutSchema/properties/labelStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                    return false;
                                                                                }
                                                                                var valid6 = _errs33 === errors;
                                                                            }
                                                                            else {
                                                                                var valid6 = true;
                                                                            }
                                                                            if (valid6) {
                                                                                if (data12.contentClass !== undefined) {
                                                                                    const _errs35 = errors;
                                                                                    if (typeof data12.contentClass !== "string") {
                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/contentClass", schemaPath: "ConfigLayoutSchema/properties/contentClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                        return false;
                                                                                    }
                                                                                    var valid6 = _errs35 === errors;
                                                                                }
                                                                                else {
                                                                                    var valid6 = true;
                                                                                }
                                                                                if (valid6) {
                                                                                    if (data12.contentStyles !== undefined) {
                                                                                        const _errs37 = errors;
                                                                                        if (typeof data12.contentStyles !== "string") {
                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/contentStyles", schemaPath: "ConfigLayoutSchema/properties/contentStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                            return false;
                                                                                        }
                                                                                        var valid6 = _errs37 === errors;
                                                                                    }
                                                                                    else {
                                                                                        var valid6 = true;
                                                                                    }
                                                                                    if (valid6) {
                                                                                        if (data12.formGroupClass !== undefined) {
                                                                                            const _errs39 = errors;
                                                                                            if (typeof data12.formGroupClass !== "string") {
                                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/formGroupClass", schemaPath: "ConfigLayoutSchema/properties/formGroupClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                return false;
                                                                                            }
                                                                                            var valid6 = _errs39 === errors;
                                                                                        }
                                                                                        else {
                                                                                            var valid6 = true;
                                                                                        }
                                                                                        if (valid6) {
                                                                                            if (data12.formGroupStyles !== undefined) {
                                                                                                const _errs41 = errors;
                                                                                                if (typeof data12.formGroupStyles !== "string") {
                                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/formGroupStyles", schemaPath: "ConfigLayoutSchema/properties/formGroupStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                    return false;
                                                                                                }
                                                                                                var valid6 = _errs41 === errors;
                                                                                            }
                                                                                            else {
                                                                                                var valid6 = true;
                                                                                            }
                                                                                            if (valid6) {
                                                                                                if (data12.descriptionClass !== undefined) {
                                                                                                    const _errs43 = errors;
                                                                                                    if (typeof data12.descriptionClass !== "string") {
                                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/descriptionClass", schemaPath: "ConfigLayoutSchema/properties/descriptionClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                        return false;
                                                                                                    }
                                                                                                    var valid6 = _errs43 === errors;
                                                                                                }
                                                                                                else {
                                                                                                    var valid6 = true;
                                                                                                }
                                                                                                if (valid6) {
                                                                                                    if (data12.descriptionStyles !== undefined) {
                                                                                                        const _errs45 = errors;
                                                                                                        if (typeof data12.descriptionStyles !== "string") {
                                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/descriptionStyles", schemaPath: "ConfigLayoutSchema/properties/descriptionStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                            return false;
                                                                                                        }
                                                                                                        var valid6 = _errs45 === errors;
                                                                                                    }
                                                                                                    else {
                                                                                                        var valid6 = true;
                                                                                                    }
                                                                                                    if (valid6) {
                                                                                                        if (data12.inputAreaClass !== undefined) {
                                                                                                            const _errs47 = errors;
                                                                                                            if (typeof data12.inputAreaClass !== "string") {
                                                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/inputAreaClass", schemaPath: "ConfigLayoutSchema/properties/inputAreaClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                                return false;
                                                                                                            }
                                                                                                            var valid6 = _errs47 === errors;
                                                                                                        }
                                                                                                        else {
                                                                                                            var valid6 = true;
                                                                                                        }
                                                                                                        if (valid6) {
                                                                                                            if (data12.inputAreaStyles !== undefined) {
                                                                                                                const _errs49 = errors;
                                                                                                                if (typeof data12.inputAreaStyles !== "string") {
                                                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/inputAreaStyles", schemaPath: "ConfigLayoutSchema/properties/inputAreaStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                                    return false;
                                                                                                                }
                                                                                                                var valid6 = _errs49 === errors;
                                                                                                            }
                                                                                                            else {
                                                                                                                var valid6 = true;
                                                                                                            }
                                                                                                            if (valid6) {
                                                                                                                if (data12.errorClass !== undefined) {
                                                                                                                    const _errs51 = errors;
                                                                                                                    if (typeof data12.errorClass !== "string") {
                                                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/errorClass", schemaPath: "ConfigLayoutSchema/properties/errorClass/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                                        return false;
                                                                                                                    }
                                                                                                                    var valid6 = _errs51 === errors;
                                                                                                                }
                                                                                                                else {
                                                                                                                    var valid6 = true;
                                                                                                                }
                                                                                                                if (valid6) {
                                                                                                                    if (data12.errorStyles !== undefined) {
                                                                                                                        const _errs53 = errors;
                                                                                                                        if (typeof data12.errorStyles !== "string") {
                                                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/errorStyles", schemaPath: "ConfigLayoutSchema/properties/errorStyles/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                                            return false;
                                                                                                                        }
                                                                                                                        var valid6 = _errs53 === errors;
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        var valid6 = true;
                                                                                                                    }
                                                                                                                    if (valid6) {
                                                                                                                        if (data12.descriptionPosition !== undefined) {
                                                                                                                            let data27 = data12.descriptionPosition;
                                                                                                                            const _errs55 = errors;
                                                                                                                            if (!((data27 === "after") || (data27 === "before"))) {
                                                                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/descriptionPosition", schemaPath: "ConfigLayoutSchema/properties/descriptionPosition/enum", keyword: "enum", params: { allowedValues: schema15.properties.descriptionPosition.enum }, message: "must be equal to one of the allowed values" }];
                                                                                                                                return false;
                                                                                                                            }
                                                                                                                            var valid6 = _errs55 === errors;
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            var valid6 = true;
                                                                                                                        }
                                                                                                                        if (valid6) {
                                                                                                                            if (data12.hideLabel !== undefined) {
                                                                                                                                const _errs56 = errors;
                                                                                                                                if (typeof data12.hideLabel !== "boolean") {
                                                                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/hideLabel", schemaPath: "ConfigLayoutSchema/properties/hideLabel/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                                                                    return false;
                                                                                                                                }
                                                                                                                                var valid6 = _errs56 === errors;
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                var valid6 = true;
                                                                                                                            }
                                                                                                                            if (valid6) {
                                                                                                                                if (data12.contentCollapsible !== undefined) {
                                                                                                                                    let data29 = data12.contentCollapsible;
                                                                                                                                    const _errs58 = errors;
                                                                                                                                    if (!((data29 === "collapse") || (data29 === "expand"))) {
                                                                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/contentCollapsible", schemaPath: "ConfigLayoutSchema/properties/contentCollapsible/enum", keyword: "enum", params: { allowedValues: schema15.properties.contentCollapsible.enum }, message: "must be equal to one of the allowed values" }];
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    var valid6 = _errs58 === errors;
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    var valid6 = true;
                                                                                                                                }
                                                                                                                                if (valid6) {
                                                                                                                                    if (data12.autoAddRequiredClass !== undefined) {
                                                                                                                                        const _errs59 = errors;
                                                                                                                                        if (typeof data12.autoAddRequiredClass !== "boolean") {
                                                                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout/autoAddRequiredClass", schemaPath: "ConfigLayoutSchema/properties/autoAddRequiredClass/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                                                                                            return false;
                                                                                                                                        }
                                                                                                                                        var valid6 = _errs59 === errors;
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        var valid6 = true;
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/layout", schemaPath: "ConfigLayoutSchema/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                                return false;
                                                            }
                                                        }
                                                        var valid1 = _errs24 === errors;
                                                    }
                                                    else {
                                                        var valid1 = true;
                                                    }
                                                    if (valid1) {
                                                        if (data0.options !== undefined) {
                                                            const _errs61 = errors;
                                                            if (!(validate17(data0.options, { instancePath: instancePath + "/" + i0 + "/options", parentData: data0, parentDataProperty: "options", rootData }))) {
                                                                vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
                                                                errors = vErrors.length;
                                                            }
                                                            var valid1 = _errs61 === errors;
                                                        }
                                                        else {
                                                            var valid1 = true;
                                                        }
                                                        if (valid1) {
                                                            if (data0.readonly !== undefined) {
                                                                const _errs62 = errors;
                                                                if (typeof data0.readonly !== "boolean") {
                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/readonly", schemaPath: "#/items/properties/readonly/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                    return false;
                                                                }
                                                                var valid1 = _errs62 === errors;
                                                            }
                                                            else {
                                                                var valid1 = true;
                                                            }
                                                            if (valid1) {
                                                                if (data0.type !== undefined) {
                                                                    const _errs64 = errors;
                                                                    if (typeof data0.type !== "string") {
                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/type", schemaPath: "#/items/properties/type/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                        return false;
                                                                    }
                                                                    var valid1 = _errs64 === errors;
                                                                }
                                                                else {
                                                                    var valid1 = true;
                                                                }
                                                                if (valid1) {
                                                                    if (data0.validators !== undefined) {
                                                                        let data34 = data0.validators;
                                                                        const _errs66 = errors;
                                                                        const _errs67 = errors;
                                                                        if (errors === _errs67) {
                                                                            if (Array.isArray(data34)) {
                                                                                var valid8 = true;
                                                                                const len2 = data34.length;
                                                                                for (let i2 = 0; i2 < len2; i2++) {
                                                                                    let data35 = data34[i2];
                                                                                    const _errs69 = errors;
                                                                                    if (errors === _errs69) {
                                                                                        if (data35 && typeof data35 == "object" && !Array.isArray(data35)) {
                                                                                            if (data35.name !== undefined) {
                                                                                                const _errs71 = errors;
                                                                                                if (typeof data35.name !== "string") {
                                                                                                    validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators/" + i2 + "/name", schemaPath: "ConfigValidatorsSchema/items/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                    return false;
                                                                                                }
                                                                                                var valid9 = _errs71 === errors;
                                                                                            }
                                                                                            else {
                                                                                                var valid9 = true;
                                                                                            }
                                                                                            if (valid9) {
                                                                                                if (data35.message !== undefined) {
                                                                                                    const _errs73 = errors;
                                                                                                    if (typeof data35.message !== "string") {
                                                                                                        validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators/" + i2 + "/message", schemaPath: "ConfigValidatorsSchema/items/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                        return false;
                                                                                                    }
                                                                                                    var valid9 = _errs73 === errors;
                                                                                                }
                                                                                                else {
                                                                                                    var valid9 = true;
                                                                                                }
                                                                                                if (valid9) {
                                                                                                    if (data35.flags !== undefined) {
                                                                                                        const _errs75 = errors;
                                                                                                        if (typeof data35.flags !== "string") {
                                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators/" + i2 + "/flags", schemaPath: "ConfigValidatorsSchema/items/properties/flags/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                                                            return false;
                                                                                                        }
                                                                                                        var valid9 = _errs75 === errors;
                                                                                                    }
                                                                                                    else {
                                                                                                        var valid9 = true;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators/" + i2, schemaPath: "ConfigValidatorsSchema/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                                                            return false;
                                                                                        }
                                                                                    }
                                                                                    var valid8 = _errs69 === errors;
                                                                                    if (!valid8) {
                                                                                        break;
                                                                                    }
                                                                                }
                                                                            }
                                                                            else {
                                                                                validate25.errors = [{ instancePath: instancePath + "/" + i0 + "/validators", schemaPath: "ConfigValidatorsSchema/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                                                return false;
                                                                            }
                                                                        }
                                                                        var valid1 = _errs66 === errors;
                                                                    }
                                                                    else {
                                                                        var valid1 = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    validate25.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                    return false;
                }
            }
            var valid0 = _errs1 === errors;
            if (!valid0) {
                break;
            }
        }
    }
    else {
        validate25.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
        return false;
    }
} validate25.errors = vErrors; return errors === 0; }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLXZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9jb3JlL3V0aWxpdGllcy9zY2hlbWEtdmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUFBLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLFVBQVUsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLEVBQUMsU0FBUyxFQUFDLHlDQUF5QyxFQUFDLEtBQUssRUFBQyx3QkFBd0IsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLG1CQUFtQixFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsTUFBTSxFQUFDLG9DQUFvQyxFQUFDLEVBQUMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsYUFBYSxDQUFDLEVBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxFQUFDLG9CQUFvQixFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxpQ0FBaUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLG9DQUFvQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxFQUFDLElBQUksRUFBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxFQUFDLElBQUksRUFBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0Ms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TSxDQUFDO3FCQUFDO3lCQUFLO3dCQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7cUJBQUM7aUJBQUM7YUFBQztZQUFBLElBQUksTUFBTSxHQUFHLE1BQU0sS0FBSyxNQUFNLENBQUM7WUFBQSxJQUFHLENBQUMsTUFBTSxFQUFDO2dCQUFDLE1BQU07YUFBQztTQUFDO0tBQUM7U0FBSztRQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO1FBQUEsT0FBTyxLQUFLLENBQUM7S0FBQztDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxJQUFHLE1BQU0sS0FBSyxDQUFDLEVBQUM7SUFBQyxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDO1FBQUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQUEsS0FBSSxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUM7WUFBQyxJQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFDO2dCQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxVQUFV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QUMsRUFBQyxpQkFBaUIsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLGFBQWEsRUFBQyxFQUFDLG9CQUFvQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxhQUFhLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxFQUFDLGdCQUFnQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxjQUFjLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQywwREFBMEQsRUFBQyxFQUFDLGNBQWMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxhQUFhLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxFQUFDLGdCQUFnQixFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxjQUFjLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQywwREFBMEQsRUFBQyxFQUFDLGNBQWMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxJQUFHLE1BQU0sS0FBSyxDQUFDLEVBQUM7SUFBQyxJQUFHLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDO1FBQUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQUEsS0FBSSxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUM7WUFBQyxJQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFDO2dCQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsd0JBQXdCLEVBQUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxxQ0FBcUMsRUFBQyxDQUFDLENBQUM7Z0JBQUEsT0FBTyxLQUFLLENBQUM7Z0JBQUEsTUFBTTthQUFDO1NBQUM7UUFBQSxJQUFHLE1BQU0sS0FBSyxNQUFNLEVBQUM7WUFBQyxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUM7Z0JBQUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUFBLElBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLGtCQUFrQixFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUM7b0JBQUMsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUFDO2dCQUFBLElBQUksTUFBTSxHQUFHLE1BQU0sS0FBSyxNQUFNLENBQUM7YUFBQztpQkFBSztnQkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFBQztZQUFBLElBQUcsTUFBTSxFQUFDO2dCQUFDLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBQztvQkFBQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsa0JBQWtCLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQzt3QkFBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7cUJBQUM7b0JBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQztpQkFBQztxQkFBSztvQkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQUM7YUFBQztTQUFDO0tBQUM7U0FBSztRQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7UUFBQSxPQUFPLEtBQUssQ0FBQztLQUFDO0NBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFBQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEdBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUMsRUFBRSxJQUFFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLElBQUcsTUFBTSxLQUFLLENBQUMsRUFBQztJQUFDLElBQUcsSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUM7UUFBQyxJQUFHLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFDO1lBQUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQUEsSUFBRyxPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssUUFBUSxFQUFDO2dCQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyx1QkFBdUIsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO2dCQUFBLE9BQU8sS0FBSyxDQUFDO2FBQUM7WUFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO1NBQUM7YUFBSztZQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztTQUFDO1FBQUEsSUFBRyxNQUFNLEVBQUM7WUFBQyxJQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFDO2dCQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQUEsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDO29CQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQywwQkFBMEIsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO29CQUFBLE9BQU8sS0FBSyxDQUFDO2lCQUFDO2dCQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUM7b0JBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLDBCQUEwQixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyw0Q0FBNEMsRUFBQyxDQUFDLENBQUM7b0JBQUEsT0FBTyxLQUFLLENBQUM7aUJBQUM7Z0JBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQzthQUFDO2lCQUFLO2dCQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzthQUFDO1lBQUEsSUFBRyxNQUFNLEVBQUM7Z0JBQUMsSUFBRyxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBQztvQkFBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUFBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFBQSxJQUFHLE1BQU0sS0FBSyxNQUFNLEVBQUM7d0JBQUMsSUFBRyxLQUFLLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQzs0QkFBQyxJQUFHLEtBQUssQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFDO2dDQUFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztnQ0FBQSxJQUFHLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUM7b0NBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsK0NBQStDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztvQ0FBQSxPQUFPLEtBQUssQ0FBQztpQ0FBQztnQ0FBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDOzZCQUFDO2lDQUFLO2dDQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs2QkFBQzs0QkFBQSxJQUFHLE1BQU0sRUFBQztnQ0FBQyxJQUFHLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDO29DQUFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7b0NBQUEsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO29DQUFBLElBQUcsTUFBTSxLQUFLLE1BQU0sRUFBQzt3Q0FBQyxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUM7NENBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOzRDQUFBLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7NENBQUEsS0FBSSxJQUFJLEVBQUUsR0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBQztnREFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0RBQUEsSUFBRyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxRQUFRLEVBQUM7b0RBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxxQkFBcUIsR0FBRyxFQUFFLEVBQUMsVUFBVSxFQUFDLHNEQUFzRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7b0RBQUEsT0FBTyxLQUFLLENBQUM7aURBQUM7Z0RBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztnREFBQSxJQUFHLENBQUMsTUFBTSxFQUFDO29EQUFDLE1BQU07aURBQUM7NkNBQUM7eUNBQUM7NkNBQUs7NENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxvQkFBb0IsRUFBQyxVQUFVLEVBQUMsZ0RBQWdELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUM7NENBQUEsT0FBTyxLQUFLLENBQUM7eUNBQUM7cUNBQUM7b0NBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQztpQ0FBQztxQ0FBSztvQ0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7aUNBQUM7Z0NBQUEsSUFBRyxNQUFNLEVBQUM7b0NBQUMsSUFBRyxLQUFLLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBQzt3Q0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7d0NBQUEsSUFBRyxPQUFPLEtBQUssQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFDOzRDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsc0JBQXNCLEVBQUMsVUFBVSxFQUFDLGtEQUFrRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7NENBQUEsT0FBTyxLQUFLLENBQUM7eUNBQUM7d0NBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztxQ0FBQzt5Q0FBSzt3Q0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7cUNBQUM7b0NBQUEsSUFBRyxNQUFNLEVBQUM7d0NBQUMsSUFBRyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQzs0Q0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDOzRDQUFBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQzs0Q0FBQSxJQUFHLE1BQU0sS0FBSyxPQUFPLEVBQUM7Z0RBQUMsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDO29EQUFDLElBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7d0RBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxnQkFBZ0IsRUFBQyxVQUFVLEVBQUMsZ0RBQWdELEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLENBQUMsQ0FBQzt3REFBQSxPQUFPLEtBQUssQ0FBQztxREFBQzt5REFBSzt3REFBQyxJQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDOzREQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLGdEQUFnRCxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLENBQUM7NERBQUEsT0FBTyxLQUFLLENBQUM7eURBQUM7NkRBQUs7NERBQUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzs0REFBQSxJQUFHLElBQUksR0FBRyxDQUFDLEVBQUM7Z0VBQUMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dFQUFBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztnRUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQztvRUFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGtCQUFrQixFQUFDLFVBQVUsRUFBQyxvREFBb0QsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO29FQUFBLE9BQU8sS0FBSyxDQUFDO2lFQUFDO2dFQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7NkRBQUM7NERBQUEsSUFBRyxNQUFNLEVBQUM7Z0VBQUMsSUFBRyxJQUFJLEdBQUcsQ0FBQyxFQUFDO29FQUFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvRUFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7b0VBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUM7d0VBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxrQkFBa0IsRUFBQyxVQUFVLEVBQUMsb0RBQW9ELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzt3RUFBQSxPQUFPLEtBQUssQ0FBQztxRUFBQztvRUFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO2lFQUFDOzZEQUFDO3lEQUFDO3FEQUFDO2lEQUFDO3FEQUFLO29EQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLDRDQUE0QyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO29EQUFBLE9BQU8sS0FBSyxDQUFDO2lEQUFDOzZDQUFDOzRDQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7eUNBQUM7NkNBQUs7NENBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3lDQUFDO3dDQUFBLElBQUcsTUFBTSxFQUFDOzRDQUFDLElBQUcsS0FBSyxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUM7Z0RBQUMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztnREFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0RBQUEsSUFBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUM7b0RBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyx5QkFBeUIsRUFBQyxVQUFVLEVBQUMscURBQXFELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztvREFBQSxPQUFPLEtBQUssQ0FBQztpREFBQztnREFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFDO29EQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMseUJBQXlCLEVBQUMsVUFBVSxFQUFDLHFEQUFxRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLDRDQUE0QyxFQUFDLENBQUMsQ0FBQztvREFBQSxPQUFPLEtBQUssQ0FBQztpREFBQztnREFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDOzZDQUFDO2lEQUFLO2dEQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs2Q0FBQzt5Q0FBQztxQ0FBQztpQ0FBQzs2QkFBQzt5QkFBQzs2QkFBSzs0QkFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsMkJBQTJCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzs0QkFBQSxPQUFPLEtBQUssQ0FBQzt5QkFBQztxQkFBQztvQkFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO2lCQUFDO3FCQUFLO29CQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztpQkFBQztnQkFBQSxJQUFHLE1BQU0sRUFBQztvQkFBQyxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDO3dCQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQUEsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO3dCQUFBLElBQUcsTUFBTSxLQUFLLE9BQU8sRUFBQzs0QkFBQyxJQUFHLE1BQU0sSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFDO2dDQUFDLElBQUcsTUFBTSxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUM7b0NBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO29DQUFBLElBQUcsT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBQzt3Q0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMseUNBQXlDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzt3Q0FBQSxPQUFPLEtBQUssQ0FBQztxQ0FBQztvQ0FBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO2lDQUFDO3FDQUFLO29DQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztpQ0FBQztnQ0FBQSxJQUFHLE1BQU0sRUFBQztvQ0FBQyxJQUFHLE1BQU0sQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFDO3dDQUFDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7d0NBQUEsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO3dDQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDOzRDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsdUJBQXVCLEVBQUMsVUFBVSxFQUFDLG1EQUFtRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7NENBQUEsT0FBTyxLQUFLLENBQUM7eUNBQUM7d0NBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztxQ0FBQzt5Q0FBSzt3Q0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7cUNBQUM7aUNBQUM7NkJBQUM7aUNBQUs7Z0NBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLDJCQUEyQixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7Z0NBQUEsT0FBTyxLQUFLLENBQUM7NkJBQUM7eUJBQUM7d0JBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztxQkFBQzt5QkFBSzt3QkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQUM7b0JBQUEsSUFBRyxNQUFNLEVBQUM7d0JBQUMsSUFBRyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBQzs0QkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOzRCQUFBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQzs0QkFBQSxJQUFHLE1BQU0sS0FBSyxPQUFPLEVBQUM7Z0NBQUMsSUFBRyxNQUFNLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQztvQ0FBQyxJQUFHLE1BQU0sQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFDO3dDQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQzt3Q0FBQSxJQUFHLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQUM7NENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLHdDQUF3QyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7NENBQUEsT0FBTyxLQUFLLENBQUM7eUNBQUM7d0NBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztxQ0FBQzt5Q0FBSzt3Q0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7cUNBQUM7b0NBQUEsSUFBRyxNQUFNLEVBQUM7d0NBQUMsSUFBRyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBQzs0Q0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7NENBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLG9CQUFvQixFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQztnREFBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0RBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7NkNBQUM7NENBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQzt5Q0FBQzs2Q0FBSzs0Q0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7eUNBQUM7d0NBQUEsSUFBRyxNQUFNLEVBQUM7NENBQUMsSUFBRyxNQUFNLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBQztnREFBQyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2dEQUFBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztnREFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQztvREFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLHNCQUFzQixFQUFDLFVBQVUsRUFBQyxrREFBa0QsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO29EQUFBLE9BQU8sS0FBSyxDQUFDO2lEQUFDO2dEQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7NkNBQUM7aURBQUs7Z0RBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOzZDQUFDO3lDQUFDO3FDQUFDO2lDQUFDO3FDQUFLO29DQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQywwQkFBMEIsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO29DQUFBLE9BQU8sS0FBSyxDQUFDO2lDQUFDOzZCQUFDOzRCQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7eUJBQUM7NkJBQUs7NEJBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3lCQUFDO3FCQUFDO2lCQUFDO2FBQUM7U0FBQztLQUFDO1NBQUs7UUFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO1FBQUEsT0FBTyxLQUFLLENBQUM7S0FBQztDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxzQ0FBc0MsQ0FBQSxDQUFDLENBQUEsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBRyxNQUFNLEtBQUssQ0FBQyxFQUFDO0lBQUMsSUFBRyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQztRQUFDLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUM7WUFBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQUEsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQUEsSUFBRyxNQUFNLEtBQUssTUFBTSxFQUFDO2dCQUFDLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQztvQkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQUEsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFBQSxLQUFJLElBQUksRUFBRSxHQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDO3dCQUFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7d0JBQUEsSUFBRyxNQUFNLEtBQUssTUFBTSxFQUFDOzRCQUFDLElBQUcsS0FBSyxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUM7Z0NBQUMsSUFBRyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBQztvQ0FBQyxJQUFHLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUM7d0NBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsK0NBQStDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzt3Q0FBQSxPQUFPLEtBQUssQ0FBQztxQ0FBQztpQ0FBQzs2QkFBQztpQ0FBSztnQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFFBQVEsR0FBRyxFQUFFLEVBQUMsVUFBVSxFQUFDLDhCQUE4QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7Z0NBQUEsT0FBTyxLQUFLLENBQUM7NkJBQUM7eUJBQUM7d0JBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQzt3QkFBQSxJQUFHLENBQUMsTUFBTSxFQUFDOzRCQUFDLE1BQU07eUJBQUM7cUJBQUM7aUJBQUM7cUJBQUs7b0JBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLHdCQUF3QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO29CQUFBLE9BQU8sS0FBSyxDQUFDO2lCQUFDO2FBQUM7WUFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO1NBQUM7YUFBSztZQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztTQUFDO1FBQUEsSUFBRyxNQUFNLEVBQUM7WUFBQyxJQUFHLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFDO2dCQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQUEsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUFBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFBQSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQUEsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUFBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQztvQkFBQyxNQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQywrQkFBK0IsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQztvQkFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUM7d0JBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQUM7eUJBQUs7d0JBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFBQztvQkFBQSxNQUFNLEVBQUUsQ0FBQztpQkFBQztnQkFBQSxJQUFJLE9BQU8sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO2dCQUFBLElBQUcsT0FBTyxFQUFDO29CQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQUEsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFBQztnQkFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQztvQkFBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQUM7Z0JBQUEsSUFBSSxPQUFPLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztnQkFBQSxJQUFHLE9BQU8sSUFBSSxNQUFNLEVBQUM7b0JBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQUM7cUJBQUs7b0JBQUMsSUFBRyxPQUFPLEVBQUM7d0JBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFBQSxRQUFRLEdBQUcsQ0FBQyxDQUFDO3FCQUFDO2lCQUFDO2dCQUFBLElBQUcsQ0FBQyxNQUFNLEVBQUM7b0JBQUMsTUFBTSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsd0JBQXdCLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBQyxjQUFjLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLHdDQUF3QyxFQUFDLENBQUM7b0JBQUEsSUFBRyxPQUFPLEtBQUssSUFBSSxFQUFDO3dCQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUFDO3lCQUFLO3dCQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQUM7b0JBQUEsTUFBTSxFQUFFLENBQUM7b0JBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7b0JBQUEsT0FBTyxLQUFLLENBQUM7aUJBQUM7cUJBQUs7b0JBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFBQSxJQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUM7d0JBQUMsSUFBRyxNQUFNLEVBQUM7NEJBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7eUJBQUM7NkJBQUs7NEJBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt5QkFBQztxQkFBQztpQkFBQztnQkFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO2FBQUM7aUJBQUs7Z0JBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQUM7WUFBQSxJQUFHLE1BQU0sRUFBQztnQkFBQyxJQUFHLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLEVBQUM7b0JBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO29CQUFBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFBQSxJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBQzt3QkFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLG9CQUFvQixFQUFDLFVBQVUsRUFBQyxxQ0FBcUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO3dCQUFBLE9BQU8sS0FBSyxDQUFDO3FCQUFDO29CQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLEVBQUM7d0JBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxvQkFBb0IsRUFBQyxVQUFVLEVBQUMscUNBQXFDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMsNENBQTRDLEVBQUMsQ0FBQyxDQUFDO3dCQUFBLE9BQU8sS0FBSyxDQUFDO3FCQUFDO29CQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7aUJBQUM7cUJBQUs7b0JBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUFDO2dCQUFBLElBQUcsTUFBTSxFQUFDO29CQUFDLElBQUcsSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUM7d0JBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO3dCQUFBLElBQUcsT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBQzs0QkFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGtCQUFrQixFQUFDLFVBQVUsRUFBQyxtQ0FBbUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDOzRCQUFBLE9BQU8sS0FBSyxDQUFDO3lCQUFDO3dCQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7cUJBQUM7eUJBQUs7d0JBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3FCQUFDO29CQUFBLElBQUcsTUFBTSxFQUFDO3dCQUFDLElBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUM7NEJBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs0QkFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7NEJBQUEsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUM7Z0NBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLDBCQUEwQixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7Z0NBQUEsT0FBTyxLQUFLLENBQUM7NkJBQUM7NEJBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsRUFBQztnQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsMEJBQTBCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLDRDQUE0QyxFQUFDLENBQUMsQ0FBQztnQ0FBQSxPQUFPLEtBQUssQ0FBQzs2QkFBQzs0QkFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO3lCQUFDOzZCQUFLOzRCQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzt5QkFBQzt3QkFBQSxJQUFHLE1BQU0sRUFBQzs0QkFBQyxJQUFHLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFDO2dDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7Z0NBQUEsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO2dDQUFBLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFDO29DQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLGlDQUFpQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7b0NBQUEsT0FBTyxLQUFLLENBQUM7aUNBQUM7Z0NBQUEsSUFBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsRUFBQztvQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxpQ0FBaUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMsNENBQTRDLEVBQUMsQ0FBQyxDQUFDO29DQUFBLE9BQU8sS0FBSyxDQUFDO2lDQUFDO2dDQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7NkJBQUM7aUNBQUs7Z0NBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOzZCQUFDOzRCQUFBLElBQUcsTUFBTSxFQUFDO2dDQUFDLElBQUcsSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUM7b0NBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO29DQUFBLElBQUcsT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFFBQVEsRUFBQzt3Q0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGlCQUFpQixFQUFDLFVBQVUsRUFBQyxrQ0FBa0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO3dDQUFBLE9BQU8sS0FBSyxDQUFDO3FDQUFDO29DQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7aUNBQUM7cUNBQUs7b0NBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2lDQUFDO2dDQUFBLElBQUcsTUFBTSxFQUFDO29DQUFDLElBQUcsSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUM7d0NBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO3dDQUFBLElBQUcsT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVEsRUFBQzs0Q0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLGtCQUFrQixFQUFDLFVBQVUsRUFBQyxtQ0FBbUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDOzRDQUFBLE9BQU8sS0FBSyxDQUFDO3lDQUFDO3dDQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7cUNBQUM7eUNBQUs7d0NBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3FDQUFDO2lDQUFDOzZCQUFDO3lCQUFDO3FCQUFDO2lCQUFDO2FBQUM7U0FBQztLQUFDO1NBQUs7UUFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO1FBQUEsT0FBTyxLQUFLLENBQUM7S0FBQztDQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUEsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsVUFBVSxDQUFDO0FBQUEsTUFBTSxRQUFRLEdBQUcsRUFBQyxTQUFTLEVBQUMseUNBQXlDLEVBQUMsS0FBSyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSx5Q0FBeUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBRyxNQUFNLEtBQUssQ0FBQyxFQUFDO0lBQUMsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDO1FBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUM7WUFBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFBQSxJQUFHLE1BQU0sS0FBSyxNQUFNLEVBQUM7Z0JBQUMsSUFBRyxLQUFLLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQztvQkFBQyxJQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDO3dCQUFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFBQSxJQUFHLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUM7NEJBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsOEJBQThCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzs0QkFBQSxPQUFPLEtBQUssQ0FBQzt5QkFBQzt3QkFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO3FCQUFDO3lCQUFLO3dCQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztxQkFBQztvQkFBQSxJQUFHLE1BQU0sRUFBQzt3QkFBQyxJQUFHLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDOzRCQUFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQzs0QkFBQSxJQUFHLE9BQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUM7Z0NBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsaUNBQWlDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztnQ0FBQSxPQUFPLEtBQUssQ0FBQzs2QkFBQzs0QkFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO3lCQUFDOzZCQUFLOzRCQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzt5QkFBQzt3QkFBQSxJQUFHLE1BQU0sRUFBQzs0QkFBQyxJQUFHLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFDO2dDQUFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztnQ0FBQSxJQUFHLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUM7b0NBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsK0JBQStCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztvQ0FBQSxPQUFPLEtBQUssQ0FBQztpQ0FBQztnQ0FBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDOzZCQUFDO2lDQUFLO2dDQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs2QkFBQzt5QkFBQztxQkFBQztpQkFBQztxQkFBSztvQkFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUMsVUFBVSxFQUFDLGNBQWMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO29CQUFBLE9BQU8sS0FBSyxDQUFDO2lCQUFDO2FBQUM7WUFBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO1lBQUEsSUFBRyxDQUFDLE1BQU0sRUFBQztnQkFBQyxNQUFNO2FBQUM7U0FBQztLQUFDO1NBQUs7UUFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLENBQUMsQ0FBQztRQUFBLE9BQU8sS0FBSyxDQUFDO0tBQUM7Q0FBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUEsT0FBTyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQztBQUFBLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztBQUFBLE1BQU0sUUFBUSxHQUFHLEVBQUMsU0FBUyxFQUFDLHlDQUF5QyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEVBQUMsaUJBQWlCLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsaUJBQWlCLEVBQUMsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUMsYUFBYSxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFNBQVMsRUFBQyxFQUFDLE1BQU0sRUFBQyxxQkFBcUIsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUMsRUFBQyxDQUFDO0FBQUEsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxHQUFDLElBQUksRUFBQyxHQUFDLEVBQUUsSUFBRSxtQ0FBbUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsSUFBRyxNQUFNLEtBQUssQ0FBQyxFQUFDO0lBQUMsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDO1FBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUFBLEtBQUksSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUM7WUFBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFBQSxJQUFHLE1BQU0sS0FBSyxNQUFNLEVBQUM7Z0JBQUMsSUFBRyxLQUFLLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQztvQkFBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxJQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxFQUFDO3dCQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsa0JBQWtCLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsRUFBQyxlQUFlLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLCtCQUErQixHQUFDLFFBQVEsR0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO3dCQUFBLE9BQU8sS0FBSyxDQUFDO3FCQUFDO3lCQUFLO3dCQUFDLElBQUcsS0FBSyxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUM7NEJBQUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDOzRCQUFBLElBQUcsT0FBTyxLQUFLLENBQUMsZUFBZSxLQUFLLFFBQVEsRUFBQztnQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsa0JBQWtCLEVBQUMsVUFBVSxFQUFDLHlDQUF5QyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7Z0NBQUEsT0FBTyxLQUFLLENBQUM7NkJBQUM7NEJBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQzt5QkFBQzs2QkFBSzs0QkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7eUJBQUM7d0JBQUEsSUFBRyxNQUFNLEVBQUM7NEJBQUMsSUFBRyxLQUFLLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBQztnQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO2dDQUFBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztnQ0FBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0NBQUEsSUFBRyxNQUFNLEtBQUssTUFBTSxFQUFDO29DQUFDLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQzt3Q0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7d0NBQUEsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3Q0FBQSxLQUFJLElBQUksRUFBRSxHQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDOzRDQUFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzs0Q0FBQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7NENBQUEsSUFBRyxNQUFNLEtBQUssTUFBTSxFQUFDO2dEQUFDLElBQUcsS0FBSyxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUM7b0RBQUMsSUFBRyxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQzt3REFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7d0RBQUEsSUFBRyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFDOzREQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxtQkFBbUIsR0FBRyxFQUFFLEdBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxtREFBbUQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDOzREQUFBLE9BQU8sS0FBSyxDQUFDO3lEQUFDO3dEQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7cURBQUM7eURBQUs7d0RBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3FEQUFDO29EQUFBLElBQUcsTUFBTSxFQUFDO3dEQUFDLElBQUcsS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUM7NERBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDOzREQUFBLElBQUcsT0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBQztnRUFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsbUJBQW1CLEdBQUcsRUFBRSxHQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsc0RBQXNELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztnRUFBQSxPQUFPLEtBQUssQ0FBQzs2REFBQzs0REFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO3lEQUFDOzZEQUFLOzREQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzt5REFBQzt3REFBQSxJQUFHLE1BQU0sRUFBQzs0REFBQyxJQUFHLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFDO2dFQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztnRUFBQSxJQUFHLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUM7b0VBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLG1CQUFtQixHQUFHLEVBQUUsR0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLG9EQUFvRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7b0VBQUEsT0FBTyxLQUFLLENBQUM7aUVBQUM7Z0VBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQzs2REFBQztpRUFBSztnRUFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7NkRBQUM7eURBQUM7cURBQUM7aURBQUM7cURBQUs7b0RBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLG1CQUFtQixHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUMsbUNBQW1DLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztvREFBQSxPQUFPLEtBQUssQ0FBQztpREFBQzs2Q0FBQzs0Q0FBQSxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDOzRDQUFBLElBQUcsQ0FBQyxNQUFNLEVBQUM7Z0RBQUMsTUFBTTs2Q0FBQzt5Q0FBQztxQ0FBQzt5Q0FBSzt3Q0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsa0JBQWtCLEVBQUMsVUFBVSxFQUFDLDZCQUE2QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO3dDQUFBLE9BQU8sS0FBSyxDQUFDO3FDQUFDO2lDQUFDO2dDQUFBLElBQUksTUFBTSxHQUFHLE1BQU0sS0FBSyxNQUFNLENBQUM7NkJBQUM7aUNBQUs7Z0NBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOzZCQUFDOzRCQUFBLElBQUcsTUFBTSxFQUFDO2dDQUFDLElBQUcsS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUM7b0NBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO29DQUFBLElBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUM7d0NBQUMsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dDQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO3FDQUFDO29DQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7aUNBQUM7cUNBQUs7b0NBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2lDQUFDO2dDQUFBLElBQUcsTUFBTSxFQUFDO29DQUFDLElBQUcsS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUM7d0NBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO3dDQUFBLElBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUM7NENBQUMsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRDQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO3lDQUFDO3dDQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7cUNBQUM7eUNBQUs7d0NBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3FDQUFDO29DQUFBLElBQUcsTUFBTSxFQUFDO3dDQUFDLElBQUcsS0FBSyxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUM7NENBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDOzRDQUFBLElBQUcsT0FBTyxLQUFLLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBQztnREFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxxQ0FBcUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO2dEQUFBLE9BQU8sS0FBSyxDQUFDOzZDQUFDOzRDQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7eUNBQUM7NkNBQUs7NENBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3lDQUFDO3dDQUFBLElBQUcsTUFBTSxFQUFDOzRDQUFDLElBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUM7Z0RBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO2dEQUFBLElBQUcsT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBQztvREFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDO29EQUFBLE9BQU8sS0FBSyxDQUFDO2lEQUFDO2dEQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7NkNBQUM7aURBQUs7Z0RBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOzZDQUFDOzRDQUFBLElBQUcsTUFBTSxFQUFDO2dEQUFDLElBQUcsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUM7b0RBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO29EQUFBLElBQUcsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBQzt3REFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQywrQkFBK0IsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO3dEQUFBLE9BQU8sS0FBSyxDQUFDO3FEQUFDO29EQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7aURBQUM7cURBQUs7b0RBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2lEQUFDO2dEQUFBLElBQUcsTUFBTSxFQUFDO29EQUFDLElBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUM7d0RBQUMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3REFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7d0RBQUEsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO3dEQUFBLElBQUcsTUFBTSxLQUFLLE9BQU8sRUFBQzs0REFBQyxJQUFHLE1BQU0sSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFDO2dFQUFDLElBQUcsTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUM7b0VBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO29FQUFBLElBQUcsT0FBTyxNQUFNLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBQzt3RUFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsbUJBQW1CLEVBQUMsVUFBVSxFQUFDLDhDQUE4QyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7d0VBQUEsT0FBTyxLQUFLLENBQUM7cUVBQUM7b0VBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztpRUFBQztxRUFBSztvRUFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7aUVBQUM7Z0VBQUEsSUFBRyxNQUFNLEVBQUM7b0VBQUMsSUFBRyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBQzt3RUFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7d0VBQUEsSUFBRyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFDOzRFQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxvQkFBb0IsRUFBQyxVQUFVLEVBQUMsK0NBQStDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzs0RUFBQSxPQUFPLEtBQUssQ0FBQzt5RUFBQzt3RUFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO3FFQUFDO3lFQUFLO3dFQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztxRUFBQztvRUFBQSxJQUFHLE1BQU0sRUFBQzt3RUFBQyxJQUFHLE1BQU0sQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFDOzRFQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQzs0RUFBQSxJQUFHLE9BQU8sTUFBTSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUM7Z0ZBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLG9CQUFvQixFQUFDLFVBQVUsRUFBQywrQ0FBK0MsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO2dGQUFBLE9BQU8sS0FBSyxDQUFDOzZFQUFDOzRFQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7eUVBQUM7NkVBQUs7NEVBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3lFQUFDO3dFQUFBLElBQUcsTUFBTSxFQUFDOzRFQUFDLElBQUcsTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUM7Z0ZBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO2dGQUFBLElBQUcsT0FBTyxNQUFNLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBQztvRkFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMscUJBQXFCLEVBQUMsVUFBVSxFQUFDLGdEQUFnRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7b0ZBQUEsT0FBTyxLQUFLLENBQUM7aUZBQUM7Z0ZBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQzs2RUFBQztpRkFBSztnRkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7NkVBQUM7NEVBQUEsSUFBRyxNQUFNLEVBQUM7Z0ZBQUMsSUFBRyxNQUFNLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBQztvRkFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7b0ZBQUEsSUFBRyxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFDO3dGQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxzQkFBc0IsRUFBQyxVQUFVLEVBQUMsaURBQWlELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzt3RkFBQSxPQUFPLEtBQUssQ0FBQztxRkFBQztvRkFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO2lGQUFDO3FGQUFLO29GQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztpRkFBQztnRkFBQSxJQUFHLE1BQU0sRUFBQztvRkFBQyxJQUFHLE1BQU0sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFDO3dGQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQzt3RkFBQSxJQUFHLE9BQU8sTUFBTSxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUM7NEZBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLHVCQUF1QixFQUFDLFVBQVUsRUFBQyxrREFBa0QsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDOzRGQUFBLE9BQU8sS0FBSyxDQUFDO3lGQUFDO3dGQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7cUZBQUM7eUZBQUs7d0ZBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3FGQUFDO29GQUFBLElBQUcsTUFBTSxFQUFDO3dGQUFDLElBQUcsTUFBTSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUM7NEZBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDOzRGQUFBLElBQUcsT0FBTyxNQUFNLENBQUMsY0FBYyxLQUFLLFFBQVEsRUFBQztnR0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsd0JBQXdCLEVBQUMsVUFBVSxFQUFDLG1EQUFtRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7Z0dBQUEsT0FBTyxLQUFLLENBQUM7NkZBQUM7NEZBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQzt5RkFBQzs2RkFBSzs0RkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7eUZBQUM7d0ZBQUEsSUFBRyxNQUFNLEVBQUM7NEZBQUMsSUFBRyxNQUFNLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBQztnR0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0dBQUEsSUFBRyxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssUUFBUSxFQUFDO29HQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyx5QkFBeUIsRUFBQyxVQUFVLEVBQUMsb0RBQW9ELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztvR0FBQSxPQUFPLEtBQUssQ0FBQztpR0FBQztnR0FBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDOzZGQUFDO2lHQUFLO2dHQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs2RkFBQzs0RkFBQSxJQUFHLE1BQU0sRUFBQztnR0FBQyxJQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUM7b0dBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO29HQUFBLElBQUcsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssUUFBUSxFQUFDO3dHQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQywwQkFBMEIsRUFBQyxVQUFVLEVBQUMscURBQXFELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzt3R0FBQSxPQUFPLEtBQUssQ0FBQztxR0FBQztvR0FBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO2lHQUFDO3FHQUFLO29HQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztpR0FBQztnR0FBQSxJQUFHLE1BQU0sRUFBQztvR0FBQyxJQUFHLE1BQU0sQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLEVBQUM7d0dBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO3dHQUFBLElBQUcsT0FBTyxNQUFNLENBQUMsaUJBQWlCLEtBQUssUUFBUSxFQUFDOzRHQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQywyQkFBMkIsRUFBQyxVQUFVLEVBQUMsc0RBQXNELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzs0R0FBQSxPQUFPLEtBQUssQ0FBQzt5R0FBQzt3R0FBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO3FHQUFDO3lHQUFLO3dHQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztxR0FBQztvR0FBQSxJQUFHLE1BQU0sRUFBQzt3R0FBQyxJQUFHLE1BQU0sQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFDOzRHQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQzs0R0FBQSxJQUFHLE9BQU8sTUFBTSxDQUFDLGNBQWMsS0FBSyxRQUFRLEVBQUM7Z0hBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLHdCQUF3QixFQUFDLFVBQVUsRUFBQyxtREFBbUQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO2dIQUFBLE9BQU8sS0FBSyxDQUFDOzZHQUFDOzRHQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7eUdBQUM7NkdBQUs7NEdBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3lHQUFDO3dHQUFBLElBQUcsTUFBTSxFQUFDOzRHQUFDLElBQUcsTUFBTSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUM7Z0hBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO2dIQUFBLElBQUcsT0FBTyxNQUFNLENBQUMsZUFBZSxLQUFLLFFBQVEsRUFBQztvSEFBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMseUJBQXlCLEVBQUMsVUFBVSxFQUFDLG9EQUFvRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7b0hBQUEsT0FBTyxLQUFLLENBQUM7aUhBQUM7Z0hBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQzs2R0FBQztpSEFBSztnSEFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7NkdBQUM7NEdBQUEsSUFBRyxNQUFNLEVBQUM7Z0hBQUMsSUFBRyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBQztvSEFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7b0hBQUEsSUFBRyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFDO3dIQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxvQkFBb0IsRUFBQyxVQUFVLEVBQUMsK0NBQStDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQzt3SEFBQSxPQUFPLEtBQUssQ0FBQztxSEFBQztvSEFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDO2lIQUFDO3FIQUFLO29IQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztpSEFBQztnSEFBQSxJQUFHLE1BQU0sRUFBQztvSEFBQyxJQUFHLE1BQU0sQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFDO3dIQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQzt3SEFBQSxJQUFHLE9BQU8sTUFBTSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUM7NEhBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLHFCQUFxQixFQUFDLFVBQVUsRUFBQyxnREFBZ0QsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDOzRIQUFBLE9BQU8sS0FBSyxDQUFDO3lIQUFDO3dIQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7cUhBQUM7eUhBQUs7d0hBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3FIQUFDO29IQUFBLElBQUcsTUFBTSxFQUFDO3dIQUFDLElBQUcsTUFBTSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBQzs0SEFBQyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7NEhBQUEsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDOzRIQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLEVBQUM7Z0lBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLDZCQUE2QixFQUFDLFVBQVUsRUFBQyx3REFBd0QsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyw0Q0FBNEMsRUFBQyxDQUFDLENBQUM7Z0lBQUEsT0FBTyxLQUFLLENBQUM7NkhBQUM7NEhBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQzt5SEFBQzs2SEFBSzs0SEFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7eUhBQUM7d0hBQUEsSUFBRyxNQUFNLEVBQUM7NEhBQUMsSUFBRyxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBQztnSUFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0lBQUEsSUFBRyxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFDO29JQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsOENBQThDLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQztvSUFBQSxPQUFPLEtBQUssQ0FBQztpSUFBQztnSUFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDOzZIQUFDO2lJQUFLO2dJQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs2SEFBQzs0SEFBQSxJQUFHLE1BQU0sRUFBQztnSUFBQyxJQUFHLE1BQU0sQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUM7b0lBQUMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO29JQUFBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztvSUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFDO3dJQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyw0QkFBNEIsRUFBQyxVQUFVLEVBQUMsdURBQXVELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUMsRUFBQyxPQUFPLEVBQUMsNENBQTRDLEVBQUMsQ0FBQyxDQUFDO3dJQUFBLE9BQU8sS0FBSyxDQUFDO3FJQUFDO29JQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7aUlBQUM7cUlBQUs7b0lBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2lJQUFDO2dJQUFBLElBQUcsTUFBTSxFQUFDO29JQUFDLElBQUcsTUFBTSxDQUFDLG9CQUFvQixLQUFLLFNBQVMsRUFBQzt3SUFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7d0lBQUEsSUFBRyxPQUFPLE1BQU0sQ0FBQyxvQkFBb0IsS0FBSyxTQUFTLEVBQUM7NElBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLDhCQUE4QixFQUFDLFVBQVUsRUFBQyx5REFBeUQsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDOzRJQUFBLE9BQU8sS0FBSyxDQUFDO3lJQUFDO3dJQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7cUlBQUM7eUlBQUs7d0lBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO3FJQUFDO2lJQUFDOzZIQUFDO3lIQUFDO3FIQUFDO2lIQUFDOzZHQUFDO3lHQUFDO3FHQUFDO2lHQUFDOzZGQUFDO3lGQUFDO3FGQUFDO2lGQUFDOzZFQUFDO3lFQUFDO3FFQUFDO2lFQUFDOzZEQUFDO2lFQUFLO2dFQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLHlCQUF5QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7Z0VBQUEsT0FBTyxLQUFLLENBQUM7NkRBQUM7eURBQUM7d0RBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztxREFBQzt5REFBSzt3REFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7cURBQUM7b0RBQUEsSUFBRyxNQUFNLEVBQUM7d0RBQUMsSUFBRyxLQUFLLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBQzs0REFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7NERBQUEsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQztnRUFBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0VBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7NkRBQUM7NERBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQzt5REFBQzs2REFBSzs0REFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7eURBQUM7d0RBQUEsSUFBRyxNQUFNLEVBQUM7NERBQUMsSUFBRyxLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBQztnRUFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0VBQUEsSUFBRyxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFDO29FQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLGtDQUFrQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUM7b0VBQUEsT0FBTyxLQUFLLENBQUM7aUVBQUM7Z0VBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQzs2REFBQztpRUFBSztnRUFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7NkRBQUM7NERBQUEsSUFBRyxNQUFNLEVBQUM7Z0VBQUMsSUFBRyxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQztvRUFBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7b0VBQUEsSUFBRyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFDO3dFQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLDhCQUE4QixFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7d0VBQUEsT0FBTyxLQUFLLENBQUM7cUVBQUM7b0VBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztpRUFBQztxRUFBSztvRUFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7aUVBQUM7Z0VBQUEsSUFBRyxNQUFNLEVBQUM7b0VBQUMsSUFBRyxLQUFLLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBQzt3RUFBQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO3dFQUFBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQzt3RUFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7d0VBQUEsSUFBRyxNQUFNLEtBQUssT0FBTyxFQUFDOzRFQUFDLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQztnRkFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0ZBQUEsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnRkFBQSxLQUFJLElBQUksRUFBRSxHQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDO29GQUFDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztvRkFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7b0ZBQUEsSUFBRyxNQUFNLEtBQUssT0FBTyxFQUFDO3dGQUFDLElBQUcsTUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUM7NEZBQUMsSUFBRyxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBQztnR0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0dBQUEsSUFBRyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFDO29HQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEdBQUMsR0FBRyxHQUFHLEVBQUUsR0FBQyxjQUFjLEdBQUcsRUFBRSxHQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsbURBQW1ELEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztvR0FBQSxPQUFPLEtBQUssQ0FBQztpR0FBQztnR0FBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLEtBQUssTUFBTSxDQUFDOzZGQUFDO2lHQUFLO2dHQUFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs2RkFBQzs0RkFBQSxJQUFHLE1BQU0sRUFBQztnR0FBQyxJQUFHLE1BQU0sQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFDO29HQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztvR0FBQSxJQUFHLE9BQU8sTUFBTSxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUM7d0dBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLGNBQWMsR0FBRyxFQUFFLEdBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxzREFBc0QsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO3dHQUFBLE9BQU8sS0FBSyxDQUFDO3FHQUFDO29HQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7aUdBQUM7cUdBQUs7b0dBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2lHQUFDO2dHQUFBLElBQUcsTUFBTSxFQUFDO29HQUFDLElBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUM7d0dBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO3dHQUFBLElBQUcsT0FBTyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBQzs0R0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxHQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUMsY0FBYyxHQUFHLEVBQUUsR0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLG9EQUFvRCxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7NEdBQUEsT0FBTyxLQUFLLENBQUM7eUdBQUM7d0dBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztxR0FBQzt5R0FBSzt3R0FBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7cUdBQUM7aUdBQUM7NkZBQUM7eUZBQUM7NkZBQUs7NEZBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLGNBQWMsR0FBRyxFQUFFLEVBQUMsVUFBVSxFQUFDLG1DQUFtQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7NEZBQUEsT0FBTyxLQUFLLENBQUM7eUZBQUM7cUZBQUM7b0ZBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztvRkFBQSxJQUFHLENBQUMsTUFBTSxFQUFDO3dGQUFDLE1BQU07cUZBQUM7aUZBQUM7NkVBQUM7aUZBQUs7Z0ZBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsNkJBQTZCLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUM7Z0ZBQUEsT0FBTyxLQUFLLENBQUM7NkVBQUM7eUVBQUM7d0VBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLE1BQU0sQ0FBQztxRUFBQzt5RUFBSzt3RUFBQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7cUVBQUM7aUVBQUM7NkRBQUM7eURBQUM7cURBQUM7aURBQUM7NkNBQUM7eUNBQUM7cUNBQUM7aUNBQUM7NkJBQUM7eUJBQUM7cUJBQUM7aUJBQUM7cUJBQUs7b0JBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksR0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQyxjQUFjLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztvQkFBQSxPQUFPLEtBQUssQ0FBQztpQkFBQzthQUFDO1lBQUEsSUFBSSxNQUFNLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQztZQUFBLElBQUcsQ0FBQyxNQUFNLEVBQUM7Z0JBQUMsTUFBTTthQUFDO1NBQUM7S0FBQztTQUFLO1FBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUM7UUFBQSxPQUFPLEtBQUssQ0FBQztLQUFDO0NBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFBLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtleHBvcnQgY29uc3QgQ29uZmlnQ29uZGl0aW9uc1NjaGVtYSA9IHZhbGlkYXRlMTA7Y29uc3Qgc2NoZW1hMTEgPSB7XCIkc2NoZW1hXCI6XCJodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNcIixcIiRpZFwiOlwiQ29uZmlnQ29uZGl0aW9uc1NjaGVtYVwiLFwidHlwZVwiOlwib2JqZWN0XCIsXCJwYXR0ZXJuUHJvcGVydGllc1wiOntcIl4uKyRcIjp7XCIkcmVmXCI6XCIjL2RlZmluaXRpb25zL2NvbmRpdGlvbkdyb3VwQ29uZmlnXCJ9fSxcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6ZmFsc2UsXCJkZWZpbml0aW9uc1wiOntcImNvbmRpdGlvbklmQ29uZmlnXCI6e1widHlwZVwiOlwiYXJyYXlcIixcIm1pbkl0ZW1zXCI6MyxcIm1heEl0ZW1zXCI6MyxcIml0ZW1zXCI6W3t9LHtcImVudW1cIjpbXCI9PT1cIixcIiE9PVwiLFwiPj1cIixcIj5cIixcIjw9XCIsXCI8XCIsXCJpbmNsdWRlc1wiLFwibm90SW5jbHVkZXNcIl19LHt9XX0sXCJjb25kaXRpb25Hcm91cEl0ZW1cIjp7XCJ0eXBlXCI6XCJhcnJheVwiLFwiaXRlbXNcIjp7XCJhbnlPZlwiOlt7XCIkcmVmXCI6XCIjL2RlZmluaXRpb25zL2NvbmRpdGlvbklmQ29uZmlnXCJ9LHtcIiRyZWZcIjpcIiMvZGVmaW5pdGlvbnMvY29uZGl0aW9uR3JvdXBDb25maWdcIn1dfX0sXCJjb25kaXRpb25Hcm91cENvbmZpZ1wiOntcInR5cGVcIjpcIm9iamVjdFwiLFwicHJvcGVydGllc1wiOntcIiYmXCI6e1wiJHJlZlwiOlwiIy9kZWZpbml0aW9ucy9jb25kaXRpb25Hcm91cEl0ZW1cIn0sXCJ8fFwiOntcIiRyZWZcIjpcIiMvZGVmaW5pdGlvbnMvY29uZGl0aW9uR3JvdXBJdGVtXCJ9fSxcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6ZmFsc2V9LFwiY29uZGl0aW9uQ29uZmlnXCI6e1widHlwZVwiOlwib2JqZWN0XCIsXCJwYXR0ZXJuUHJvcGVydGllc1wiOntcIl4uKyRcIjp7XCIkcmVmXCI6XCIjL2RlZmluaXRpb25zL2NvbmRpdGlvbkdyb3VwQ29uZmlnXCJ9fSxcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6ZmFsc2V9fX07Y29uc3QgcGF0dGVybjAgPSBuZXcgUmVnRXhwKFwiXi4rJFwiLCBcInVcIik7Y29uc3Qgc2NoZW1hMTIgPSB7XCJ0eXBlXCI6XCJvYmplY3RcIixcInByb3BlcnRpZXNcIjp7XCImJlwiOntcIiRyZWZcIjpcIiMvZGVmaW5pdGlvbnMvY29uZGl0aW9uR3JvdXBJdGVtXCJ9LFwifHxcIjp7XCIkcmVmXCI6XCIjL2RlZmluaXRpb25zL2NvbmRpdGlvbkdyb3VwSXRlbVwifX0sXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOmZhbHNlfTtjb25zdCBzY2hlbWExMyA9IHtcInR5cGVcIjpcImFycmF5XCIsXCJpdGVtc1wiOntcImFueU9mXCI6W3tcIiRyZWZcIjpcIiMvZGVmaW5pdGlvbnMvY29uZGl0aW9uSWZDb25maWdcIn0se1wiJHJlZlwiOlwiIy9kZWZpbml0aW9ucy9jb25kaXRpb25Hcm91cENvbmZpZ1wifV19fTtjb25zdCBzY2hlbWExNCA9IHtcInR5cGVcIjpcImFycmF5XCIsXCJtaW5JdGVtc1wiOjMsXCJtYXhJdGVtc1wiOjMsXCJpdGVtc1wiOlt7fSx7XCJlbnVtXCI6W1wiPT09XCIsXCIhPT1cIixcIj49XCIsXCI+XCIsXCI8PVwiLFwiPFwiLFwiaW5jbHVkZXNcIixcIm5vdEluY2x1ZGVzXCJdfSx7fV19O2NvbnN0IHdyYXBwZXIwID0ge3ZhbGlkYXRlOiB2YWxpZGF0ZTExfTtmdW5jdGlvbiB2YWxpZGF0ZTEyKGRhdGEsIHtpbnN0YW5jZVBhdGg9XCJcIiwgcGFyZW50RGF0YSwgcGFyZW50RGF0YVByb3BlcnR5LCByb290RGF0YT1kYXRhfT17fSl7bGV0IHZFcnJvcnMgPSBudWxsO2xldCBlcnJvcnMgPSAwO2lmKGVycm9ycyA9PT0gMCl7aWYoQXJyYXkuaXNBcnJheShkYXRhKSl7dmFyIHZhbGlkMCA9IHRydWU7Y29uc3QgbGVuMCA9IGRhdGEubGVuZ3RoO2ZvcihsZXQgaTA9MDsgaTA8bGVuMDsgaTArKyl7bGV0IGRhdGEwID0gZGF0YVtpMF07Y29uc3QgX2VycnMxID0gZXJyb3JzO2NvbnN0IF9lcnJzMiA9IGVycm9ycztsZXQgdmFsaWQxID0gZmFsc2U7Y29uc3QgX2VycnMzID0gZXJyb3JzO2NvbnN0IF9lcnJzNCA9IGVycm9ycztpZihlcnJvcnMgPT09IF9lcnJzNCl7aWYoQXJyYXkuaXNBcnJheShkYXRhMCkpe2lmKGRhdGEwLmxlbmd0aCA+IDMpe2NvbnN0IGVycjAgPSB7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwLHNjaGVtYVBhdGg6XCIjL2RlZmluaXRpb25zL2NvbmRpdGlvbklmQ29uZmlnL21heEl0ZW1zXCIsa2V5d29yZDpcIm1heEl0ZW1zXCIscGFyYW1zOntsaW1pdDogM30sbWVzc2FnZTpcIm11c3QgTk9UIGhhdmUgbW9yZSB0aGFuIDMgaXRlbXNcIn07aWYodkVycm9ycyA9PT0gbnVsbCl7dkVycm9ycyA9IFtlcnIwXTt9ZWxzZSB7dkVycm9ycy5wdXNoKGVycjApO31lcnJvcnMrKzt9ZWxzZSB7aWYoZGF0YTAubGVuZ3RoIDwgMyl7Y29uc3QgZXJyMSA9IHtpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTAsc2NoZW1hUGF0aDpcIiMvZGVmaW5pdGlvbnMvY29uZGl0aW9uSWZDb25maWcvbWluSXRlbXNcIixrZXl3b3JkOlwibWluSXRlbXNcIixwYXJhbXM6e2xpbWl0OiAzfSxtZXNzYWdlOlwibXVzdCBOT1QgaGF2ZSBmZXdlciB0aGFuIDMgaXRlbXNcIn07aWYodkVycm9ycyA9PT0gbnVsbCl7dkVycm9ycyA9IFtlcnIxXTt9ZWxzZSB7dkVycm9ycy5wdXNoKGVycjEpO31lcnJvcnMrKzt9ZWxzZSB7Y29uc3QgbGVuMSA9IGRhdGEwLmxlbmd0aDtpZihsZW4xID4gMSl7bGV0IGRhdGExID0gZGF0YTBbMV07aWYoISgoKCgoKCgoZGF0YTEgPT09IFwiPT09XCIpIHx8IChkYXRhMSA9PT0gXCIhPT1cIikpIHx8IChkYXRhMSA9PT0gXCI+PVwiKSkgfHwgKGRhdGExID09PSBcIj5cIikpIHx8IChkYXRhMSA9PT0gXCI8PVwiKSkgfHwgKGRhdGExID09PSBcIjxcIikpIHx8IChkYXRhMSA9PT0gXCJpbmNsdWRlc1wiKSkgfHwgKGRhdGExID09PSBcIm5vdEluY2x1ZGVzXCIpKSl7Y29uc3QgZXJyMiA9IHtpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvMVwiLHNjaGVtYVBhdGg6XCIjL2RlZmluaXRpb25zL2NvbmRpdGlvbklmQ29uZmlnL2l0ZW1zLzEvZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNC5pdGVtc1sxXS5lbnVtfSxtZXNzYWdlOlwibXVzdCBiZSBlcXVhbCB0byBvbmUgb2YgdGhlIGFsbG93ZWQgdmFsdWVzXCJ9O2lmKHZFcnJvcnMgPT09IG51bGwpe3ZFcnJvcnMgPSBbZXJyMl07fWVsc2Uge3ZFcnJvcnMucHVzaChlcnIyKTt9ZXJyb3JzKys7fX19fX1lbHNlIHtjb25zdCBlcnIzID0ge2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvXCIgKyBpMCxzY2hlbWFQYXRoOlwiIy9kZWZpbml0aW9ucy9jb25kaXRpb25JZkNvbmZpZy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwiYXJyYXlcIn0sbWVzc2FnZTpcIm11c3QgYmUgYXJyYXlcIn07aWYodkVycm9ycyA9PT0gbnVsbCl7dkVycm9ycyA9IFtlcnIzXTt9ZWxzZSB7dkVycm9ycy5wdXNoKGVycjMpO31lcnJvcnMrKzt9fXZhciBfdmFsaWQwID0gX2VycnMzID09PSBlcnJvcnM7dmFsaWQxID0gdmFsaWQxIHx8IF92YWxpZDA7aWYoIXZhbGlkMSl7Y29uc3QgX2VycnM3ID0gZXJyb3JzO2lmKCEod3JhcHBlcjAudmFsaWRhdGUoZGF0YTAsIHtpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTAscGFyZW50RGF0YTpkYXRhLHBhcmVudERhdGFQcm9wZXJ0eTppMCxyb290RGF0YX0pKSl7dkVycm9ycyA9IHZFcnJvcnMgPT09IG51bGwgPyB3cmFwcGVyMC52YWxpZGF0ZS5lcnJvcnMgOiB2RXJyb3JzLmNvbmNhdCh3cmFwcGVyMC52YWxpZGF0ZS5lcnJvcnMpO2Vycm9ycyA9IHZFcnJvcnMubGVuZ3RoO312YXIgX3ZhbGlkMCA9IF9lcnJzNyA9PT0gZXJyb3JzO3ZhbGlkMSA9IHZhbGlkMSB8fCBfdmFsaWQwO31pZighdmFsaWQxKXtjb25zdCBlcnI0ID0ge2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvXCIgKyBpMCxzY2hlbWFQYXRoOlwiIy9pdGVtcy9hbnlPZlwiLGtleXdvcmQ6XCJhbnlPZlwiLHBhcmFtczp7fSxtZXNzYWdlOlwibXVzdCBtYXRjaCBhIHNjaGVtYSBpbiBhbnlPZlwifTtpZih2RXJyb3JzID09PSBudWxsKXt2RXJyb3JzID0gW2VycjRdO31lbHNlIHt2RXJyb3JzLnB1c2goZXJyNCk7fWVycm9ycysrO3ZhbGlkYXRlMTIuZXJyb3JzID0gdkVycm9ycztyZXR1cm4gZmFsc2U7fWVsc2Uge2Vycm9ycyA9IF9lcnJzMjtpZih2RXJyb3JzICE9PSBudWxsKXtpZihfZXJyczIpe3ZFcnJvcnMubGVuZ3RoID0gX2VycnMyO31lbHNlIHt2RXJyb3JzID0gbnVsbDt9fX12YXIgdmFsaWQwID0gX2VycnMxID09PSBlcnJvcnM7aWYoIXZhbGlkMCl7YnJlYWs7fX19ZWxzZSB7dmFsaWRhdGUxMi5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aCxzY2hlbWFQYXRoOlwiIy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwiYXJyYXlcIn0sbWVzc2FnZTpcIm11c3QgYmUgYXJyYXlcIn1dO3JldHVybiBmYWxzZTt9fXZhbGlkYXRlMTIuZXJyb3JzID0gdkVycm9ycztyZXR1cm4gZXJyb3JzID09PSAwO31mdW5jdGlvbiB2YWxpZGF0ZTExKGRhdGEsIHtpbnN0YW5jZVBhdGg9XCJcIiwgcGFyZW50RGF0YSwgcGFyZW50RGF0YVByb3BlcnR5LCByb290RGF0YT1kYXRhfT17fSl7bGV0IHZFcnJvcnMgPSBudWxsO2xldCBlcnJvcnMgPSAwO2lmKGVycm9ycyA9PT0gMCl7aWYoZGF0YSAmJiB0eXBlb2YgZGF0YSA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KGRhdGEpKXtjb25zdCBfZXJyczEgPSBlcnJvcnM7Zm9yKGNvbnN0IGtleTAgaW4gZGF0YSl7aWYoISgoa2V5MCA9PT0gXCImJlwiKSB8fCAoa2V5MCA9PT0gXCJ8fFwiKSkpe3ZhbGlkYXRlMTEuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGgsc2NoZW1hUGF0aDpcIiMvYWRkaXRpb25hbFByb3BlcnRpZXNcIixrZXl3b3JkOlwiYWRkaXRpb25hbFByb3BlcnRpZXNcIixwYXJhbXM6e2FkZGl0aW9uYWxQcm9wZXJ0eToga2V5MH0sbWVzc2FnZTpcIm11c3QgTk9UIGhhdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXCJ9XTtyZXR1cm4gZmFsc2U7YnJlYWs7fX1pZihfZXJyczEgPT09IGVycm9ycyl7aWYoZGF0YVtcIiYmXCJdICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMiA9IGVycm9ycztpZighKHZhbGlkYXRlMTIoZGF0YVtcIiYmXCJdLCB7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi8mJlwiLHBhcmVudERhdGE6ZGF0YSxwYXJlbnREYXRhUHJvcGVydHk6XCImJlwiLHJvb3REYXRhfSkpKXt2RXJyb3JzID0gdkVycm9ycyA9PT0gbnVsbCA/IHZhbGlkYXRlMTIuZXJyb3JzIDogdkVycm9ycy5jb25jYXQodmFsaWRhdGUxMi5lcnJvcnMpO2Vycm9ycyA9IHZFcnJvcnMubGVuZ3RoO312YXIgdmFsaWQwID0gX2VycnMyID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDAgPSB0cnVlO31pZih2YWxpZDApe2lmKGRhdGFbXCJ8fFwiXSAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczMgPSBlcnJvcnM7aWYoISh2YWxpZGF0ZTEyKGRhdGFbXCJ8fFwiXSwge2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvfHxcIixwYXJlbnREYXRhOmRhdGEscGFyZW50RGF0YVByb3BlcnR5OlwifHxcIixyb290RGF0YX0pKSl7dkVycm9ycyA9IHZFcnJvcnMgPT09IG51bGwgPyB2YWxpZGF0ZTEyLmVycm9ycyA6IHZFcnJvcnMuY29uY2F0KHZhbGlkYXRlMTIuZXJyb3JzKTtlcnJvcnMgPSB2RXJyb3JzLmxlbmd0aDt9dmFyIHZhbGlkMCA9IF9lcnJzMyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9fX19ZWxzZSB7dmFsaWRhdGUxMS5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aCxzY2hlbWFQYXRoOlwiIy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwib2JqZWN0XCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIG9iamVjdFwifV07cmV0dXJuIGZhbHNlO319dmFsaWRhdGUxMS5lcnJvcnMgPSB2RXJyb3JzO3JldHVybiBlcnJvcnMgPT09IDA7fWZ1bmN0aW9uIHZhbGlkYXRlMTAoZGF0YSwge2luc3RhbmNlUGF0aD1cIlwiLCBwYXJlbnREYXRhLCBwYXJlbnREYXRhUHJvcGVydHksIHJvb3REYXRhPWRhdGF9PXt9KXsvKiMgc291cmNlVVJMPVwiQ29uZmlnQ29uZGl0aW9uc1NjaGVtYVwiICovO2xldCB2RXJyb3JzID0gbnVsbDtsZXQgZXJyb3JzID0gMDtpZihlcnJvcnMgPT09IDApe2lmKGRhdGEgJiYgdHlwZW9mIGRhdGEgPT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShkYXRhKSl7Y29uc3QgX2VycnMxID0gZXJyb3JzO2Zvcihjb25zdCBrZXkwIGluIGRhdGEpe2lmKCEocGF0dGVybjAudGVzdChrZXkwKSkpe3ZhbGlkYXRlMTAuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGgsc2NoZW1hUGF0aDpcIiMvYWRkaXRpb25hbFByb3BlcnRpZXNcIixrZXl3b3JkOlwiYWRkaXRpb25hbFByb3BlcnRpZXNcIixwYXJhbXM6e2FkZGl0aW9uYWxQcm9wZXJ0eToga2V5MH0sbWVzc2FnZTpcIm11c3QgTk9UIGhhdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXCJ9XTtyZXR1cm4gZmFsc2U7YnJlYWs7fX1pZihfZXJyczEgPT09IGVycm9ycyl7dmFyIHZhbGlkMCA9IHRydWU7Zm9yKGNvbnN0IGtleTEgaW4gZGF0YSl7aWYocGF0dGVybjAudGVzdChrZXkxKSl7Y29uc3QgX2VycnMyID0gZXJyb3JzO2lmKCEodmFsaWRhdGUxMShkYXRhW2tleTFdLCB7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGtleTEucmVwbGFjZSgvfi9nLCBcIn4wXCIpLnJlcGxhY2UoL1xcLy9nLCBcIn4xXCIpLHBhcmVudERhdGE6ZGF0YSxwYXJlbnREYXRhUHJvcGVydHk6a2V5MSxyb290RGF0YX0pKSl7dkVycm9ycyA9IHZFcnJvcnMgPT09IG51bGwgPyB2YWxpZGF0ZTExLmVycm9ycyA6IHZFcnJvcnMuY29uY2F0KHZhbGlkYXRlMTEuZXJyb3JzKTtlcnJvcnMgPSB2RXJyb3JzLmxlbmd0aDt9dmFyIHZhbGlkMCA9IF9lcnJzMiA9PT0gZXJyb3JzO2lmKCF2YWxpZDApe2JyZWFrO319fX19ZWxzZSB7dmFsaWRhdGUxMC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aCxzY2hlbWFQYXRoOlwiIy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwib2JqZWN0XCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIG9iamVjdFwifV07cmV0dXJuIGZhbHNlO319dmFsaWRhdGUxMC5lcnJvcnMgPSB2RXJyb3JzO3JldHVybiBlcnJvcnMgPT09IDA7fWV4cG9ydCBjb25zdCBDb25maWdMYXlvdXRTY2hlbWEgPSB2YWxpZGF0ZTE2O2NvbnN0IHNjaGVtYTE1ID0ge1wiJHNjaGVtYVwiOlwiaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjXCIsXCIkaWRcIjpcIkNvbmZpZ0xheW91dFNjaGVtYVwiLFwidHlwZVwiOlwib2JqZWN0XCIsXCJwcm9wZXJ0aWVzXCI6e1wiaG9zdENsYXNzXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwiaG9zdFN0eWxlc1wiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImxhYmVsQ2xhc3NcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJsYWJlbFN0eWxlc1wiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImNvbnRlbnRDbGFzc1wiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImNvbnRlbnRTdHlsZXNcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJmb3JtR3JvdXBDbGFzc1wiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImZvcm1Hcm91cFN0eWxlc1wiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImRlc2NyaXB0aW9uQ2xhc3NcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJkZXNjcmlwdGlvblN0eWxlc1wiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImlucHV0QXJlYUNsYXNzXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwiaW5wdXRBcmVhU3R5bGVzXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwiZXJyb3JDbGFzc1wiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImVycm9yU3R5bGVzXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwiZGVzY3JpcHRpb25Qb3NpdGlvblwiOntcImVudW1cIjpbXCJhZnRlclwiLFwiYmVmb3JlXCJdfSxcImhpZGVMYWJlbFwiOntcInR5cGVcIjpcImJvb2xlYW5cIn0sXCJjb250ZW50Q29sbGFwc2libGVcIjp7XCJlbnVtXCI6W1wiY29sbGFwc2VcIixcImV4cGFuZFwiXSxcImRlc2NyaXB0aW9uXCI6XCJFbmFibGUgZXhwYW5kL2NvbGxhcHNlIG9mIGNvbnRlbnQuIFRoZSBkZWZhdWx0IHN0YXRlIHdpbGwgYmUgZGV0ZXJtaW5lZCBieSB2YWx1ZSBwcm92aWRlZFwifSxcImF1dG9BZGRSZXF1aXJlZENsYXNzXCI6e1widHlwZVwiOlwiYm9vbGVhblwiLFwiZGVzY3JpcHRpb25cIjpcIkFkZCBgcmVxdWlyZWRgIGNsYXNzIGF1dG9tYXRpY2FsbHkgdG8gY29udHJvbCBpZiB0aGVyZSdzIHZhbGlkYXRvciBuYW1lZCBgcmVxdWlyZWRgLiBEZWZhdWx0IGlzIHRydWUuXCJ9fX07ZnVuY3Rpb24gdmFsaWRhdGUxNihkYXRhLCB7aW5zdGFuY2VQYXRoPVwiXCIsIHBhcmVudERhdGEsIHBhcmVudERhdGFQcm9wZXJ0eSwgcm9vdERhdGE9ZGF0YX09e30pey8qIyBzb3VyY2VVUkw9XCJDb25maWdMYXlvdXRTY2hlbWFcIiAqLztsZXQgdkVycm9ycyA9IG51bGw7bGV0IGVycm9ycyA9IDA7aWYoZXJyb3JzID09PSAwKXtpZihkYXRhICYmIHR5cGVvZiBkYXRhID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YSkpe2lmKGRhdGEuaG9zdENsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMSA9IGVycm9ycztpZih0eXBlb2YgZGF0YS5ob3N0Q2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2hvc3RDbGFzc1wiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvaG9zdENsYXNzL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczEgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5ob3N0U3R5bGVzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMyA9IGVycm9ycztpZih0eXBlb2YgZGF0YS5ob3N0U3R5bGVzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTE2LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9ob3N0U3R5bGVzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9ob3N0U3R5bGVzL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczMgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5sYWJlbENsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzNSA9IGVycm9ycztpZih0eXBlb2YgZGF0YS5sYWJlbENsYXNzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTE2LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9sYWJlbENsYXNzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9sYWJlbENsYXNzL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczUgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5sYWJlbFN0eWxlcyAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczcgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEubGFiZWxTdHlsZXMgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2xhYmVsU3R5bGVzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9sYWJlbFN0eWxlcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnM3ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDAgPSB0cnVlO31pZih2YWxpZDApe2lmKGRhdGEuY29udGVudENsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzOSA9IGVycm9ycztpZih0eXBlb2YgZGF0YS5jb250ZW50Q2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2NvbnRlbnRDbGFzc1wiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvY29udGVudENsYXNzL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczkgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5jb250ZW50U3R5bGVzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMTEgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEuY29udGVudFN0eWxlcyAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxNi5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvY29udGVudFN0eWxlc1wiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvY29udGVudFN0eWxlcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMxMSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmZvcm1Hcm91cENsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMTMgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEuZm9ybUdyb3VwQ2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2Zvcm1Hcm91cENsYXNzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9mb3JtR3JvdXBDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMxMyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmZvcm1Hcm91cFN0eWxlcyAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczE1ID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhLmZvcm1Hcm91cFN0eWxlcyAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxNi5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvZm9ybUdyb3VwU3R5bGVzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9mb3JtR3JvdXBTdHlsZXMvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMCA9IF9lcnJzMTUgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5kZXNjcmlwdGlvbkNsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMTcgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEuZGVzY3JpcHRpb25DbGFzcyAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxNi5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvZGVzY3JpcHRpb25DbGFzc1wiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvZGVzY3JpcHRpb25DbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMxNyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmRlc2NyaXB0aW9uU3R5bGVzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMTkgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEuZGVzY3JpcHRpb25TdHlsZXMgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2Rlc2NyaXB0aW9uU3R5bGVzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9kZXNjcmlwdGlvblN0eWxlcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMxOSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmlucHV0QXJlYUNsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMjEgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEuaW5wdXRBcmVhQ2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2lucHV0QXJlYUNsYXNzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9pbnB1dEFyZWFDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMyMSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmlucHV0QXJlYVN0eWxlcyAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczIzID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhLmlucHV0QXJlYVN0eWxlcyAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxNi5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvaW5wdXRBcmVhU3R5bGVzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9pbnB1dEFyZWFTdHlsZXMvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMCA9IF9lcnJzMjMgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5lcnJvckNsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMjUgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEuZXJyb3JDbGFzcyAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxNi5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvZXJyb3JDbGFzc1wiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvZXJyb3JDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMyNSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmVycm9yU3R5bGVzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMjcgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEuZXJyb3JTdHlsZXMgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2Vycm9yU3R5bGVzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9lcnJvclN0eWxlcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMyNyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmRlc2NyaXB0aW9uUG9zaXRpb24gIT09IHVuZGVmaW5lZCl7bGV0IGRhdGExNCA9IGRhdGEuZGVzY3JpcHRpb25Qb3NpdGlvbjtjb25zdCBfZXJyczI5ID0gZXJyb3JzO2lmKCEoKGRhdGExNCA9PT0gXCJhZnRlclwiKSB8fCAoZGF0YTE0ID09PSBcImJlZm9yZVwiKSkpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2Rlc2NyaXB0aW9uUG9zaXRpb25cIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL2Rlc2NyaXB0aW9uUG9zaXRpb24vZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNS5wcm9wZXJ0aWVzLmRlc2NyaXB0aW9uUG9zaXRpb24uZW51bX0sbWVzc2FnZTpcIm11c3QgYmUgZXF1YWwgdG8gb25lIG9mIHRoZSBhbGxvd2VkIHZhbHVlc1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMyOSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmhpZGVMYWJlbCAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczMwID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhLmhpZGVMYWJlbCAhPT0gXCJib29sZWFuXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2hpZGVMYWJlbFwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvaGlkZUxhYmVsL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJib29sZWFuXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIGJvb2xlYW5cIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMCA9IF9lcnJzMzAgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5jb250ZW50Q29sbGFwc2libGUgIT09IHVuZGVmaW5lZCl7bGV0IGRhdGExNiA9IGRhdGEuY29udGVudENvbGxhcHNpYmxlO2NvbnN0IF9lcnJzMzIgPSBlcnJvcnM7aWYoISgoZGF0YTE2ID09PSBcImNvbGxhcHNlXCIpIHx8IChkYXRhMTYgPT09IFwiZXhwYW5kXCIpKSl7dmFsaWRhdGUxNi5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvY29udGVudENvbGxhcHNpYmxlXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9jb250ZW50Q29sbGFwc2libGUvZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNS5wcm9wZXJ0aWVzLmNvbnRlbnRDb2xsYXBzaWJsZS5lbnVtfSxtZXNzYWdlOlwibXVzdCBiZSBlcXVhbCB0byBvbmUgb2YgdGhlIGFsbG93ZWQgdmFsdWVzXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczMyID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDAgPSB0cnVlO31pZih2YWxpZDApe2lmKGRhdGEuYXV0b0FkZFJlcXVpcmVkQ2xhc3MgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMzMyA9IGVycm9ycztpZih0eXBlb2YgZGF0YS5hdXRvQWRkUmVxdWlyZWRDbGFzcyAhPT0gXCJib29sZWFuXCIpe3ZhbGlkYXRlMTYuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2F1dG9BZGRSZXF1aXJlZENsYXNzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9hdXRvQWRkUmVxdWlyZWRDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwiYm9vbGVhblwifSxtZXNzYWdlOlwibXVzdCBiZSBib29sZWFuXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczMzID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDAgPSB0cnVlO319fX19fX19fX19fX19fX19fX1lbHNlIHt2YWxpZGF0ZTE2LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoLHNjaGVtYVBhdGg6XCIjL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJvYmplY3RcIn0sbWVzc2FnZTpcIm11c3QgYmUgb2JqZWN0XCJ9XTtyZXR1cm4gZmFsc2U7fX12YWxpZGF0ZTE2LmVycm9ycyA9IHZFcnJvcnM7cmV0dXJuIGVycm9ycyA9PT0gMDt9ZXhwb3J0IGNvbnN0IENvbmZpZ09wdGlvbnNTY2hlbWEgPSB2YWxpZGF0ZTE3O2NvbnN0IHNjaGVtYTE2ID0ge1wiJHNjaGVtYVwiOlwiaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjXCIsXCIkaWRcIjpcIkNvbmZpZ09wdGlvbnNTY2hlbWFcIixcInR5cGVcIjpcIm9iamVjdFwiLFwicHJvcGVydGllc1wiOntcImRhdGFcIjp7XCJ0eXBlXCI6XCJhcnJheVwiLFwiaXRlbXNcIjp7XCJ0eXBlXCI6XCJvYmplY3RcIixcInByb3BlcnRpZXNcIjp7XCJsYWJlbFwiOntcInR5cGVcIjpcInN0cmluZ1wifSxcInZhbHVlXCI6e319fX0sXCJzcmNcIjp7XCJvbmVPZlwiOlt7XCJ0eXBlXCI6XCJzdHJpbmdcIn0se1wiJHJlZlwiOlwiIy9kZWZpbml0aW9ucy9vcHRpb25Tb3VyY2VDb25maWdcIn1dfSxcInNyY0FwcGVuZFBvc2l0aW9uXCI6e1widHlwZVwiOlwic3RyaW5nXCIsXCJlbnVtXCI6W1wiYWZ0ZXJcIixcImJlZm9yZVwiXX0sXCJhdXRvU2VsZWN0Rmlyc3RcIjp7XCJ0eXBlXCI6XCJib29sZWFuXCJ9LFwibGF5b3V0XCI6e1widHlwZVwiOlwic3RyaW5nXCIsXCJlbnVtXCI6W1wicm93XCIsXCJjb2x1bW5cIl19LFwibGFiZWxQb3NpdGlvblwiOntcInR5cGVcIjpcInN0cmluZ1wiLFwiZW51bVwiOltcImFmdGVyXCIsXCJiZWZvcmVcIl19LFwiY29udGFpbmVyQ2xhc3NcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJjb250YWluZXJTdHlsZXNcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn19LFwiZGVmaW5pdGlvbnNcIjp7XCJvcHRpb25Tb3VyY2VDb25maWdcIjp7XCJ0eXBlXCI6XCJvYmplY3RcIixcInByb3BlcnRpZXNcIjp7XCJ1cmxcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJtZXRob2RcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIixcImVudW1cIjpbXCJHRVRcIixcIlBPU1RcIl19LFwiaGVhZGVyc1wiOnt9LFwiYm9keVwiOnt9LFwibWFwRGF0YVwiOntcInR5cGVcIjpcIm9iamVjdFwiLFwicHJvcGVydGllc1wiOntcImxhYmVsS2V5XCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwidmFsdWVLZXlzXCI6e1widHlwZVwiOlwiYXJyYXlcIixcIml0ZW1zXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9fSxcImNvbnRlbnRQYXRoXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwic2xpY2VcIjp7XCJ0eXBlXCI6XCJhcnJheVwiLFwiaXRlbXNcIjpbe1widHlwZVwiOlwibnVtYmVyXCJ9LHtcInR5cGVcIjpcIm51bWJlclwifV0sXCJtaW5JdGVtc1wiOjIsXCJtYXhJdGVtc1wiOjJ9LFwiYXBwZW5kUG9zaXRpb25cIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIixcImVudW1cIjpbXCJhZnRlclwiLFwiYmVmb3JlXCJdfX19LFwidHJpZ2dlclwiOntcInR5cGVcIjpcIm9iamVjdFwiLFwicHJvcGVydGllc1wiOntcImJ5XCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwiYm9keVwiOnt9LFwiZGVib3VuY2VUaW1lXCI6e1widHlwZVwiOlwibnVtYmVyXCJ9fX0sXCJmaWx0ZXJcIjp7XCJ0eXBlXCI6XCJvYmplY3RcIixcInByb3BlcnRpZXNcIjp7XCJieVwiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImNvbmRpdGlvbnNcIjp7XCIkcmVmXCI6XCJDb25maWdDb25kaXRpb25zU2NoZW1hIy9kZWZpbml0aW9ucy9jb25kaXRpb25Hcm91cENvbmZpZ1wifSxcImRlYm91bmNlVGltZVwiOntcInR5cGVcIjpcIm51bWJlclwifX19fX19fTtjb25zdCBzY2hlbWExNyA9IHtcInR5cGVcIjpcIm9iamVjdFwiLFwicHJvcGVydGllc1wiOntcInVybFwiOntcInR5cGVcIjpcInN0cmluZ1wifSxcIm1ldGhvZFwiOntcInR5cGVcIjpcInN0cmluZ1wiLFwiZW51bVwiOltcIkdFVFwiLFwiUE9TVFwiXX0sXCJoZWFkZXJzXCI6e30sXCJib2R5XCI6e30sXCJtYXBEYXRhXCI6e1widHlwZVwiOlwib2JqZWN0XCIsXCJwcm9wZXJ0aWVzXCI6e1wibGFiZWxLZXlcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJ2YWx1ZUtleXNcIjp7XCJ0eXBlXCI6XCJhcnJheVwiLFwiaXRlbXNcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn19LFwiY29udGVudFBhdGhcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJzbGljZVwiOntcInR5cGVcIjpcImFycmF5XCIsXCJpdGVtc1wiOlt7XCJ0eXBlXCI6XCJudW1iZXJcIn0se1widHlwZVwiOlwibnVtYmVyXCJ9XSxcIm1pbkl0ZW1zXCI6MixcIm1heEl0ZW1zXCI6Mn0sXCJhcHBlbmRQb3NpdGlvblwiOntcInR5cGVcIjpcInN0cmluZ1wiLFwiZW51bVwiOltcImFmdGVyXCIsXCJiZWZvcmVcIl19fX0sXCJ0cmlnZ2VyXCI6e1widHlwZVwiOlwib2JqZWN0XCIsXCJwcm9wZXJ0aWVzXCI6e1wiYnlcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJib2R5XCI6e30sXCJkZWJvdW5jZVRpbWVcIjp7XCJ0eXBlXCI6XCJudW1iZXJcIn19fSxcImZpbHRlclwiOntcInR5cGVcIjpcIm9iamVjdFwiLFwicHJvcGVydGllc1wiOntcImJ5XCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwiY29uZGl0aW9uc1wiOntcIiRyZWZcIjpcIkNvbmZpZ0NvbmRpdGlvbnNTY2hlbWEjL2RlZmluaXRpb25zL2NvbmRpdGlvbkdyb3VwQ29uZmlnXCJ9LFwiZGVib3VuY2VUaW1lXCI6e1widHlwZVwiOlwibnVtYmVyXCJ9fX19fTtmdW5jdGlvbiB2YWxpZGF0ZTE5KGRhdGEsIHtpbnN0YW5jZVBhdGg9XCJcIiwgcGFyZW50RGF0YSwgcGFyZW50RGF0YVByb3BlcnR5LCByb290RGF0YT1kYXRhfT17fSl7bGV0IHZFcnJvcnMgPSBudWxsO2xldCBlcnJvcnMgPSAwO2lmKGVycm9ycyA9PT0gMCl7aWYoZGF0YSAmJiB0eXBlb2YgZGF0YSA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KGRhdGEpKXtjb25zdCBfZXJyczEgPSBlcnJvcnM7Zm9yKGNvbnN0IGtleTAgaW4gZGF0YSl7aWYoISgoa2V5MCA9PT0gXCImJlwiKSB8fCAoa2V5MCA9PT0gXCJ8fFwiKSkpe3ZhbGlkYXRlMTkuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGgsc2NoZW1hUGF0aDpcIiMvYWRkaXRpb25hbFByb3BlcnRpZXNcIixrZXl3b3JkOlwiYWRkaXRpb25hbFByb3BlcnRpZXNcIixwYXJhbXM6e2FkZGl0aW9uYWxQcm9wZXJ0eToga2V5MH0sbWVzc2FnZTpcIm11c3QgTk9UIGhhdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXCJ9XTtyZXR1cm4gZmFsc2U7YnJlYWs7fX1pZihfZXJyczEgPT09IGVycm9ycyl7aWYoZGF0YVtcIiYmXCJdICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMiA9IGVycm9ycztpZighKHZhbGlkYXRlMTIoZGF0YVtcIiYmXCJdLCB7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi8mJlwiLHBhcmVudERhdGE6ZGF0YSxwYXJlbnREYXRhUHJvcGVydHk6XCImJlwiLHJvb3REYXRhfSkpKXt2RXJyb3JzID0gdkVycm9ycyA9PT0gbnVsbCA/IHZhbGlkYXRlMTIuZXJyb3JzIDogdkVycm9ycy5jb25jYXQodmFsaWRhdGUxMi5lcnJvcnMpO2Vycm9ycyA9IHZFcnJvcnMubGVuZ3RoO312YXIgdmFsaWQwID0gX2VycnMyID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDAgPSB0cnVlO31pZih2YWxpZDApe2lmKGRhdGFbXCJ8fFwiXSAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczMgPSBlcnJvcnM7aWYoISh2YWxpZGF0ZTEyKGRhdGFbXCJ8fFwiXSwge2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvfHxcIixwYXJlbnREYXRhOmRhdGEscGFyZW50RGF0YVByb3BlcnR5OlwifHxcIixyb290RGF0YX0pKSl7dkVycm9ycyA9IHZFcnJvcnMgPT09IG51bGwgPyB2YWxpZGF0ZTEyLmVycm9ycyA6IHZFcnJvcnMuY29uY2F0KHZhbGlkYXRlMTIuZXJyb3JzKTtlcnJvcnMgPSB2RXJyb3JzLmxlbmd0aDt9dmFyIHZhbGlkMCA9IF9lcnJzMyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9fX19ZWxzZSB7dmFsaWRhdGUxOS5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aCxzY2hlbWFQYXRoOlwiIy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwib2JqZWN0XCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIG9iamVjdFwifV07cmV0dXJuIGZhbHNlO319dmFsaWRhdGUxOS5lcnJvcnMgPSB2RXJyb3JzO3JldHVybiBlcnJvcnMgPT09IDA7fWZ1bmN0aW9uIHZhbGlkYXRlMTgoZGF0YSwge2luc3RhbmNlUGF0aD1cIlwiLCBwYXJlbnREYXRhLCBwYXJlbnREYXRhUHJvcGVydHksIHJvb3REYXRhPWRhdGF9PXt9KXtsZXQgdkVycm9ycyA9IG51bGw7bGV0IGVycm9ycyA9IDA7aWYoZXJyb3JzID09PSAwKXtpZihkYXRhICYmIHR5cGVvZiBkYXRhID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YSkpe2lmKGRhdGEudXJsICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMSA9IGVycm9ycztpZih0eXBlb2YgZGF0YS51cmwgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTguZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL3VybFwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvdXJsL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczEgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5tZXRob2QgIT09IHVuZGVmaW5lZCl7bGV0IGRhdGExID0gZGF0YS5tZXRob2Q7Y29uc3QgX2VycnMzID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMSAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvbWV0aG9kXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9tZXRob2QvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9aWYoISgoZGF0YTEgPT09IFwiR0VUXCIpIHx8IChkYXRhMSA9PT0gXCJQT1NUXCIpKSl7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvbWV0aG9kXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9tZXRob2QvZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNy5wcm9wZXJ0aWVzLm1ldGhvZC5lbnVtfSxtZXNzYWdlOlwibXVzdCBiZSBlcXVhbCB0byBvbmUgb2YgdGhlIGFsbG93ZWQgdmFsdWVzXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczMgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5tYXBEYXRhICE9PSB1bmRlZmluZWQpe2xldCBkYXRhMiA9IGRhdGEubWFwRGF0YTtjb25zdCBfZXJyczUgPSBlcnJvcnM7aWYoZXJyb3JzID09PSBfZXJyczUpe2lmKGRhdGEyICYmIHR5cGVvZiBkYXRhMiA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KGRhdGEyKSl7aWYoZGF0YTIubGFiZWxLZXkgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM3ID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMi5sYWJlbEtleSAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvbWFwRGF0YS9sYWJlbEtleVwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvbWFwRGF0YS9wcm9wZXJ0aWVzL2xhYmVsS2V5L3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDEgPSBfZXJyczcgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMSA9IHRydWU7fWlmKHZhbGlkMSl7aWYoZGF0YTIudmFsdWVLZXlzICE9PSB1bmRlZmluZWQpe2xldCBkYXRhNCA9IGRhdGEyLnZhbHVlS2V5cztjb25zdCBfZXJyczkgPSBlcnJvcnM7aWYoZXJyb3JzID09PSBfZXJyczkpe2lmKEFycmF5LmlzQXJyYXkoZGF0YTQpKXt2YXIgdmFsaWQyID0gdHJ1ZTtjb25zdCBsZW4wID0gZGF0YTQubGVuZ3RoO2ZvcihsZXQgaTA9MDsgaTA8bGVuMDsgaTArKyl7Y29uc3QgX2VycnMxMSA9IGVycm9ycztpZih0eXBlb2YgZGF0YTRbaTBdICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTE4LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9tYXBEYXRhL3ZhbHVlS2V5cy9cIiArIGkwLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvbWFwRGF0YS9wcm9wZXJ0aWVzL3ZhbHVlS2V5cy9pdGVtcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQyID0gX2VycnMxMSA9PT0gZXJyb3JzO2lmKCF2YWxpZDIpe2JyZWFrO319fWVsc2Uge3ZhbGlkYXRlMTguZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL21hcERhdGEvdmFsdWVLZXlzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9tYXBEYXRhL3Byb3BlcnRpZXMvdmFsdWVLZXlzL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJhcnJheVwifSxtZXNzYWdlOlwibXVzdCBiZSBhcnJheVwifV07cmV0dXJuIGZhbHNlO319dmFyIHZhbGlkMSA9IF9lcnJzOSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQxID0gdHJ1ZTt9aWYodmFsaWQxKXtpZihkYXRhMi5jb250ZW50UGF0aCAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczEzID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMi5jb250ZW50UGF0aCAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvbWFwRGF0YS9jb250ZW50UGF0aFwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvbWFwRGF0YS9wcm9wZXJ0aWVzL2NvbnRlbnRQYXRoL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDEgPSBfZXJyczEzID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO31pZih2YWxpZDEpe2lmKGRhdGEyLnNsaWNlICE9PSB1bmRlZmluZWQpe2xldCBkYXRhNyA9IGRhdGEyLnNsaWNlO2NvbnN0IF9lcnJzMTUgPSBlcnJvcnM7aWYoZXJyb3JzID09PSBfZXJyczE1KXtpZihBcnJheS5pc0FycmF5KGRhdGE3KSl7aWYoZGF0YTcubGVuZ3RoID4gMil7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvbWFwRGF0YS9zbGljZVwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvbWFwRGF0YS9wcm9wZXJ0aWVzL3NsaWNlL21heEl0ZW1zXCIsa2V5d29yZDpcIm1heEl0ZW1zXCIscGFyYW1zOntsaW1pdDogMn0sbWVzc2FnZTpcIm11c3QgTk9UIGhhdmUgbW9yZSB0aGFuIDIgaXRlbXNcIn1dO3JldHVybiBmYWxzZTt9ZWxzZSB7aWYoZGF0YTcubGVuZ3RoIDwgMil7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvbWFwRGF0YS9zbGljZVwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvbWFwRGF0YS9wcm9wZXJ0aWVzL3NsaWNlL21pbkl0ZW1zXCIsa2V5d29yZDpcIm1pbkl0ZW1zXCIscGFyYW1zOntsaW1pdDogMn0sbWVzc2FnZTpcIm11c3QgTk9UIGhhdmUgZmV3ZXIgdGhhbiAyIGl0ZW1zXCJ9XTtyZXR1cm4gZmFsc2U7fWVsc2Uge2NvbnN0IGxlbjEgPSBkYXRhNy5sZW5ndGg7aWYobGVuMSA+IDApe2xldCBkYXRhOCA9IGRhdGE3WzBdO2NvbnN0IF9lcnJzMTcgPSBlcnJvcnM7aWYoISgodHlwZW9mIGRhdGE4ID09IFwibnVtYmVyXCIpICYmIChpc0Zpbml0ZShkYXRhOCkpKSl7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvbWFwRGF0YS9zbGljZS8wXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9tYXBEYXRhL3Byb3BlcnRpZXMvc2xpY2UvaXRlbXMvMC90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwibnVtYmVyXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIG51bWJlclwifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQzID0gX2VycnMxNyA9PT0gZXJyb3JzO31pZih2YWxpZDMpe2lmKGxlbjEgPiAxKXtsZXQgZGF0YTkgPSBkYXRhN1sxXTtjb25zdCBfZXJyczE5ID0gZXJyb3JzO2lmKCEoKHR5cGVvZiBkYXRhOSA9PSBcIm51bWJlclwiKSAmJiAoaXNGaW5pdGUoZGF0YTkpKSkpe3ZhbGlkYXRlMTguZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL21hcERhdGEvc2xpY2UvMVwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvbWFwRGF0YS9wcm9wZXJ0aWVzL3NsaWNlL2l0ZW1zLzEvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcIm51bWJlclwifSxtZXNzYWdlOlwibXVzdCBiZSBudW1iZXJcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMyA9IF9lcnJzMTkgPT09IGVycm9yczt9fX19fWVsc2Uge3ZhbGlkYXRlMTguZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL21hcERhdGEvc2xpY2VcIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL21hcERhdGEvcHJvcGVydGllcy9zbGljZS90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwiYXJyYXlcIn0sbWVzc2FnZTpcIm11c3QgYmUgYXJyYXlcIn1dO3JldHVybiBmYWxzZTt9fXZhciB2YWxpZDEgPSBfZXJyczE1ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO31pZih2YWxpZDEpe2lmKGRhdGEyLmFwcGVuZFBvc2l0aW9uICE9PSB1bmRlZmluZWQpe2xldCBkYXRhMTAgPSBkYXRhMi5hcHBlbmRQb3NpdGlvbjtjb25zdCBfZXJyczIxID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMTAgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTguZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL21hcERhdGEvYXBwZW5kUG9zaXRpb25cIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL21hcERhdGEvcHJvcGVydGllcy9hcHBlbmRQb3NpdGlvbi90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO31pZighKChkYXRhMTAgPT09IFwiYWZ0ZXJcIikgfHwgKGRhdGExMCA9PT0gXCJiZWZvcmVcIikpKXt2YWxpZGF0ZTE4LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9tYXBEYXRhL2FwcGVuZFBvc2l0aW9uXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9tYXBEYXRhL3Byb3BlcnRpZXMvYXBwZW5kUG9zaXRpb24vZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNy5wcm9wZXJ0aWVzLm1hcERhdGEucHJvcGVydGllcy5hcHBlbmRQb3NpdGlvbi5lbnVtfSxtZXNzYWdlOlwibXVzdCBiZSBlcXVhbCB0byBvbmUgb2YgdGhlIGFsbG93ZWQgdmFsdWVzXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDEgPSBfZXJyczIxID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO319fX19fWVsc2Uge3ZhbGlkYXRlMTguZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL21hcERhdGFcIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL21hcERhdGEvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcIm9iamVjdFwifSxtZXNzYWdlOlwibXVzdCBiZSBvYmplY3RcIn1dO3JldHVybiBmYWxzZTt9fXZhciB2YWxpZDAgPSBfZXJyczUgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS50cmlnZ2VyICE9PSB1bmRlZmluZWQpe2xldCBkYXRhMTEgPSBkYXRhLnRyaWdnZXI7Y29uc3QgX2VycnMyMyA9IGVycm9ycztpZihlcnJvcnMgPT09IF9lcnJzMjMpe2lmKGRhdGExMSAmJiB0eXBlb2YgZGF0YTExID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YTExKSl7aWYoZGF0YTExLmJ5ICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMjUgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGExMS5ieSAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvdHJpZ2dlci9ieVwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvdHJpZ2dlci9wcm9wZXJ0aWVzL2J5L3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDQgPSBfZXJyczI1ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDQgPSB0cnVlO31pZih2YWxpZDQpe2lmKGRhdGExMS5kZWJvdW5jZVRpbWUgIT09IHVuZGVmaW5lZCl7bGV0IGRhdGExMyA9IGRhdGExMS5kZWJvdW5jZVRpbWU7Y29uc3QgX2VycnMyNyA9IGVycm9ycztpZighKCh0eXBlb2YgZGF0YTEzID09IFwibnVtYmVyXCIpICYmIChpc0Zpbml0ZShkYXRhMTMpKSkpe3ZhbGlkYXRlMTguZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL3RyaWdnZXIvZGVib3VuY2VUaW1lXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy90cmlnZ2VyL3Byb3BlcnRpZXMvZGVib3VuY2VUaW1lL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJudW1iZXJcIn0sbWVzc2FnZTpcIm11c3QgYmUgbnVtYmVyXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDQgPSBfZXJyczI3ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDQgPSB0cnVlO319fWVsc2Uge3ZhbGlkYXRlMTguZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL3RyaWdnZXJcIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL3RyaWdnZXIvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcIm9iamVjdFwifSxtZXNzYWdlOlwibXVzdCBiZSBvYmplY3RcIn1dO3JldHVybiBmYWxzZTt9fXZhciB2YWxpZDAgPSBfZXJyczIzID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDAgPSB0cnVlO31pZih2YWxpZDApe2lmKGRhdGEuZmlsdGVyICE9PSB1bmRlZmluZWQpe2xldCBkYXRhMTQgPSBkYXRhLmZpbHRlcjtjb25zdCBfZXJyczI5ID0gZXJyb3JzO2lmKGVycm9ycyA9PT0gX2VycnMyOSl7aWYoZGF0YTE0ICYmIHR5cGVvZiBkYXRhMTQgPT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShkYXRhMTQpKXtpZihkYXRhMTQuYnkgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMzMSA9IGVycm9ycztpZih0eXBlb2YgZGF0YTE0LmJ5ICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTE4LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9maWx0ZXIvYnlcIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL2ZpbHRlci9wcm9wZXJ0aWVzL2J5L3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDUgPSBfZXJyczMxID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDUgPSB0cnVlO31pZih2YWxpZDUpe2lmKGRhdGExNC5jb25kaXRpb25zICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMzMgPSBlcnJvcnM7aWYoISh2YWxpZGF0ZTE5KGRhdGExNC5jb25kaXRpb25zLCB7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9maWx0ZXIvY29uZGl0aW9uc1wiLHBhcmVudERhdGE6ZGF0YTE0LHBhcmVudERhdGFQcm9wZXJ0eTpcImNvbmRpdGlvbnNcIixyb290RGF0YX0pKSl7dkVycm9ycyA9IHZFcnJvcnMgPT09IG51bGwgPyB2YWxpZGF0ZTE5LmVycm9ycyA6IHZFcnJvcnMuY29uY2F0KHZhbGlkYXRlMTkuZXJyb3JzKTtlcnJvcnMgPSB2RXJyb3JzLmxlbmd0aDt9dmFyIHZhbGlkNSA9IF9lcnJzMzMgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkNSA9IHRydWU7fWlmKHZhbGlkNSl7aWYoZGF0YTE0LmRlYm91bmNlVGltZSAhPT0gdW5kZWZpbmVkKXtsZXQgZGF0YTE3ID0gZGF0YTE0LmRlYm91bmNlVGltZTtjb25zdCBfZXJyczM0ID0gZXJyb3JzO2lmKCEoKHR5cGVvZiBkYXRhMTcgPT0gXCJudW1iZXJcIikgJiYgKGlzRmluaXRlKGRhdGExNykpKSl7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvZmlsdGVyL2RlYm91bmNlVGltZVwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvZmlsdGVyL3Byb3BlcnRpZXMvZGVib3VuY2VUaW1lL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJudW1iZXJcIn0sbWVzc2FnZTpcIm11c3QgYmUgbnVtYmVyXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDUgPSBfZXJyczM0ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDUgPSB0cnVlO319fX1lbHNlIHt2YWxpZGF0ZTE4LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9maWx0ZXJcIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL2ZpbHRlci90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwib2JqZWN0XCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIG9iamVjdFwifV07cmV0dXJuIGZhbHNlO319dmFyIHZhbGlkMCA9IF9lcnJzMjkgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fX19fX19ZWxzZSB7dmFsaWRhdGUxOC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aCxzY2hlbWFQYXRoOlwiIy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwib2JqZWN0XCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIG9iamVjdFwifV07cmV0dXJuIGZhbHNlO319dmFsaWRhdGUxOC5lcnJvcnMgPSB2RXJyb3JzO3JldHVybiBlcnJvcnMgPT09IDA7fWZ1bmN0aW9uIHZhbGlkYXRlMTcoZGF0YSwge2luc3RhbmNlUGF0aD1cIlwiLCBwYXJlbnREYXRhLCBwYXJlbnREYXRhUHJvcGVydHksIHJvb3REYXRhPWRhdGF9PXt9KXsvKiMgc291cmNlVVJMPVwiQ29uZmlnT3B0aW9uc1NjaGVtYVwiICovO2xldCB2RXJyb3JzID0gbnVsbDtsZXQgZXJyb3JzID0gMDtpZihlcnJvcnMgPT09IDApe2lmKGRhdGEgJiYgdHlwZW9mIGRhdGEgPT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShkYXRhKSl7aWYoZGF0YS5kYXRhICE9PSB1bmRlZmluZWQpe2xldCBkYXRhMCA9IGRhdGEuZGF0YTtjb25zdCBfZXJyczEgPSBlcnJvcnM7aWYoZXJyb3JzID09PSBfZXJyczEpe2lmKEFycmF5LmlzQXJyYXkoZGF0YTApKXt2YXIgdmFsaWQxID0gdHJ1ZTtjb25zdCBsZW4wID0gZGF0YTAubGVuZ3RoO2ZvcihsZXQgaTA9MDsgaTA8bGVuMDsgaTArKyl7bGV0IGRhdGExID0gZGF0YTBbaTBdO2NvbnN0IF9lcnJzMyA9IGVycm9ycztpZihlcnJvcnMgPT09IF9lcnJzMyl7aWYoZGF0YTEgJiYgdHlwZW9mIGRhdGExID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YTEpKXtpZihkYXRhMS5sYWJlbCAhPT0gdW5kZWZpbmVkKXtpZih0eXBlb2YgZGF0YTEubGFiZWwgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTcuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2RhdGEvXCIgKyBpMCtcIi9sYWJlbFwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvZGF0YS9pdGVtcy9wcm9wZXJ0aWVzL2xhYmVsL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fX19ZWxzZSB7dmFsaWRhdGUxNy5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvZGF0YS9cIiArIGkwLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvZGF0YS9pdGVtcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwib2JqZWN0XCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIG9iamVjdFwifV07cmV0dXJuIGZhbHNlO319dmFyIHZhbGlkMSA9IF9lcnJzMyA9PT0gZXJyb3JzO2lmKCF2YWxpZDEpe2JyZWFrO319fWVsc2Uge3ZhbGlkYXRlMTcuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2RhdGFcIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL2RhdGEvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcImFycmF5XCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIGFycmF5XCJ9XTtyZXR1cm4gZmFsc2U7fX12YXIgdmFsaWQwID0gX2VycnMxID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDAgPSB0cnVlO31pZih2YWxpZDApe2lmKGRhdGEuc3JjICE9PSB1bmRlZmluZWQpe2xldCBkYXRhMyA9IGRhdGEuc3JjO2NvbnN0IF9lcnJzNyA9IGVycm9ycztjb25zdCBfZXJyczggPSBlcnJvcnM7bGV0IHZhbGlkMyA9IGZhbHNlO2xldCBwYXNzaW5nMCA9IG51bGw7Y29uc3QgX2VycnM5ID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMyAhPT0gXCJzdHJpbmdcIil7Y29uc3QgZXJyMCA9IHtpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL3NyY1wiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvc3JjL29uZU9mLzAvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn07aWYodkVycm9ycyA9PT0gbnVsbCl7dkVycm9ycyA9IFtlcnIwXTt9ZWxzZSB7dkVycm9ycy5wdXNoKGVycjApO31lcnJvcnMrKzt9dmFyIF92YWxpZDAgPSBfZXJyczkgPT09IGVycm9ycztpZihfdmFsaWQwKXt2YWxpZDMgPSB0cnVlO3Bhc3NpbmcwID0gMDt9Y29uc3QgX2VycnMxMSA9IGVycm9ycztpZighKHZhbGlkYXRlMTgoZGF0YTMsIHtpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL3NyY1wiLHBhcmVudERhdGE6ZGF0YSxwYXJlbnREYXRhUHJvcGVydHk6XCJzcmNcIixyb290RGF0YX0pKSl7dkVycm9ycyA9IHZFcnJvcnMgPT09IG51bGwgPyB2YWxpZGF0ZTE4LmVycm9ycyA6IHZFcnJvcnMuY29uY2F0KHZhbGlkYXRlMTguZXJyb3JzKTtlcnJvcnMgPSB2RXJyb3JzLmxlbmd0aDt9dmFyIF92YWxpZDAgPSBfZXJyczExID09PSBlcnJvcnM7aWYoX3ZhbGlkMCAmJiB2YWxpZDMpe3ZhbGlkMyA9IGZhbHNlO3Bhc3NpbmcwID0gW3Bhc3NpbmcwLCAxXTt9ZWxzZSB7aWYoX3ZhbGlkMCl7dmFsaWQzID0gdHJ1ZTtwYXNzaW5nMCA9IDE7fX1pZighdmFsaWQzKXtjb25zdCBlcnIxID0ge2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvc3JjXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9zcmMvb25lT2ZcIixrZXl3b3JkOlwib25lT2ZcIixwYXJhbXM6e3Bhc3NpbmdTY2hlbWFzOiBwYXNzaW5nMH0sbWVzc2FnZTpcIm11c3QgbWF0Y2ggZXhhY3RseSBvbmUgc2NoZW1hIGluIG9uZU9mXCJ9O2lmKHZFcnJvcnMgPT09IG51bGwpe3ZFcnJvcnMgPSBbZXJyMV07fWVsc2Uge3ZFcnJvcnMucHVzaChlcnIxKTt9ZXJyb3JzKys7dmFsaWRhdGUxNy5lcnJvcnMgPSB2RXJyb3JzO3JldHVybiBmYWxzZTt9ZWxzZSB7ZXJyb3JzID0gX2VycnM4O2lmKHZFcnJvcnMgIT09IG51bGwpe2lmKF9lcnJzOCl7dkVycm9ycy5sZW5ndGggPSBfZXJyczg7fWVsc2Uge3ZFcnJvcnMgPSBudWxsO319fXZhciB2YWxpZDAgPSBfZXJyczcgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5zcmNBcHBlbmRQb3NpdGlvbiAhPT0gdW5kZWZpbmVkKXtsZXQgZGF0YTQgPSBkYXRhLnNyY0FwcGVuZFBvc2l0aW9uO2NvbnN0IF9lcnJzMTIgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGE0ICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTE3LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9zcmNBcHBlbmRQb3NpdGlvblwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvc3JjQXBwZW5kUG9zaXRpb24vdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9aWYoISgoZGF0YTQgPT09IFwiYWZ0ZXJcIikgfHwgKGRhdGE0ID09PSBcImJlZm9yZVwiKSkpe3ZhbGlkYXRlMTcuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL3NyY0FwcGVuZFBvc2l0aW9uXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9zcmNBcHBlbmRQb3NpdGlvbi9lbnVtXCIsa2V5d29yZDpcImVudW1cIixwYXJhbXM6e2FsbG93ZWRWYWx1ZXM6IHNjaGVtYTE2LnByb3BlcnRpZXMuc3JjQXBwZW5kUG9zaXRpb24uZW51bX0sbWVzc2FnZTpcIm11c3QgYmUgZXF1YWwgdG8gb25lIG9mIHRoZSBhbGxvd2VkIHZhbHVlc1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMxMiA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmF1dG9TZWxlY3RGaXJzdCAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczE0ID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhLmF1dG9TZWxlY3RGaXJzdCAhPT0gXCJib29sZWFuXCIpe3ZhbGlkYXRlMTcuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2F1dG9TZWxlY3RGaXJzdFwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvYXV0b1NlbGVjdEZpcnN0L3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJib29sZWFuXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIGJvb2xlYW5cIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMCA9IF9lcnJzMTQgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fWlmKHZhbGlkMCl7aWYoZGF0YS5sYXlvdXQgIT09IHVuZGVmaW5lZCl7bGV0IGRhdGE2ID0gZGF0YS5sYXlvdXQ7Y29uc3QgX2VycnMxNiA9IGVycm9ycztpZih0eXBlb2YgZGF0YTYgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTcuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2xheW91dFwiLHNjaGVtYVBhdGg6XCIjL3Byb3BlcnRpZXMvbGF5b3V0L3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fWlmKCEoKGRhdGE2ID09PSBcInJvd1wiKSB8fCAoZGF0YTYgPT09IFwiY29sdW1uXCIpKSl7dmFsaWRhdGUxNy5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvbGF5b3V0XCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9sYXlvdXQvZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNi5wcm9wZXJ0aWVzLmxheW91dC5lbnVtfSxtZXNzYWdlOlwibXVzdCBiZSBlcXVhbCB0byBvbmUgb2YgdGhlIGFsbG93ZWQgdmFsdWVzXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDAgPSBfZXJyczE2ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDAgPSB0cnVlO31pZih2YWxpZDApe2lmKGRhdGEubGFiZWxQb3NpdGlvbiAhPT0gdW5kZWZpbmVkKXtsZXQgZGF0YTcgPSBkYXRhLmxhYmVsUG9zaXRpb247Y29uc3QgX2VycnMxOCA9IGVycm9ycztpZih0eXBlb2YgZGF0YTcgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTcuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2xhYmVsUG9zaXRpb25cIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL2xhYmVsUG9zaXRpb24vdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9aWYoISgoZGF0YTcgPT09IFwiYWZ0ZXJcIikgfHwgKGRhdGE3ID09PSBcImJlZm9yZVwiKSkpe3ZhbGlkYXRlMTcuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2xhYmVsUG9zaXRpb25cIixzY2hlbWFQYXRoOlwiIy9wcm9wZXJ0aWVzL2xhYmVsUG9zaXRpb24vZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNi5wcm9wZXJ0aWVzLmxhYmVsUG9zaXRpb24uZW51bX0sbWVzc2FnZTpcIm11c3QgYmUgZXF1YWwgdG8gb25lIG9mIHRoZSBhbGxvd2VkIHZhbHVlc1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMxOCA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmNvbnRhaW5lckNsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMjAgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEuY29udGFpbmVyQ2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMTcuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL2NvbnRhaW5lckNsYXNzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9jb250YWluZXJDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQwID0gX2VycnMyMCA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQwID0gdHJ1ZTt9aWYodmFsaWQwKXtpZihkYXRhLmNvbnRhaW5lclN0eWxlcyAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczIyID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhLmNvbnRhaW5lclN0eWxlcyAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUxNy5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvY29udGFpbmVyU3R5bGVzXCIsc2NoZW1hUGF0aDpcIiMvcHJvcGVydGllcy9jb250YWluZXJTdHlsZXMvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMCA9IF9lcnJzMjIgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMCA9IHRydWU7fX19fX19fX19ZWxzZSB7dmFsaWRhdGUxNy5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aCxzY2hlbWFQYXRoOlwiIy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwib2JqZWN0XCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIG9iamVjdFwifV07cmV0dXJuIGZhbHNlO319dmFsaWRhdGUxNy5lcnJvcnMgPSB2RXJyb3JzO3JldHVybiBlcnJvcnMgPT09IDA7fWV4cG9ydCBjb25zdCBDb25maWdWYWxpZGF0b3JzU2NoZW1hID0gdmFsaWRhdGUyNDtjb25zdCBzY2hlbWExOSA9IHtcIiRzY2hlbWFcIjpcImh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hI1wiLFwiJGlkXCI6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hXCIsXCJ0eXBlXCI6XCJhcnJheVwiLFwiaXRlbXNcIjp7XCJ0eXBlXCI6XCJvYmplY3RcIixcInByb3BlcnRpZXNcIjp7XCJuYW1lXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwibWVzc2FnZVwiOntcInR5cGVcIjpcInN0cmluZ1wifSxcImZsYWdzXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwidmFsdWVcIjp7fX19fTtmdW5jdGlvbiB2YWxpZGF0ZTI0KGRhdGEsIHtpbnN0YW5jZVBhdGg9XCJcIiwgcGFyZW50RGF0YSwgcGFyZW50RGF0YVByb3BlcnR5LCByb290RGF0YT1kYXRhfT17fSl7LyojIHNvdXJjZVVSTD1cIkNvbmZpZ1ZhbGlkYXRvcnNTY2hlbWFcIiAqLztsZXQgdkVycm9ycyA9IG51bGw7bGV0IGVycm9ycyA9IDA7aWYoZXJyb3JzID09PSAwKXtpZihBcnJheS5pc0FycmF5KGRhdGEpKXt2YXIgdmFsaWQwID0gdHJ1ZTtjb25zdCBsZW4wID0gZGF0YS5sZW5ndGg7Zm9yKGxldCBpMD0wOyBpMDxsZW4wOyBpMCsrKXtsZXQgZGF0YTAgPSBkYXRhW2kwXTtjb25zdCBfZXJyczEgPSBlcnJvcnM7aWYoZXJyb3JzID09PSBfZXJyczEpe2lmKGRhdGEwICYmIHR5cGVvZiBkYXRhMCA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KGRhdGEwKSl7aWYoZGF0YTAubmFtZSAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczMgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEwLm5hbWUgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjQuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbmFtZVwiLHNjaGVtYVBhdGg6XCIjL2l0ZW1zL3Byb3BlcnRpZXMvbmFtZS90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQxID0gX2VycnMzID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO31pZih2YWxpZDEpe2lmKGRhdGEwLm1lc3NhZ2UgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM1ID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMC5tZXNzYWdlICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI0LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL21lc3NhZ2VcIixzY2hlbWFQYXRoOlwiIy9pdGVtcy9wcm9wZXJ0aWVzL21lc3NhZ2UvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMSA9IF9lcnJzNSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQxID0gdHJ1ZTt9aWYodmFsaWQxKXtpZihkYXRhMC5mbGFncyAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczcgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEwLmZsYWdzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI0LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2ZsYWdzXCIsc2NoZW1hUGF0aDpcIiMvaXRlbXMvcHJvcGVydGllcy9mbGFncy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQxID0gX2VycnM3ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO319fX1lbHNlIHt2YWxpZGF0ZTI0LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwLHNjaGVtYVBhdGg6XCIjL2l0ZW1zL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJvYmplY3RcIn0sbWVzc2FnZTpcIm11c3QgYmUgb2JqZWN0XCJ9XTtyZXR1cm4gZmFsc2U7fX12YXIgdmFsaWQwID0gX2VycnMxID09PSBlcnJvcnM7aWYoIXZhbGlkMCl7YnJlYWs7fX19ZWxzZSB7dmFsaWRhdGUyNC5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aCxzY2hlbWFQYXRoOlwiIy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwiYXJyYXlcIn0sbWVzc2FnZTpcIm11c3QgYmUgYXJyYXlcIn1dO3JldHVybiBmYWxzZTt9fXZhbGlkYXRlMjQuZXJyb3JzID0gdkVycm9ycztyZXR1cm4gZXJyb3JzID09PSAwO31leHBvcnQgY29uc3QgQ29uZmlnTWFpblNjaGVtYSA9IHZhbGlkYXRlMjU7Y29uc3Qgc2NoZW1hMjAgPSB7XCIkc2NoZW1hXCI6XCJodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNcIixcIiRpZFwiOlwiQ29uZmlnTWFpblNjaGVtYVwiLFwidHlwZVwiOlwiYXJyYXlcIixcIml0ZW1zXCI6e1widHlwZVwiOlwib2JqZWN0XCIsXCJwcm9wZXJ0aWVzXCI6e1wiZm9ybUNvbnRyb2xOYW1lXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwiYXN5bmNWYWxpZGF0b3JzXCI6e1wiJHJlZlwiOlwiQ29uZmlnVmFsaWRhdG9yc1NjaGVtYVwifSxcImNvbmRpdGlvbnNcIjp7XCIkcmVmXCI6XCJDb25maWdDb25kaXRpb25zU2NoZW1hXCJ9LFwiY2hpbGRyZW5cIjp7XCIkcmVmXCI6XCIjXCJ9LFwiZGVzY3JpcHRpb25cIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJwcm9wc1wiOnt9LFwiaGlkZGVuXCI6e1widHlwZVwiOlwiYm9vbGVhblwifSxcImxhYmVsXCI6e1widHlwZVwiOlwic3RyaW5nXCJ9LFwibGF5b3V0XCI6e1wiJHJlZlwiOlwiQ29uZmlnTGF5b3V0U2NoZW1hXCJ9LFwiaW5wdXRNYXNrXCI6e30sXCJvcHRpb25zXCI6e1wiJHJlZlwiOlwiQ29uZmlnT3B0aW9uc1NjaGVtYVwifSxcInJlYWRvbmx5XCI6e1widHlwZVwiOlwiYm9vbGVhblwifSxcInR5cGVcIjp7XCJ0eXBlXCI6XCJzdHJpbmdcIn0sXCJ2YWx1ZVwiOnt9LFwidmFsaWRhdG9yc1wiOntcIiRyZWZcIjpcIkNvbmZpZ1ZhbGlkYXRvcnNTY2hlbWFcIn19LFwicmVxdWlyZWRcIjpbXCJmb3JtQ29udHJvbE5hbWVcIl19fTtmdW5jdGlvbiB2YWxpZGF0ZTI1KGRhdGEsIHtpbnN0YW5jZVBhdGg9XCJcIiwgcGFyZW50RGF0YSwgcGFyZW50RGF0YVByb3BlcnR5LCByb290RGF0YT1kYXRhfT17fSl7LyojIHNvdXJjZVVSTD1cIkNvbmZpZ01haW5TY2hlbWFcIiAqLztsZXQgdkVycm9ycyA9IG51bGw7bGV0IGVycm9ycyA9IDA7aWYoZXJyb3JzID09PSAwKXtpZihBcnJheS5pc0FycmF5KGRhdGEpKXt2YXIgdmFsaWQwID0gdHJ1ZTtjb25zdCBsZW4wID0gZGF0YS5sZW5ndGg7Zm9yKGxldCBpMD0wOyBpMDxsZW4wOyBpMCsrKXtsZXQgZGF0YTAgPSBkYXRhW2kwXTtjb25zdCBfZXJyczEgPSBlcnJvcnM7aWYoZXJyb3JzID09PSBfZXJyczEpe2lmKGRhdGEwICYmIHR5cGVvZiBkYXRhMCA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KGRhdGEwKSl7bGV0IG1pc3NpbmcwO2lmKChkYXRhMC5mb3JtQ29udHJvbE5hbWUgPT09IHVuZGVmaW5lZCkgJiYgKG1pc3NpbmcwID0gXCJmb3JtQ29udHJvbE5hbWVcIikpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTAsc2NoZW1hUGF0aDpcIiMvaXRlbXMvcmVxdWlyZWRcIixrZXl3b3JkOlwicmVxdWlyZWRcIixwYXJhbXM6e21pc3NpbmdQcm9wZXJ0eTogbWlzc2luZzB9LG1lc3NhZ2U6XCJtdXN0IGhhdmUgcmVxdWlyZWQgcHJvcGVydHkgJ1wiK21pc3NpbmcwK1wiJ1wifV07cmV0dXJuIGZhbHNlO31lbHNlIHtpZihkYXRhMC5mb3JtQ29udHJvbE5hbWUgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMzID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMC5mb3JtQ29udHJvbE5hbWUgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvZm9ybUNvbnRyb2xOYW1lXCIsc2NoZW1hUGF0aDpcIiMvaXRlbXMvcHJvcGVydGllcy9mb3JtQ29udHJvbE5hbWUvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMSA9IF9lcnJzMyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQxID0gdHJ1ZTt9aWYodmFsaWQxKXtpZihkYXRhMC5hc3luY1ZhbGlkYXRvcnMgIT09IHVuZGVmaW5lZCl7bGV0IGRhdGEyID0gZGF0YTAuYXN5bmNWYWxpZGF0b3JzO2NvbnN0IF9lcnJzNSA9IGVycm9ycztjb25zdCBfZXJyczYgPSBlcnJvcnM7aWYoZXJyb3JzID09PSBfZXJyczYpe2lmKEFycmF5LmlzQXJyYXkoZGF0YTIpKXt2YXIgdmFsaWQzID0gdHJ1ZTtjb25zdCBsZW4xID0gZGF0YTIubGVuZ3RoO2ZvcihsZXQgaTE9MDsgaTE8bGVuMTsgaTErKyl7bGV0IGRhdGEzID0gZGF0YTJbaTFdO2NvbnN0IF9lcnJzOCA9IGVycm9ycztpZihlcnJvcnMgPT09IF9lcnJzOCl7aWYoZGF0YTMgJiYgdHlwZW9mIGRhdGEzID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YTMpKXtpZihkYXRhMy5uYW1lICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMTAgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEzLm5hbWUgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvYXN5bmNWYWxpZGF0b3JzL1wiICsgaTErXCIvbmFtZVwiLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL2l0ZW1zL3Byb3BlcnRpZXMvbmFtZS90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ0ID0gX2VycnMxMCA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ0ID0gdHJ1ZTt9aWYodmFsaWQ0KXtpZihkYXRhMy5tZXNzYWdlICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMTIgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEzLm1lc3NhZ2UgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvYXN5bmNWYWxpZGF0b3JzL1wiICsgaTErXCIvbWVzc2FnZVwiLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL2l0ZW1zL3Byb3BlcnRpZXMvbWVzc2FnZS90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ0ID0gX2VycnMxMiA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ0ID0gdHJ1ZTt9aWYodmFsaWQ0KXtpZihkYXRhMy5mbGFncyAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczE0ID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMy5mbGFncyAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUyNS5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvXCIgKyBpMCtcIi9hc3luY1ZhbGlkYXRvcnMvXCIgKyBpMStcIi9mbGFnc1wiLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL2l0ZW1zL3Byb3BlcnRpZXMvZmxhZ3MvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkNCA9IF9lcnJzMTQgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkNCA9IHRydWU7fX19fWVsc2Uge3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvYXN5bmNWYWxpZGF0b3JzL1wiICsgaTEsc2NoZW1hUGF0aDpcIkNvbmZpZ1ZhbGlkYXRvcnNTY2hlbWEvaXRlbXMvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcIm9iamVjdFwifSxtZXNzYWdlOlwibXVzdCBiZSBvYmplY3RcIn1dO3JldHVybiBmYWxzZTt9fXZhciB2YWxpZDMgPSBfZXJyczggPT09IGVycm9ycztpZighdmFsaWQzKXticmVhazt9fX1lbHNlIHt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2FzeW5jVmFsaWRhdG9yc1wiLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJhcnJheVwifSxtZXNzYWdlOlwibXVzdCBiZSBhcnJheVwifV07cmV0dXJuIGZhbHNlO319dmFyIHZhbGlkMSA9IF9lcnJzNSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQxID0gdHJ1ZTt9aWYodmFsaWQxKXtpZihkYXRhMC5jb25kaXRpb25zICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMTYgPSBlcnJvcnM7aWYoISh2YWxpZGF0ZTEwKGRhdGEwLmNvbmRpdGlvbnMsIHtpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvY29uZGl0aW9uc1wiLHBhcmVudERhdGE6ZGF0YTAscGFyZW50RGF0YVByb3BlcnR5OlwiY29uZGl0aW9uc1wiLHJvb3REYXRhfSkpKXt2RXJyb3JzID0gdkVycm9ycyA9PT0gbnVsbCA/IHZhbGlkYXRlMTAuZXJyb3JzIDogdkVycm9ycy5jb25jYXQodmFsaWRhdGUxMC5lcnJvcnMpO2Vycm9ycyA9IHZFcnJvcnMubGVuZ3RoO312YXIgdmFsaWQxID0gX2VycnMxNiA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQxID0gdHJ1ZTt9aWYodmFsaWQxKXtpZihkYXRhMC5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczE3ID0gZXJyb3JzO2lmKCEodmFsaWRhdGUyNShkYXRhMC5jaGlsZHJlbiwge2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvXCIgKyBpMCtcIi9jaGlsZHJlblwiLHBhcmVudERhdGE6ZGF0YTAscGFyZW50RGF0YVByb3BlcnR5OlwiY2hpbGRyZW5cIixyb290RGF0YX0pKSl7dkVycm9ycyA9IHZFcnJvcnMgPT09IG51bGwgPyB2YWxpZGF0ZTI1LmVycm9ycyA6IHZFcnJvcnMuY29uY2F0KHZhbGlkYXRlMjUuZXJyb3JzKTtlcnJvcnMgPSB2RXJyb3JzLmxlbmd0aDt9dmFyIHZhbGlkMSA9IF9lcnJzMTcgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMSA9IHRydWU7fWlmKHZhbGlkMSl7aWYoZGF0YTAuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMxOCA9IGVycm9ycztpZih0eXBlb2YgZGF0YTAuZGVzY3JpcHRpb24gIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvZGVzY3JpcHRpb25cIixzY2hlbWFQYXRoOlwiIy9pdGVtcy9wcm9wZXJ0aWVzL2Rlc2NyaXB0aW9uL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDEgPSBfZXJyczE4ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO31pZih2YWxpZDEpe2lmKGRhdGEwLmhpZGRlbiAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczIwID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMC5oaWRkZW4gIT09IFwiYm9vbGVhblwiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2hpZGRlblwiLHNjaGVtYVBhdGg6XCIjL2l0ZW1zL3Byb3BlcnRpZXMvaGlkZGVuL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJib29sZWFuXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIGJvb2xlYW5cIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkMSA9IF9lcnJzMjAgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMSA9IHRydWU7fWlmKHZhbGlkMSl7aWYoZGF0YTAubGFiZWwgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMyMiA9IGVycm9ycztpZih0eXBlb2YgZGF0YTAubGFiZWwgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGFiZWxcIixzY2hlbWFQYXRoOlwiIy9pdGVtcy9wcm9wZXJ0aWVzL2xhYmVsL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDEgPSBfZXJyczIyID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO31pZih2YWxpZDEpe2lmKGRhdGEwLmxheW91dCAhPT0gdW5kZWZpbmVkKXtsZXQgZGF0YTEyID0gZGF0YTAubGF5b3V0O2NvbnN0IF9lcnJzMjQgPSBlcnJvcnM7Y29uc3QgX2VycnMyNSA9IGVycm9ycztpZihlcnJvcnMgPT09IF9lcnJzMjUpe2lmKGRhdGExMiAmJiB0eXBlb2YgZGF0YTEyID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YTEyKSl7aWYoZGF0YTEyLmhvc3RDbGFzcyAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczI3ID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMTIuaG9zdENsYXNzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9ob3N0Q2xhc3NcIixzY2hlbWFQYXRoOlwiQ29uZmlnTGF5b3V0U2NoZW1hL3Byb3BlcnRpZXMvaG9zdENsYXNzL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJzdHJpbmdcIn0sbWVzc2FnZTpcIm11c3QgYmUgc3RyaW5nXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDYgPSBfZXJyczI3ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDYgPSB0cnVlO31pZih2YWxpZDYpe2lmKGRhdGExMi5ob3N0U3R5bGVzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMjkgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGExMi5ob3N0U3R5bGVzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9ob3N0U3R5bGVzXCIsc2NoZW1hUGF0aDpcIkNvbmZpZ0xheW91dFNjaGVtYS9wcm9wZXJ0aWVzL2hvc3RTdHlsZXMvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkNiA9IF9lcnJzMjkgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkNiA9IHRydWU7fWlmKHZhbGlkNil7aWYoZGF0YTEyLmxhYmVsQ2xhc3MgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMzMSA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmxhYmVsQ2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGF5b3V0L2xhYmVsQ2xhc3NcIixzY2hlbWFQYXRoOlwiQ29uZmlnTGF5b3V0U2NoZW1hL3Byb3BlcnRpZXMvbGFiZWxDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnMzMSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIubGFiZWxTdHlsZXMgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMzMyA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmxhYmVsU3R5bGVzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9sYWJlbFN0eWxlc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9sYWJlbFN0eWxlcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnMzMyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuY29udGVudENsYXNzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzMzUgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGExMi5jb250ZW50Q2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGF5b3V0L2NvbnRlbnRDbGFzc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9jb250ZW50Q2xhc3MvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkNiA9IF9lcnJzMzUgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkNiA9IHRydWU7fWlmKHZhbGlkNil7aWYoZGF0YTEyLmNvbnRlbnRTdHlsZXMgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMzNyA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmNvbnRlbnRTdHlsZXMgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGF5b3V0L2NvbnRlbnRTdHlsZXNcIixzY2hlbWFQYXRoOlwiQ29uZmlnTGF5b3V0U2NoZW1hL3Byb3BlcnRpZXMvY29udGVudFN0eWxlcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnMzNyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuZm9ybUdyb3VwQ2xhc3MgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnMzOSA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmZvcm1Hcm91cENsYXNzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9mb3JtR3JvdXBDbGFzc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9mb3JtR3JvdXBDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnMzOSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuZm9ybUdyb3VwU3R5bGVzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzNDEgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGExMi5mb3JtR3JvdXBTdHlsZXMgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGF5b3V0L2Zvcm1Hcm91cFN0eWxlc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9mb3JtR3JvdXBTdHlsZXMvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkNiA9IF9lcnJzNDEgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkNiA9IHRydWU7fWlmKHZhbGlkNil7aWYoZGF0YTEyLmRlc2NyaXB0aW9uQ2xhc3MgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM0MyA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmRlc2NyaXB0aW9uQ2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGF5b3V0L2Rlc2NyaXB0aW9uQ2xhc3NcIixzY2hlbWFQYXRoOlwiQ29uZmlnTGF5b3V0U2NoZW1hL3Byb3BlcnRpZXMvZGVzY3JpcHRpb25DbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnM0MyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuZGVzY3JpcHRpb25TdHlsZXMgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM0NSA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmRlc2NyaXB0aW9uU3R5bGVzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9kZXNjcmlwdGlvblN0eWxlc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9kZXNjcmlwdGlvblN0eWxlcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnM0NSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuaW5wdXRBcmVhQ2xhc3MgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM0NyA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmlucHV0QXJlYUNsYXNzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9pbnB1dEFyZWFDbGFzc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9pbnB1dEFyZWFDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnM0NyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuaW5wdXRBcmVhU3R5bGVzICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzNDkgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGExMi5pbnB1dEFyZWFTdHlsZXMgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGF5b3V0L2lucHV0QXJlYVN0eWxlc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9pbnB1dEFyZWFTdHlsZXMvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkNiA9IF9lcnJzNDkgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkNiA9IHRydWU7fWlmKHZhbGlkNil7aWYoZGF0YTEyLmVycm9yQ2xhc3MgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM1MSA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmVycm9yQ2xhc3MgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGF5b3V0L2Vycm9yQ2xhc3NcIixzY2hlbWFQYXRoOlwiQ29uZmlnTGF5b3V0U2NoZW1hL3Byb3BlcnRpZXMvZXJyb3JDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnM1MSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuZXJyb3JTdHlsZXMgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM1MyA9IGVycm9ycztpZih0eXBlb2YgZGF0YTEyLmVycm9yU3R5bGVzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9lcnJvclN0eWxlc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9lcnJvclN0eWxlcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnM1MyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuZGVzY3JpcHRpb25Qb3NpdGlvbiAhPT0gdW5kZWZpbmVkKXtsZXQgZGF0YTI3ID0gZGF0YTEyLmRlc2NyaXB0aW9uUG9zaXRpb247Y29uc3QgX2VycnM1NSA9IGVycm9ycztpZighKChkYXRhMjcgPT09IFwiYWZ0ZXJcIikgfHwgKGRhdGEyNyA9PT0gXCJiZWZvcmVcIikpKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9kZXNjcmlwdGlvblBvc2l0aW9uXCIsc2NoZW1hUGF0aDpcIkNvbmZpZ0xheW91dFNjaGVtYS9wcm9wZXJ0aWVzL2Rlc2NyaXB0aW9uUG9zaXRpb24vZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNS5wcm9wZXJ0aWVzLmRlc2NyaXB0aW9uUG9zaXRpb24uZW51bX0sbWVzc2FnZTpcIm11c3QgYmUgZXF1YWwgdG8gb25lIG9mIHRoZSBhbGxvd2VkIHZhbHVlc1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ2ID0gX2VycnM1NSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ2ID0gdHJ1ZTt9aWYodmFsaWQ2KXtpZihkYXRhMTIuaGlkZUxhYmVsICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzNTYgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGExMi5oaWRlTGFiZWwgIT09IFwiYm9vbGVhblwiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9oaWRlTGFiZWxcIixzY2hlbWFQYXRoOlwiQ29uZmlnTGF5b3V0U2NoZW1hL3Byb3BlcnRpZXMvaGlkZUxhYmVsL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJib29sZWFuXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIGJvb2xlYW5cIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkNiA9IF9lcnJzNTYgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkNiA9IHRydWU7fWlmKHZhbGlkNil7aWYoZGF0YTEyLmNvbnRlbnRDb2xsYXBzaWJsZSAhPT0gdW5kZWZpbmVkKXtsZXQgZGF0YTI5ID0gZGF0YTEyLmNvbnRlbnRDb2xsYXBzaWJsZTtjb25zdCBfZXJyczU4ID0gZXJyb3JzO2lmKCEoKGRhdGEyOSA9PT0gXCJjb2xsYXBzZVwiKSB8fCAoZGF0YTI5ID09PSBcImV4cGFuZFwiKSkpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvbGF5b3V0L2NvbnRlbnRDb2xsYXBzaWJsZVwiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9jb250ZW50Q29sbGFwc2libGUvZW51bVwiLGtleXdvcmQ6XCJlbnVtXCIscGFyYW1zOnthbGxvd2VkVmFsdWVzOiBzY2hlbWExNS5wcm9wZXJ0aWVzLmNvbnRlbnRDb2xsYXBzaWJsZS5lbnVtfSxtZXNzYWdlOlwibXVzdCBiZSBlcXVhbCB0byBvbmUgb2YgdGhlIGFsbG93ZWQgdmFsdWVzXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDYgPSBfZXJyczU4ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDYgPSB0cnVlO31pZih2YWxpZDYpe2lmKGRhdGExMi5hdXRvQWRkUmVxdWlyZWRDbGFzcyAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczU5ID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMTIuYXV0b0FkZFJlcXVpcmVkQ2xhc3MgIT09IFwiYm9vbGVhblwiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dC9hdXRvQWRkUmVxdWlyZWRDbGFzc1wiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvcHJvcGVydGllcy9hdXRvQWRkUmVxdWlyZWRDbGFzcy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwiYm9vbGVhblwifSxtZXNzYWdlOlwibXVzdCBiZSBib29sZWFuXCJ9XTtyZXR1cm4gZmFsc2U7fXZhciB2YWxpZDYgPSBfZXJyczU5ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDYgPSB0cnVlO319fX19fX19fX19fX19fX19fX1lbHNlIHt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL2xheW91dFwiLHNjaGVtYVBhdGg6XCJDb25maWdMYXlvdXRTY2hlbWEvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcIm9iamVjdFwifSxtZXNzYWdlOlwibXVzdCBiZSBvYmplY3RcIn1dO3JldHVybiBmYWxzZTt9fXZhciB2YWxpZDEgPSBfZXJyczI0ID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO31pZih2YWxpZDEpe2lmKGRhdGEwLm9wdGlvbnMgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM2MSA9IGVycm9ycztpZighKHZhbGlkYXRlMTcoZGF0YTAub3B0aW9ucywge2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvXCIgKyBpMCtcIi9vcHRpb25zXCIscGFyZW50RGF0YTpkYXRhMCxwYXJlbnREYXRhUHJvcGVydHk6XCJvcHRpb25zXCIscm9vdERhdGF9KSkpe3ZFcnJvcnMgPSB2RXJyb3JzID09PSBudWxsID8gdmFsaWRhdGUxNy5lcnJvcnMgOiB2RXJyb3JzLmNvbmNhdCh2YWxpZGF0ZTE3LmVycm9ycyk7ZXJyb3JzID0gdkVycm9ycy5sZW5ndGg7fXZhciB2YWxpZDEgPSBfZXJyczYxID09PSBlcnJvcnM7fWVsc2Uge3ZhciB2YWxpZDEgPSB0cnVlO31pZih2YWxpZDEpe2lmKGRhdGEwLnJlYWRvbmx5ICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzNjIgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEwLnJlYWRvbmx5ICE9PSBcImJvb2xlYW5cIil7dmFsaWRhdGUyNS5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvXCIgKyBpMCtcIi9yZWFkb25seVwiLHNjaGVtYVBhdGg6XCIjL2l0ZW1zL3Byb3BlcnRpZXMvcmVhZG9ubHkvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcImJvb2xlYW5cIn0sbWVzc2FnZTpcIm11c3QgYmUgYm9vbGVhblwifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQxID0gX2VycnM2MiA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQxID0gdHJ1ZTt9aWYodmFsaWQxKXtpZihkYXRhMC50eXBlICE9PSB1bmRlZmluZWQpe2NvbnN0IF9lcnJzNjQgPSBlcnJvcnM7aWYodHlwZW9mIGRhdGEwLnR5cGUgIT09IFwic3RyaW5nXCIpe3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvdHlwZVwiLHNjaGVtYVBhdGg6XCIjL2l0ZW1zL3Byb3BlcnRpZXMvdHlwZS90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQxID0gX2VycnM2NCA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQxID0gdHJ1ZTt9aWYodmFsaWQxKXtpZihkYXRhMC52YWxpZGF0b3JzICE9PSB1bmRlZmluZWQpe2xldCBkYXRhMzQgPSBkYXRhMC52YWxpZGF0b3JzO2NvbnN0IF9lcnJzNjYgPSBlcnJvcnM7Y29uc3QgX2VycnM2NyA9IGVycm9ycztpZihlcnJvcnMgPT09IF9lcnJzNjcpe2lmKEFycmF5LmlzQXJyYXkoZGF0YTM0KSl7dmFyIHZhbGlkOCA9IHRydWU7Y29uc3QgbGVuMiA9IGRhdGEzNC5sZW5ndGg7Zm9yKGxldCBpMj0wOyBpMjxsZW4yOyBpMisrKXtsZXQgZGF0YTM1ID0gZGF0YTM0W2kyXTtjb25zdCBfZXJyczY5ID0gZXJyb3JzO2lmKGVycm9ycyA9PT0gX2VycnM2OSl7aWYoZGF0YTM1ICYmIHR5cGVvZiBkYXRhMzUgPT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShkYXRhMzUpKXtpZihkYXRhMzUubmFtZSAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczcxID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMzUubmFtZSAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUyNS5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvXCIgKyBpMCtcIi92YWxpZGF0b3JzL1wiICsgaTIrXCIvbmFtZVwiLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL2l0ZW1zL3Byb3BlcnRpZXMvbmFtZS90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ5ID0gX2VycnM3MSA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ5ID0gdHJ1ZTt9aWYodmFsaWQ5KXtpZihkYXRhMzUubWVzc2FnZSAhPT0gdW5kZWZpbmVkKXtjb25zdCBfZXJyczczID0gZXJyb3JzO2lmKHR5cGVvZiBkYXRhMzUubWVzc2FnZSAhPT0gXCJzdHJpbmdcIil7dmFsaWRhdGUyNS5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aDppbnN0YW5jZVBhdGgrXCIvXCIgKyBpMCtcIi92YWxpZGF0b3JzL1wiICsgaTIrXCIvbWVzc2FnZVwiLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL2l0ZW1zL3Byb3BlcnRpZXMvbWVzc2FnZS90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwic3RyaW5nXCJ9LG1lc3NhZ2U6XCJtdXN0IGJlIHN0cmluZ1wifV07cmV0dXJuIGZhbHNlO312YXIgdmFsaWQ5ID0gX2VycnM3MyA9PT0gZXJyb3JzO31lbHNlIHt2YXIgdmFsaWQ5ID0gdHJ1ZTt9aWYodmFsaWQ5KXtpZihkYXRhMzUuZmxhZ3MgIT09IHVuZGVmaW5lZCl7Y29uc3QgX2VycnM3NSA9IGVycm9ycztpZih0eXBlb2YgZGF0YTM1LmZsYWdzICE9PSBcInN0cmluZ1wiKXt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwK1wiL3ZhbGlkYXRvcnMvXCIgKyBpMitcIi9mbGFnc1wiLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL2l0ZW1zL3Byb3BlcnRpZXMvZmxhZ3MvdHlwZVwiLGtleXdvcmQ6XCJ0eXBlXCIscGFyYW1zOnt0eXBlOiBcInN0cmluZ1wifSxtZXNzYWdlOlwibXVzdCBiZSBzdHJpbmdcIn1dO3JldHVybiBmYWxzZTt9dmFyIHZhbGlkOSA9IF9lcnJzNzUgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkOSA9IHRydWU7fX19fWVsc2Uge3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvdmFsaWRhdG9ycy9cIiArIGkyLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL2l0ZW1zL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJvYmplY3RcIn0sbWVzc2FnZTpcIm11c3QgYmUgb2JqZWN0XCJ9XTtyZXR1cm4gZmFsc2U7fX12YXIgdmFsaWQ4ID0gX2VycnM2OSA9PT0gZXJyb3JzO2lmKCF2YWxpZDgpe2JyZWFrO319fWVsc2Uge3ZhbGlkYXRlMjUuZXJyb3JzID0gW3tpbnN0YW5jZVBhdGg6aW5zdGFuY2VQYXRoK1wiL1wiICsgaTArXCIvdmFsaWRhdG9yc1wiLHNjaGVtYVBhdGg6XCJDb25maWdWYWxpZGF0b3JzU2NoZW1hL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJhcnJheVwifSxtZXNzYWdlOlwibXVzdCBiZSBhcnJheVwifV07cmV0dXJuIGZhbHNlO319dmFyIHZhbGlkMSA9IF9lcnJzNjYgPT09IGVycm9yczt9ZWxzZSB7dmFyIHZhbGlkMSA9IHRydWU7fX19fX19fX19fX19fX1lbHNlIHt2YWxpZGF0ZTI1LmVycm9ycyA9IFt7aW5zdGFuY2VQYXRoOmluc3RhbmNlUGF0aCtcIi9cIiArIGkwLHNjaGVtYVBhdGg6XCIjL2l0ZW1zL3R5cGVcIixrZXl3b3JkOlwidHlwZVwiLHBhcmFtczp7dHlwZTogXCJvYmplY3RcIn0sbWVzc2FnZTpcIm11c3QgYmUgb2JqZWN0XCJ9XTtyZXR1cm4gZmFsc2U7fX12YXIgdmFsaWQwID0gX2VycnMxID09PSBlcnJvcnM7aWYoIXZhbGlkMCl7YnJlYWs7fX19ZWxzZSB7dmFsaWRhdGUyNS5lcnJvcnMgPSBbe2luc3RhbmNlUGF0aCxzY2hlbWFQYXRoOlwiIy90eXBlXCIsa2V5d29yZDpcInR5cGVcIixwYXJhbXM6e3R5cGU6IFwiYXJyYXlcIn0sbWVzc2FnZTpcIm11c3QgYmUgYXJyYXlcIn1dO3JldHVybiBmYWxzZTt9fXZhbGlkYXRlMjUuZXJyb3JzID0gdkVycm9ycztyZXR1cm4gZXJyb3JzID09PSAwO30iXX0=