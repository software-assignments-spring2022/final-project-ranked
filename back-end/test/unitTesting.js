const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()
chai.use(chaiHttp)

describe("POST request to /threadrequest route", () => {
    it("it should respond with an HTTP 200 status code and a success JSON data in the response body", done => {
        let newRequest = {
            gameName: "CS:GO",
            willModerate: 1,
            friendsWillModerate: 1,
            reason: "fun game!"
        }
        chai 
        .request(server)
        .post("/threadrequest")
        .send(newRequest) 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.be.a("object") // our route sends back a JSON data
            res.body.should.have.property("success") // body property should be success, since none of the newRequest field is empty
            done()
        }) 
    })
})

describe("POST request to /threadrequest route", () => {
    it("it should respond with an HTTP 200 status code and a missing JSON data in the response body", done => {
        let newRequest = {
            gameName: "",
            willModerate: 1,
            friendsWillModerate: 1,
            reason: ""
        }
        chai 
        .request(server)
        .post("/threadrequest")
        .send(newRequest) 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.be.a("object") // our route sends back a JSON data
            // body property should be missing, since gameName and reason fields are missing
            res.body.should.have.property("missing")
            done()
        }) 
    })
})

describe("POST request to /login route", () => {
    it("it should respond with an HTTP 200 status code and a JSON data (success & user) in the response body", done => {
        let credentials = {
            username: "testing",
            password: "secret"
        }
        chai 
        .request(server)
        .post("/login")
        .send(credentials) 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.be.a("object") // our route sends back a JSON data
            res.body.should.have.property("success")
            res.body.should.have.property("user")
            done()
        }) 
    })
})

describe("POST request to /login route", () => {
    it("it should respond with an HTTP 200 status code and a notFound JSON data in the response body", done => {
        let credentials = {
            username: "wrong name",
            password: "secret"
        }
        chai 
        .request(server)
        .post("/login")
        .send(credentials) 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.be.a("object") // our route sends back a JSON data
            res.body.should.have.property("notFound")
            done()
        }) 
    })
})

describe("POST request to /login route", () => {
    it("it should respond with an HTTP 200 status code and a missing JSON data in the response body", done => {
        let credentials = {
            username: "",
            password: "secret"
        }
        chai 
        .request(server)
        .post("/login")
        .send(credentials) 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.be.a("object") // our route sends back a JSON data
            res.body.should.have.property("missing")
            done()
        }) 
    })
})

describe("GET request to /account route", () => {
    it("it should respond with an HTTP 200 status code and a user JSON data in the response body", done => {
        chai 
        .request(server)
        .get("/account") 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.be.a("object") // our route sends back a JSON data
            res.body.should.have.property("user")
            done()
        }) 
    })
})