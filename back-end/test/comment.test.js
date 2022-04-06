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

// helper function to check for each nested comment
const checkComments = (arr) => {
  for (i of arr) {
    i.should.have.keys(
      "comment_id",
      "user_id",
      "text",
      "time",
      "likes",
      "replies"
    )
    for (j of i.replies) {
      checkComments(i.replies)
    }
  }
}

// a group of tests related to all the routes that give back comments or post comments
describe("Comments", () => {
  /**
   * test the GET /megathread/:gameId/subthread/:postId/comments route
   */
  describe("GET request to /megathread/1/subthread/1/comments route", () => {
    // test if it causes an error
    it("it should return a 200 HTTP response code", (done) => {
      chai
        .request(server)
        .get("/megathread/1/subthread/1/comments")
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return an array of comment objects with specific properties", (done) => {
      chai
        .request(server)
        .get("/megathread/1/subthread/1/comments")
        .end((err, res) => {
          expect(res.body).to.have.deep.property("comments") //should contain sub_post element
          res.body.comments.should.be.a("array") // our route sends back an object
          // checks if each object in the array follows the post schema
          checkComments(res.body.comments)
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })

  /**
   * test the POST /megathread/:gameId/subthread/:postId/comments/save route
   */
  describe("POST request to /megathread/1/subthread/1/comments/save route", () => {
    var newComment = {
      comment: "a sample comment",
      replyTo: "root",
    }
    it("it should return a 200 HTTP response code (for comment to root post)", (done) => {
      chai
        .request(server)
        .post("/megathread/1/subthread/1/comments/save")
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          done()
        })
    })

    it("it should return the new post object with specific properties (for comment to root post)", (done) => {
      chai
        .request(server)
        .post("/megathread/1/subthread/1/comments/save")
        .send(newComment)
        .end((err, res) => {
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("comment") //should contain sub_post element
          res.body.comment.should.be.a("object") // our route sends back an object
          // checks if the object follows the post schema
          res.body.comment.should.have.keys(
            "comment_id",
            "user_id",
            "text",
            "time",
            "likes",
            "replies"
          )
          res.body.comment.text.should.equal("a sample comment")
          newComment.replyTo = res.body.comment.comment_id
          newComment.comment = "a sample nested comment"
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
    it("it should return a 200 HTTP response code (for nested comment to comment)", (done) => {
      chai
        .request(server)
        .post("/megathread/1/subthread/1/comments/save")
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          done()
        })
    })

    it("it should return the new post object with specific properties (for nested comment to comment)", (done) => {
      chai
        .request(server)
        .post("/megathread/1/subthread/1/comments/save")
        .send(newComment)
        .end((err, res) => {
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("comment") //should contain sub_post element
          res.body.comment.should.be.a("object") // our route sends back an object
          // checks if the object follows the post schema
          res.body.comment.should.have.keys(
            "comment_id",
            "user_id",
            "text",
            "time",
            "likes",
            "replies"
          )
          res.body.comment.text.should.equal("a sample nested comment")
          newComment = res.body.comment
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })
})
