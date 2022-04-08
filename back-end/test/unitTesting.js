let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()
chai.use(chaiHttp)

describe("GET request to /aboutus route", () => {
    it("it should respond with an HTTP 200 status code and a .txt file in the response body", done => {
        chai 
        .request("http://localhost:4000")
        .get("/aboutus") 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.have.text // aboutus route sends back a text file
            done()
        }) 
    })
})

describe("GET request to /terms route", () => {
    it("it should respond with an HTTP 200 status code and a .txt file in the response body", done => {
        chai 
        .request("http://localhost:4000")
        .get("/terms") 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.have.text // terms route sends back a text file
            done()
        }) 
    })
})

describe("GET request to /faq route", () => {
    it("it should respond with an HTTP 200 status code and a .txt file in the response body", done => {
        chai 
        .request("http://localhost:4000")
        .get("/faq") 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.have.text // faq route sends back a text file
            done()
        }) 
    })
})

describe("POST request to /threadrequest route", () => {
    it("it should respond with an HTTP 200 status code and a success JSON data in the response body", done => {
        let newRequest = {
            gameName: "CS:GO",
            willModerate: 1,
            friendsWillModerate: 1,
            reason: "fun game!"
        }
        chai 
        .request("http://localhost:4000")
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
        .request("http://localhost:4000")
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

describe("POST request to /megathread/new route", () => {
    it("it should respond with an HTTP 200 status code and a missing JSON data in the response body", done => {
        let newRequest = {
            game_name:"Valorant",
            title: "Test title",
            body: "dsadsadsadsadsadsa",
            tags: "Meme",
            time: "2020"
        }
        chai 
        .request("http://localhost:4000")
        .post("/megathread/new")
        .send(newRequest) 
        .end((err, res) => {
            res.should.have.status(200) // BDD-style assertions
            res.should.be.a("object") // our route sends back a JSON data
            // body property should be missing, since gameName and reason fields are missing
            res.body.should.have.property("success")
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
        .request("http://localhost:4000")
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
        .request("http://localhost:4000")
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
        .request("http://localhost:4000")
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