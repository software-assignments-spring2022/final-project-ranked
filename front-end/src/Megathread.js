import "./Megathread.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
// import usePostSearch from "./usePostSearch";

const Megathread = (props) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  // start a state varaible with a blank array
  const [data, setData] = useState([]);
  const [selfPostTitle, setTitle] = useState("")
  const [selfPostContent, setContent] = useState("")

  const { gameId } = useParams();

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    // the id of the animal that was clicked on is passed as a part of the match field of the props
    console.log(`fetching 10 posts...`);
    axios("https://my.api.mockaroo.com/mock_post-feed.json?key=23d25ba0")
      .then((response) => {
        // extract the data from the server response
        setData(response.data);
      })
      .catch((err) => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`);
        console.error(err); // the server returned an error... probably too many requests... until we pay!

        // make some backup fake data
        const backupData = [
          {
            post_id: 1,
            game_name: "Dimethicone",
            tags: ["sed", "varius"],
            user: "kpolglase0",
            title: "Nisi at nibh in hac habitasse",
            body: "Etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla",
            likes: 316,
          },
          {
            post_id: 2,
            game_name: "Benazepril Hydrochloride and Hydrochlorothiazide",
            tags: ["luctus", "integer", "eget"],
            user: "fbaudinot1",
            title:
              "A libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at",
            body: "Ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis",
            likes: 306,
          },
        ];

        setData(backupData);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault() // prevent the default browser form submission stuff

    if (selfPostTitle && selfPostContent) {

      alert(`You posted title: ${selfPostTitle}!`)

      // send the data of the new puppy to a server
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
  const {
    posts,
    hasMore,
    loading,
    error
  } = usePostSearch(query, pageNumber)

  const observer = useRef()
  const lastPostElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handleSearch = e => {
    setQuery(e.target.value)
    setPageNumber(1)
  }


  const handleButtonClick = e => {
    navigate(`/megathread/${gameId}/subthread/${e}`)
  }

  return (
    <div className="Megathread">
      {/* <div className="header">
        <h2>This is the header/search bar.</h2>
        <input type="text" value={query} onChange={handleSearch}></input>
      </div> */}

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
          <div className="post" onClick={() => handleButtonClick(item.post_id)}>
              {/* <Link to={`subthread/${item.post_id}`}> */}
              <Post user={props.user} post={item}></Post>
              {/* </Link> */}
          </div>
        ))}
      </div>


      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>

      <div className="footer">
        <h2>This is the footer.</h2>
      </div>
    </div>
  );
};

export default Megathread;