const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
//title, test suite to match HTTP verb and route
    describe("GET /", () => {

// requesting the serve, code 200 = successful.    
        it("should return status code 200", (done) => {

//send GET base URL
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);

//passing done() to let Jasmine test completed
                done();
            });
        });
    });
});
