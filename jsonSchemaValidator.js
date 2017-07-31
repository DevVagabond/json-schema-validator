function JSONSchema(schema) {
    var self = this;
    self.schema = schema;

    function JSONSchema(schema) {
        self.schema = schema;
    }

    /******************************************************************
     ********************* Main Funtion body **************************
     **************************************************************** */


    self.primitiveType = {
        "string": true,
        "number": true,
        "boolean": true,

    }
    self.isArray = function(a) {
        return (Array.isArray(a)) ? 'array' : false;
    }
    self.isDate = function(a) {
        // console.log(!!new Date(a).getTime());
        return (!!new Date(a).getTime()) ? 'date' : false;
    }
    self.mappedJSON = {};
    self.result = {};


    self.mapTargetJSON = function(mapObj, mappingScope) {
        /**
         * Cheking for Array type elements
         */
        if (Array.isArray(mapObj)) {
            mapObj.forEach(function(elem, index) {
                this.pushed = false;
                (primitiveType[typeof elem]) &&
                (this.pushed = true) &&
                (mappingScope.push(typeof elem));

                (isDate(elem)) &&
                (!this.pushed) &&
                (this.pushed = true) &&
                (mappingScope.push(isDate(elem)));

                if (!this.pushed && Array.isArray(elem)) {
                    mappingScope.push([]);
                    this.pushed = true;
                    mapTargetJSON(elem, mappingScope[index])
                }

                (!this.pushed) &&
                (mappingScope.push({})) &&
                (mapTargetJSON(elem, mappingScope[index]))

            });

        } else {
            /**
             * checking for object literels
             */
            Object.keys(mapObj).forEach(function(key, index) {
                mappingScope[key] = primitiveType[typeof mapObj[key]] ? typeof mapObj[key] : false;


                (!mappingScope[key]) &&
                (isArray(mapObj[key])) &&
                (mappingScope[key] = []) &&
                (mapTargetJSON(mapObj[key], mappingScope[key]));



                (!mappingScope[key]) && (mappingScope[key] = isDate(mapObj[key]));
                (!mappingScope[key]) &&
                (mappingScope[key] = {}) &&
                (mapTargetJSON(mapObj[key], mappingScope[key]));
            });
        }

        // cb(mappingScope);
    }

    /**
     * validation for the target json
     */
    self.validateTargetJSON = function(schemaScope, mappingScope, resultScope) {
        // console.log(schemaScope)

        if (Array.isArray(schemaScope) && Array.isArray(mappingScope)) {
            // console.log(schemaScope);
            mappingScope.forEach(function(scope, index) {
                (resultScope.push({})) &&
                (validateTargetJSON(schemaScope[0], mappingScope[index], resultScope[index]));

            });

        } else {
            Object.keys(schemaScope).forEach(function(key, index) {
                resultScope[key] = false;
                this.checked = false;
                (schemaScope[key].type) &&
                (this.checked = true) &&
                (schemaScope[key].type.name.toLowerCase() === mappingScope[key]) &&
                (resultScope[key] = true);

                (!resultScope[key] && !this.checked) &&
                (isArray(schemaScope[key])) &&
                (this.checked = true) &&
                (resultScope[key] = []) &&
                (validateTargetJSON(schemaScope[key], mappingScope[key], resultScope[key]));


                if (!resultScope[key] && !this.checked) {
                    resultScope[key] = {};
                    validateTargetJSON(schemaScope[key], mappingScope[key], resultScope[key])
                }
            });
        }
    }

    function validate(response) {
        self.response = response;
        mapTargetJSON(self.response, self.mappedJSON);
        validateTargetJSON(self.schema, self.mappedJSON, self.result);
        return {
            'mappedJSON': self.mappedJSON,
            'result': self.result
        }
    }

    return {
        'validate': validate
    }

    // mapTargetJSON(response, mappedJSON);
    // validateTargetJSON(schema, mappedJSON, result);



}