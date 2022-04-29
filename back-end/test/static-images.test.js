// set the app NODE_ENV environment variable to 'test' in case the app is set up to alter its behavior in such case
// in our case, the morgan logging module is turned off when this is set to 'test'
process.env.NODE_ENV = "test"

// include the testing dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
const expect = chai.expect // the assertion library in the style using the word 'expect'
const should = chai.should() // the same assertion library in the style using the word 'should'

// import the server
const server = require("../app")

describe("Get static images data", () => {
    describe("GET /staticImg to grab all static images data for our static pages", () => {
        it("it should respond with an HTTP 200 status code and a allStaticImgs JSON data in the response body", done => {
            chai 
            .request(server)
            .get("/staticImg")
            .end((err, res) => {
                res.should.have.status(200) // BDD-style assertions
                res.should.be.a("object") // our route sends back a JSON data
                res.body.should.have.property("allStaticImgs")
                expect(res.body.allStaticImgs).to.have.deep.property("topImg") // the JSON object contains multiple base64 encoded strings
                expect(res.body.allStaticImgs).to.have.deep.property("firstImg")
                expect(res.body.allStaticImgs).to.have.deep.property("secondImg")
                expect(res.body.allStaticImgs).to.have.deep.property("thirdImg")
                expect(res.body.allStaticImgs).to.have.deep.property("lawyerImg")
                done()
            }) 
        })
    })
})