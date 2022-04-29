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

// a group of tests related to the /isLoggedIn route
describe("Check if user is logged-in", () => {
    describe("GET /isLoggedIn when user is not logged-in", () => {
        it("it should respond with an HTTP 401 status code", done => {
            chai 
            .request(server)
            .get("/isLoggedIn") 
            .end((err, res) => {
                res.should.have.status(401) // BDD-style assertions
                done()
            }) 
        })
    })
    
    describe("GET /isLoggedIn when user is logged-in", () => {
        const jwt = require("jsonwebtoken")
        const passportJWT = require("passport-jwt")
        const ExtractJwt = passportJWT.ExtractJwt
        const JwtStrategy = passportJWT.Strategy
        const jwtOptions = {}
        jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
        jwtOptions.secretOrKey = process.env.JWT_SECRET
        const token = jwt.sign({ sub: process.env.ADMIN_USERID }, jwtOptions.secretOrKey)
    
        it("it should respond with an HTTP 200 status code and a JSON data (success & user) in the response body", done => {
            chai 
            .request(server)
            .get("/isLoggedIn")
            .set("Authorization", `JWT ${token}`) // set JWT authentication headers to simulate a logged-in user, using the token we created at top 
            .end((err, res) => {
                res.should.have.status(200) // BDD-style assertions
                res.should.be.a("object") // our route sends back a JSON data
                res.body.should.have.property("success")
                res.body.should.have.property("user")
                expect(res.body.user).to.have.deep.property("_id", process.env.ADMIN_USERID)
                expect(res.body.user).to.have.deep.property("username")
                expect(res.body.user).to.have.deep.property("password")
                expect(res.body.user).to.have.deep.property("email")
                expect(res.body.user).to.have.deep.property("joinDate")
                done()
            }) 
        })
    })
})