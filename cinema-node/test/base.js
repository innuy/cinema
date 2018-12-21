var expect = require("chai").expect;

describe("Base Mocha Test", function() {
    it("true is true", function() {
        expect("Go Cinema!!!").to.equal("Go Cinema!!!");
        expect(1+1).to.equal(2);
    });
});