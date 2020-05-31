const assert = require('assert');
const { valiType, valiConstraint, valiSdjs } = require('../index');
const { typesData, cstrsData, modelData } = require('./test-data');

var keys = Object.keys(typesData);

// starts testing
describe("sdjs Unit Test", function() {
  describe("Testing data types", function() {

    keys.forEach( function(key) {
      it("Data type: " + key, function() {
        assert.ok(valiType(key, "", typesData[key], ""), 'Type error: ' + key);        
      });
    });
  });
  
  describe("Testing data constraints", function() {
    
    it("Data constraint: maxInclusive", function() {
      assert(valiConstraint({"maxInclusive": cstrsData.maxInclusive}, "", 999.99, ""), 'Constraint error');        
    });
    
    it("Data constraint: minInclusive", function() {
      assert(valiConstraint({"minInclusive": cstrsData.minInclusive}, "", 100.01, ""), 'Constraint error');        
    });

    it("Data constraint: maxExclusive", function() {
      assert(valiConstraint({"maxExclusive": cstrsData.maxExclusive}, "", 999.99, ""), 'Constraint error');        
    });
    
    it("Data constraint: minExclusive", function() {
      assert(valiConstraint({"minExclusive": cstrsData.minExclusive}, "", 100.01, ""), 'Constraint error');        
    });
    
    it("Data constraint: totalDigits", function() {
      assert(valiConstraint({"totalDigits": cstrsData.totalDigits}, "", 10025, ""), 'Constraint error');        
    });
    
    it("Data constraint: fractionDigits", function() {
      assert(valiConstraint({"fractionDigits": cstrsData.fractionDigits}, "", 12.56, ""), 'Constraint error');        
    });
    
    it("Data constraint: length", function() {
      assert(valiConstraint({"length": cstrsData.length}, "", "Self Description JSON Schema", ""), 'Constraint error');        
    });
    
    it("Data constraint: maxLength", function() {
      assert(valiConstraint({"maxLength": cstrsData.maxLength}, "", "Data maximum length", ""), 'Constraint error');        
    });
    
    it("Data constraint: minLength", function() {
      assert(valiConstraint({"minLength": cstrsData.minLength}, "", "Data minimum length", ""), 'Constraint error');        
    });
    
    it("Data constraint: pattern", function() {
      assert(valiConstraint({"pattern": cstrsData.pattern}, "", "3 divided by 4 is 3/4", ""), 'Constraint error');        
    });
    
    it("Data constraint: enumeration", function() {
      assert(valiConstraint({"enumeration": cstrsData.enumeration}, "", "jpg", ""), 'Constraint error');        
    });
  });
  
  describe("Testing data SDJS(Self Description JSON Schema)", function() {
    it("Data SDJS", function() {
      assert(valiSdjs(modelData), 'SDJS error');        
    });
  });
});
