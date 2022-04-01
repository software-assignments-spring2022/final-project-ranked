import "./Post.css" 
import Tag from "./Tag"

const Post = (props) => {
  var tag_key = 0
  return (
    <div className="Post">
      <h1> {props.post.title} </h1>
      <section className="post-body">
        {props.post.image && <img alt="game picture" src={props.post.image} />}
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