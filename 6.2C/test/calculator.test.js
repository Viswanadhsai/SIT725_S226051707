const expect = require("chai").expect;
const request = require("request");

const baseUrl = "http://localhost:3000";

// ----------------------
// API TESTS 
// ----------------------
describe("API Tests", function () {

    it("returns status 200 for /hello", function (done) {
        request.get(`${baseUrl}/hello`, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).message).to.equal("Hello world");
            done();
        });
    });

    it("returns 404 for unknown route", function (done) {
        request.get(`${baseUrl}/hellooo`, function (error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

});

// ----------------------
// CALCULATION FUNCTION TESTS 
// ----------------------
const { addNumbers } = require("../server");

describe("addNumbers() Function Tests", function () {

    it("should correctly add two numbers", function () {
        expect(addNumbers(10, 15)).to.equal(25);
    });

    it("should correctly add negative and positive numbers", function () {
        expect(addNumbers(-7, 12)).to.equal(5);
    });

});
