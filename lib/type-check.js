/**
 * A class which includes static methods for checking data types and data constraints
 * 
 * @public
 */
class CustomTypeCheck { 
  // A primitive type, not a Number object
  static isNumber(val) {
    return typeof val === "number" && 
           !isNaN(val);
  }
  
  // A primitive type
  static isInteger(val) {
    return CustomTypeCheck.isNumber(val) &&
           Number.isInteger(val);
  }
  
  // A primitive type
  static isFloat(val) {
    return CustomTypeCheck.isNumber(val) &&
           val % 1 !== 0;
  }
  
  // A primitive type
  static isString(val) {
    return typeof val === "string";
  }

  static isEmptyString(val) {
    return CustomTypeCheck.isString(val) &&
           val.length == 0;
  }
  
  static isNumberString(val) {
    return CustomTypeCheck.isString(val) &&
           !isNaN(val) && 
           val == +val;
  }

  static isNormalizedString(val) {
    return CustomTypeCheck.isString(val) &&
           val.replace(/[\t\r\n]/g, "") == val;
  }
  
  static isIntegerString(val) {
    return CustomTypeCheck.isString(val) &&
           CustomTypeCheck.isInteger(+val);
  }
  
  static isFloatString(val) {
    return CustomTypeCheck.isString(val) &&
           CustomTypeCheck.isFloat(+val);
  }
  
  static isFractionString(val) {
    return CustomTypeCheck.isString(val) &&
           /^[1-9][0-9]*\/[1-9][0-9]*$/.test(val);
  }
  
  static isExponentString(val) {
    return CustomTypeCheck.isNumberString(val) &&
           /e\+|-/gi.test(val);
  }
  
  static isHexString(val) {
    return CustomTypeCheck.isString(val) &&
           /^-?0x[0-9a-f]+$/i.test(val);
  }
  
  static isOctalString(val) {
    return CustomTypeCheck.isString(val) &&
           /^(-?0[0-7]+ ?)+$/.test(val);
  }
  
  static isDateString(val) {
    return CustomTypeCheck.isString(val) &&
           (new Date(val)).toString() !== "Invalid Date" && 
           !isNaN(new Date(val));
  }

  static isAsciiString(val) {
    return CustomTypeCheck.isString(val) &&
           /^[\x00-\xFF]+$/.test(val);
  }
  
  static isUnicodeString(val) {
    return CustomTypeCheck.isString(val) &&
           /^[\u0000-\u10FFFF]+$/.test(val);
  }

  static isEmail(val) {
    var pattern = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    return CustomTypeCheck.isString(val) && pattern.test(val);
  }
  
  static isUrl(val) {
    var pattern =  /^(ftp:|ftps:|ws:|wss:|http:|https:)?(\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+=]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    return CustomTypeCheck.isString(val) && pattern.test(val);
  }
  
  static isIpv4(val) {
    var pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return CustomTypeCheck.isString(val) && pattern.test(val);
  }
  
  static isUuid(val) {
    var pattern = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/;
    return CustomTypeCheck.isString(val) && pattern.test(val);
  }
  
  static isCountry(val) {
    var pattern = "AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW";
    return CustomTypeCheck.isString(val) && pattern.split("|").indexOf(val.trim().toUpperCase()) !== -1;
  }

  static isLanguage(val) {
    return CustomTypeCheck.isString(val) &&
           /^[a-z]{2,3}(?:-[A-Z]{2,3}(?:-[a-zA-Z]{4})?)?$/.test(val);
  }
  
  static isCssLength(val) {
    var pattern = ['ch', 'em', 'ex', 'rem', 'vh', 'vw', 'px', 'mm', 'cm', 'in', 'pt', 'pc'];
    return CustomTypeCheck.isString(val) && 
           pattern.indexOf(val.trim().slice(-2).toLowerCase()) !== -1 || 
           ['vmin', 'vmax'].indexOf(val.trim().slice(-4).toLowerCase()) !== -1 ;
  }
  
  static isJsonString(val) {
    try {
          JSON.parse(val);
        } catch(e) {
          return false;
        }
    return  true;
  }

  static isRegExpString(val) {
    return CustomTypeCheck.isString(val) && CustomTypeCheck.isRegExp(new RegExp(val));
  }
  
  static isUrlEncoded(val) {
    return encodeURIComponent(decodeURIComponent(val)) === val;
  }
  
  static isBase64(val) {
    try {
      return Buffer.from(val, 'base64').toString('base64') === val;
    } catch(e) {
      return false;
    }
  }
  
