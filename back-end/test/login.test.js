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

// a group of tests related to the /login route
describe("Account Login", () => {
    describe("POST /login when user doesn't enter password during login", () => {
        it("it should respond with an HTTP 200 status code and a JSON data (missing) in the response body", done => {
            const credentials = {
                username: "rankedadmin",
                password: ""
            }
            chai 
            .request(server)
            .post("/login")
            .send(credentials) 
            .end((err, res) => {
                res.should.have.status(200) // BDD-style assertions
                res.should.be.a("object") // our route sends back a JSON data
                res.body.should.have.property("missing") // missing password
                done()
            }) 
        })
    })

    describe("POST /login when user has entered a username that does not match with what we have on file", () => {
        it("it should respond with an HTTP 200 status code and a JSON data (notFound) in the response body", done => {
            const credentials = {
                username: "queiquoeabjakjqehuoi",
                password: "qeuoqiabdjahj"
            }
            chai 
            .request(server)
            .post("/login")
            .send(credentials) 
            .end((err, res) => {
                res.should.have.status(200) // BDD-style assertions
                res.should.be.a("object") // our route sends back a JSON data
                res.body.should.have.property("notFound") // user not found
                done()
            }) 
        })
    })

    describe("POST /login when user has entered an incorrect password", () => {
        it("it should respond with an HTTP 200 status code and a JSON data (incorrect) in the response body", done => {
            const credentials = {
                username: "rankedadmin",
                password: "qeuoqiabdjahj"
            }
            chai 
            .request(server)
            .post("/login")
            .send(credentials) 
            .end((err, res) => {
                res.should.have.status(200) // BDD-style assertions
                res.should.be.a("object") // our route sends back a JSON data
                res.body.should.have.property("incorrect") // password incorrect
                done()
            }) 
        })
    })

    describe("POST /login when user login is successful", () => {
        it("it should respond with an HTTP 200 status code and a JSON data (success & token) in the response body", done => {
            const credentials = {
                username: "rankedadmin",
                password: process.env.ADMIN_PW
            }
            chai 
            .request(server)
            .post("/login")
            .send(credentials) 
            .end((err, res) => {
                res.should.have.status(200) // BDD-style assertions
                res.should.be.a("object") // our route sends back a JSON data
                res.body.should.have.property("success") // login success
                res.body.should.have.property("token") // sends back a signed  
                done()
            }) 
        })
    })
})