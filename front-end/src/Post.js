import "./css/Post.css" 
import _ from 'lodash'
import Tag from "./Tag"

const Post = (props) => {
  var tag_key = 0
  return (
    <div className="Post">
      <div className="header"> {props.post.title} </div>
      <section className="post-body">
        {!_.isEmpty(props.post.image) && <img alt="an attached file" src={props.post.image} />}
        <div className="details">
          <p>user: {props.post.user_id}</p>
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