  static isCssAngle(val) {
    return CustomTypeCheck.isString(val) && 
           ( ['deg', 'rad'].indexOf(val.trim().slice(-3).toLowerCase()) !== -1 || 
             ['grad', 'turn'].indexOf(val.trim().slice(-4).toLowerCase()) !== -1 );
  }

  static isCssResolution(val) {
    return CustomTypeCheck.isString(val) && 
           ( ['dpcm', 'dppx'].indexOf(val.trim().slice(-4).toLowerCase()) !== -1 || 
             val.trim().slice(-3).toLowerCase() === 'dpi' );
  }

  static isCssFrequency(val) {
    return CustomTypeCheck.isString(val) && 
           ( val.trim().slice(-2).toLowerCase() === 'hz' || 
             val.trim().slice(-3).toLowerCase() === 'khz' );
  }

  static isCssTime(val) {
    return CustomTypeCheck.isString(val) && 
           ( val.trim().slice(-1).toLowerCase() === 's' || 
             val.trim().slice(-2).toLowerCase() === 'ms' );
  }
   
  static isCssPercentage(val) {
    return CustomTypeCheck.isString(val) && 
           val.trim().slice(-1).toLowerCase() === '%';
  }
  
  static isCssPosition(val) {
    return ["static", "relative", "absolute", "sticky", "fixed"].indexOf(val.trim().toLowerCase()) !== -1;
  }
  
  static isDate(val) {
    return CustomTypeCheck.isDateString(val) &&
           /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(val);
  }
  
  static isTime(val) {
    return CustomTypeCheck.isString(val) &&
           /^([0-1][0-9]|2[0-4]):([0-5][0-9]):[0-5][0-9](.\d{3})?$/.test(val);
  }
  
