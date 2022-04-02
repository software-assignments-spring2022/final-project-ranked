import "./Megathread.css" 
import React, { useState, useEffect, useRef, useCallback } from "react" 
import { Link, useParams } from "react-router-dom" 
import axios from "axios" 
import Button from "react-bootstrap/Button" 
import { useNavigate } from "react-router-dom" 
import Post from "./Post" 
import backupData from "./mock-backupPosts.json"
// import usePostSearch from "./usePostSearch" 

const Megathread = props => {
  const navigate = useNavigate() 
  const [query, setQuery] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  // start a state varaible with a blank array
  const [data, setData] = useState([]) 
  const [selfPostTitle, setTitle] = useState("")
  const [selfPostContent, setContent] = useState("")

  const { gameId } = useParams() 

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch mock data for posts
    console.log(`fetching posts for megathread id=${gameId}...`) 
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${gameId}/posts`)
      .then((response) => {
        // extract the data from the server response
        setData(response.data.game_posts) 
      })
      .catch((err) => {
        console.log(`Sorry, buster.  No more requests allowed today!`) 
        console.error(err) 

        setData(backupData) 
      }) 
  }, []) 

  const handleSubmit = e => {
    e.preventDefault() // prevent the default browser form submission stuff

    if (selfPostTitle && selfPostContent) {

      alert(`You posted title: ${selfPostTitle}!`)

      // send the data of new post to a server
      // this server doesn't exist, so we will see an error in the console
      // axios' get() and post() methods return a promise, so we can use our javascript Promise or async/await expertise here to deal with the resolution or rejection of the request
      axios
        .post("https://someserversomehwere.com/puppy/save", {
          selfPostTitle: selfPostTitle,
        })
        .post("https://someserversomehwere.com/puppy/save", {
          selfPostContent: selfPostContent,
        })
        .then(response => {
          // success
          console.log(`Received server response: ${response.data}`)
        })
        .catch(err => {
          // failure
          console.log(`Received server error: ${err}`)
        })


    }
    else {
      alert(`Make sure to fill in the title and content before posting!`)
    }

  }
  // const {
  //   posts,
  //   hasMore,
  //   loading,
  //   error
  // } = usePostSearch(query, pageNumber)

  // const observer = useRef()
  // const lastPostElementRef = useCallback(node => {
  //   if (loading) return
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPageNumber(prevPageNumber => prevPageNumber + 1)
  //     }
  //   })
  //   if (node) observer.current.observe(node)
  // }, [loading, hasMore])

  // const handleSearch = e => {
  //   setQuery(e.target.value)
  //   setPageNumber(1)
  // }


  const handleButtonClick = e => {
    navigate(`/megathread/${gameId}/subthread/${e}`)
  }

  return (
    <div className="Megathread">
      <div className="selfPosting">
        <h2>Post something!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id="postTitle_field"
              type="text"
              placeholder="Title of post"
              value={selfPostTitle}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              id="postContent_field"
              type="text"
              placeholder="Content of post"
              value={selfPostContent}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <div className="sendButton">
            <input type="submit" value="Post" />
          </div>
        </form>
      </div>

      <div className="posts">
        {data && data.map(item => (
          <div className="post" key={item.post_id} onClick={() => handleButtonClick(item.post_id)}>
              <Post key={item.post_id} user={props.user} post={item}></Post>
          </div>
        ))}
      </div>


      {/* <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div> */}

      <div className="footer">
        <h2>This is the footer.</h2>
      </div>
    </div>
  ) 
} 

export default Megathread 