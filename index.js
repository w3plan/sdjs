const typeCheck = require("./lib/type-check");

/**
 * Checks that data is matched by data type
 * 
 * @public 
 * @param {string} type                data type
 * @param {string|number} name         an array index or to be same with property parameter
 * @param {string|number|boolean|null} the value to the name
 * @param {string|number} property     the name of data member
 * @return {boolean}                   Returns false and prints the message if check failed, otherwise returns true
 */
function validatedType(type, name, val, property) {

  if ( !typeCheck['is' + type.charAt(0).toUpperCase() + type.slice(1)] ) {
    console.log(type + " is an invalid data type.");

    return false;
  }
  
  if ( !typeCheck['is' + type.charAt(0).toUpperCase() + type.slice(1)](val) ) {

    if ( typeCheck.isPositiveInteger(name) ) {
      console.log("The value: " + val + " to index: " + name + " of property: " + property + " isn't the type: " + type );
    } else {
      console.log("The value: " + val + " to property: " + property + " isn't the type: " + type );
    }

    return false;
  }

  return true;
}

/**
 * Checks that data is constrainted by the constraint conditions
 * 
 * @public
 * @param {object} cstr                constraint object
 * @param {string|number} name         an array index or to be same with property parameter
 * @param {string|number|boolean|null} the value to the name
 * @param {string|number} property     the name of data member
 * @return {boolean}                   Returns false and prints the message if check failed, otherwise returns true
 */
function validatedConstraint(cstr, name, val, property) {
  var flag = true;

  for ( var key in cstr ) {
  
    if ( cstr.hasOwnProperty(key) ) {

      if ( !typeCheck['is' + key.charAt(0).toUpperCase() + key.slice(1)] ) {
        console.log(key + " is an invalid constraint.");

        flag = false;
      }
      
      if ( !typeCheck['is' + key.charAt(0).toUpperCase() + key.slice(1)](val, cstr[key]) ) {
        
        if ( typeCheck.isPositiveInteger(name) ) {
          console.log("The constaint: " + key + " is invalid to the index: " + name + " of property: " + property + " with the value: " + val);
        } else {
          console.log("The constaint: " + key + " is invalid to the property: " + property + " with the value: " + val);
        }

        flag = false;
      }
    }
  }
  
  return flag;
}

/**
 * Validates JSON members are matched by the descriptions of data presence, type, and constraint.
 * 
 * @public 
 * @param {object} jdata      A JSON object which should be validated  
 * @param {object|null} glb   Object for _pfGlobal or null
 * @return {boolean}          Returns false and prints the message if validation failed, otherwise returns true
 */
function sdjs(jdata, glb = {}) {
  var vResult = true;
  
  for ( var prop in jdata ) {

    if ( jdata.hasOwnProperty(prop) ) {
      
      if ( prop === "_pfGlobal" && typeCheck.isJsonObject(jdata._pfGlobal) ) {
        glb = jdata._pfGlobal;
      }
      
      if ( typeCheck.isJsonObject(jdata[prop]) ) {
        vResult = sdjs(jdata[prop], glb);

        if (!vResult) global.flag = 1;
      } else if ( Array.isArray(jdata[prop]) ) {

        for ( var i = 0, len = jdata[prop].length; i < len; i++ ) {
          
          if ( typeCheck.isJsonObject(jdata[prop][i]) || 
               Array.isArray(jdata[prop][i]) ) 
          {
            vResult = sdjs(jdata[prop][i], glb);

            if (!vResult) global.flag = 1;
          } else if ( jdata.hasOwnProperty(prop + "_pfidx") ) {
            var pfk = null;
            
            if ( jdata[prop + "_pfidx"].hasOwnProperty("all") && 
                 typeof jdata[prop + "_pfidx"].all.type !== 'undefined' ) 
            {
              pfk = "all";
            } else if ( jdata[prop + "_pfidx"].hasOwnProperty("i" + i) && 
                        typeof jdata[prop + "_pfidx"]["i" + i].type !== 'undefined' ) 
            {
              pfk = "i" + i;
            }
            
            if (pfk !== null) {
              vResult = validatedType(jdata[prop + "_pfidx"][pfk].type, i, jdata[prop][i], prop);

              if (!vResult) global.flag = 1;

              if ( typeof jdata[prop + "_pfidx"][pfk].constraint !== 'undefined' ) {
                vResult = validatedConstraint(jdata[prop + "_pfidx"][pfk].constraint, i, jdata[prop][i], prop);

                if (!vResult) global.flag = 1;
              }
            }
          }
        }
      } else if ( jdata.hasOwnProperty(prop + "_pfsch") && 
                  typeof jdata[prop + "_pfsch"] === "string" &&
                  jdata[prop + "_pfsch"] !== "" &&
                  glb.hasOwnProperty(prop + "_" + jdata[prop + "_pfsch"]) &&
                  typeof glb[prop + "_" + jdata[prop + "_pfsch"]].type !== 'undefined' ) 
      { 
        // presence value is 'required' to all members of _pfGlobal value
        vResult = validatedType(glb[prop + "_" + jdata[prop + "_pfsch"]].type, prop, jdata[prop], prop);

        if (!vResult) global.flag = 1;

        if ( typeof glb[prop + "_" + jdata[prop + "_pfsch"]].constraint !== 'undefined' ) {
          vResult = validatedConstraint(glb[prop + "_" + jdata[prop + "_pfsch"]].constraint, prop, jdata[prop], prop);

          if (!vResult) global.flag = 1;
        }
      } else if ( jdata.hasOwnProperty(prop + "_pfsch") && 
                  typeof jdata[prop + "_pfsch"].type !== 'undefined' )
      { 
        // presence value is either 'required' or 'implied'
        vResult = validatedType(jdata[prop + "_pfsch"].type, prop, jdata[prop], prop);

        if (!vResult) global.flag = 1;

        if ( typeof jdata[prop + "_pfsch"].constraint !== 'undefined' ) {
          vResult = validatedConstraint(jdata[prop + "_pfsch"].constraint, prop, jdata[prop], prop);

          if (!vResult) global.flag = 1;
        }
      } else if ( prop.length > 6 &&
                  prop.slice(-6) === "_pfsch" &&
                  jdata[prop].presence === 'implied' &&
                  typeof jdata[prop].type !== 'undefined' &&
                  !jdata.hasOwnProperty(prop.slice(0, -6)) )
      {
        var pfn = "";
        var pfv = null;
        
        if ( jdata.hasOwnProperty(prop.slice(0, -6) + "_default") ) {
          pfn = prop.slice(0, -6) + "_default";
          pfv = jdata[pfn];
        } else if ( jdata.hasOwnProperty(prop.slice(0, -6) + "_fixed") ) {
          pfn = prop.slice(0, -6) + "_fixed";
          pfv = jdata[pfn];
        }
        
        if ( pfv !== null ) {
          vResult = validatedType(jdata[prop].type, pfn, pfv, prop);

          if (!vResult) global.flag = 1;

          if ( typeof jdata[prop].constraint !== 'undefined' ) {
            vResult = validatedConstraint(jdata[prop].constraint, pfn, pfv, prop);

            if (!vResult) global.flag = 1;
          }
        }
      }
    }
  }
  
  if (global.flag !== undefined && global.flag === 1) {
    global.flag = 0;
    
    return false;
  }
  
  return true;
}

/**
 * Module exports
 * @public
 */
module.exports.valiSdjs = sdjs;
module.exports.valiType = validatedType;
module.exports.valiConstraint = validatedConstraint;
