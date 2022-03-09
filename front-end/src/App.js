import './App.css';
import React, { useState, useRef, useCallback } from 'react'
import usePostSearch from './usePostSearch';
const posts = [
  {
  title: "Post1",
  author: "Sid",
  time: "Dec 7, 2021",
  description:"Trying to farm"
  },
  {
    title: "Post2",
    author: "Sid",
    time: "Dec 8, 2021",
    description:"Best Valorants players in the world"
  },
  {
    title: "Post3",
    author: "Sid",
    time: "Dec 9, 2021",
    description:"Best LOL players in the world"
  }
]

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }
  
  return (
    <div className="App">
      <div class="header">
        <h2>This is the header.</h2>
        <input type="text" value={query} onChange={handleSearch}></input>  
      </div>

  <div className="posts">
    {posts.map((post) =>(
      <div class="post">
      <h2>{post.title}</h2>
      <h5>Author: {post.author},Last Updated: {post.time}</h5>
      <div class="img"><img src = "N/A" alt="N/A"/></div>
      <p>{post.description}</p>
      </div>
    ))}
  </div>

  <div class="footer">
    <h2>This is the footer.</h2>
    </div>
</div>
  );
}

export default App;
