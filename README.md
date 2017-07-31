# json-schema-validator

It is a function to validate a JSON object against a specific schema of a JSON.
All we have to do is to define a schema or architechture for the JSON object,
and validate a JSON against that schema. The function will return a object with
the types of all of the JSON object that is passed to check and a result object that will show
if there is any mismatch with the schema.

##Example

Firset define a schema:
```javascript
var schema = {
    k1: {
        type: String            //means 'k1' will be of type String
    },
    k2: {
        type: Number            //means 'k2' will be of type Number
    },
    k3: {
        type: Boolean           //means 'k3' will be of type Boolean
    },
    k4: [{                                  
        x: {
            type: Number        //means 'k4' will be a array of objects with x and y as the propertise 
        },
        y: {
            type: String
        }
    }],
    k5: {
        type: Date                //means 'k5' will be of type Date
    },
    k6: {                               //means 'k6' will be an object with some propertise
        x: {                            // we have to define all the propertise type too for validation
            type: Boolean
        },
        y: {
            type: Date
        },
        z: {
            m: {
                type: String
            },
            n: {
                type: Date
            }
        }
    }
}

var validatorObj = JSONSchema(schema); // this will create a jsonSchemaValidator object with this schema initialization
```

#### pass the target json that you want to validate against the schema
```
var res = validatorObj.validate({
    k1: '1',
    k2: 10,
    k3: true,
    k4: [{
        x: 10,
        y: "sdf"
    },
    {
        x: '20',
        y: "sdgfds"
    }
    ],
    k5: new Date(),
    k6: {
        x: false,
        y: new Date(),
        z: {
            n: "sdfgfdg",
            m: new Date()
        }
    }
})

console.log(res);
```

### you will get the result of the validation

```
this will be the mapped JSON for the target

{
    k1: "string",
    k2: "number",
    k3: "boolean",
    k4: [
        {
            x: "number",
            y: "string"
        },
        {
            x: "string",
            y: "string"
        }
    ],
    k5: "date",
    k6: {
        x: "boolean",
        y: "date",
        z: {
            m: "date",
            n: "string"
        }
    }

}

this will be the result JSON for the validation

{
    k1: true,
    k2: true,
    k3: true,
    k4: [
        {
            x: true,
            y: true 
        },
        {
            x: false,
            y: true
        }
    ],
    k5: true,
    k6: {
        x: true,
        y: true,
        z: {
            m: false ,
            n: false 
        }
    }

}