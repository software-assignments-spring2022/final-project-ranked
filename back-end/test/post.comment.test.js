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

// the post and comment id we will make and delete within this test
let game_id = "626b29bd4802e2d988c81621"
let post_id = ""
let comment_id = ""

const userInfo = {
  _id: process.env.ADMIN_USERID,
  username: "rankedadmin",
  photo: process.env.ADMIN_PHOTO,
}

const checkPostSchema = (obj) => {
  obj.hasOwnProperty("image")
    ? obj.should.have.keys(
        "toMegathread",
        "user_id",
        "user_image",
        "title",
        "body",
        "tags",
        "time",
        "likes",
        "likedUsers",
        "_id",
        "__v",
        "image"
      )
    : obj.should.have.keys(
        "toMegathread",
        "user_id",
        "user_image",
        "title",
        "body",
        "tags",
        "time",
        "likes",
        "likedUsers",
        "_id",
        "__v"
      )
}

// helper function to check for each nested comment
const checkComments = (arr) => {
  for (i of arr) {
    let toComment = ""
    i.hasOwnProperty("postTo")
      ? (toComment = "postTo")
      : (toComment = "replyTo")
    i.should.have.keys(
      "_id",
      "user_id",
      "user_image",
      "text",
      "likes",
      "likedUsers",
      "time",
      "replies",
      toComment,
      "__v"
    )
    for (j of i.replies) {
      checkComments(i.replies)
    }
  }
}

// a group of tests related to all the routes that give back posts or send posts
describe("Posts", () => {
  /**
   * test the POST request to make a post (that we will be using throughout this test)
   */
  describe(`POST request to /megathread/:gameId/save route`, () => {
    let newPost = {
      title: "This is a title",
      body: "This is created temporarily for unit testing purposes",
      image: "",
      tags: ["I am", "Testing"],
      user: userInfo,
    }
    it("it should return a 200 HTTP response code and return a new post object with specific properties", (done) => {
      chai
        .request(server)
        .post(`/megathread/${game_id}/save`)
        .send(newPost)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("post") // should return
          res.body.post.should.be.a("object") // our route sends back an object
          // checks if the object follows the post schema and has the parameters we fed in
          checkPostSchema(res.body.post)
          res.body.post.title.should.equal(newPost.title)
          res.body.post.body.should.equal(newPost.body)
          res.body.post.tags.should.eql(newPost.tags)
          res.body.post.user_id.should.equal(newPost.user.username)
          // update the global variable
          post_id = res.body.post._id
          done()
        })
    })
  })

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

    it("it should return an array of post objects specific properties", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("home_posts") //should contain home_posts element
          res.body.home_posts.should.be.a("array") // our route sends back an array of objects
          // checks if each object of the array follows the post schema
          for (i of res.body.home_posts) {
            checkPostSchema(i)
          }
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })

  /**
   * test the GET /megathread/:gameId/posts route
   */
  describe("GET request to /megathread/:gameId/posts route", () => {
    // test if it causes an error
    it("it should return a 200 HTTP response code", (done) => {
      chai
        .request(server)
        .get(`/megathread/${game_id}/posts`)
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return an array of post objects specific properties", (done) => {
      chai
        .request(server)
        .get(`/megathread/${game_id}/posts`)
        .end((err, res) => {
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("game_posts") //should contain game_post element
          res.body.game_posts.should.be.a("array") // our route sends back an array of objects
          // checks if each object of the array follows the post schema
          for (i of res.body.game_posts) {
            checkPostSchema(i)
          }
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })

  /**
   * test the GET /:postId/post route
   */
  describe("GET request to /:postId/post route", () => {
    // test if it causes an error
    it("it should return a 200 HTTP response code", (done) => {
      chai
        .request(server)
        .get(`/${post_id}/post`)
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return a single post object with specific properties", (done) => {
      chai
        .request(server)
        .get(`/${post_id}/post`)
        .end((err, res) => {
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("sub_post") //should contain sub_post element
          res.body.sub_post.should.be.a("object") // our route sends back an object
          // checks if the object follows the post schema
          checkPostSchema(res.body.sub_post)
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })
})

// a group of tests related to all the routes that give back comments or post comments
describe("Comments", () => {
  /**
   * test the POST /megathread/:gameId/subthread/:postId/comments/save route
   */
  describe("POST request to /:id/comments/save route", () => {
    let newComment = {
      user: userInfo,
      comment: "a sample comment",
      replyTo: "root",
    }
    it("(root comment) it should return a 200 HTTP response code and return the new post object with specific properties", (done) => {
      chai
        .request(server)
        .post(`/${post_id}/comments/save`)
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("comment") //should contain sub_post element
          res.body.comment.should.be.a("object") // our route sends back an object
          // checks if the object follows the post schema
          checkComments([res.body.comment])
          res.body.comment.text.should.equal(newComment.comment)
          comment_id = res.body.comment._id
          // we change the newComment for the following test
          newComment.replyTo = res.body.comment._id
          newComment.comment = "a sample nested comment"
          done()
        })
    })

    it("(nested comment) it should return a 200 HTTP response code and return the new post object with specific properties", (done) => {
      chai
        .request(server)
        .post(`/${comment_id}/comments/save`)
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(200) // BDD-style assertions
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("comment") //should contain sub_post element
          res.body.comment.should.be.a("object") // our route sends back an object
          // checks if the object follows the post schema
          checkComments([res.body.comment])
          res.body.comment.text.should.equal("a sample nested comment")
          done()
        })
    })
  })

  /**
   * test the GET /megathread/:gameId/subthread/:postId/comments route
   */
  describe("GET request to /:postId/comments route", () => {
    // test if it causes an error
    it("it should return a 200 HTTP response code", (done) => {
      chai
        .request(server)
        .get(`/${post_id}/comments`)
        .end((err, res) => {
          res.should.have.status(200) // use should to make BDD-style assertions
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })

    it("it should return an array of comment objects with specific properties", (done) => {
      chai
        .request(server)
        .get(`/${post_id}/comments`)
        .end((err, res) => {
          expect(res.body).to.have.deep.property("comments") //should contain sub_post element
          res.body.comments.should.be.a("array") // our route sends back an object
          // checks if each object in the array follows the post schema
          checkComments(res.body.comments)
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })
})

describe("Delete", () => {
  /**
   * test the DELETE /:id/post/delete route
   */
  describe("DELETE request to /:id/post/delete route", () => {
    // it should delete and return success
    it("it should delete a post and return an array of comments it deleted with it", (done) => {
      chai
        .request(server)
        .post(`/${post_id}/post/delete`)
        .send({ user: userInfo })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          expect(res.body).to.have.deep.property("arrComments") //should contain array of deleted comments
          expect(res.body).to.have.deep.property("success")
          res.body.arrComments.should.be.a("array")
          done() // resolve the Promise that these tests create so mocha can move on
        })
    })
  })
})