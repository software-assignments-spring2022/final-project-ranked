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
  const [postTitle, setTitle] = useState("");
  const [postContent, setContent] = useState("");
  const [tags, setTags] = useState("")
  const [gameName, setName] = useState("")

  const { gameId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the default browser form submission stuff


      // send the data of new post to a server
      axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/new`, {
        game_name:gameName,
        title: postTitle,
        body: postContent,
        tags: tags,
        time: date
        })
    .then(res => {
        if(res.data.missing){
            alert(res.data.missing)
        }
        else{
            alert(res.data.success)
        }
    })
    .catch(err => {
        alert("There seems to be a problem with the server. Please try again later!")
        console.log(err)
    })
  }

  var today = new Date(),
  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + today.getHours() + ':' + '  ' + today.getMinutes() + ':' + today.getSeconds();  


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
                  onClick={e => setName("Valorant")}
                />
                <Form.Check
                  inline
                  label="LOL"
                  name="group1"
                  type={type}
                  id={`${type}-Game2`}
                  onClick={e => setName("LOL")}
                />
                <Form.Check
                  inline
                  label="CSGO"
                  type={type}
                  id={`${type}-Game3`}
                  onClick={e => setName("CSGO")}
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
                  type={type}
                  id={`${type}-Game1`}
                  onClick={e => setTags("Meme")}
                />
                <Form.Check
                  inline
                  label="News"
                  type={type}
                  id={`${type}-Game2`}
                  onClick={e => setTags("News")}
                />
                <Form.Check
                  inline
                  label="Gameplay"
                  type={type}
                  id={`${type}-Game3`}
                  onClick={e => setTags("Gameplay")}
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
