// // set the app NODE_ENV environment variable to 'test' in case the app is set up to alter its behavior in such case
// // in our case, the morgan logging module is turned off when this is set to 'test'
// process.env.NODE_ENV = "test"

// // include the testing dependencies
// const chai = require("chai")
// const chaiHttp = require("chai-http")
// chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
// const expect = chai.expect // the assertion library in the style using the word 'expect'
// const should = chai.should() // the same assertion library in the style using the word 'should'

// // import the server
// const server = require("../app")

// // test related to the /megathread route
// describe("POST request to /megathread/new route", () => {
//     it("it should respond with an HTTP 200 status code and a missing JSON data in the response body", done => {
//         const newRequest = {
//             game_name:"Valorant",
//             title: "Test title",
//             body: "dsadsadsadsadsadsa",
//             tags: "Meme",
//             time: "2020"
//         }
//         chai 
//         .request(server)
//         .post("/megathread/new")
//         .send(newRequest) 
//         .end((err, res) => {
//             res.should.have.status(200) // BDD-style assertions
//             res.should.be.a("object") // our route sends back a JSON data
//             // body property should be missing, since gameName and reason fields are missing
//             res.body.should.have.property("success")
//             done()
//         }) 
//     })
// })