  static isDateTime(val) {
    return CustomTypeCheck.isString(val) &&
           /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) ([0-1][0-9]|2[0-4]):([0-5][0-9]):[0-5][0-9](.\d{3})?$/.test(val);
  }

  static isGYear(val) {
    return CustomTypeCheck.isString(val) &&
           /^\d{4}$/.test(val);
  }
  
  static isGMonth(val) {
    return CustomTypeCheck.isString(val) &&
           /^(0[1-9]|1[012])--$/.test(val);
  }
  
  static isGDay(val) {
    return CustomTypeCheck.isString(val) &&
           /^---(0[1-9]|[12][0-9]|3[01])$/.test(val);
  }

  static isGYearMonth(val) {
    return CustomTypeCheck.isString(val) &&
           /^\d{4}-(0[1-9]|1[012])$/.test(val);
  }
  
  static isGMonthDay(val) {
    return CustomTypeCheck.isString(val) &&
           /^--(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(val);
  }
  
  static isZero(val) {
    return CustomTypeCheck.isInteger(val) &&
           val === 0;
  }
  
  static isExponent(val) {
    return CustomTypeCheck.isNumber(val) &&
           /^e\+|-/i.test(val);
  }
  
  static isPositiveInteger(val) {
    return CustomTypeCheck.isInteger(val) &&
           val > 0;
  }
  
  static isNonNegativeInteger(val) {
    return CustomTypeCheck.isInteger(val) &&
           val >= 0;
  }

  static isNegativeInteger(val) {
    return CustomTypeCheck.isInteger(val) &&
           val < 0;
  }
  
  static isNonPositiveInteger(val) {
    return CustomTypeCheck.isInteger(val) &&
           val <= 0;
  }
  
  static isPositiveFloat(val) {
    return CustomTypeCheck.isFloat(val) &&
           val > 0;
  }
  
  static isNonNegativeFloat(val) {
    return CustomTypeCheck.isFloat(val) &&
           val >= 0;
  }

  static isNegativeFloat(val) {
    return CustomTypeCheck.isFloat(val) &&
           val < 0;
  }
  
  static isNonPositiveFloat(val) {
    return CustomTypeCheck.isFloat(val) &&
           val <= 0;
  }

  static isTrue(val) {
    return CustomTypeCheck.isBoolean(val) &&
           val === true;
  }

  static isFalse(val) {
    return CustomTypeCheck.isBoolean(val) &&
           val === false;
  }
  
  static isFiniteNumber(val) {
    return isFinite(val);
  }
  
  static isBoolean(val) {
    return typeof val === "boolean";
  }
  
  // A primitive type
  static isUndefined(val) {
    return val === undefined;
  }
  
  // null is a primitive type
  static isNull(val) {
    return val === null;
  } 

  static isRegExp(val) {
    return val instanceof RegExp &&
           Object.prototype.toString.call(val).slice(8, -1) === 'RegExp';
  }
  
  static isArray(val) {
    return Array.isArray(val);
  }

  static isEmptyArray(val) {
    return Array.isArray(val) && 
           val.length === 0;
  }
  
  static isStringArray(val) {
    return Array.isArray(val) && 
           val.every( i => CustomTypeCheck.isString(i) );
  }
  
  static isNumberArray(val) {
    return Array.isArray(val) && 
           val.every( i => CustomTypeCheck.isNumber(i) );
  }

  static isIntegerArray(val) {
    return Array.isArray(val) && 
           val.every( i => CustomTypeCheck.isInteger(i) );
  }
  
  static isPositiveIntegerArray(val) {
    return Array.isArray(val) && 
           val.every( i => CustomTypeCheck.isInteger(i) && i > 0 );
  }
  
  static isNonNegativeIntegerArray(val) {
    return Array.isArray(val) && 
           val.every( i => CustomTypeCheck.isInteger(i) && i >= 0 );
  }

  static isNegativeIntegerArray(val) {
    return Array.isArray(val) && 
           val.every( i => CustomTypeCheck.isInteger(i) && i < 0 );
  }
  
  static isCssString(val) {
    return CustomTypeCheck.isString(val) && 
           /^(?:\s*[\S ]+\s*{[^}]*})+/.test(val);
  }
  
  static isHexColor(val) {
    return CustomTypeCheck.isString(val) && 
           /^#([a-f0-9]{3}){1,2}$/i.test(val);
  }

  static isRgbColor(val) {
    return CustomTypeCheck.isString(val) && 
           /^rgb(a)?\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)$/i.test(val);
  }

  static isCssRatio(val) {
    return CustomTypeCheck.isString(val) && 
           /^[1-9][0-9]*\/[1-9][0-9]*$/.test(val);
  }
  
  static isJsonObject(val) { 
    return typeof val === 'object' && 
           Object.prototype.toString.call(val).slice(8, -1) === 'Object';
  }
  
  // The constructor is Object
  static isEmptyObject(val) {
    for (var key in val) {
      if (val.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  
  static isSafeInteger(val) {
    return CustomTypeCheck.isInteger(val) &&
           Number.isSafeInteger(val);           
  }
  
  // Two parameters
  static isEnumeration(val, constraint) {
    return Array.isArray(constraint) &&
           constraint.indexOf(val) !== -1;
  }

  static isPattern(val, constraint) {
    if (Array.isArray(constraint)) {

      if (constraint.length == 1) {
        return new RegExp(constraint[0]).test(val);
      } else if (constraint.length > 1) {
        return new RegExp(constraint[0], constraint[1]).test(val);
      }

      return false;
    }
  }
  
  static isLength(val, constraint) {
    return CustomTypeCheck.isNonNegativeInteger(constraint) &&
           CustomTypeCheck.isString(val) &&
           constraint === val.length;
  }

  static isMaxLength(val, constraint) {
    return CustomTypeCheck.isNonNegativeInteger(constraint) &&
           CustomTypeCheck.isString(val) &&
           constraint >= val.length;
  }

  static isMinLength(val, constraint) {
    return CustomTypeCheck.isNonNegativeInteger(constraint) &&
           CustomTypeCheck.isString(val) &&
           constraint <= val.length;
  }
  
  static isTotalDigits(val, constraint) {
    return CustomTypeCheck.isNumber(val) &&
           constraint === val.toString().replace(".", "").length;
  }
  
  static isFractionDigits(val, constraint) {
    return CustomTypeCheck.isFloat(val) &&
           constraint === val.toString().split('.')[1].length;
  }
  
  static isMinExclusive(val, constraint) {
    return CustomTypeCheck.isNumber(val) &&
           constraint < val ;
  }
  
  static isMaxExclusive(val, constraint) {
    return CustomTypeCheck.isNumber(val) &&
           constraint > val ;
  }

  static isMinInclusive(val, constraint) {
    return CustomTypeCheck.isNumber(val) &&
           constraint <= val ;
  }

  static isMaxInclusive(val, constraint) {
    return CustomTypeCheck.isNumber(val) &&
           constraint >= val ;
  }
}

/**
 * Module exports
 * @public
 */
module.exports = CustomTypeCheck;
