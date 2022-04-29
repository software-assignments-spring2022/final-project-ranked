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

// a group of tests related to the /register route
describe("Account Registration", () => {
  describe("POST /register when user doesn't fill out all required fields during account registration", () => {
    it("it should respond with an HTTP 200 status code and a JSON data (missing) in the response body", (done) => {
      const credentials = {
        username: "testing",
        password: "secret",
        email: "",
      }
      chai
        .request(server)
        .post("/register")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.should.be.a("object") // our route sends back a JSON data
          res.body.should.have.property("missing") // email field is empty
          done()
        })
    })
  })

  describe("POST /register when user has entered an invalid username during account registration", () => {
    it("it should respond with an HTTP 200 status code and a JSON data (invalidNameFormat) in the response body", (done) => {
      const credentials = {
        username: "**&*^^*&*",
        password: "secret",
        email: "unit@testing.com",
      }
      chai
        .request(server)
        .post("/register")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.should.be.a("object") // our route sends back a JSON data
          res.body.should.have.property("invalidNameFormat") // only alphanumeric characters are allowed
          done()
        })
    })
  })

  describe("POST /register when user is trying to register an account that already exists in our database", () => {
    it("it should respond with an HTTP 200 status code and a JSON data (duplicated) in the response body", (done) => {
      const credentials = {
        username: "rankedadmin",
        password: "secret",
        email: "unit@testing.com",
      }
      chai
        .request(server)
        .post("/register")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.should.be.a("object") // our route sends back a JSON data
          res.body.should.have.property("duplicated")
          done()
        })
    })
  })

  // this test passes but we decided not to include in Circle CI, since if we do not get to delete
  // this account in our DB before another pull request comes in, this test will fail (duplicated account)
  describe("POST /register when account registration is successful", () => {
    it("it should respond with an HTTP 200 status code and a JSON data (success & token) in the response body", (done) => {
      const credentials = {
        username: "unitTesting",
        password: "secret",
        email: "unit@testing.com",
      }
      chai
        .request(server)
        .post("/register")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.should.be.a("object") // our route sends back a JSON data
          res.body.should.have.property("success")
          res.body.should.have.property("token") // send back a JWT that will be stored in client's local storage
          done()
        })
    })

    it("it should then delete this account since it's for unit testing purpose and respond with an HTTP 200 status code", (done) => {
      const credentials = {
        username: "unitTesting",
      }
      chai
        .request(server)
        .post("/deleteAcc")
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.should.be.a("object") // our route sends back a JSON data
          res.body.should.have.property("success")
          done()
        })
    })
  })
})