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
// MULTIPLICATION FUNCTION TESTS 
// ----------------------
const { multiplyNumbers } = require("../server");

describe("multiplyNumbers() Function Tests", function () {

    it("should correctly multiply two numbers", function () {
        expect(multiplyNumbers(3, 4)).to.equal(12);
    });

    it("should correctly multiply negative and positive numbers", function () {
        expect(multiplyNumbers(-5, 6)).to.equal(-30);
    });

});
