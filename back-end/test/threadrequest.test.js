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

// a group of tests related to the /threadrequest route
describe("Thread Request Page", () => {
  describe("POST /threadrequest when user doesn't fill out all required fields when trying to submit a new thread request", () => {
    it("it should respond with an HTTP 200 status code and a missing JSON data in the response body", (done) => {
      const newRequest = {
        gameName: "",
        willModerate: 1,
        friendsWillModerate: 1,
        reason: "",
        username: "unit testing",
        userID: "fake id",
      }
      chai
        .request(server)
        .post("/threadrequest")
        .send(newRequest)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.should.be.a("object") // our route sends back a JSON data
          res.body.should.have.property("missing") // gameName and reason fields are missing
          done()
        })
    })
  })

  describe("POST /threadrequest when thread request submission is successful", () => {
    it("it should respond with an HTTP 200 status code and a success JSON data in the response body", (done) => {
      const newRequest = {
        gameName: "Circle CI auto unit testing",
        willModerate: 1,
        friendsWillModerate: 0,
        reason: "please don't process this request!",
        username: "Circle CI",
        userID: "fake id",
      }
      chai
        .request(server)
        .post("/threadrequest")
        .send(newRequest)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.should.be.a("object") // our route sends back a JSON data
          res.body.should.have.property("success") // body property should be success, since none of the incoming field is empty
          done()
        })
    })

    it("it should then delete this thread request since it's for unit testing purpose and respond with an HTTP 200 status code", (done) => {
      const newRequest = {
        gameName: "Circle CI auto unit testing",
      }
      chai
        .request(server)
        .post("/deleteThreadRequest")
        .send(newRequest)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.should.be.a("object") // our route sends back a JSON data
          res.body.should.have.property("success")
          done()
        })
    })
  })
})