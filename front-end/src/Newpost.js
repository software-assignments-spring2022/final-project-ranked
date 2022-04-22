import "./css/Newpost.css"
import React, { useState, useEffect }from "react";
import { useParams } from "react-router-dom"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FileBase64 from 'react-file-base64'

const Newpost = (props) => {
  // start a state varaible with a blank array
  const [postTitle, setTitle] = useState("")
  const [postContent, setContent] = useState("")
  const [tags, setTags] = useState([])
  const [photo, setPhoto] = useState("")

  const { gameId } = useParams()

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault() // prevent the default browser form submission stuff
      // send the data of new post to a server
      axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${gameId}/save`, {
        title: postTitle,
        body: postContent,
        photo: photo,
        tags: tags,
        user: props.user
        })
    .then(res => {
        if(res.data.missing){
            alert(res.data.missing)
        }
        else{
            alert(res.data.success)
            props.setNewPost(res.data.post)
            setTitle("")
            setContent("")
            setPhoto("")
            props.setWantComment(false)
        }
    })
    .catch(err => {
        alert("There seems to be a problem with the server. Please try again later!")
        console.log(err)
    })
  }

  // today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + today.getHours() + ':' + '  ' + today.getMinutes() + ':' + today.getSeconds()  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPhoto(base64);
  }

  const handleForm = e =>{
    const tempTags = tags
    if(e.target.checked){
      tempTags.push(e.target.value)
      setTags(tempTags)
    }
    else{
      tempTags.splice(tags.indexOf(e.target.value), 1)
      setTags(tempTags)
    }
  }

  return (
    <div className="Newpost">
      <div className="Form">
        <Form onSubmit={handleSubmit} encType='multipart/formdata'>
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

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Post Image</Form.Label>
            <Form.Control 
              type="file" 
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={e => handleFileUpload(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tags</Form.Label>
            {["checkbox"].map((type) => (
              <div key={`${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Meme"
                  value="Meme"
                  type={type}
                  id={`${type}-Game1`}
                  onClick={(e)=> handleForm(e)}
                />
                <Form.Check
                  inline
                  label="News"
                  value="News"
                  type={type}
                  id={`${type}-Game2`}
                  onClick={(e)=> handleForm(e)}
                />
                <Form.Check
                  inline
                  label="Gameplay"
                  value="Gameplay"
                  type={type}
                  id={`${type}-Game3`}
                  onClick={(e)=> handleForm(e)}
                />
              </div>
            ))}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Newpost
