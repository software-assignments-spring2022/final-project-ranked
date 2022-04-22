import "./css/Post.css" 
import axios from "axios"
import { useNavigate } from "react-router-dom"
import _ from 'lodash'
import Tag from "./Tag"

const Post = (props) => {
  const navigate = useNavigate()
  let tag_key = 0

  const handleDelete = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/${props.post._id}/post/delete`, {
        user: props.user
      })
      .then((response) => {
        // success
        console.log(response.data.arrComments);
        navigate(`/`)
      })
      .catch((err) => {
        // failure
        console.log(`Received server error: ${err}`)
      })
  }

  return (
    <div className="Post">
      {props.user.username === props.post.user_id && <button className="Post-deleteButton" onClick={handleDelete}> delete </button>}
      <div className="Post-header"> {props.post.title} </div>
      <section className="post-body">
        {!_.isEmpty(props.post.image) && <img alt="an attached file" src={props.post.image} />}
        <div className="details">
          <div className="user-info">
            <img className='Post-user-image' src={props.post.user_image} alt='user profile image'></img>
            <p>user: {props.post.user_id}</p>
          </div>
          <p>{props.post.body}</p>
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