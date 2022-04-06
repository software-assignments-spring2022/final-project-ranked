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

// a group of tests related to all the routes that give back posts or send posts
describe("Posts", () => {
  /**
   * test the GET /posts (home) route
   */
  describe("GET request to /posts (home) route", () => {
    // test if it causes an error
    it("it should return a 200 HTTP response code", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return an array of comment objects specific properties", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
            res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("home_posts") //should contain home_posts element
          res.body.home_posts.should.be.a("array") // our route sends back an array of objects
          // checks if each object of the array follows the post schema
          for (i of res.body.home_posts) {
            i.should.have.keys(
              "game_id",
              "post_id",
              "user_id",
              "title",
              "body",
              "tags",
              "time",
              "likes",
              "image",
              "comments"
            )
          }
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })

  /**
   * test the GET /megathread/:gameId/posts route
   */
  describe("GET request to /megathread/1/posts route", () => {
    // test if it causes an error
    it("it should return a 200 HTTP response code", (done) => {
      chai
        .request(server)
        .get("/megathread/1/posts")
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return an array of comment objects specific properties", (done) => {
      chai
        .request(server)
        .get("/megathread/1/posts")
        .end((err, res) => {
            res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("game_posts") //should contain game_post element
          res.body.game_posts.should.be.a("array") // our route sends back an array of objects
          // checks if each object of the array follows the post schema
          for (i of res.body.game_posts) {
            i.should.have.keys(
              "game_id",
              "post_id",
              "user_id",
              "title",
              "body",
              "tags",
              "time",
              "likes",
              "image",
              "comments"
            )
          }
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })

  /**
   * test the GET /megathread/:gameId/subthread/:postId/post route
   */
  describe("GET request to /megathread/1/subthread/1/post route", () => {
    // test if it causes an error
    it("it should return a 200 HTTP response code", (done) => {
      chai
        .request(server)
        .get("/megathread/1/subthread/1/post")
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return a single post object with specific properties", (done) => {
      chai
        .request(server)
        .get("/megathread/1/subthread/1/post")
        .end((err, res) => {
            res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("sub_post") //should contain sub_post element
          res.body.sub_post.should.be.a("object") // our route sends back an object
          // checks if the object follows the post schema
          res.body.sub_post.should.have.keys(
            "game_id",
            "post_id",
            "user_id",
            "title",
            "body",
            "tags",
            "time",
            "likes",
            "image",
            "comments"
          )
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })
})
