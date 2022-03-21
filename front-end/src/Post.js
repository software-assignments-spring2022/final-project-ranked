import "./Post.css"
import Tag from "./Tag"

const Post = (props) => {
  return (
    <div className="Post">
<<<<<<< HEAD
      <h1> {props.post.title} </h1>
      <section className="post-body">
        <img alt="game picture" src="https://picsum.photos/200?page=animals" />
        <div className="details">
          <p>user: {props.post.user}</p>
          <p>{props.post.body}</p>
          <section className="tags">
            {props.post.tags &&
              props.post.tags.map((item) => <Tag tagName={item} />)}
          </section>
        </div>
      </section>
=======
        <h1> {props.post.title} </h1>
        <section className="post-body">
            <img alt="game picture" src={props.post.image} />
            <div className="details">
                <p>user: {props.post.user}</p>
                <p>{props.post.body}</p>
                <section className="tags">
                    {props.post.tags && 
                        props.post.tags.map(item => (
                            <Tag tagName={item} />
                    ))}
                </section>
            </div>
        </section>
>>>>>>> 51ba3adafe4a91e4cc268da7383c708ff84372a6
    </div>
  )
}

export default Post