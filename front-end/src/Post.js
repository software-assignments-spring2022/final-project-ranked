import React, { useState, useEffect } from "react"
import "./css/Post.css" 
import axios from "axios"
import { useNavigate } from "react-router-dom"
import _ from 'lodash'
import Tag from "./Components/Tag"
import Editpost from "./Editpost"


const Post = (props) => {
  const [likes, setLikes] = React.useState(props.post.likes)
  const navigate = useNavigate()
  const [wantEdit, setWantEdit] = useState(false)
  const [editPost, setEditPost] = useState({})
  let tag_key = 0

  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/${props.post._id}/post/delete`,
        {
          user: props.user,
        }
      )
      .then((response) => {
        // success
        console.log(response.data.arrComments)
        navigate(`/`)
      })
      .catch((err) => {
        // failure
        console.log(`Received server error: ${err}`)
      })
  }

  const handleLike = () => {
    if (!_.isEmpty(props.user)) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/${props.post._id}/post/like`,
          {
            user: props.user,
          }
        )
        .then((response) => {
          // success
          console.log(`Liked or Unliked comment ${response.data.post}`)
          setLikes(response.data.post.likes)
        })
        .catch((err) => {
          // failure
          console.log(`Received server error: ${err}`)
        })
    } else {
      alert(`log in before liking!`)
    }
  }

  return (
    <div className="Post">
      {props.user.username === props.post.user_id && <button className="Post-editButton" onClick={() => {
            setWantEdit(!wantEdit)
          }}> edit </button>}
      {wantEdit && (
          <Editpost
            user={props.user}
            setEditPost={setEditPost}
            setWantEdit={setWantEdit}
            title = {props.post.title}
            body = {props.post.body}
            id = {props.post._id}
          />
        )}
      {props.user.username === props.post.user_id && (
        <button className="Post-deleteButton" onClick={handleDelete}>
          {" "}
          delete{" "}
        </button>
      )}
      <div className="Post-header"> {props.post.title} </div>
      <section className="post-body">
        {!_.isEmpty(props.post.image) && (
          <img alt="an attached file" src={props.post.image} />
        )}
        <div className="details">
          <div className="user-info">
            <img
              className="Post-user-image"
              src={props.post.user_image}
              alt=""
            ></img>
            <br></br>
            <p>user: {props.post.user_id}</p>
          </div>
          <p>{props.post.body}</p>
          <section className="like">
            <button className="likeButton" onClick={handleLike}>
              <span className="normal">{" "}
              LIKE{" "}</span><span className="thumb" role="img" aria-label="Like">👍</span>
            </button>
            <div className="likes"> {likes} </div>
          </section>
          <section className="tags">
            {props.post.tags &&
              props.post.tags.map((item) => (
                <Tag key={++tag_key} tagName={item} />
              ))}
          </section>
        </div>
      </section>
    </div>
  )
}

export default Post