import "./Newpost.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Newpost = (props) => {
  const navigate = useNavigate();
  // start a state varaible with a blank array
  const [data, setData] = useState([]);
  const [postTitle, setTitle] = useState("");
  const [postContent, setContent] = useState("");

  const { gameId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the default browser form submission stuff

    if (postTitle && postContent) {
      alert(`You posted title: ${postTitle}!`);

      // send the data of new post to a server
      // this server doesn't exist, so we will see an error in the console
      // axios' get() and post() methods return a promise, so we can use our javascript Promise or async/await expertise here to deal with the resolution or rejection of the request
      axios
        .post("https://someserversomehwere.com/puppy/save", {
          postTitle: postTitle,
        })
        .post("https://someserversomehwere.com/puppy/save", {
          postContent: postContent,
        })
        .then((response) => {
          // success
          console.log(`Received server response: ${response.data}`);
        })
        .catch((err) => {
          // failure
          console.log(`Received server error: ${err}`);
        });
    } else {
      alert(`Make sure to fill in the title and content before posting!`);
    }
  };

  return (
    <div className="Newpost">
      <div className="Form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="newPostTitle">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Post Title"
              onChange={(e) => setTitle(e.target.value)}
              value={postTitle}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="newPostContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Post Text"
              onChange={(e) => setContent(e.target.value)}
              value={postContent}
            />
          </Form.Group>

          <Form>
            <Form.Label>Related Game</Form.Label>
            {["radio"].map((type) => (
              <div key={`${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Valorant"
                  name="group1"
                  type={type}
                  id={`${type}-Game1`}
                />
                <Form.Check
                  inline
                  label="LOL"
                  name="group1"
                  type={type}
                  id={`${type}-Game2`}
                />
                <Form.Check
                  inline
                  label="CSGO"
                  type={type}
                  id={`${type}-Game3`}
                />
              </div>
            ))}
          </Form>

          <Form>
            <Form.Label>Tags</Form.Label>
            {["checkbox"].map((type) => (
              <div key={`${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Meme"
                  name="group1"
                  type={type}
                  id={`${type}-Game1`}
                />
                <Form.Check
                  inline
                  label="News"
                  name="group1"
                  type={type}
                  id={`${type}-Game2`}
                />
                <Form.Check
                  inline
                  label="Gameplay"
                  type={type}
                  id={`${type}-Game3`}
                />
              </div>
            ))}
          </Form>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

      <div className="footer">
        <h2>This is the footer.</h2>
      </div>
    </div>
  );
};

export default Newpost;
